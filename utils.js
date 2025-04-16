// utils.js
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

// Преобразует строку вида "16.04 19:00" в объект даты
export function parseBattleTime(str) {
  return dayjs(str, 'DD.MM HH:mm');
}

// Находит ближайший бой, который ещё не начался
export function getNextBattle(battles) {
  const now = dayjs();
  const upcoming = battles
    .map(battle => ({
      ...battle,
      date: parseBattleTime(battle.time),
    }))
    .filter(b => b.date.isAfter(now))
    .sort((a, b) => a.date - b.date);

  return upcoming[0] || null;
}

// Возвращает строку "через X часов Y минут"
export function getTimeDiffString(targetTime) {
  const now = dayjs();
  const diffMinutes = targetTime.diff(now, 'minute');

  if (diffMinutes <= 0) return 'уже идёт или прошёл';

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours ? `${hours}ч ` : ''}${minutes}м`;
}
