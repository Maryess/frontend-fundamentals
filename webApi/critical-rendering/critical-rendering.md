# Critical Rendering Path (CRP) и Critical Rendering

**Critical Rendering Path** — это полный набор шагов, который браузер выполняет для превращения HTML, CSS и JavaScript в пиксели на экране. Понимание и оптимизация CRP позволяет ускорить отображение контента и улучшить показатели производительности страницы.

---

## 1. Этапы CRP

1. **Парсинг HTML → Построение DOM**

   - Браузер читает HTML-поток, токенизирует его и строит дерево узлов (DOM).
   - Если встречается `<script>` без `async`/`defer`, парсинг прерывается до загрузки и выполнения этого скрипта.

2. **Загрузка и парсинг CSS → Построение CSSOM**

   - Параллельно загружаются все CSS‑файлы.
   - Каждое правило превращается в объект стилей — CSSOM.

3. **Построение Render Tree**

   - На основе DOM и CSSOM создаётся дерево визуальных узлов (Render Tree).
   - Игнорируются узлы с `display: none`.

4. **Layout (Reflow)**

   - Вычисляются размеры и позиционирование каждого узла в Render Tree.
   - Получаем набор координат и размеров, по которым нужно «рисовать» элементы.

5. **Paint & Composite**
   - Каждый узел отрисовывается командой Paint (заливка фоновых цветов, текста, границ).
   - С помощью Composite слои скомпонованы и отданы в GPU для отображения на экране.

---

## 2. Критические ресурсы (Render‑blocking)

Чтобы начать первый рендер, браузер **должен** загрузить и обработать:

- Фрагмент HTML до конца `<head>`
- Все CSS в `<head>`
- Скрипты в `<head>` без атрибутов `async` или `defer`

Все остальные ресурсы (картинки, шрифты, скрипты внизу, скрипты с `async`/`defer`) не блокируют начальный рендер.

---

## 3. Почему оптимизация CRP важна

- **First Contentful Paint (FCP)** и **Time to First Byte (TTFB)** становятся быстрее
- Уменьшается «белый экран» при загрузке
- Снижается количество перерасчётов Layout (reflow), что улучшает плавность
- Поддержка стабильного 60fps при анимациях и скролле

---

## 4. Приёмы оптимизации

- **Минимизировать критический CSS**

  - Инлайнировать стили, необходимые для Above-the-Fold
  - Выносить остальной CSS в отдельные файлы

- **Асинхронная загрузка скриптов**

  - Использовать `defer` для скриптов, которые должны исполниться в порядке
  - Использовать `async` для независимых скриптов

- **Preload и Prefetch**

  - `<link rel="preload" href="critical.css" as="style">`
  - `<link rel="prefetch" href="later.js">`

- **Lazy-loading медиа**

  - `<img loading="lazy">`
  - Динамическая подгрузка при скролле

- **Оптимизация шрифтов**
  - `font-display: swap`
  - Загружать только необходимые веса и наборы глифов

---

## 5. Полезные ссылки

- **MDN Web Docs**

  - [Critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
  - [How browsers work: Rendering lifecycle](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)

- **web.dev**

  - [Understanding the Critical Rendering Path](https://web.dev/learn/performance/understanding-the-critical-path)

- **Ilya Grigorik**

  - [Critical Rendering Path article](https://developers.google.com/web/fundamentals/performance/critical-rendering-path)

- **Дополнительно**
  - Встроенная панель Performance и Lighthouse в Chrome DevTools
  - Видео «Introduction to the Critical Rendering Path» на YouTube
