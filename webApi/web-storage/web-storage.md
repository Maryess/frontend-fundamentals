# Способы сохранения информации в браузере

Браузер предоставляет несколько механизмов для хранения данных на стороне клиента. Каждый подходит для разных задач.

---

## Сравнительная таблица

| Способ                   | Объём                         | Время жизни                | Особенности                                                                    |
| ------------------------ | ----------------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| **localStorage**         | \~5 МБ                        | Постоянно (пока не удалён) | Синхронный API, только строковые значения                                      |
| **sessionStorage**       | \~5 МБ                        | Сессия вкладки (закрытие)  | Синхронный API, отдельная для каждой вкладки/окна                              |
| **Cookies**              | \~4 КБ                        | По `Expires`/`Max-Age`     | Отправляются с каждым HTTP-запросом, настройки безопасности (HttpOnly, Secure) |
| **IndexedDB**            | >100 МБ                       | Постоянно                  | Асинхронный, объектно-ориентированная база данных                              |
| **Cache API**            | Зависит от quota              | Пока не очищен             | Используется в Service Worker для PWA, асинхронный                             |
| **Web Storage (WebSQL)** | Устаревший (не рекомендуется) | Постоянно                  | SQL-подобный API, deprecated                                                   |

---

## Подробно о каждом способе

### localStorage

- API: `localStorage.setItem(key, value)` / `localStorage.getItem(key)`
- Данные сохраняются между сессиями браузера
- **Применение:** настройки пользователя, токены (не для секьюрных данных)

### sessionStorage

- API: `sessionStorage.setItem(key, value)` / `sessionStorage.getItem(key)`
- Данные привязаны к вкладке/окну, удаляются при закрытии
- **Применение:** временные данные (например, шаги многократной формы)

### Cookies

- API JS: `document.cookie = "name=value; expires=...; path=/; Secure; HttpOnly"`
- Могут быть помечены `HttpOnly` (недоступны JS) и `Secure` (только по HTTPS)
- Отправляются в заголовках HTTP-запросов
- **Применение:** сессии, аналитика, A/B-тесты

### IndexedDB

- Асинхронный API с промисами (`indexedDB.open`, транзакции)
- Поддерживает хранение объектов, ключ-значение, курсоры
- **Применение:** сложные данные, оффлайн-приложения, PWA

### Cache API

- Используется в Service Workers: `caches.open(name).then(cache => cache.put(request, response))`
- Позволяет хранить ответы запросов и отдавать из кэша
- **Применение:** оффлайн, ускорение загрузки PWA, кеширование статического контента

### WebSQL (Deprecated)

- SQL-подобное хранилище, не поддерживается новыми стандартами
- **Рекомендуется использовать IndexedDB**

---

## Полезные ссылки

- 📖 [MDN: Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
- 📖 [MDN: document.cookie](https://developer.mozilla.org/docs/Web/API/Document/cookie)
- 📖 [MDN: IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
- 📖 [MDN: Cache API](https://developer.mozilla.org/docs/Web/API/Cache)
- 📖 [IETF: RFC 6265 (Cookies)](https://tools.ietf.org/html/rfc6265)
