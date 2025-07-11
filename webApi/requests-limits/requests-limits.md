# Ограничение числа параллельных запросов браузера

Когда браузер загружает ресурсы (скрипты, стили, изображения) с одного и того же домена, он **не отправляет все запросы одновременно**. Для улучшения производительности и предотвращения перегрузки сети современные браузеры ограничивают число одновременных соединений к одному хосту.

---

## Зачем нужны ограничения

- **Избежание перегрузки сервера**: слишком много параллельных соединений может снизить общую пропускную способность.
- **Сокращение «голодания» других запросов**: при слишком большом числе открытых соединений мелкие, но важные запросы могут ждать в очереди.
- **Балансировка нагрузки**: ограничивая соединения, браузер вынужден отдавать приоритет более критичным ресурсам.

---

## Типичные ограничения

| Браузер         | Ограничение на домен (примерно) |
| --------------- | ------------------------------- |
| Chrome, Firefox | 6 соединений                    |
| Safari          | 6 соединений                    |
| Edge            | 6 соединений                    |
| IE11            | 6 соединений                    |

> В спецификации HTTP/1.1 указано, что клиенты **должны** поддерживать не менее двух постоянных соединений, но браузеры в реальности устанавливают до шести для лучшей производительности .

---

## Как это работает на практике

1. Браузер при загрузке страницы создаёт пул до N TCP‑соединений к хосту.
2. Когда приходит `img`, `script` или `fetch` к тому же домену, он смотрит, есть ли свободное соединение:
   - **есть** → отправляет сразу
   - **нет** → ставит запрос в очередь
3. Как только одно соединение освобождается (ответ получен), браузер берёт следующий запрос из очереди.

---

## Способы обойти ограничение

- **Domain sharding** — разнести ресурсы по нескольким субдоменам (`cdn1.example.com`, `cdn2.example.com`)
- **HTTP/2** — благодаря мультиплексированию все запросы идут по одному соединению, ограничения домена не влияют
- **Sprite‑техника** — объединять множество мелких изображений в один файл
- **Inlining** — инлайнировать критичный CSS и небольшие скрипты прямо в HTML

## Полезные материалы

- [MDN: Browser connection limits](https://developer.mozilla.org/en-US/docs/Web/Performance/Resource_Loading#browser_connection_limits)
- [Stack Overflow: Max parallel HTTP connections in a browser](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser)
- [HTTP/1.1 RFC 7230 §6.3](https://tools.ietf.org/html/rfc7230#section-6.3)
- [web.dev: HTTP/2 guide](https://web.dev/http2/)
