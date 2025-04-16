// parseBattles.js
import fs from 'fs';
import * as cheerio from 'cheerio';
import { config } from './config.js';

export function parseBattles() {
  if (!fs.existsSync(config.BATTLES_FILE)) {
    console.error('❌ Файл с боями не найден.');
    return [];
  }

  const html = fs.readFileSync(config.BATTLES_FILE, 'utf-8');
  const $ = cheerio.load(html);

  const battles = [];

  // Таблица с боями на странице, как правило, находится в .wb tr
  $('table.wb tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length >= 3) {
      const time = $(cells[0]).text().trim();        // Время боя
      const enemy = $(cells[2]).text().trim();       // Противник

      battles.push({
        time,
        enemy,
      });
    }
  });

  return battles;
}
