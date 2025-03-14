// Questo file configura il service worker per la PWA

// Nome della cache
const CACHE_NAME = 'gestione-trasporti-cache-v1';

// Risorse da mettere in cache durante l'installazione
const PRECACHE_RESOURCES = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/index.html',
  '/guida_utente_dipendenti.md'
];

// Installazione del service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aperta');
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione del service worker
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Strategia di caching per le richieste
self.addEventListener('fetch', (event) => {
  // Strategia Cache First per risorse statiche
  if (event.request.url.includes('/static/') || 
      event.request.url.includes('/logo.png') ||
      event.request.url.includes('/manifest.json')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Strategia Network First per API e contenuti dinamici
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Strategia Network First con fallback alla cache per le altre richieste
  event.respondWith(
    fetch(event.request)
      .then((fetchResponse) => {
        return fetchResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Se la richiesta è per una pagina, restituisci la pagina offline
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          
          return new Response('Contenuto non disponibile offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Gestione delle notifiche push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/logo.png',
    badge: '/logo.png',
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gestione del click sulle notifiche
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Sincronizzazione in background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-chilometri') {
    event.waitUntil(syncChilometri());
  } else if (event.tag === 'sync-fatture') {
    event.waitUntil(syncFatture());
  }
});

// Funzione per sincronizzare i chilometri
async function syncChilometri() {
  try {
    const db = await openDB();
    const pendingRecords = await db.getAll('pendingChilometri');
    
    for (const record of pendingRecords) {
      try {
        const response = await fetch('/api/chilometri', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(record)
        });
        
        if (response.ok) {
          await db.delete('pendingChilometri', record.id);
        }
      } catch (error) {
        console.error('Errore durante la sincronizzazione dei chilometri:', error);
      }
    }
  } catch (error) {
    console.error('Errore durante l\'apertura del database:', error);
  }
}

// Funzione per sincronizzare le fatture
async function syncFatture() {
  try {
    const db = await openDB();
    const pendingRecords = await db.getAll('pendingFatture');
    
    for (const record of pendingRecords) {
      try {
        const response = await fetch('/api/fatture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(record)
        });
        
        if (response.ok) {
          await db.delete('pendingFatture', record.id);
        }
      } catch (error) {
        console.error('Errore durante la sincronizzazione delle fatture:', error);
      }
    }
  } catch (error) {
    console.error('Errore durante l\'apertura del database:', error);
  }
}

// Funzione per aprire il database IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('GestioneTrasportiDB', 1);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pendingChilometri')) {
        db.createObjectStore('pendingChilometri', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('pendingFatture')) {
        db.createObjectStore('pendingFatture', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
