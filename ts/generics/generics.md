# Дженерики в TypeScript

**Дженерики в TypeScript** — это мощный инструмент, который позволяет создавать компоненты (функции, классы, интерфейсы), способные работать с различными типами данных, сохраняя при этом строгую типизацию. Они делают код гибким, переиспользуемым и безопасным.
Основные концепции

**Что такое дженерики?** Дженерики позволяют параметризовать типы. Вы определяете "шаблон" для типа, который будет указан при использовании компонента.

**Синтаксис** Дженерики обозначаются угловыми скобками <T>, где T — это параметр типа.Пример:

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

**Типовые параметры** T — это placeholder для типа, который заменяется конкретным типом при вызове, например:  
let result = identity<string>("Hello"); // result: string

**Ограничения типов** Используйте extends для ограничения допустимых типов:

```ts
function getLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

**Дженерик-классы** Классы могут быть обобщёнными:

```ts
class Box<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
let numberBox = new Box<number>(42);
```

**Дженерик-интерфейсы** Интерфейсы тоже поддерживают дженерики:

```ts
interface Pair<K, V> {
  key: K;
  value: V;
}
let pair: Pair<string, number> = { key: "age", value: 25 };
```

**Преимущества**

Повторное использование: Один код работает с разными типами.  
Типобезопасность: Ошибки обнаруживаются на этапе компиляции.  
Гибкость: Легко адаптировать код под новые требования.

**Примеры**

Простая дженерик-функция

```ts
function identity<T>(arg: T): T {
  return arg;
}
console.log(identity<number>(5)); // 5
console.log(identity<string>("Hi")); // "Hi"
```

Дженерик-класс

```ts
class Container<T> {
  private item: T;
  constructor(item: T) {
    this.item = item;
  }
  getItem(): T {
    return this.item;
  }
}
let stringContainer = new Container<string>("Text");
```

Ограниченный дженерик

```ts
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}
printLength("Hello"); // 5
printLength([1, 2, 3]); // 3
```

**Полезные ресурсы**

Официальная документация TypeScript — подробное руководство по дженерикам.  
Статья на Medium — доступное объяснение с примерами.  
Видео на YouTube — визуальное погружение в тему.  
Статья на Хабре — обзор дженериков на русском языке.

Дженерики — это ключ к написанию масштабируемого и надёжного кода в TypeScript. Изучите их, чтобы повысить качество ваших проектов!
