import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS настройки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. Создаем таблицу (используем обратные кавычки ` `)
    await sql`
      CREATE TABLE IF NOT EXISTS anniversary_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Загрузка сообщений (GET)
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC;`;
      return res.status(200).json(rows);
    }

    // 3. Сохранение сообщения (POST)
    if (req.method === 'POST') {
      const { name, text } = req.body;
      
      if (!name || !text) {
        return res.status(400).json({ error: 'Заполните все поля' });
      }
      
      // Вставляем данные (используем безопасную передачу переменных через ${})
      await sql`INSERT INTO anniversary_messages (name, text) VALUES (${name}, ${text});`;
      
      // Сразу возвращаем обновленный список
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC;`;
      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: error.message });
  }
}