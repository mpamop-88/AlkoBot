//  fetchBattles.js
import axios from 'axios';
import * as fs from 'node:fs'; // ✅ Рекомендуется для ES-модулей
import config from './config.js';
import loginOnce from './auth.js';

export async function fetchAndSaveBattles() {
  const cookies = await loginOnce();
  if (!cookies) return null;

  try {
    const res = await get(config.BATTLE_URL, {
      headers: {
        Cookie: cookies.join('; '),
      },
    });

    fs.writeFileSync(config.BATTLES_FILE, res.data);
    console.log('✅ Страница боёв сохранена в файл.');
    return res.data;
  } catch (err) {
    console.error('❌ Ошибка при получении страницы боёв:', err.message);
    return null;
  }
}
