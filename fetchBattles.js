// fetchBattles.js
import axios from 'axios';
import * as fs from 'node:fs';
import { config } from './config.js';
import { loginOnce } from './auth.js';

export async function fetchAndSaveBattles() {
  const cookies = await loginOnce();
  if (!cookies) return null;

  try {
    const res = await axios.get(config.env.BATTLE_URL, {
      headers: {
        Cookie: cookies.join('; '),
      },
    });

    fs.writeFileSync(config.env.BATTLES_FILE, res.data);
    console.log('✅ Страница боёв сохранена в файл.');
    return res.data;
  } catch (err) {
    console.error('❌ Ошибка при получении страницы боёв:', err.message);
    return null;
  }
}
