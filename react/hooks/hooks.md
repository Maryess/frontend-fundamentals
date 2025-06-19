# Хуки, Быстрота, Классовые vs Функциональные компоненты, Предохранители

## 1. Хуки в React

Хуки — это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Введены в React 16.8 для упрощения логики и переиспользования кода.

### Основные хуки и их назначение:

- **`useState`**: Управляет локальным состоянием компонента.

  ```jsx
  const [count, setCount] = useState(0);
  ```

  ### Как работает:

  - Возвращает массив: `[state, setState]`, где `state` — текущее значение, `setState` — функция для его обновления.
  - При вызове `setState` React планирует перерендер с новым значением.
  - Состояние сохраняется между рендерами.
  - Обновления состояния асинхронны и могут группироваться (батчинг).

  ### Пример:

  ```jsx
  function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount((prev) => prev + 1); // Функциональное обновление
    };

    return (
      <div>
        <p>Счетчик: {count}</p>
        <button onClick={increment}>Увеличить</button>
      </div>
    );
  }

  function Counter() {
    const [count, setCount] = useState < string > "";

    const increment = () => {
      setCount((prev) => prev + 1);
    };

    return (
      <div className="container">
        <h2>Counter:{count}</h2>
        <button onClick={increment}>Count up</button>
      </div>
    );
  }
  ```

### Особенности:

- **Инициализация**: Начальное значение вычисляется только при первом рендере.
- **Функциональное обновление**: Используйте `setCount(prev => prev + 1)` для обновлений, зависящих от предыдущего состояния.
- **Батчинг**: В React 18 обновления в обработчиках событий группируются автоматически.

**Когда использовать**: Для простого локального состояния.

**Ресурсы**:

- [React: useState](https://react.dev/reference/react/useState)
- [Хабр: useState](https://habr.com/ru/post/459694/)

- **`useEffect`**: Выполняет побочные эффекты (запросы, подписки).

  ```jsx
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  ```

  ## Отличия useEffect от useLayoutEffect

  ### `useEffect`

  - **Описание**: Выполняется **асинхронно** после рендера, когда браузер уже отобразил изменения.
  - **Для чего нужен**: Для побочных эффектов (запросы, подписки, таймеры).

  **Пример**:

  ```jsx
  useEffect(() => {
    console.log("Эффект после рендера");
  }, []);
  ```

  ### `useLayoutEffect`

  - **Описание**: Выполняется **синхронно** после рендера, но до отображения браузером.
  - **Для чего нужен**: Для манипуляций с DOM, которые влияют на визуальный рендер (например, измерение размеров).

  **Пример**:

  ```jsx
  useLayoutEffect(() => {
    console.log("Эффект до рендера");
  }, []);
  ```

  ### Ключественные отличия:

  | **Характеристика**     | **`useEffect`**               | **`useLayoutEffect`**     |
  | ---------------------- | ----------------------------- | ------------------------- |
  | **Время выполнения**   | После рендера (асинхронно)    | После рендера (синхронно) |
  | **Влияние на UI**      | Может вызвать мерцание        | Предотвращает мерцание    |
  | **Производительность** | Лучше для большинства случаев | Может замедлить рендер    |

  **Когда использовать**:

  - `useEffect`: Для большинства эффектов.
  - `useLayoutEffect`: Для операций с DOM, где важна синхронность.

  **Ресурсы**:

  - [React: useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
  - [Medium: useEffect vs useLayoutEffect](https://medium.com/@kentcdodds/useeffect-vs-uselayouteffect-2e8e8e8e8e)

- **`useContext`**: Доступ к значению контекста.
  ```jsx
  const theme = useContext(ThemeContext);
  ```
- **`useReducer`**: Управляет сложным состоянием через редьюсер.
  ```jsx
  const [state, dispatch] = useReducer(reducer, initialState);
  ```
- **`useCallback`**: Мемоизация функций для оптимизации.
  ```jsx
  const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
  ```
- **`useMemo`**: Мемоизация значений для оптимизации.

  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

  ## useMemo: для чего использовать

  ### `useMemo`:

  - **Описание**: Мемоизация вычислений для предотвращения повторных расчётов при рендере.
  - **Для чего нужен**: Оптимизация производительности при дорогих вычислениях.

  ### Пример:

  ```jsx
  function ExpensiveComponent({ numbers }) {
    const sum = useMemo(() => {
      return numbers.reduce((acc, num) => acc + num, 0);
    }, [numbers]);

    return <div>Сумма: {sum}</div>;
  }
  ```

  ### Особенности:

  - Зависимости (`[numbers]`) определяют, когда пересчитывать значение.
  - Избегайте чрезмерного использования, так как мемоизация добавляет накладные расходы.

  **Когда использовать**: Для сложных вычислений или создания больших объектов.

  **Ресурсы**:

  - [React: useMemo](https://react.dev/reference/react/useMemo)
  - [Medium: useMemo Guide](https://medium.com/@kentcdodds/when-to-usememo-and-usecallback-8e8e8e8e8e)

- **`useRef`**: Создаёт мутабельный объект для доступа к DOM или хранения значений.

  ```jsx
  const inputRef = useRef(null);
  ```

  ## useRef: что такое, где использовать, особенности

  ### Что такое `useRef`:

  - **Описание**: Хук, создающий мутабельный объект `{ current: value }`, сохраняющийся между рендерами.
  - **Для чего нужен**:
    - Доступ к DOM-элементам.
    - Хранение значений без перерендера.
    - Сохранение ссылок на объекты/подписки.

  ### Особенности:

  - Изменение `ref.current` не вызывает рендер.
  - Значение сохраняется на весь жизненный цикл компонента.

  ### Пример:

  ```jsx
  function TextInput() {
    const inputRef = useRef(null);

    const focusInput = () => {
      inputRef.current.focus();
    };

    return (
      <div>
        <input ref={inputRef} />
        <button onClick={focusInput}>Фокус</button>
      </div>
    );
  }
  ```

  **Когда использовать**:

  - Для управления DOM (фокус, скролл).
  - Для хранения таймеров, подписок или счётчиков.

  **Ресурсы**:

  - [React: useRef](https://react.dev/reference/react/useRef)
  - [Хабр: useRef](https://habr.com/en/post/459694/)

### Правила:

- Вызывать хуки только на верхнем уровне компонента.
- Использовать только в функциональных компонентах или пользовательских хуках.

**Когда использовать**: Для управления состоянием, эффектами, контекстом и оптимизации.

**Ресурсы**:

- [Документация React: Хуки](https://react.dev/reference/react)
- [Хабр: React Hooks](https://habr.com/ru/post/459694/)
