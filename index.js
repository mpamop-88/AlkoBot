import 'dotenv/config';
import { fetchAndSaveBattles } from './fetchBattles.js';
import { parseBattles } from './parseBattles.js';

async function run() {
  await fetchAndSaveBattles();
  const battles = parseBattles();
  console.log('🛡 Список боёв:');
  console.log(battles);
}

run();
