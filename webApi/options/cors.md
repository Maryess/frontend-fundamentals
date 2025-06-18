# CORS (Cross-Origin Resource Sharing)

**CORS** — механизм, позволяющий контролировать выполнение кросс-доменных запросов из браузера, основанный на HTTP-заголовках.

---

## Почему CORS нужен

По умолчанию браузеры придерживаются **Same-Origin Policy**, запрещающей доступ скриптов к ресурсам, если origin отличается. CORS ослабляет это ограничение при явном разрешении сервера.

**Origin** = схема + домен + порт (e.g. `https://site.com:443`).

---

## Основные заголовки

| Заголовок                          | Направление     | Описание                                                            |
| ---------------------------------- | --------------- | ------------------------------------------------------------------- |
| `Access-Control-Allow-Origin`      | ответ сервера   | Разрешённые источники (`*` или конкретный origin)                   |
| `Access-Control-Allow-Methods`     | ответ сервера   | Разрешённые HTTP-методы (`GET, POST, PUT…`)                         |
| `Access-Control-Allow-Headers`     | ответ сервера   | Разрешённые нестандартные заголовки (`Content-Type, X-Auth-Token`)  |
| `Access-Control-Allow-Credentials` | ответ сервера   | Разрешить отправку куки и авторизационных заголовков (`true/false`) |
| `Access-Control-Expose-Headers`    | ответ сервера   | Заголовки, доступные в JS (`Location, X-Total-Count` и др.)         |
| `Access-Control-Max-Age`           | ответ сервера   | Время (сек) кэширования результата preflight                        |
| `Origin`                           | запрос браузера | Исходный origin запроса                                             |
| `Access-Control-Request-Method`    | preflight req.  | Метод основного запроса (`PUT`, `DELETE` и др.)                     |
| `Access-Control-Request-Headers`   | preflight req.  | Список нестандартных заголовков основного запроса                   |

---

## Preflight (OPTIONS) запрос

Браузер отправляет preflight-запрос методом `OPTIONS`, если:

1. Метод запроса не является простым (`GET`, `POST`, `HEAD`).
2. Используются нестандартные заголовки.
3. `Content-Type` не из `text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`.

**Пример preflight-запроса:**

```http
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Origin: https://app.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, X-Auth-Token
```

**Пример ответа:**

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, X-Auth-Token
Access-Control-Max-Age: 86400
```

---

## Отправка кук и авторизации

По умолчанию браузер **не отправляет** куки или заголовок `Authorization` при кросс-доменных запросах.
Чтобы разрешить:

- **Клиент:** указывать `fetch` или `XHR` `{ credentials: 'include' }`.
- **Сервер:** `Access-Control-Allow-Credentials: true` и конкретный origin (не `*`).

```js
fetch("https://api.example.com/user", {
  credentials: "include",
});
```

---

## Пример настройки на Express.js

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://app.com");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/api/data", (req, res) => {
  res.json({ message: "OK" });
});

app.listen(3000);
```

---

## Советы по снижению числа preflight-запросов

- Использовать **простые методы** (`GET`, `POST`, `HEAD`).
- Ограничиться **простыми заголовками**.
- Задавать `Access-Control-Max-Age` для кэширования preflight.

---

## Полезные ссылки

- MDN: [CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS)
- MDN: [Preflight request](https://developer.mozilla.org/ru/docs/Glossary/Preflight_request)
- Статья: CORS in Action (HTML5 Rocks)
- StackOverflow: [Understanding CORS](https://stackoverflow.com/questions/43225898/understanding-cors-preflight-requests)
