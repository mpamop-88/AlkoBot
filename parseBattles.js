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
const rows = $('#portsblock table:last-of-type tr');

rows.each((index, row) => {
  if (index === 0) return; // Пропускаем заголовок
  const cells = $(row).find('td');
  const time = $(cells[0]).text().trim();
  const matchup = $(cells[2]).text().trim();

  console.log(`${time} | ${matchup}`);

  battles.push({
    time,
    enemy: matchup,
  });
  console.log('Таблица найдена?', $('#portsblock table:last-of-type').length);

});


  return battles;
}
