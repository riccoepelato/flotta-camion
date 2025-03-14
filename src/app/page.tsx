'use client';

import { Card } from '@/components/ui/Card';
import { BarChart, Calendar, FileText, Truck, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Oggi:</span>
          <span className="text-sm font-medium">{new Date().toLocaleDateString('it-IT')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-white shadow rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Truck className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Chilometri Totali</h3>
              <span className="text-2xl font-semibold">12.450 km</span>
              <p className="text-sm text-green-600">+2% rispetto al mese scorso</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-white shadow rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Fatture Carburante</h3>
              <span className="text-2xl font-semibold">€1.250,00</span>
              <p className="text-sm text-red-600">+5% rispetto al mese scorso</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-white shadow rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Accise Recuperabili</h3>
              <span className="text-2xl font-semibold">€350,00</span>
              <p className="text-sm text-gray-500">Ultimo trimestre</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <h2 className="text-lg font-medium mt-8 mb-4">Accesso Rapido</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Link href="/chilometri/registra" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
            <Truck className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Registra Km</span>
        </Link>
        
        <Link href="/fatture/nuova" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mb-3">
            <FileText className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Nuova Fattura</span>
        </Link>
        
        <Link href="/accise" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-3">
            <TrendingUp className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Calcola Accise</span>
        </Link>
        
        <Link href="/finanze" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-3">
            <BarChart className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Finanze</span>
        </Link>
        
        <Link href="/dipendenti" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mb-3">
            <Users className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Dipendenti</span>
        </Link>
        
        <Link href="/calendario" className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="text-sm text-center font-medium">Calendario</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <h2 className="text-lg font-medium mt-8 mb-4">Attività Recenti</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item} className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {item % 2 === 0 ? 'A' : 'D'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item % 2 === 0 ? 'Registrazione chilometri' : 'Nuova fattura carburante'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item % 2 === 0 ? 'Totale: 120 km' : 'Importo: €85,50'}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {`${item}h fa`}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 bg-gray-50 text-right">
          <Link href="/attivita" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Visualizza tutte le attività
          </Link>
        </div>
      </div>
    </div>
  );
}
