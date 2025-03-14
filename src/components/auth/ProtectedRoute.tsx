'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Image from 'next/image';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // Se l'utente non è autenticato e non è nella pagina di login
      if (!user && pathname !== '/login') {
        router.push('/login');
      } 
      // Se l'utente è autenticato ma non ha i permessi necessari
      else if (user && requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/accesso-negato');
      }
    }
  }, [user, isLoading, router, pathname, requiredPermission, hasPermission]);

  // Mostra un loader mentre verifica l'autenticazione
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image 
          src="/logo.png" 
          alt="Antonio Scandale Autotrasporti" 
          width={300} 
          height={150} 
          className="mb-8"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Caricamento...</p>
      </div>
    );
  }

  // Se l'utente non è autenticato e siamo nella pagina di login, mostra il contenuto
  if (!user && pathname === '/login') {
    return <>{children}</>;
  }

  // Se l'utente è autenticato e ha i permessi necessari (o non sono richiesti permessi), mostra il contenuto
  if (user && (!requiredPermission || hasPermission(requiredPermission))) {
    return <>{children}</>;
  }

  // Altrimenti non mostrare nulla (sarà reindirizzato dal useEffect)
  return null;
}
