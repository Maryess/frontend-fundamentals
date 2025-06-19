## Что такое `connect`?

`connect` — это функция из библиотеки `react-redux`, которая связывает React-компоненты с Redux-стором.

### Как работает:

- Оборачивает компонент, предоставляя ему доступ к:
  - Состоянию стора (через `mapStateToProps`).
  - Функциям для диспатча действий (через `mapDispatchToProps`).
- Возвращает новый компонент, подписанный на изменения стора.

### Пример:

```jsx
import { connect } from "react-redux";

function Counter({ count, increment }) {
  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### Особенности:

- `mapStateToProps`: Извлекает данные из стора и передаёт их как пропсы.
- `mapDispatchToProps`: Определяет функции для отправки действий.
- Автоматически оптимизирует рендер: компонент рендерится только при изменении соответствующих данных.
- В Redux Toolkit часто заменяется хуками `useSelector` и `useDispatch`.

**Когда использовать**: В устаревшем коде или проектах без хуков.

**Ресурсы**:

- [React-Redux: connect](https://react-redux.js.org/api/connect)
- [Хабр: React-Redux](https://habr.com/ru/post/319666/)

## Почему рендерится только определённая компонента?

В Redux не все компоненты рендерятся при изменении стора благодаря оптимизациям в `react-redux`.

### Почему не рендерятся все компоненты:

1. **Подписка через `connect` или `useSelector`**:
   - Компоненты подписываются только на нужные части состояния.
   - `connect` и `useSelector` сравнивают возвращаемые данные по ссылке.
   - Если данные не изменились, рендер не происходит.
2. **Иммутабельность**:
   - Redux возвращает новые объекты только для изменённых частей состояния.
   - Неизменённые части сохраняют те же ссылки, что предотвращает рендер.
3. **Мемоизация селекторов**:
   - Селекторы с `reselect` кэшируют результаты, возвращая одинаковые ссылки для одинаковых входных данных.
4. **React.memo**:
   - Использование `React.memo` для компонентов дополнительно предотвращает рендер при неизменённых пропсах.

### Пример:

```jsx
import { useSelector } from "react-redux";

function CounterDisplay() {
  const count = useSelector((state) => state.count); // Подписка только на count
  console.log("Рендер CounterDisplay");
  return <div>Счетчик: {count}</div>;
}

function TodoList() {
  const todos = useSelector((state) => state.todos); // Подписка только на todos
  console.log("Рендер TodoList");
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

Если изменить `count` в сторе, рендерится только `CounterDisplay`. `TodoList` не рендерится, так как `state.todos` не изменился.

### Проблемы и решения:

- **Лишние рендеры**: Если селектор возвращает новый объект при каждом вызове, используйте `reselect`.
- **Глубокое сравнение**: Для сложных объектов применяйте библиотеки вроде `shallowEqual` в `useSelector`.

**Ресурсы**:

- [React-Redux: Performance](https://react-redux.js.org/api/hooks#performance)
- [Medium: Redux Optimization](https://medium.com/@dan_abramov/optimizing-redux-performance-6e8e8e8e8e)

## Заключение

Redux — мощный инструмент для управления состоянием, основанный на предсказуемом потоке данных. Понимание его ключевых концепций (поток, иммутабельность, селекторы, оптимизация рендера) поможет писать эффективные приложения и уверенно отвечать на вопросы на собеседованиях. Используйте Redux Toolkit для упрощения работы и следуйте лучшим практикам для оптимизации.

**Полезные ресурсы**:

- [Официальная документация Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Хабр: Redux для начинающих](https://habr.com/ru/post/326308/)
