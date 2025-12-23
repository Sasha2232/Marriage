import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Настройка заголовков для работы с фронтендом
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Создание таблицы (обязательно в обратных кавычках ` `)
    await sql`
      CREATE TABLE IF NOT EXISTS anniversary_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Загрузка всех сообщений
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC;`;
      return res.status(200).json(rows);
    }

    // Добавление нового сообщения
    if (req.method === 'POST') {
      const { name, text } = req.body;
      if (!name || !text) {
        return res.status(400).json({ error: 'Заполните все поля' });
      }
      
      // Безопасная вставка данных
      await sql`INSERT INTO anniversary_messages (name, text) VALUES (${name}, ${text});`;
      
      // Сразу возвращаем обновленный список для всех
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC;`;
      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: error.message });
  }
}