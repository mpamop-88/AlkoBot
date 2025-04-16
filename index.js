// index.js
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { config } from './config.js';
import { setupCommands } from './commands.js';
import { startScheduler } from './scheduler.js';

const bot = new Telegraf(config.BOT_TOKEN);

setupCommands(bot);
startScheduler();
bot.launch();

console.log('🤖 Бот запущен');
