# Делегирование событий

Всплытие и перехват событий позволяет реализовать один из самых важных приёмов разработки – делегирование.

Идея в том, что если у нас есть много элементов, события на которых нужно обрабатывать похожим образом, то вместо того, чтобы назначать обработчик каждому, мы ставим один обработчик на их общего предка.

Из него можно получить целевой элемент event.target, понять на каком именно потомке произошло событие и обработать его.

## 📌 Полезные свойства и методы `event.target`

| Свойство / Метод    | Что делает                                                   | Пример использования                       |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------- |
| `tagName`           | Название тега элемента (в верхнем регистре: `DIV`, `BUTTON`) | `if (target.tagName === 'BUTTON')`         |
| `classList`         | Классы элемента как коллекция                                | `target.classList.contains('active')`      |
| `id`                | `id` элемента                                                | `if (target.id === 'submit-btn')`          |
| `dataset`           | Доступ к атрибутам `data-*` как объекту                      | `target.dataset.userId`                    |
| `value`             | Значение input, textarea и т.п.                              | `const val = target.value`                 |
| `textContent`       | Весь текст внутри элемента                                   | `console.log(target.textContent)`          |
| `innerText`         | Видимый текст (без скрытых по стилям)                        | `target.innerText`                         |
| `innerHTML`         | HTML-код внутри элемента                                     | `target.innerHTML = '<strong>Hi</strong>'` |
| `closest(selector)` | Ищет ближайшего родителя, соответствующего селектору         | `target.closest('.card')`                  |
| `parentElement`     | Прямой родитель элемента                                     | `target.parentElement.remove()`            |
| `children`          | Коллекция дочерних элементов                                 | `target.children.length`                   |
| `style`             | Доступ к инлайновым стилям                                   | `target.style.color = 'red'`               |
| `className`         | Строка всех классов                                          | `target.className.includes('warning')`     |
| `type`              | Тип input'а (например `checkbox`, `text`)                    | `if (target.type === 'checkbox')`          |
| `checked`           | Для input типа `checkbox`, `radio` — отмечен или нет         | `if (target.checked)`                      |
| `disabled`          | Заблокирован ли элемент                                      |
