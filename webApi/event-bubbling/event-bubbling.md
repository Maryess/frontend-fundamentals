# Всплытие событий (Event Bubbling) и его остановка в JavaScript

## Что такое всплытие

**Всплытие событий (bubbling)** — это механизм, при котором событие, произошедшее на вложенном элементе, **поднимается вверх** по иерархии DOM к родительским элементам.

📌 Пример:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```js
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});
```

## Как остановить всплытие

**event.stopPropagation()** - Прекращает дальнейшее всплытие события:

```js
child.addEventListener("click", (event) => {
  console.log("Child clicked");
  event.stopPropagation();
});
```

**event.stopImmediatePropagation();** - Останавливает всплытие и предотвращает выполнение других обработчиков на этом же элементе:

```js
child.addEventListener("click", (e) => {
  console.log("1st handler");
  e.stopImmediatePropagation();
});

child.addEventListener("click", () => {
  console.log("2nd handler");
});
```
