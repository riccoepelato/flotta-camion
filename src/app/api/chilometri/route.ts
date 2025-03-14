import { NextRequest, NextResponse } from 'next/server';
import { Env, getAll, getById, insert, update, remove } from '@/lib/db';

export async function GET(request: NextRequest, { env }: { env: Env }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Recupera un singolo record
      const result = await getById(env.DB, 'mileage_records', parseInt(id));
      
      if (!result) {
        return NextResponse.json({ error: 'Record non trovato' }, { status: 404 });
      }
      
      return NextResponse.json(result);
    } else {
      // Recupera tutti i record con paginazione e filtri
      const limit = parseInt(searchParams.get('limit') || '10');
      const page = parseInt(searchParams.get('page') || '1');
      const offset = (page - 1) * limit;
      const vehicle_id = searchParams.get('vehicle_id');
      const user_id = searchParams.get('user_id');
      const data_inizio = searchParams.get('data_inizio');
      const data_fine = searchParams.get('data_fine');
      
      let whereClause = '';
      const params: any[] = [];
      
      if (vehicle_id) {
        whereClause += 'vehicle_id = ?';
        params.push(vehicle_id);
      }
      
      if (user_id) {
        if (whereClause) whereClause += ' AND ';
        whereClause += 'user_id = ?';
        params.push(user_id);
      }
      
      if (data_inizio) {
        if (whereClause) whereClause += ' AND ';
        whereClause += 'data >= ?';
        params.push(data_inizio);
      }
      
      if (data_fine) {
        if (whereClause) whereClause += ' AND ';
        whereClause += 'data <= ?';
        params.push(data_fine);
      }
      
      const result = await getAll(env.DB, 'mileage_records', {
        limit,
        offset,
        orderBy: 'data',
        orderDir: 'DESC',
        where: whereClause || undefined,
        params: params.length > 0 ? params : undefined
      });
      
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Errore nella gestione della richiesta GET:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { env }: { env: Env }) {
  try {
    const data = await request.json();
    
    // Validazione dei dati
    if (!data.user_id || !data.vehicle_id || !data.data || !data.km_iniziali || !data.km_finali) {
      return NextResponse.json({ error: 'Dati mancanti o non validi' }, { status: 400 });
    }
    
    // Calcolo automatico dei km percorsi
    if (!data.km_percorsi) {
      data.km_percorsi = data.km_finali - data.km_iniziali;
    }
    
    // Verifica che i km finali siano maggiori dei km iniziali
    if (data.km_finali <= data.km_iniziali) {
      return NextResponse.json({ error: 'I km finali devono essere maggiori dei km iniziali' }, { status: 400 });
    }
    
    const result = await insert(env.DB, 'mileage_records', data);
    
    return NextResponse.json({ 
      success: true, 
      id: result.meta?.last_row_id,
      message: 'Registrazione chilometri completata con successo' 
    }, { status: 201 });
  } catch (error) {
    console.error('Errore nella gestione della richiesta POST:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { env }: { env: Env }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID non specificato' }, { status: 400 });
    }
    
    const data = await request.json();
    
    // Validazione dei dati
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'Nessun dato da aggiornare' }, { status: 400 });
    }
    
    // Se vengono aggiornati i km, ricalcola i km percorsi
    if ((data.km_iniziali !== undefined || data.km_finali !== undefined) && !data.km_percorsi) {
      // Recupera il record corrente per ottenere i valori mancanti
      const currentRecord = await getById(env.DB, 'mileage_records', parseInt(id));
      
      if (!currentRecord) {
        return NextResponse.json({ error: 'Record non trovato' }, { status: 404 });
      }
      
      const kmIniziali = data.km_iniziali !== undefined ? data.km_iniziali : currentRecord.km_iniziali;
      const kmFinali = data.km_finali !== undefined ? data.km_finali : currentRecord.km_finali;
      
      data.km_percorsi = kmFinali - kmIniziali;
      
      // Verifica che i km finali siano maggiori dei km iniziali
      if (kmFinali <= kmIniziali) {
        return NextResponse.json({ error: 'I km finali devono essere maggiori dei km iniziali' }, { status: 400 });
      }
    }
    
    const result = await update(env.DB, 'mileage_records', parseInt(id), data);
    
    if (result.meta?.changes === 0) {
      return NextResponse.json({ error: 'Record non trovato o nessuna modifica effettuata' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Registrazione chilometri aggiornata con successo' 
    });
  } catch (error) {
    console.error('Errore nella gestione della richiesta PUT:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { env }: { env: Env }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID non specificato' }, { status: 400 });
    }
    
    const result = await remove(env.DB, 'mileage_records', parseInt(id));
    
    if (result.meta?.changes === 0) {
      return NextResponse.json({ error: 'Record non trovato' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Registrazione chilometri eliminata con successo' 
    });
  } catch (error) {
    console.error('Errore nella gestione della richiesta DELETE:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
