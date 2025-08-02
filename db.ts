// db.ts à la racine
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

export let dbInstance: SQLiteDatabase;

export const setupDb = async () => {
  const db = await openDatabaseAsync('fitness.db');
  dbInstance = db;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Exercice (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      description TEXT,
      muscles TEXT,
      materiel TEXT,
      niveau TEXT,
      imageUrl TEXT,
      type TEXT
    );
  `);

  const existing = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM Exercice');
  if (existing?.count === 0) {
    await db.runAsync(
      'INSERT INTO Exercice (nom, description, muscles, materiel, niveau, imageUrl, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      'Pompes',
      'Exercice de base au poids du corps',
      'pectoraux,triceps',
      'aucun',
      'débutant',
      '',
      'street workout'
    );
  }
};