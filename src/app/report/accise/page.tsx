'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, FileText, Download, BarChart2, Filter } from 'lucide-react';

export default function ReportAccisePage() {
  const [periodoSelezionato, setPeriodoSelezionato] = useState({
    trimestre: '1',
    anno: new Date().getFullYear().toString()
  });
  
  const [formatoEsportazione, setFormatoEsportazione] = useState('excel');
  const [statoGenerazione, setStatoGenerazione] = useState('idle'); // idle, loading, success, error

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPeriodoSelezionato(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneraReport = () => {
    setStatoGenerazione('loading');
    
    // Simulazione di generazione report
    setTimeout(() => {
      setStatoGenerazione('success');
    }, 2000);
  };

  // Dati di esempio
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
        <h1 className="text-2xl font-bold tracking-tight">Report Accise Carburante</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Genera Report per Recupero Accise</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div>
              <label htmlFor="formato" className="block text-sm font-medium text-gray-700 mb-1">
                Formato Esportazione
              </label>
              <select
                id="formato"
                name="formato"
                value={formatoEsportazione}
                onChange={(e) => setFormatoEsportazione(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-md font-medium text-blue-800 mb-3">Riepilogo Trimestre Selezionato</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Totale Litri</p>
                <p className="text-xl font-semibold">{totaliTrimestreCorrente.litri} L</p>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Importo Accise Recuperabili</p>
                <p className="text-xl font-semibold">€ {totaliTrimestreCorrente.importoAccise.toFixed(2)}</p>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Numero Fatture</p>
                <p className="text-xl font-semibold">{fattureTrimestreCorrente.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium mb-3">Fatture Incluse nel Report</h3>
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
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={2} className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      Totale
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totaliTrimestreCorrente.litri} L
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      € {totaliTrimestreCorrente.importoAccise.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleGeneraReport}
              disabled={statoGenerazione === 'loading'}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
            >
              {statoGenerazione === 'loading' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generazione in corso...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Genera ed Esporta Report
                </>
              )}
            </button>
            
            {statoGenerazione === 'success' && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Report generato con successo!
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Istruzioni per il Recupero Accise</h2>
        
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Procedura per il recupero delle accise sul gasolio per autotrazione:</strong>
          </p>
          
          <ol className="list-decimal pl-5 space-y-2">
            <li>Genera il report trimestrale utilizzando questa pagina</li>
            <li>Verifica che tutte le fatture siano correttamente incluse nel report</li>
            <li>Esporta il report nel formato richiesto (solitamente Excel)</li>
            <li>Compila il modello telematico dell'Agenzia delle Dogane</li>
            <li>Allega il report generato e le copie delle fatture</li>
            <li>Invia la dichiarazione entro il mese successivo alla fine del trimestre</li>
          </ol>
          
          <p className="mt-4">
            <strong>Scadenze per la presentazione:</strong>
          </p>
          
          <ul className="list-disc pl-5 space-y-1">
            <li>1° trimestre (gennaio-marzo): entro il 30 aprile</li>
            <li>2° trimestre (aprile-giugno): entro il 31 luglio</li>
            <li>3° trimestre (luglio-settembre): entro il 31 ottobre</li>
            <li>4° trimestre (ottobre-dicembre): entro il 31 gennaio</li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-md mt-4">
            <p className="text-yellow-800">
              <strong>Nota:</strong> Conservare sempre le fatture originali per eventuali controlli da parte dell'Agenzia delle Dogane.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
