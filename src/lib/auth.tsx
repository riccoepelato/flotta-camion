'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Controlla se l'utente è già loggato
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // Autenticazione semplificata per demo
    if (username === 'admin' && password === 'password') {
      const adminUser = { id: 1, username: 'admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (username === 'dipendente' && password === 'password') {
      const employeeUser = { id: 2, username: 'dipendente', role: 'dipendente' };
      setUser(employeeUser);
      localStorage.setItem('user', JSON.stringify(employeeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    
    // Logica semplificata per i permessi
    if (user.role === 'admin') return true;
    
    // Permessi specifici per dipendenti
    if (user.role === 'dipendente') {
      const employeePermissions = ['view_dashboard', 'add_mileage', 'add_fuel_invoice'];
      return employeePermissions.includes(permission);
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}
