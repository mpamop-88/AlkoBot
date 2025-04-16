import { post,get } from "axios";

const login = "mr_DUDE"; const pass = "bbaarrbb00ss02";

async function loginOnce() { if (sessionCookies) { console.log("Уже авторизован. Повторный вход не требуется."); return; }

try { const res = await postps://www.gwars.io/login.php", new URLSearchParams({ login, pass, autologin: "1" }), { maxRedirects: 0, validateStatus: status => status === 302 } );

  
        sessionCookies = cookies;
            console.log("✅ Успешный вход. SID сохранён.");
     function getProtectedPage() { await loginOnce(); // авторизация, если нужно

    if (!sessionCookies) { console.log("Нет куков — доступ невозможен."); return; }

    const url = "https://www.gwars.io/object.php?id=69403&page=oncoming1";

    try { const res = await get{ headers: { Cookie: sessionCookies.join("; ") } });

    console.log("✅ Доступ к странице получен. Пример содержимого:");
    console.log(res.data.slice(0, 500)); // первые 500 символов HTML

    } catch (err) { console.error("Ошибка при получении страницы:", err.message); } }

    // Пример вызова 
    getProtectedPage();

