-- Aggiunta tabella per i percorsi frequenti
CREATE TABLE IF NOT EXISTS frequent_routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  descrizione TEXT,
  km_totali INTEGER NOT NULL,
  origine TEXT,
  destinazione TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Aggiunta campo ruolo alla tabella utenti se non esiste già
-- (Questo è già presente nella migrazione iniziale, ma lo includiamo per completezza)
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS ruolo TEXT NOT NULL CHECK (ruolo IN ('admin', 'dipendente'));

-- Aggiunta tabella per le autorizzazioni
CREATE TABLE IF NOT EXISTS permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL UNIQUE,
  descrizione TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Aggiunta tabella per le autorizzazioni dei ruoli
CREATE TABLE IF NOT EXISTS role_permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ruolo TEXT NOT NULL,
  permission_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  UNIQUE(ruolo, permission_id)
);

-- Inserimento delle autorizzazioni di base
INSERT INTO permissions (nome, descrizione) VALUES
('view_dashboard', 'Visualizzare la dashboard'),
('manage_km', 'Gestire i chilometri percorsi'),
('manage_fuel', 'Gestire le fatture carburante'),
('view_finances', 'Visualizzare i dati finanziari'),
('manage_finances', 'Gestire i dati finanziari'),
('manage_employees', 'Gestire i dipendenti'),
('manage_vehicles', 'Gestire i veicoli'),
('manage_company', 'Gestire i dati aziendali'),
('export_data', 'Esportare i dati'),
('manage_routes', 'Gestire i percorsi frequenti');

-- Assegnazione delle autorizzazioni al ruolo admin
INSERT INTO role_permissions (ruolo, permission_id) 
SELECT 'admin', id FROM permissions;

-- Assegnazione delle autorizzazioni limitate al ruolo dipendente
INSERT INTO role_permissions (ruolo, permission_id)
SELECT 'dipendente', id FROM permissions 
WHERE nome IN ('view_dashboard', 'manage_km', 'manage_fuel', 'manage_routes');
