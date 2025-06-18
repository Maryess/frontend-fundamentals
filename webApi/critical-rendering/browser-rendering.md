# Как браузер рендерит страницу

Браузер превращает HTML, CSS и JavaScript в пиксели на экране через серию этапов, называемую **Rendering Lifecycle**. Понимание этого процесса помогает оптимизировать производительность и устранять «мигающие» или медленные рендеры :contentReference[oaicite:0]{index=0}.

---

## Парсинг HTML → построение DOM

- Браузер скачивает HTML и **построчно** разбивает на токены.
- По мере чтения формируется **Document Object Model (DOM)** — дерево узлов, представляющее всю структуру страницы.
- **Скрипты без `async/defer` блокируют** дальнейший парсинг до загрузки и выполнения :contentReference[oaicite:1]{index=1}.

---

## Загрузка и парсинг CSS → построение CSSOM

- Параллельно с HTML скачиваются все `<link rel="stylesheet">` и `<style>` в `<head>`.
- На основе них строится **CSS Object Model (CSSOM)** — дерево правил стилей.
- До завершения CSSOM нельзя строить финальный рендер-дерево, поэтому CSS тоже **блокирует** начальный рендер :contentReference[oaicite:2]{index=2}.

---

## Построение Render Tree

- **DOM** + **CSSOM** → **Render Tree**: объединённое дерево только видимых элементов с их вычисленными стилями.
- Узлы с `display: none` и другие невидимые элементы отбрасываются :contentReference[oaicite:3]{index=3}.

---

## Layout (Reflow)

- Браузер проходит по Render Tree и **вычисляет размеры и позиции** каждого узла (коэффициенты, отступы, границы).
- Результат — абсолютные координаты и размеры (box model) :contentReference[oaicite:4]{index=4}.

---

## Paint & Composite

1. **Paint**: каждый узел «раскрашивается» — отрисовываются фон, текст, границы, тени.
2. **Composite**: слои (layers) объединяются и отправляются в GPU для финального отображения на экране :contentReference[oaicite:5]{index=5}.

---

## Рендер-блокирующие ресурсы

- **HTML**: парсинг останавливается на `<script>` без `async/defer`.
- **CSS**: все стили в `<head>` должны быть загружены до первого рендера.
- **Шрифты**: загрузка системных/веб-шрифтов может блокировать отрисовку текста (флаш-эффект) :contentReference[oaicite:6]{index=6}.

---

## Оптимизация процесса

- **Async/Defer** для скриптов: разблокируют парсинг HTML.
- **Inline Critical CSS**: минимальный CSS для Above-the-Fold помещайте прямо в `<head>`, остальное — отложенно.
- **Preload / Prefetch**: `<link rel="preload">` для ключевых ресурсов.
- **Lazy‑loading** неважных изображений и видео.
- **font-display: swap** для веб‑шрифтов.

---

## Полезные ссылки

- 🔹 **MDN Web Docs**: [How browsers work: Rendering lifecycle](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) :contentReference[oaicite:7]{index=7}
- 🔹 **MDN Web Docs**: [Critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path) :contentReference[oaicite:8]{index=8}
- 🔹 **MDN Learn**: [How browsers load websites](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites) :contentReference[oaicite:9]{index=9}
- 🔹 **web.dev**: [Render tree construction, Layout and Paint](https://web.dev/articles/critical-rendering-path/render-tree-construction) :contentReference[oaicite:10]{index=10}
