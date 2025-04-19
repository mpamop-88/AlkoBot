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
const rows = document.querySelectorAll('#portsblock table:last-of-type tr');
rows.forEach((row, index) => {
  if (index === 0) return; // пропускаем заголовок
  const cells = row.querySelectorAll('td');
  const time = cells[0]?.textContent.trim();

  const matchup = cells[2]?.textContent.trim();

  console.log(`${time} | ${matchup}`);
});


  return battles;
}
