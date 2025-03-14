'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart2, Download, Calendar, Filter, FileText, PieChart } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function ReportFinanziarioPage() {
  const { hasPermission } = useAuth();
  
  // Verifica se l'utente ha i permessi necessari
  if (!hasPermission('view_finances')) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Accesso Negato</h2>
        <p className="mt-2 text-gray-600">Non hai i permessi necessari per accedere a questa pagina.</p>
      </div>
    );
  }

  const [periodoSelezionato, setPeriodoSelezionato] = useState({
    tipo: 'mese',
    mese: new Date().getMonth() + 1,
    anno: new Date().getFullYear(),
    trimestre: Math.floor(new Date().getMonth() / 3) + 1
  });
  
  const [formatoEsportazione, setFormatoEsportazione] = useState('excel');
  const [statoGenerazione, setStatoGenerazione] = useState('idle'); // idle, loading, success, error

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPeriodoSelezionato(prev => ({ ...prev, [name]: name === 'tipo' ? value : parseInt(value) }));
  };

  const handleGeneraReport = () => {
    setStatoGenerazione('loading');
    
    // Simulazione di generazione report
    setTimeout(() => {
      setStatoGenerazione('success');
    }, 2000);
  };

  // Dati di esempio per il report finanziario
  const datiFinanziari = {
    entrate: 15800.50,
    uscite: 9450.75,
    profitto: 6349.75,
    margine: 40.2, // percentuale
    
    dettaglioEntrate: [
      { categoria: 'Trasporti nazionali', importo: 9500.00 },
      { categoria: 'Trasporti internazionali', importo: 5200.50 },
      { categoria: 'Servizi aggiuntivi', importo: 1100.00 }
    ],
    
    dettaglioUscite: [
      { categoria: 'Carburante', importo: 4200.50 },
      { categoria: 'Stipendi', importo: 3500.00 },
      { categoria: 'Manutenzione', importo: 850.25 },
      { categoria: 'Assicurazioni', importo: 600.00 },
      { categoria: 'Altro', importo: 300.00 }
    ],
    
    trendMensile: [
      { mese: 'Gen', entrate: 14500, uscite: 8900 },
      { mese: 'Feb', entrate: 13800, uscite: 9100 },
      { mese: 'Mar', entrate: 15800, uscite: 9450 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Report Finanziario</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Genera Report Finanziario</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo Periodo
              </label>
              <select
                id="tipo"
                name="tipo"
                value={periodoSelezionato.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="mese">Mensile</option>
                <option value="trimestre">Trimestrale</option>
                <option value="anno">Annuale</option>
              </select>
            </div>

            {periodoSelezionato.tipo === 'mese' && (
              <div>
                <label htmlFor="mese" className="block text-sm font-medium text-gray-700 mb-1">
                  Mese
                </label>
                <select
                  id="mese"
                  name="mese"
                  value={periodoSelezionato.mese}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>Gennaio</option>
                  <option value={2}>Febbraio</option>
                  <option value={3}>Marzo</option>
                  <option value={4}>Aprile</option>
                  <option value={5}>Maggio</option>
                  <option value={6}>Giugno</option>
                  <option value={7}>Luglio</option>
                  <option value={8}>Agosto</option>
                  <option value={9}>Settembre</option>
                  <option value={10}>Ottobre</option>
                  <option value={11}>Novembre</option>
                  <option value={12}>Dicembre</option>
                </select>
              </div>
            )}

            {periodoSelezionato.tipo === 'trimestre' && (
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
                  <option value={1}>1° Trimestre (Gen-Mar)</option>
                  <option value={2}>2° Trimestre (Apr-Giu)</option>
                  <option value={3}>3° Trimestre (Lug-Set)</option>
                  <option value={4}>4° Trimestre (Ott-Dic)</option>
                </select>
              </div>
            )}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-medium mb-4">Riepilogo Finanziario</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-700">Entrate</h3>
                    <span className="text-xl font-semibold">€ {datiFinanziari.entrate.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100 text-red-600">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-700">Uscite</h3>
                    <span className="text-xl font-semibold">€ {datiFinanziari.uscite.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-700">Profitto</h3>
                    <span className="text-xl font-semibold">€ {datiFinanziari.profitto.toFixed(2)}</span>
                    <p className="text-sm text-green-600">Margine: {datiFinanziari.margine}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Dettaglio Entrate</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Importo
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datiFinanziari.dettaglioEntrate.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.categoria}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          € {item.importo.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          {((item.importo / datiFinanziari.entrate) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        Totale
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        € {datiFinanziari.entrate.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        100%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Dettaglio Uscite</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Importo
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datiFinanziari.dettaglioUscite.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.categoria}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          € {item.importo.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          {((item.importo / datiFinanziari.uscite) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        Totale
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        € {datiFinanziari.uscite.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        100%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Analisi Finanziaria</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-3">Distribuzione Entrate</h3>
              <div className="h-48 flex items-center justify-center bg-white rounded-md border border-gray-200">
                <PieChart className="h-24 w-24 text-blue-300" />
                <p className="text-gray-500 text-sm">Grafico a torta</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-3">Distribuzione Uscite</h3>
              <div className="h-48 flex items-center justify-center bg-white rounded-md border border-gray-200">
                <PieChart className="h-24 w-24 text-red-300" />
                <p className="text-gray-500 text-sm">Grafico a torta</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-3">Trend Mensile</h3>
              <div className="h-48 flex items-center justify-center bg-white rounded-md border border-gray-200">
                <BarChart2 className="h-24 w-24 text-green-300" />
                <p className="text-gray-500 text-sm">Grafico a barre</p>
              </div>
            </div>
            
            <div className="pt-2">
              <a href="/report/dettaglio" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Visualizza analisi dettagliata →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
