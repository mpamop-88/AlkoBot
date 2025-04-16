import { post, get } from 'axios';
import fs from 'fs';
import { Telegraf, Markup } from 'telegraf';
import cheerio from 'cheerio';
import cron from 'node-cron';

const bot = new Telegraf(process.env.BOT_TOKEN);
const login = process.env.LOGIN;
const pass = process.env.PASSWORD;

const BATTLES_FILE = 'battles.html';
const BATTLE_URL = `https://www.gwars.io/object.php?id=69403&page=oncoming1&sid=9760`;

let sessionCookies = null;

async function loginOnce() {
  if (sessionCookies) {
    console.log('Уже авторизован');
    return;
  }

  try {
    const res = await post('https://www.gwars.io/login.php', new URLSearchParams({
      login,
      pass,
      autologin: '1',
    }), {
      maxRedirects: 0,
      validateStatus: status => status === 302,
    });

    const cookies = res.headers['set-cookie'];
    if (!cookies) {
      console.log('❌ Куки не получены, вход не удался.');
      return;
    }

    sessionCookies = cookies;
    console.log('✅ Успешный вход. SID сохранён.');
  } catch (err) {
    console.error('❌ Ошибка при логине:', err.message);
  }
}

async function getProtectedPage() {
  await loginOnce();

  if (!sessionCookies) {
    console.log('❌ Нет активной сессии.');
    return;
  }

  try {
    const res = await get(BATTLE_URL, {
      headers: {
        Cookie: sessionCookies.join('; '),
      },
    });

    console.log('✅ Доступ к странице получен. Пример содержимого:');
    console.log(res.data.slice(0, 500)); // показать начало HTML

    // можно сохранить в файл:
    fs.writeFileSync(BATTLES_FILE, res.data);
  } catch (err) {
    console.error('❌ Ошибка при получении страницы:', err.message);
  }
}

// Пример вызова
getProtectedPage();
