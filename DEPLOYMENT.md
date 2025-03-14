# Guida per il Deployment su GitHub e Vercel

Questa guida ti mostrerà come creare un repository GitHub per l'applicazione Gestione Trasporti Antonio Scandale e come deployarla su Vercel.

## 1. Creazione Repository GitHub

1. Vai su [GitHub](https://github.com) e accedi al tuo account (o creane uno se non ne hai)
2. Clicca sul pulsante "+" in alto a destra e seleziona "New repository"
3. Inserisci un nome per il repository (es. "gestione-trasporti-antonio-scandale")
4. Aggiungi una descrizione (opzionale)
5. Scegli "Public" come visibilità
6. Clicca su "Create repository"

## 2. Caricamento dei File sul Repository

### Opzione 1: Tramite interfaccia web
1. Nel tuo nuovo repository, clicca su "uploading an existing file"
2. Trascina tutti i file dalla cartella del progetto o selezionali dal tuo computer
3. Aggiungi un messaggio di commit (es. "Initial commit")
4. Clicca su "Commit changes"

### Opzione 2: Tramite Git (per utenti avanzati)
```bash
# Nella directory del progetto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tuousername/gestione-trasporti-antonio-scandale.git
git push -u origin main
```

## 3. Deployment su Vercel

1. Vai su [Vercel](https://vercel.com) e registrati (puoi usare il tuo account GitHub)
2. Dopo il login, clicca su "Add New..." e seleziona "Project"
3. Vercel mostrerà i tuoi repository GitHub - seleziona "gestione-trasporti-antonio-scandale"
4. Nella pagina di configurazione:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: lascia il valore predefinito
   - Output Directory: lascia il valore predefinito
5. Clicca su "Deploy"
6. Attendi il completamento del deployment (1-2 minuti)
7. Vercel ti fornirà un URL (es. gestione-trasporti-antonio-scandale.vercel.app)

## 4. Installazione dell'App su Dispositivi Android

1. Visita l'URL Vercel dal browser Chrome su Android
2. Accedi all'applicazione con le credenziali fornite
3. Chrome mostrerà un banner "Aggiungi alla schermata Home"
4. Tocca il banner e segui le istruzioni
5. L'app sarà installata sul dispositivo e accessibile dalla schermata Home

## 5. Credenziali Demo

Per testare l'applicazione, puoi usare queste credenziali:

- **Amministratore**:
  - Username: admin
  - Password: password

- **Dipendente**:
  - Username: dipendente
  - Password: password

## 6. Risoluzione Problemi

Se incontri problemi durante il deployment:

1. **Errori di build**: Verifica che tutti i file siano stati caricati correttamente
2. **Problemi di dipendenze**: Assicurati che il file package.json sia presente e corretto
3. **Errori di configurazione**: Controlla che il file next.config.js sia configurato correttamente

Per assistenza, consulta la [documentazione di Vercel](https://vercel.com/docs) o contatta il supporto tecnico.
