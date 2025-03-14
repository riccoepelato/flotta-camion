-- Inizializzazione del database per l'applicazione di Gestione Trasporti

-- Tabella Utenti
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  ruolo TEXT NOT NULL CHECK (ruolo IN ('admin', 'dipendente')),
  data_assunzione DATE,
  codice_fiscale TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Veicoli
CREATE TABLE IF NOT EXISTS vehicles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  targa TEXT NOT NULL UNIQUE,
  marca TEXT NOT NULL,
  modello TEXT NOT NULL,
  anno_immatricolazione INTEGER,
  data_acquisto DATE,
  km_iniziali INTEGER DEFAULT 0,
  capacita_serbatoio FLOAT,
  tipo_carburante TEXT,
  note TEXT,
  stato TEXT CHECK (stato IN ('attivo', 'manutenzione', 'dismesso')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Assegnazioni Veicoli
CREATE TABLE IF NOT EXISTS vehicle_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vehicle_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  data_inizio DATE NOT NULL,
  data_fine DATE,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabella Registrazioni Chilometri
CREATE TABLE IF NOT EXISTS mileage_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  vehicle_id INTEGER NOT NULL,
  data DATE NOT NULL,
  km_iniziali INTEGER NOT NULL,
  km_finali INTEGER NOT NULL,
  km_percorsi INTEGER NOT NULL,
  descrizione_percorso TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Tabella Fatture Carburante
CREATE TABLE IF NOT EXISTS fuel_invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_fattura TEXT NOT NULL,
  data_fattura DATE NOT NULL,
  fornitore TEXT NOT NULL,
  importo_totale DECIMAL(10,2) NOT NULL,
  importo_imponibile DECIMAL(10,2) NOT NULL,
  importo_iva DECIMAL(10,2) NOT NULL,
  quantita_litri DECIMAL(10,2) NOT NULL,
  prezzo_al_litro DECIMAL(10,2) NOT NULL,
  vehicle_id INTEGER NOT NULL,
  user_id INTEGER,
  tipo_carburante TEXT NOT NULL,
  km_al_rifornimento INTEGER,
  file_fattura TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabella Accise Carburante
CREATE TABLE IF NOT EXISTS fuel_tax_refunds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trimestre INTEGER NOT NULL CHECK (trimestre BETWEEN 1 AND 4),
  anno INTEGER NOT NULL,
  data_inizio DATE NOT NULL,
  data_fine DATE NOT NULL,
  totale_litri DECIMAL(10,2) NOT NULL,
  importo_accise DECIMAL(10,2) NOT NULL,
  stato TEXT NOT NULL CHECK (stato IN ('richiesto', 'approvato', 'rimborsato')),
  data_richiesta DATE,
  data_rimborso DATE,
  riferimento_pratica TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella di collegamento Accise-Fatture
CREATE TABLE IF NOT EXISTS fuel_tax_refund_invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fuel_tax_refund_id INTEGER NOT NULL,
  fuel_invoice_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fuel_tax_refund_id) REFERENCES fuel_tax_refunds(id),
  FOREIGN KEY (fuel_invoice_id) REFERENCES fuel_invoices(id),
  UNIQUE(fuel_tax_refund_id, fuel_invoice_id)
);

-- Tabella Fatture Emesse
CREATE TABLE IF NOT EXISTS issued_invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_fattura TEXT NOT NULL,
  data_fattura DATE NOT NULL,
  cliente TEXT NOT NULL,
  partita_iva_cliente TEXT,
  descrizione TEXT NOT NULL,
  importo_totale DECIMAL(10,2) NOT NULL,
  importo_imponibile DECIMAL(10,2) NOT NULL,
  importo_iva DECIMAL(10,2) NOT NULL,
  aliquota_iva DECIMAL(5,2) NOT NULL,
  stato_pagamento TEXT NOT NULL CHECK (stato_pagamento IN ('pagato', 'in attesa', 'scaduto')),
  data_pagamento DATE,
  metodo_pagamento TEXT,
  file_fattura TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Spese
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoria TEXT NOT NULL,
  descrizione TEXT NOT NULL,
  importo DECIMAL(10,2) NOT NULL,
  data DATE NOT NULL,
  fornitore TEXT,
  numero_documento TEXT,
  vehicle_id INTEGER,
  deducibile BOOLEAN DEFAULT 1,
  percentuale_deducibilita DECIMAL(5,2) DEFAULT 100.00,
  file_documento TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Tabella Stipendi
