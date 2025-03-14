'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function PWASetup() {
  useEffect(() => {
    // Registra il service worker quando il componente viene montato
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(
          function(registration) {
            console.log('Service Worker registrato con successo:', registration.scope);
          },
          function(err) {
            console.log('Registrazione Service Worker fallita:', err);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#3b82f6" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Gestione Trasporti" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Gestione Trasporti" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* Script per installazione PWA */}
      <Script id="pwa-install-prompt" strategy="afterInteractive">
        {`
          let deferredPrompt;
          
          window.addEventListener('beforeinstallprompt', (e) => {
            // Impedisce la visualizzazione automatica del prompt
            e.preventDefault();
            // Salva l'evento per mostrarlo più tardi
            deferredPrompt = e;
            
            // Mostra un pulsante di installazione personalizzato se necessario
            const installButton = document.getElementById('install-button');
            if (installButton) {
              installButton.style.display = 'block';
              
              installButton.addEventListener('click', () => {
                // Mostra il prompt di installazione
                deferredPrompt.prompt();
                
                // Attende che l'utente risponda al prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('Utente ha accettato l\'installazione');
                  } else {
                    console.log('Utente ha rifiutato l\'installazione');
                  }
                  // Resetta la variabile deferredPrompt
                  deferredPrompt = null;
                  
                  // Nascondi il pulsante
                  installButton.style.display = 'none';
                });
              });
            }
          });
          
          // Rileva quando l'app è stata installata
          window.addEventListener('appinstalled', (evt) => {
            console.log('App installata');
          });
        `}
      </Script>
    </>
  );
}
