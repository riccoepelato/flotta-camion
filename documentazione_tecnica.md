# Documentazione Tecnica - Applicazione Gestione Trasporti Antonio Scandale

## Panoramica del Progetto

L'applicazione di Gestione Trasporti è una Progressive Web App (PWA) sviluppata per Antonio Scandale Autotrasporti per gestire la flotta di camion, registrare chilometri percorsi, fatture carburante, calcolare il recupero delle accise e analizzare i dati finanziari dell'azienda.

## Architettura del Sistema

### Stack Tecnologico
- **Frontend**: Next.js con React e TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (sviluppo), PostgreSQL (produzione)
- **Autenticazione**: Sistema personalizzato basato su JWT
- **PWA**: Service Worker, Web App Manifest

### Struttura del Progetto
```
my-app/
├── migrations/              # Migrazioni database
│   ├── 0001_initial.sql     # Schema iniziale
│   └── 0002_auth_and_routes.sql # Aggiornamenti schema
├── public/                  # File statici
│   ├── logo.png             # Logo aziendale
│   ├── manifest.json        # Manifest PWA
│   └── service-worker.js    # Service Worker per funzionalità offline
├── src/
│   ├── app/                 # Pagine Next.js
│   │   ├── api/             # API Routes
│   │   ├── chilometri/      # Gestione chilometri
│   │   ├── fatture/         # Gestione fatture
│   │   ├── accise/          # Recupero accise
│   │   ├── dipendenti/      # Gestione dipendenti
│   │   ├── percorsi/        # Percorsi frequenti
│   │   ├── report/          # Report e analisi
│   │   └── guida-utente/    # Guida utente
│   ├── components/          # Componenti riutilizzabili
│   │   ├── layout/          # Componenti layout
│   │   ├── ui/              # Componenti UI
│   │   └── auth/            # Componenti autenticazione
│   ├── lib/                 # Utility e funzioni
│   │   ├── db.ts            # Funzioni database
│   │   └── auth.tsx         # Gestione autenticazione
│   └── hooks/               # Custom hooks
└── wrangler.toml            # Configurazione Cloudflare
```

## Database

Il database è strutturato con le seguenti tabelle principali:

1. **users**: Profili utenti (admin e dipendenti)
2. **vehicles**: Informazioni sui veicoli
3. **vehicle_assignments**: Assegnazioni veicoli ai dipendenti
4. **mileage_records**: Registrazioni chilometri
5. **fuel_invoices**: Fatture carburante
6. **fuel_tax_refunds**: Richieste recupero accise
7. **issued_invoices**: Fatture emesse
8. **expenses**: Spese generali
9. **salaries**: Stipendi dipendenti
10. **maintenance**: Manutenzioni veicoli
11. **company_info**: Dati aziendali
12. **frequent_routes**: Percorsi frequenti
13. **permissions**: Autorizzazioni sistema
14. **role_permissions**: Autorizzazioni per ruolo

## Funzionalità Principali

### Autenticazione e Autorizzazione
- Sistema di login con username e password
- Controllo accessi basato su ruoli (admin/dipendente)
- Gestione permessi granulare per funzionalità

### Gestione Chilometri
- Registrazione chilometri giornalieri
- Calcolo automatico distanze
- Associazione a veicoli e dipendenti
- Storico e statistiche

### Gestione Fatture Carburante
- Registrazione dettagli fatture
- Upload scansioni documenti
- Calcolo automatico importi
- Associazione a veicoli

### Recupero Accise
- Calcolo trimestrale accise recuperabili
- Generazione report per Agenzia Dogane
- Esportazione dati in vari formati
- Storico richieste e rimborsi

### Gestione Dipendenti
- Creazione e modifica profili
- Gestione credenziali accesso
- Attivazione/disattivazione account
- Reset password

### Percorsi Frequenti
- Salvataggio percorsi con nome
- Riutilizzo rapido per registrazione km
- Gestione origine/destinazione
- Calcolo automatico distanze

### Analisi Finanziaria
- Dashboard con KPI principali
- Report dettagliati entrate/uscite
- Grafici e visualizzazioni
- Esportazione dati

### Funzionalità PWA
- Installazione su dispositivi Android
- Funzionamento offline
- Sincronizzazione automatica
- Notifiche push

## Sicurezza

L'applicazione implementa diverse misure di sicurezza:

1. **Autenticazione**: Password hashate con salt
2. **Autorizzazione**: Controllo accessi basato su ruoli
3. **Validazione Input**: Controlli lato client e server
4. **Protezione API**: Verifica token JWT per tutte le richieste
5. **HTTPS**: Comunicazioni crittografate

## Deployment

### Requisiti di Sistema
- Node.js 18+ e npm/pnpm
- Database PostgreSQL
- Dominio personalizzato (opzionale)
- HTTPS configurato

### Procedura di Deployment
1. Clonare il repository
2. Installare le dipendenze: `npm install`
3. Configurare le variabili d'ambiente
4. Eseguire le migrazioni database
5. Buildare l'applicazione: `npm run build`
6. Avviare il server: `npm start`

## Manutenzione

### Backup
Si consiglia di configurare backup automatici giornalieri del database.

### Aggiornamenti
L'applicazione è progettata con un'architettura modulare che facilita gli aggiornamenti futuri.

### Monitoraggio
Implementare un sistema di logging e monitoraggio per tracciare errori e performance.

## Estensioni Future

L'applicazione è stata progettata per supportare future estensioni:

1. **App Mobile Nativa**: Conversione a React Native
2. **Integrazione GPS**: Tracciamento automatico percorsi
3. **Fatturazione Elettronica**: Integrazione con SDI
4. **Business Intelligence**: Dashboard avanzate
5. **Integrazione Contabilità**: Export dati per commercialista

## Supporto

Per assistenza tecnica contattare:
- Email: [supporto@antonioscandale.it]
- Telefono: [Numero supporto]
