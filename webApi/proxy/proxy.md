# Что такое прокси‑сервер и обратный прокси

**Прокси‑сервер** — промежуточный сервер, через который клиент (браузер, приложение) делает запросы к внешним ресурсам:

- Клиент отправляет запрос прокси
- Прокси перенаправляет его к целевому серверу
- Получает ответ и возвращает клиенту

### Задачи прокси‑сервера

- Сокрытие реального IP клиента
- Кэширование ответов
- Контроль доступа (фильтрация)
- Анонимность

## Типы прокси

| Тип прокси         | Описание                                           |
| ------------------ | -------------------------------------------------- |
| **Forward Proxy**  | Проксирует **исходящий** трафик клиента            |
| **Transparent**    | Клиент не знает о прокси                           |
| **Anonymous**      | Скрывает IP, но указывает, что используется прокси |
| **High‑Anonymity** | Полностью скрывает факт проксирования              |

## Обратный прокси (Reverse Proxy)

**Обратный прокси** стоит перед одним или несколькими бэкенд‑серверами и принимает **входящий** трафик от клиентов:

### Основные функции

- Балансировка нагрузки между бэкендами
- SSL‑терминация (HTTPS → HTTP)
- Кэширование часто запрашиваемых ответов
- Защита и скрытие реальной инфраструктуры
- Маршрутизация запросов по URL

---

## Зачем и когда использовать

- **Высокая нагрузка**: распределить трафик по пулу серверов
- **Безопасность**: спрятать внутренние сервисы за единой точкой входа
- **Производительность**: кэшировать статику, снижать задержки
- **Удобство**: единый сертификат SSL/TLS, единое логирование

---

## Пример конфигурации NGINX

```nginx
# Объявляем пул бэкендов
upstream backend_pool {
    server 10.0.0.5:3000;
    server 10.0.0.6:3000;
}

server {
    listen 80;
    server_name example.com;

    # Редирект HTTP → HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;

    # Маршрутизация и проксирование
    location /api/ {
        proxy_pass         http://backend_pool;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;

        # Кэширование ответов
        proxy_cache        my_cache;
        proxy_cache_valid  200  10m;
        proxy_cache_valid  404   1m;
    }
}
```

## Полезные ссылки

- [NGINX Docs: Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [MDN: Proxy servers and tunnels](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling)

📖 DigitalOcean: How To Set Up NGINX as a Reverse Proxy
