// auth.js
import { post } from 'axios';
import { config } from './config.js';

let sessionCookies = null;

export async function loginOnce() {
  if (sessionCookies) {
    console.log('✅ Уже авторизован');
    return sessionCookies;
  }

  try {
    const res = await post('https://www.gwars.io/login.php', new URLSearchParams({
      login: config.LOGIN,
      pass: config.PASSWORD,
      autologin: '1',
    }), {
      maxRedirects: 0,
      validateStatus: (status) => status === 302,
    });

    const cookies = res.headers['set-cookie'];
    if (!cookies) {
      console.log('❌ Куки не получены, вход не удался.');
      return null;
    }

    sessionCookies = cookies;
    console.log('✅ Успешный вход. SID сохранён.');
    return sessionCookies;
  } catch (err) {
    console.error('❌ Ошибка при логине:', err.message);
    return null;
  }
}
