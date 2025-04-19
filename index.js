// index.js
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { config } from './config.js';
import { setupCommands } from './commands.js';
import { startScheduler } from './scheduler.js';

const bot = new Telegraf(config.BOT_TOKEN);
if (process.env.PORT) {
  const http = await import('node:http');
  http.createServer((_, res) => {
    res.end('Bot is running');
  }).listen(process.env.PORT);
}

setupCommands(bot);
startScheduler();
bot.launch();

console.log('🤖 Бот запущен');
