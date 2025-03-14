'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, Truck } from 'lucide-react';

export default function ChilometriPage() {
  const [formData, setFormData] = useState({
    veicolo: '',
    data: new Date().toISOString().split('T')[0],
    kmIniziali: '',
    kmFinali: '',
    descrizionePercorso: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrebbe la logica per salvare i dati
    console.log('Form submitted:', formData);
    alert('Chilometri registrati con successo!');
    // Reset form o redirect
  };

  // Dati di esempio
  const veicoli = [
    { id: 1, targa: 'AB123CD', marca: 'Iveco', modello: 'Stralis' },
    { id: 2, targa: 'EF456GH', marca: 'Mercedes', modello: 'Actros' },
    { id: 3, targa: 'IL789JK', marca: 'Scania', modello: 'R450' }
  ];

  const registrazioniRecenti = [
    { id: 1, data: '2025-03-13', veicolo: 'AB123CD', kmPercorsi: 320 },
    { id: 2, data: '2025-03-12', veicolo: 'AB123CD', kmPercorsi: 280 },
    { id: 3, data: '2025-03-11', veicolo: 'EF456GH', kmPercorsi: 420 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Registrazione Chilometri</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form di registrazione */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-medium mb-4">Inserisci nuova registrazione</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="veicolo" className="block text-sm font-medium text-gray-700 mb-1">
                  Veicolo
                </label>
                <select
                  id="veicolo"
                  name="veicolo"
                  value={formData.veicolo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleziona veicolo</option>
                  {veicoli.map(v => (
                    <option key={v.id} value={v.targa}>
                      {v.targa} - {v.marca} {v.modello}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="kmIniziali" className="block text-sm font-medium text-gray-700 mb-1">
                  Km Iniziali
                </label>
                <input
                  type="number"
                  id="kmIniziali"
                  name="kmIniziali"
                  value={formData.kmIniziali}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="kmFinali" className="block text-sm font-medium text-gray-700 mb-1">
                  Km Finali
                </label>
                <input
                  type="number"
                  id="kmFinali"
                  name="kmFinali"
                  value={formData.kmFinali}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="descrizionePercorso" className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione Percorso
              </label>
              <textarea
                id="descrizionePercorso"
                name="descrizionePercorso"
                value={formData.descrizionePercorso}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registra Chilometri
              </button>
            </div>
          </form>
        </Card>

        {/* Riepilogo e statistiche */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Riepilogo</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Truck className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Totale Km Questo Mese</h3>
                <span className="text-xl font-semibold">1.250 km</span>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <Clock className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Media Giornaliera</h3>
                <span className="text-xl font-semibold">312 km</span>
              </div>
            </div>
            
            <h3 className="text-md font-medium mt-6 mb-2">Registrazioni Recenti</h3>
            <ul className="divide-y divide-gray-200">
              {registrazioniRecenti.map(reg => (
                <li key={reg.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{reg.data}</p>
                      <p className="text-xs text-gray-500">Veicolo: {reg.veicolo}</p>
                    </div>
                    <p className="text-sm font-semibold">{reg.kmPercorsi} km</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="pt-2">
              <a href="/chilometri/storico" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Visualizza storico completo →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
