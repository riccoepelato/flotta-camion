import { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
}

export async function executeQuery(db: D1Database, query: string, params?: any[]) {
  try {
    const result = await db.prepare(query).bind(...(params || [])).all();
    return result;
  } catch (error) {
    console.error('Errore nell\'esecuzione della query:', error);
    throw error;
  }
}

export async function executeRun(db: D1Database, query: string, params?: any[]) {
  try {
    const result = await db.prepare(query).bind(...(params || [])).run();
    return result;
  } catch (error) {
    console.error('Errore nell\'esecuzione della query:', error);
    throw error;
  }
}

export async function getById(db: D1Database, table: string, id: number) {
  try {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const result = await db.prepare(query).bind(id).first();
    return result;
  } catch (error) {
    console.error(`Errore nel recupero da ${table} con id ${id}:`, error);
    throw error;
  }
}

export async function getAll(db: D1Database, table: string, options?: { 
  limit?: number, 
  offset?: number, 
  orderBy?: string, 
  orderDir?: 'ASC' | 'DESC',
  where?: string,
  params?: any[]
}) {
  try {
    let query = `SELECT * FROM ${table}`;
    const params: any[] = [];
    
    if (options?.where) {
      query += ` WHERE ${options.where}`;
      if (options.params) {
        params.push(...options.params);
      }
    }
    
    if (options?.orderBy) {
      query += ` ORDER BY ${options.orderBy} ${options.orderDir || 'ASC'}`;
    }
    
    if (options?.limit) {
      query += ` LIMIT ?`;
      params.push(options.limit);
      
      if (options?.offset) {
        query += ` OFFSET ?`;
        params.push(options.offset);
      }
    }
    
    const result = await db.prepare(query).bind(...params).all();
    return result;
  } catch (error) {
    console.error(`Errore nel recupero da ${table}:`, error);
    throw error;
  }
}

export async function insert(db: D1Database, table: string, data: Record<string, any>) {
  try {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    
    const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    const result = await db.prepare(query).bind(...values).run();
    
    return result;
  } catch (error) {
    console.error(`Errore nell'inserimento in ${table}:`, error);
    throw error;
  }
}

export async function update(db: D1Database, table: string, id: number, data: Record<string, any>) {
  try {
    const keys = Object.keys(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    
    const query = `UPDATE ${table} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    values.push(id);
    
    const result = await db.prepare(query).bind(...values).run();
    return result;
  } catch (error) {
    console.error(`Errore nell'aggiornamento di ${table} con id ${id}:`, error);
    throw error;
  }
}

export async function remove(db: D1Database, table: string, id: number) {
  try {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    const result = await db.prepare(query).bind(id).run();
    return result;
  } catch (error) {
    console.error(`Errore nella cancellazione da ${table} con id ${id}:`, error);
    throw error;
  }
}
