## Pure Function и Pure Component

### Pure Function

- **Описание**: Функция, которая:
  - Возвращает одинаковый результат для одинаковых входных данных.
  - Не имеет побочных эффектов (не изменяет внешнее состояние).
- **Для чего нужна**: Упрощает тестирование и предсказуемость.

**Пример**:

```jsx
const add = (a, b) => a + b; // Чистая
const impureAdd = (a, b) => {
  console.log(a + b); // Нечистая (побочный эффект)
  return a + b;
};
```

### Pure Component

- **Описание**: Классовый компонент (`React.PureComponent`), который автоматически оптимизирует рендер, сравнивая пропсы и состояние.
- **Для чего нужен**: Для предотвращения лишних рендеров.

**Пример**:

```jsx
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

**Аналог для функциональных**: Используйте `React.memo`.

**Ресурсы**:

- [React: PureComponent](https://react.dev/reference/react/PureComponent)
- [Medium: Pure Functions](https://medium.com/@getify/pure-functions-in-javascript-6e8e8e8e8e)
