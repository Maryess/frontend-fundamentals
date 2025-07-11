## Как React делает сравнение (Reconciliation)

React использует процесс **реконсиляции** для определения, какие части DOM нужно обновить при изменении состояния или пропсов.

### Как работает:

1. **Virtual DOM**:
   - React создаёт виртуальную копию DOM.
   - При каждом рендере создаётся новое виртуальное дерево.
2. **Сравнение**:
   - React сравнивает новое виртуальное дерево со старым (diffing).
   - Использует эвристики: сравнивает элементы одного типа, проверяет `key` для списков.
3. **Обновление**:
   - Минимально обновляет реальный DOM, применяя только необходимые изменения.

### Ключи для списков:

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

Ключи помогают React точно отслеживать элементы, минимизируя перерисовку.

**Почему эффективно**: Сравнение в памяти быстрее, чем прямые манипуляции с DOM.

**Ресурсы**:

- [React: Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- [Medium: React Reconciliation](https://medium.com/@getify/react-reconciliation-explained-1e7e6a6e6e6e)
