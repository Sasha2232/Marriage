import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Создаем таблицу, если её нет (запускается при каждом запросе, это нормально для Postgres)
    await sql`
      CREATE TABLE IF NOT EXISTS anniversary_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 1. Получение всех сообщений
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // 2. Добавление нового сообщения
    if (req.method === 'POST') {
      const { name, text } = req.body;

      if (!name || !text) {
        return res.status(400).json({ error: 'Пожалуйста, заполните все поля' });
      }

      await sql`
        INSERT INTO anniversary_messages (name, text)
        VALUES (${name}, ${text});
      `;
      
      const { rows } = await sql`SELECT * FROM anniversary_messages ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: 'Метод не поддерживается' });

  } catch (error) {
    console.error("Ошибка базы данных:", error);
    return res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
  }
}