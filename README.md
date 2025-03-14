# Gestione Trasporti Antonio Scandale

Applicazione web per la gestione della flotta di trasporti di Antonio Scandale Autotrasporti. Questa applicazione permette di registrare i chilometri percorsi, gestire le fatture carburante, calcolare il recupero delle accise e analizzare i dati finanziari dell'azienda.

## Funzionalità Principali

- **Registrazione chilometri** percorsi giornalmente
- **Gestione fatture carburante** con calcolo automatico delle accise
- **Recupero accise** con report trimestrali
- **Gestione profili dipendenti** (solo per amministratori)
- **Percorsi frequenti salvabili** per velocizzare l'inserimento dati
- **Analisi finanziaria** con grafici e report dettagliati
- **Progressive Web App (PWA)** installabile su dispositivi Android

## Installazione

```bash
# Clona il repository
git clone https://github.com/tuousername/gestione-trasporti-antonio-scandale.git

# Entra nella directory del progetto
cd gestione-trasporti-antonio-scandale

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Deployment su Vercel

1. Crea un account su [Vercel](https://vercel.com)
2. Collega il tuo account GitHub
3. Importa questo repository
4. Clicca su "Deploy"

## Struttura del Progetto

```
my-app/
├── migrations/              # Migrazioni database
├── public/                  # File statici
│   ├── logo.png             # Logo aziendale
│   ├── manifest.json        # Manifest PWA
│   └── service-worker.js    # Service Worker per funzionalità offline
├── src/
│   ├── app/                 # Pagine Next.js
│   ├── components/          # Componenti riutilizzabili
│   ├── lib/                 # Utility e funzioni
│   └── hooks/               # Custom hooks
└── documentazione_tecnica.md # Documentazione completa
```

## Guida all'Uso

### Per Dipendenti
- Accedi con le credenziali fornite dall'amministratore
- Registra i chilometri percorsi giornalmente
- Inserisci le fatture carburante
- Utilizza i percorsi frequenti per velocizzare l'inserimento dati

### Per Amministratori
- Gestisci i profili dei dipendenti
- Visualizza report finanziari
- Genera report per il recupero delle accise
- Analizza guadagni e spese

## Installazione su Dispositivi Android

1. Visita l'URL dell'applicazione da Chrome
2. Tocca "Aggiungi alla schermata Home"
3. L'app sarà disponibile sulla schermata Home come qualsiasi altra applicazione

## Licenza

Questo progetto è proprietario e riservato all'uso esclusivo di Antonio Scandale Autotrasporti.

## Contatti

Per assistenza o segnalazione di problemi, contattare:
- Email: [supporto@antonioscandale.it]
- Telefono: [Numero supporto]
