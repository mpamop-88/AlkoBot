import 'dotenv/config';
import { fetchAndSaveBattles } from './fetchBattles.js';
import { parseBattles } from './parseBattles.js';
import { getNextBattle, getTimeDiffString } from './utils.js';

async function run() {
  await fetchAndSaveBattles();
  const battles = parseBattles();
  const next = getNextBattle(battles);

  if (next) {
    const diff = getTimeDiffString(next.date);
    console.log(`🔔 Следующий бой против ${next.enemy} через ${diff}`);
  } else {
    console.log('❌ Ближайших боёв не найдено.');
  }
}

run();
