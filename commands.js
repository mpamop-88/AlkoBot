// commands.js
import { Markup } from 'telegraf';
import { parseBattles } from './parseBattles.js';
import { getNextBattle, getTimeDiffString } from './utils.js';
import * as fs from 'node:fs';
import { config } from './config.js';


let battles = [];

// Загрузка боёв из файла в память
function loadBattles() {
  if (fs.existsSync(config.BATTLES_FILE)) {
    battles = parseBattles();
  } else {
    battles = [];
  }
}

export function setupCommands(bot) {
  // Кнопочное меню
  const keyboard = Markup.keyboard([
    ['📅 Ближайший бой', '📜 Все бои'],
  ]).resize();

  bot.start((ctx) => {
    loadBattles();
    ctx.reply('Привет! Я ваши трубы шатал ⚔️', keyboard);
  });

  bot.hears('📅 Ближайший бой', (ctx) => {
    loadBattles();
    const next = getNextBattle(battles);
    if (next) {
      const diff = getTimeDiffString(next.date);
      ctx.reply(`🔔 Ближайший бой через ${diff} против: ${next.enemy} (${next.time})`);
    } else {
      ctx.reply('❌ Ближайших боёв не найдено.');
    }
  });

  bot.hears('📜 Все бои', (ctx) => {
    loadBattles();
    if (battles.length === 0) {
      ctx.reply('❌ Список боёв пуст.');
      return;
    }

    const list = battles.map(b => `🕒 ${b.time} — ${b.enemy}`).join('\n');
    ctx.reply(`📋 Список боёв:\n\n${list}`);
  });
}
