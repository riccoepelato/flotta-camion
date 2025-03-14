'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, FileText, BarChart2, Download } from 'lucide-react';

export default function AccisePage() {
  const [periodoSelezionato, setPeriodoSelezionato] = useState({
    trimestre: '1',
    anno: new Date().getFullYear().toString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPeriodoSelezionato(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneraReport = () => {
    // Qui andrebbe la logica per generare il report
    console.log('Genera report per:', periodoSelezionato);
    alert('Report generato con successo!');
  };

  // Dati di esempio
  const richiestePrecedenti = [
    { id: 1, trimestre: 4, anno: 2024, stato: 'rimborsato', importo: 280.50 },
    { id: 2, trimestre: 3, anno: 2024, stato: 'approvato', importo: 320.75 },
    { id: 3, trimestre: 2, anno: 2024, stato: 'richiesto', importo: 210.30 }
  ];

  const fattureTrimestreCorrente = [
    { id: 1, data: '2025-01-15', fornitore: 'ENI', litri: 120, importoAccise: 40.80 },
    { id: 2, data: '2025-02-03', fornitore: 'Q8', litri: 150, importoAccise: 51.00 },
    { id: 3, data: '2025-02-20', fornitore: 'IP', litri: 180, importoAccise: 61.20 },
    { id: 4, data: '2025-03-10', fornitore: 'ENI', litri: 200, importoAccise: 68.00 }
  ];

  // Calcoli di esempio
  const totaliTrimestreCorrente = {
    litri: fattureTrimestreCorrente.reduce((acc, curr) => acc + curr.litri, 0),
    importoAccise: fattureTrimestreCorrente.reduce((acc, curr) => acc + curr.importoAccise, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Recupero Accise Carburante</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selezione periodo e generazione report */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-medium mb-4">Genera Report Accise</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="trimestre" className="block text-sm font-medium text-gray-700 mb-1">
                  Trimestre
                </label>
                <select
                  id="trimestre"
                  name="trimestre"
                  value={periodoSelezionato.trimestre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">1° Trimestre (Gen-Mar)</option>
                  <option value="2">2° Trimestre (Apr-Giu)</option>
                  <option value="3">3° Trimestre (Lug-Set)</option>
                  <option value="4">4° Trimestre (Ott-Dic)</option>
                </select>
              </div>

              <div>
                <label htmlFor="anno" className="block text-sm font-medium text-gray-700 mb-1">
                  Anno
                </label>
                <select
                  id="anno"
                  name="anno"
                  value={periodoSelezionato.anno}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {[...Array(5)].map((_, i) => {
                    const year = new Date().getFullYear() - 2 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-blue-800 mb-3">Riepilogo Trimestre Corrente</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-500">Totale Litri</p>
                  <p className="text-xl font-semibold">{totaliTrimestreCorrente.litri} L</p>
                </div>
                
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-500">Importo Accise Recuperabili</p>
                  <p className="text-xl font-semibold">€ {totaliTrimestreCorrente.importoAccise.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Fatture Incluse nel Trimestre</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fornitore
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Litri
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accise
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fattureTrimestreCorrente.map((fattura) => (
                      <tr key={fattura.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {fattura.data}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {fattura.fornitore}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {fattura.litri} L
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          € {fattura.importoAccise.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleGeneraReport}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Genera Report
              </button>
              
              <button
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Esporta Excel
              </button>
              
              <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Esporta PDF
              </button>
            </div>
          </div>
        </Card>

        {/* Riepilogo e storico */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Storico Richieste</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Totale Recuperato Anno</h3>
                <span className="text-xl font-semibold">€ 811,55</span>
              </div>
            </div>
            
            <h3 className="text-md font-medium mt-6 mb-2">Richieste Precedenti</h3>
            <ul className="divide-y divide-gray-200">
              {richiestePrecedenti.map(richiesta => (
                <li key={richiesta.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {richiesta.trimestre}° Trimestre {richiesta.anno}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stato: 
                        <span className={`ml-1 font-medium ${
                          richiesta.stato === 'rimborsato' ? 'text-green-600' : 
                          richiesta.stato === 'approvato' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {richiesta.stato.charAt(0).toUpperCase() + richiesta.stato.slice(1)}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm font-semibold">€ {richiesta.importo.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="pt-2">
              <a href="/accise/storico" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Visualizza storico completo →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
