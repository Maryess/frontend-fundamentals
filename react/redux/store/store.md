## Стор мутабельный или нет?

Стор в Redux **иммутабельный** (неизменяемый). Это ключевая концепция, обеспечивающая предсказуемость и простоту отладки.

### Почему иммутабельный:

- Состояние в сторе никогда не изменяется напрямую.
- Редьюсеры создают **новую копию** состояния при каждом обновлении.
- Это позволяет:
  - Отслеживать изменения с помощью сравнения ссылок.
  - Поддерживать временную отладку (time-travel debugging).
  - Избегать побочных эффектов.

### Пример иммутабельности:

```javascript
const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 }; // Новая копия объекта
    default:
      return state;
  }
}
```

**Ошибочный пример (мутация)**:

```javascript
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      state.count += 1; // Ошибка: мутация состояния
      return state;
    default:
      return state;
  }
}
```

### Как обеспечивается иммутабельность:

- Используйте spread-оператор (`...`) или библиотеки вроде `immer` для создания копий.
- Redux Toolkit автоматически использует `immer` для упрощения работы.

**Когда учитывать**: Всегда возвращайте новое состояние в редьюсерах.

**Ресурсы**:

- [Redux: Immutable Update Patterns](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns)
- [Medium: Immutability in Redux](https://medium.com/@dan_abramov/immutability-in-redux-6e8e8e8e8e)
