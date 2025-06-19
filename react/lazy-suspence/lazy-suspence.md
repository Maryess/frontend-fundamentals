## Lazy и Suspense

`React.lazy` и `Suspense` используются для ленивой загрузки компонентов и управления асинхронными операциями.

### `React.lazy`

- **Описание**: Позволяет загружать компоненты динамически, только когда они нужны.
- **Для чего нужен**: Для уменьшения размера начального бандла и ускорения загрузки.

**Пример**:

```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### `Suspense`

- **Описание**: Управляет отображением fallback-контента, пока компонент или данные загружаются.
- **Для чего нужен**: Для обработки асинхронных операций (ленивая загрузка, запросы данных).

**Пример с данными (экспериментально)**:

```jsx
const resource = fetchData();

function DataComponent() {
  const data = resource.read();
  return <div>{data}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

**Ограничения**:

- `Suspense` для данных пока экспериментален (React 18).
- `React.lazy` работает только с компонентами.

**Ресурсы**:

- [React: Code Splitting](https://react.dev/reference/react/lazy)
- [Medium: Lazy and Suspense](https://medium.com/@rossbulat/react-lazy-suspense-2e8e8e8e8e)
