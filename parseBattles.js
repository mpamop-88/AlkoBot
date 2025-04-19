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

  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length === 4) {
      const time = $(cells[0]).text().trim();
      const matchupText = $(cells[2]).text().trim();

      // Можно дополнительно сделать split по "vs" если нужно разделить свои/вражеские синдикаты
      battles.push({
        time,
        enemy: matchupText,
      });

      console.log(`⏰ ${time} | ⚔️ ${matchupText}`);
    }
  });

  return battles;
}
