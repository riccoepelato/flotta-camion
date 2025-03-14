'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, FileText, Upload, Calculator } from 'lucide-react';

export default function FatturePage() {
  const [formData, setFormData] = useState({
    numeroFattura: '',
    dataFattura: new Date().toISOString().split('T')[0],
    fornitore: '',
    veicolo: '',
    importoTotale: '',
    importoImponibile: '',
    importoIva: '',
    quantitaLitri: '',
    prezzoAlLitro: '',
    tipoCarburante: '',
    kmAlRifornimento: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrebbe la logica per salvare i dati
    console.log('Form submitted:', formData);
    alert('Fattura carburante registrata con successo!');
    // Reset form o redirect
  };

  // Dati di esempio
  const veicoli = [
    { id: 1, targa: 'AB123CD', marca: 'Iveco', modello: 'Stralis' },
    { id: 2, targa: 'EF456GH', marca: 'Mercedes', modello: 'Actros' },
    { id: 3, targa: 'IL789JK', marca: 'Scania', modello: 'R450' }
  ];

  const fattureRecenti = [
    { id: 1, data: '2025-03-10', fornitore: 'ENI', importo: 120.50 },
    { id: 2, data: '2025-03-05', fornitore: 'Q8', importo: 95.30 },
    { id: 3, data: '2025-03-01', fornitore: 'IP', importo: 150.80 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Fatture Carburante</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form di registrazione */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-medium mb-4">Inserisci nuova fattura</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numeroFattura" className="block text-sm font-medium text-gray-700 mb-1">
                  Numero Fattura
                </label>
                <input
                  type="text"
                  id="numeroFattura"
                  name="numeroFattura"
                  value={formData.numeroFattura}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="dataFattura" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Fattura
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dataFattura"
                    name="dataFattura"
                    value={formData.dataFattura}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fornitore" className="block text-sm font-medium text-gray-700 mb-1">
                  Fornitore
                </label>
                <input
                  type="text"
                  id="fornitore"
                  name="fornitore"
                  value={formData.fornitore}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="importoTotale" className="block text-sm font-medium text-gray-700 mb-1">
                  Importo Totale (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="importoTotale"
                  name="importoTotale"
                  value={formData.importoTotale}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="importoImponibile" className="block text-sm font-medium text-gray-700 mb-1">
                  Imponibile (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="importoImponibile"
                  name="importoImponibile"
                  value={formData.importoImponibile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="importoIva" className="block text-sm font-medium text-gray-700 mb-1">
                  IVA (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="importoIva"
                  name="importoIva"
                  value={formData.importoIva}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="quantitaLitri" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantità (litri)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="quantitaLitri"
                  name="quantitaLitri"
                  value={formData.quantitaLitri}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="prezzoAlLitro" className="block text-sm font-medium text-gray-700 mb-1">
                  Prezzo al litro (€)
                </label>
                <input
                  type="number"
                  step="0.001"
                  id="prezzoAlLitro"
                  name="prezzoAlLitro"
                  value={formData.prezzoAlLitro}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="tipoCarburante" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Carburante
                </label>
                <select
                  id="tipoCarburante"
                  name="tipoCarburante"
                  value={formData.tipoCarburante}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleziona tipo</option>
                  <option value="diesel">Diesel</option>
                  <option value="benzina">Benzina</option>
                  <option value="gpl">GPL</option>
                  <option value="metano">Metano</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="kmAlRifornimento" className="block text-sm font-medium text-gray-700 mb-1">
                  Km al rifornimento
                </label>
                <input
                  type="number"
                  id="kmAlRifornimento"
                  name="kmAlRifornimento"
                  value={formData.kmAlRifornimento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="fileFattura" className="block text-sm font-medium text-gray-700 mb-1">
                  Scansione Fattura
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="fileFattura"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Carica un file</span>
                        <input id="fileFattura" name="fileFattura" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o trascina qui</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF fino a 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registra Fattura
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
                <FileText className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Fatture Questo Mese</h3>
                <span className="text-xl font-semibold">€ 850,30</span>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <Calculator className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Accise Recuperabili</h3>
                <span className="text-xl font-semibold">€ 120,45</span>
              </div>
            </div>
            
            <h3 className="text-md font-medium mt-6 mb-2">Fatture Recenti</h3>
            <ul className="divide-y divide-gray-200">
              {fattureRecenti.map(fattura => (
                <li key={fattura.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{fattura.data}</p>
                      <p className="text-xs text-gray-500">Fornitore: {fattura.fornitore}</p>
                    </div>
                    <p className="text-sm font-semibold">€ {fattura.importo.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="pt-2">
              <a href="/fatture/storico" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Visualizza storico completo →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
