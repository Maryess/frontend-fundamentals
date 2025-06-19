## Жизненные циклы классовых компонентов

Жизненный цикл классовых компонентов — это набор методов, которые вызываются на разных этапах существования компонента (создание, обновление, удаление).

### Основные этапы и методы:

1. **Монтирование** (компонент добавляется в DOM):
   - `constructor()`: Инициализация состояния и привязка методов.
   - `static getDerivedStateFromProps()`: Обновление состояния на основе пропсов.
   - `render()`: Возвращает JSX.
   - `componentDidMount()`: Выполняется после добавления в DOM (запросы, подписки).
2. **Обновление** (изменение пропсов или состояния):
   - `static getDerivedStateFromProps()`: То же, что при монтировании.
   - `shouldComponentUpdate()`: Определяет, нужно ли рендерить (для оптимизации).
   - `render()`: Перерендер.
   - `getSnapshotBeforeUpdate()`: Сохраняет данные перед обновлением DOM.
   - `componentDidUpdate()`: Выполняется после обновления (запросы, DOM-операции).
3. **Размонтирование** (удаление из DOM):
   - `componentWillUnmount()`: Очистка (удаление подписок, таймеров).

### Пример:

```jsx
class Clock extends React.Component {
  state = { time: new Date() };

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ time: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <div>Время: {this.state.time.toLocaleTimeString()}</div>;
  }
}
```

**Аналог в функциональных компонентах**: Используйте `useEffect` для имитации жизненного цикла.

**Ресурсы**:

- [React: Lifecycle Methods](https://react.dev/reference/react/Component)
- [Хабр: Жизненный цикл](https://habr.com/ru/post/465905/)
