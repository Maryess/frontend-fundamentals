# Кэширование

## Основные HTTP‑заголовки для кэширования

Эффективное кэширование снижает нагрузку на сервер, ускоряет загрузку страниц и улучшает пользовательский опыт.

| Заголовок         | Описание                                                       | Пример                                         |
| ----------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `Cache-Control`   | Сильное кэширование: `max-age`, `public/private`, `no-cache`   | `Cache-Control: public, max-age=86400`         |
| `Expires`         | Слабое кэширование: абсолютная метка времени                   | `Expires: Wed, 01 Jul 2025 12:00:00 GMT`       |
| `ETag`            | Валидатор ресурса: уникальный тег для условных запросов        | `ETag: "686897696a7c876b7e"`                   |
| `Last-Modified`   | Валидатор по дате: дата последнего изменения                   | `Last-Modified: Tue, 17 Jun 2025 10:00:00 GMT` |
| `Vary`            | Контроль вариаций: определяет, по каким заголовкам версия кэша | `Vary: Accept-Encoding, User-Agent`            |
| `Pragma` (legacy) | Устаревший HTTP/1.0: аналог `Cache-Control: no-cache`          | `Pragma: no-cache`                             |

---

## Полезные ссылки

- 📖 [MDN Web Docs: Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- 📖 [MDN Web Docs: HTTP caching](https://developer.mozilla.org/docs/Web/HTTP/Caching)
- 📖 [MDN: Cache-Control](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control)
- 📖 [MDN: ETag](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag)
- 📖 [MDN: Last-Modified](https://developer.mozilla.org/docs/Web/HTTP/Headers/Last-Modified)
- 📖 [MDN: Vary](https://developer.mozilla.org/docs/Web/HTTP/Headers/Vary)

---

> _Хорошее кэширование + надёжный обратный прокси = быстрый и устойчивый к нагрузкам сервис._
