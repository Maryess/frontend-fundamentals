## HOC (Higher-Order Components)

HOC — это функция, которая принимает компонент и возвращает новый компонент с дополнительной функциональностью.

### Как работают:

- Оборачивают компонент, добавляя пропсы, состояние или поведение.
- Используются для переиспользования логики (например, авторизация, логирование).

### Пример:

```jsx
function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = checkAuth();
    return isAuthenticated ? <Component {...props} /> : <div>Войдите</div>;
  };
}

const ProtectedPage = withAuth(({ user }) => <div>Привет, {user}!</div>);
```

### Особенности:

- Увеличивают сложность дерева компонентов.
- Заменяются пользовательскими хуками в большинстве случаев.

**Когда использовать**: Для кросс-компонентной логики в устаревшем коде.

**Ресурсы**:

- [React: Higher-Order Components](https://react.dev/learn/reusing-logic-in-components)
- [Хабр: HOC](https://habr.com/ru/post/468109/)
