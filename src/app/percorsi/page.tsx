'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/lib/auth';
import { Truck, Save, Plus, Edit, Trash } from 'lucide-react';

interface PercorsoFrequente {
  id: number;
  nome: string;
  descrizione: string;
  km_totali: number;
  origine: string;
  destinazione: string;
}

export default function PercorsiFrequentiPage() {
  const { user } = useAuth();
  const [percorsi, setPercorsi] = useState<PercorsoFrequente[]>([
    { id: 1, nome: 'Milano-Roma', descrizione: 'Consegna settimanale', km_totali: 580, origine: 'Milano', destinazione: 'Roma' },
    { id: 2, nome: 'Milano-Torino', descrizione: 'Consegna giornaliera', km_totali: 140, origine: 'Milano', destinazione: 'Torino' },
    { id: 3, nome: 'Milano-Genova', descrizione: 'Consegna bisettimanale', km_totali: 150, origine: 'Milano', destinazione: 'Genova' },
  ]);
  
  const [formData, setFormData] = useState({
    id: 0,
    nome: '',
    descrizione: '',
    km_totali: '',
    origine: '',
    destinazione: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Aggiorna percorso esistente
      setPercorsi(prev => prev.map(p => 
        p.id === formData.id ? { 
          ...p, 
          nome: formData.nome, 
          descrizione: formData.descrizione, 
          km_totali: Number(formData.km_totali),
          origine: formData.origine,
          destinazione: formData.destinazione
        } : p
      ));
    } else {
      // Crea nuovo percorso
      const newId = Math.max(0, ...percorsi.map(p => p.id)) + 1;
      setPercorsi(prev => [...prev, { 
        id: newId, 
        nome: formData.nome, 
        descrizione: formData.descrizione, 
        km_totali: Number(formData.km_totali),
        origine: formData.origine,
        destinazione: formData.destinazione
      }]);
    }
    
    // Reset form
    resetForm();
  };

  const handleEdit = (percorso: PercorsoFrequente) => {
    setFormData({
      id: percorso.id,
      nome: percorso.nome,
      descrizione: percorso.descrizione,
      km_totali: percorso.km_totali.toString(),
      origine: percorso.origine,
      destinazione: percorso.destinazione
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Sei sicuro di voler eliminare questo percorso?')) {
      setPercorsi(prev => prev.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      nome: '',
      descrizione: '',
      km_totali: '',
      origine: '',
      destinazione: '',
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleUseRoute = (percorso: PercorsoFrequente) => {
    // In un'implementazione reale, qui si navigherebbe alla pagina di registrazione chilometri
    // con i dati del percorso precompilati
    alert(`Percorso "${percorso.nome}" selezionato per la registrazione chilometri`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Percorsi Frequenti</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
        >
          {showForm ? (
            <>Annulla</>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Percorso
            </>
          )}
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">
            {isEditing ? 'Modifica Percorso' : 'Nuovo Percorso Frequente'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Percorso
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="km_totali" className="block text-sm font-medium text-gray-700 mb-1">
                  Km Totali
                </label>
                <input
                  type="number"
                  id="km_totali"
                  name="km_totali"
                  value={formData.km_totali}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="origine" className="block text-sm font-medium text-gray-700 mb-1">
                  Origine
                </label>
                <input
                  type="text"
                  id="origine"
                  name="origine"
                  value={formData.origine}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="destinazione" className="block text-sm font-medium text-gray-700 mb-1">
                  Destinazione
                </label>
                <input
                  type="text"
                  id="destinazione"
                  name="destinazione"
                  value={formData.destinazione}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione
              </label>
              <textarea
                id="descrizione"
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Aggiorna' : 'Salva'}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Annulla
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {percorsi.map(percorso => (
          <Card key={percorso.id} className="p-4 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium">{percorso.nome}</h3>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(percorso)}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(percorso.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p><span className="font-medium">Origine:</span> {percorso.origine}</p>
              <p><span className="font-medium">Destinazione:</span> {percorso.destinazione}</p>
              <p><span className="font-medium">Km totali:</span> {percorso.km_totali}</p>
              {percorso.descrizione && (
                <p className="mt-1">{percorso.descrizione}</p>
              )}
            </div>
            
            <div className="mt-auto pt-4">
              <button
                onClick={() => handleUseRoute(percorso)}
                className="w-full px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Usa questo percorso
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