CREATE TABLE IF NOT EXISTS salaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  mese INTEGER NOT NULL CHECK (mese BETWEEN 1 AND 12),
  anno INTEGER NOT NULL,
  importo_lordo DECIMAL(10,2) NOT NULL,
  importo_netto DECIMAL(10,2) NOT NULL,
  ritenute_fiscali DECIMAL(10,2) NOT NULL,
  contributi_inps DECIMAL(10,2) NOT NULL,
  altri_contributi DECIMAL(10,2) DEFAULT 0,
  data_pagamento DATE,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabella Manutenzioni
CREATE TABLE IF NOT EXISTS maintenance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vehicle_id INTEGER NOT NULL,
  data DATE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('ordinaria', 'straordinaria')),
  descrizione TEXT NOT NULL,
  km_al_momento INTEGER NOT NULL,
  costo DECIMAL(10,2) NOT NULL,
  officina TEXT,
  documento TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Tabella Dati Aziendali
CREATE TABLE IF NOT EXISTS company_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_azienda TEXT NOT NULL,
  indirizzo TEXT NOT NULL,
  citta TEXT NOT NULL,
  cap TEXT NOT NULL,
  provincia TEXT NOT NULL,
  partita_iva TEXT NOT NULL,
  codice_fiscale TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  pec TEXT,
  sito_web TEXT,
  iban TEXT,
  banca TEXT,
  rappresentante_legale TEXT,
  logo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Contatti
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cognome TEXT,
  azienda TEXT,
  ruolo TEXT,
  email TEXT,
  telefono TEXT,
  indirizzo TEXT,
  note TEXT,
  categoria TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Documenti
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descrizione TEXT,
  categoria TEXT NOT NULL,
  file_path TEXT NOT NULL,
  data_scadenza DATE,
  promemoria_scadenza BOOLEAN DEFAULT 0,
  giorni_promemoria INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione degli indici
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_vehicles_targa ON vehicles(targa);
CREATE INDEX idx_mileage_records_data_vehicle ON mileage_records(data, vehicle_id);
CREATE INDEX idx_fuel_invoices_data_vehicle ON fuel_invoices(data_fattura, vehicle_id);
CREATE INDEX idx_fuel_tax_refunds_trimestre_anno ON fuel_tax_refunds(trimestre, anno);
CREATE INDEX idx_issued_invoices_data_stato ON issued_invoices(data_fattura, stato_pagamento);
CREATE INDEX idx_expenses_data_categoria ON expenses(data, categoria);
CREATE INDEX idx_salaries_user_mese_anno ON salaries(user_id, mese, anno);
CREATE INDEX idx_maintenance_vehicle_data ON maintenance(vehicle_id, data);
CREATE INDEX idx_documents_categoria_scadenza ON documents(categoria, data_scadenza);

-- Inserimento di dati di esempio per l'admin
INSERT INTO users (username, password_hash, nome, cognome, email, telefono, ruolo, data_assunzione, codice_fiscale)
VALUES ('admin', '$2a$12$1234567890123456789012uGZACxF5WBI9g9p3MFsKcciKQ5i1vkS', 'Amministratore', 'Sistema', 'admin@gestionetrasporti.it', '3331234567', 'admin', '2023-01-01', 'MMNSTR80A01H501A');

-- Inserimento di dati aziendali di esempio
INSERT INTO company_info (nome_azienda, indirizzo, citta, cap, provincia, partita_iva, codice_fiscale, email, telefono, pec)
VALUES ('Trasporti S.r.l.', 'Via Roma 123', 'Milano', '20100', 'MI', '12345678901', 'TRSPRT12345678901', 'info@trasporti.it', '0212345678', 'trasporti@pec.it');
