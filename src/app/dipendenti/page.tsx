'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { User, UserPlus, Edit, Trash, Key, Mail, Check, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface Dipendente {
  id: number;
  username: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  ruolo: 'admin' | 'dipendente';
  data_assunzione: string;
  codice_fiscale: string;
  stato: 'attivo' | 'inattivo';
}

export default function GestioneDipendentiPage() {
  const { hasPermission } = useAuth();
  
  // Verifica se l'utente ha i permessi necessari
  if (!hasPermission('manage_employees')) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Accesso Negato</h2>
        <p className="mt-2 text-gray-600">Non hai i permessi necessari per accedere a questa pagina.</p>
      </div>
    );
  }

  // Dati di esempio
  const [dipendenti, setDipendenti] = useState<Dipendente[]>([
    {
      id: 1,
      username: 'admin',
      nome: 'Amministratore',
      cognome: 'Sistema',
      email: 'admin@antonioscandale.it',
      telefono: '3331234567',
      ruolo: 'admin',
      data_assunzione: '2020-01-01',
      codice_fiscale: 'MMNSTR80A01H501A',
      stato: 'attivo'
    },
    {
      id: 2,
      username: 'mrossi',
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.rossi@antonioscandale.it',
      telefono: '3339876543',
      ruolo: 'dipendente',
      data_assunzione: '2021-03-15',
      codice_fiscale: 'RSSMRA85B10F205X',
      stato: 'attivo'
    },
    {
      id: 3,
      username: 'lbianchi',
      nome: 'Luigi',
      cognome: 'Bianchi',
      email: 'luigi.bianchi@antonioscandale.it',
      telefono: '3351234567',
      ruolo: 'dipendente',
      data_assunzione: '2022-05-10',
      codice_fiscale: 'BNCLGU90C15H501Y',
      stato: 'attivo'
    }
  ]);

  const [formData, setFormData] = useState<Omit<Dipendente, 'id'>>({
    username: '',
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    ruolo: 'dipendente',
    data_assunzione: new Date().toISOString().split('T')[0],
    codice_fiscale: '',
    stato: 'attivo'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingId) {
      // Aggiorna dipendente esistente
      setDipendenti(prev => prev.map(d => 
        d.id === editingId ? { ...d, ...formData } : d
      ));
    } else {
      // Crea nuovo dipendente
      const newId = Math.max(0, ...dipendenti.map(d => d.id)) + 1;
      setDipendenti(prev => [...prev, { id: newId, ...formData }]);
    }
    
    resetForm();
  };

  const handleEdit = (dipendente: Dipendente) => {
    setFormData({
      username: dipendente.username,
      nome: dipendente.nome,
      cognome: dipendente.cognome,
      email: dipendente.email,
      telefono: dipendente.telefono,
      ruolo: dipendente.ruolo,
      data_assunzione: dipendente.data_assunzione,
      codice_fiscale: dipendente.codice_fiscale,
      stato: dipendente.stato
    });
    setIsEditing(true);
    setEditingId(dipendente.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Sei sicuro di voler eliminare questo dipendente?')) {
      setDipendenti(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setDipendenti(prev => prev.map(d => 
      d.id === id ? { ...d, stato: d.stato === 'attivo' ? 'inattivo' : 'attivo' } : d
    ));
  };

  const handleResetPassword = (id: number) => {
    setEditingId(id);
    setShowResetPassword(true);
    // Genera una password casuale
    const randomPassword = Math.random().toString(36).slice(-8);
    setNewPassword(randomPassword);
  };

  const confirmResetPassword = () => {
    // In un'implementazione reale, qui si invierebbe la nuova password al server
    alert(`Password reimpostata con successo per l'utente ID: ${editingId}`);
    setShowResetPassword(false);
    setEditingId(null);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      nome: '',
      cognome: '',
      email: '',
      telefono: '',
      ruolo: 'dipendente',
      data_assunzione: new Date().toISOString().split('T')[0],
      codice_fiscale: '',
      stato: 'attivo'
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Gestione Dipendenti</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
        >
          {showForm ? (
            <>Annulla</>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Nuovo Dipendente
            </>
          )}
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">
            {isEditing ? 'Modifica Dipendente' : 'Nuovo Dipendente'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
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
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                  Cognome
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isEditing}
                />
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-1">L'username non può essere modificato</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="codice_fiscale" className="block text-sm font-medium text-gray-700 mb-1">
                  Codice Fiscale
                </label>
                <input
                  type="text"
                  id="codice_fiscale"
                  name="codice_fiscale"
                  value={formData.codice_fiscale}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="data_assunzione" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Assunzione
                </label>
                <input
                  type="date"
                  id="data_assunzione"
                  name="data_assunzione"
                  value={formData.data_assunzione}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="ruolo" className="block text-sm font-medium text-gray-700 mb-1">
                  Ruolo
                </label>
                <select
                  id="ruolo"
                  name="ruolo"
                  value={formData.ruolo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="admin">Amministratore</option>
                  <option value="dipendente">Dipendente</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="stato" className="block text-sm font-medium text-gray-700 mb-1">
                Stato
              </label>
              <select
                id="stato"
                name="stato"
                value={formData.stato}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="attivo">Attivo</option>
                <option value="inattivo">Inattivo</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
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

      {/* Modal per reset password */}
      {showResetPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Reset Password</h3>
            <p className="mb-4">Stai per reimpostare la password per l'utente ID: {editingId}</p>
            
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Nuova Password
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    const randomPassword = Math.random().toString(36).slice(-8);
                    setNewPassword(randomPassword);
                  }}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300"
                >
                  Genera
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowResetPassword(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={confirmResetPassword}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Conferma Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dipendente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contatti
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ruolo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stato
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dipendenti.map((dipendente) => (
              <tr key={dipendente.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {dipendente.nome} {dipendente.cognome}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{dipendente.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{dipendente.email}</div>
                  <div className="text-sm text-gray-500">{dipendente.telefono}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    dipendente.ruolo === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {dipendente.ruolo === 'admin' ? 'Amministratore' : 'Dipendente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    dipendente.stato === 'attivo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dipendente.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleToggleStatus(dipendente.id)}
                      className={`p-1 rounded-full ${
                        dipendente.stato === 'attivo' 
                          ? 'text-red-600 hover:text-red-900' 
                          : 'text-green-600 hover:text-green-900'
                      }`}
                      title={dipendente.stato === 'attivo' ? 'Disattiva' : 'Attiva'}
                    >
                      {dipendente.stato === 'attivo' ? <X size={18} /> : <Check size={18} />}
                    </button>
                    <button
                      onClick={() => handleResetPassword(dipendente.id)}
                      className="p-1 text-yellow-600 hover:text-yellow-900"
                      title="Reset Password"
                    >
                      <Key size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(dipendente)}
                      className="p-1 text-blue-600 hover:text-blue-900"
                      title="Modifica"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(dipendente.id)}
                      className="p-1 text-red-600 hover:text-red-900"
                      title="Elimina"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
