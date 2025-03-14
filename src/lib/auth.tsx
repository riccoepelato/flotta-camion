'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Role = 'admin' | 'dipendente';

interface User {
  id: number;
  username: string;
  nome: string;
  cognome: string;
  ruolo: Role;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mappa delle autorizzazioni per ruolo
const rolePermissions: Record<Role, string[]> = {
  admin: [
    'view_dashboard',
    'manage_km',
    'manage_fuel',
    'view_finances',
    'manage_finances',
    'manage_employees',
    'manage_vehicles',
    'manage_company',
    'export_data',
    'manage_routes'
  ],
  dipendente: [
    'view_dashboard',
    'manage_km',
    'manage_fuel',
    'manage_routes'
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Controlla se l'utente è già autenticato (es. dal localStorage)
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Errore nel controllo dell\'autenticazione:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In un'implementazione reale, questa sarebbe una chiamata API
      // Per ora simuliamo l'autenticazione
      if (username === 'admin' && password === 'password') {
        const adminUser: User = {
          id: 1,
          username: 'admin',
          nome: 'Amministratore',
          cognome: 'Sistema',
          ruolo: 'admin'
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      } else if (username === 'dipendente' && password === 'password') {
        const employeeUser: User = {
          id: 2,
          username: 'dipendente',
          nome: 'Mario',
          cognome: 'Rossi',
          ruolo: 'dipendente'
        };
        
        setUser(employeeUser);
        localStorage.setItem('user', JSON.stringify(employeeUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Errore durante il login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.ruolo].includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
}
