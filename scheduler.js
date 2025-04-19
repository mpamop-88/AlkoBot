// scheduler.js
import cron from 'node-cron';
import { fetchAndSaveBattles } from './fetchBattles.js';
import { parseBattles } from './parseBattles.js';
import { getNextBattle, getTimeDiffString } from './utils.js';
import { config } from './config.js';
import { Telegraf } from 'telegraf';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);

// Инициализация бота
const bot = new Telegraf(config.env.BOT_TOKEN);

// Храним список боёв в памяти
let battles = [];

// Загрузка и парсинг боёв (например, в 05:00 каждый день)
cron.schedule('0 5 * * *', async () => {
  console.log('⏰ 05:00 — обновляем список боёв...');
  await fetchAndSaveBattles();
  battles = parseBattles();
});

// Проверка каждую минуту: есть ли бой через 1 минуту
cron.schedule('* * * * *', () => {
  const now = dayjs();
  for (const battle of battles) {
    const battleTime = dayjs(battle.time, 'DD.MM HH:mm');
    if (battleTime.diff(now, 'minute') === 1) {
      const msg = `⚔️ Через 1 минуту бой против: ${battle.enemy} (${battle.time})`;
      console.log(msg);
      bot.telegram.sendMessage(1717034355, msg); // <-- укажи chat_id
    }
  }
});

// Старт бота
export function startScheduler() {
  console.log('🕒 Планировщик запущен');
  fetchAndSaveBattles().then(() => {
    battles = parseBattles();
  });
}
