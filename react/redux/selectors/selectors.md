## Как работают селекторы?

Селекторы — это функции, которые извлекают и преобразуют данные из состояния стора.

### Как работают:

- Принимают состояние стора и возвращают нужные данные.
- Могут быть простыми или мемоиизированными (с библиотекой `reselect`).
- Упрощают доступ к данным и делают код переиспользуемым.

### Пример простого селектора:

```javascript
const getCount = (state) => state.count;
```

### Пример с `reselect` (мемоизация):

```javascript
import { createSelector } from "reselect";

const getTodos = (state) => state.todos;
const getFilter = (state) => state.filter;

const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => todos.filter((todo) => todo.status === filter)
);
```

### Почему использовать селекторы:

- **Производительность**: Мемоизация предотвращает лишние вычисления.
- **Переиспользование**: Логика извлечения данных централизована.
- **Читаемость**: Селекторы упрощают работу с глубоко вложенными данными.

**Пример с React**:

```jsx
import { useSelector } from "react-redux";

function TodoList() {
  const filteredTodos = useSelector(getFilteredTodos);
  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

**Ресурсы**:

- [Reselect Documentation](https://github.com/reduxjs/reselect)
- [Redux: Selectors](https://redux.js.org/usage/deriving-data-selectors)
