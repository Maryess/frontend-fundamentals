## Предохранители (Error Boundaries)

Предохранители — это компоненты React, которые перехватывают ошибки JavaScript в дереве компонентов, предотвращая краш всего приложения.

### Как работают:

- Используются только в **классовых компонентах**.
- Реализуют методы `static getDerivedStateFromError` или `componentDidCatch`.
- Обрабатывают ошибки в рендере, конструкторах или жизненных циклах дочерних компонентов.

### Пример:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Ошибка:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

### Ограничения:

- Не перехватывают ошибки в обработчиках событий, асинхронном коде или серверном рендере.
- Для асинхронных ошибок используйте `try/catch`.

**Когда использовать**: Для защиты критических частей UI от сбоев.

**Ресурсы**:

- [React: Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Medium: Error Boundaries](https://medium.com/@rossbulat/react-error-boundaries-a8e8a8e8a8e)
