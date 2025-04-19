import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { config } from './config.js';
import { setupCommands } from './commands.js';
import { startScheduler } from './scheduler.js';

const bot = new Telegraf(config.BOT_TOKEN);

// Если Render ожидает, чтобы приложение слушало порт
if (process.env.PORT) {
  const http = await import('node:http');
  http.createServer((_, res) => {
    res.end('Bot is running');
  }).listen(process.PORT, () => {
    console.log(`Server is listening on port ${process.PORT}`);
  });
}

setupCommands(bot);
startScheduler();
bot.launch();

console.log('🤖 Бот запущен');
