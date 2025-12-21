import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // 1. Разрешаем запросы (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка предварительного запроса (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 2. Создаем таблицу (на всякий случай)
    await sql`
      CREATE TABLE IF NOT EXISTS anniversary_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Обработка GET (Загрузка)
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // 4. Обработка POST (Отправка)
    if (req.method === 'POST') {
      const { name, text } = req.body;
      if (!name || !text) {
        return res.status(400).json({ error: 'Заполните все поля' });
      }
      
      await sql`INSERT INTO anniversary_messages (name, text) VALUES (${name}, ${text});`;
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // Если метод не GET и не POST
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: error.message });
  }
}