// config.js
export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  login: process.env.LOGIN,
  pass: process.env.PASSWORD,
  BATTLE_URL: 'https://www.gwars.io/object.php?id=69403&page=oncoming1&sid=9760',
BATTLES_FILE: process.env.BATTLES_FILE || './battles.json',
  CHAT_ID: process.env.CHAT_ID // id группы или канала для уведомлений
};

