# Interview Prep Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hidden `/interviews` route with a Q&A tab (flashcard, list, quiz modes) and a LeetCode tab, tailored to the user's stack (React, TypeScript, Angular, .NET/C#).

**Architecture:** Tab-driven shell (`InterviewComponent`) with isolated mode sub-components. All data is static and lives in `src/data/interviewData.js`. Dark mode is inherited from `DarkModeContext`. Language is local state inside `InterviewQAComponent`.

**Tech Stack:** React, react-bootstrap (`Tabs`, `Tab`, `Accordion`, `Badge`, `Container`), Font Awesome icons, SCSS with BEM-like prefixes (`iv-`).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/data/interviewData.js` | All static Q&A + LeetCode data |
| Create | `src/styles/components/_interview.scss` | All interview module styles |
| Modify | `src/styles/styles.scss` | Import `_interview.scss` |
| Create | `src/components/InterviewFlashcardMode.js` | Flashcard mode UI |
| Create | `src/components/InterviewListMode.js` | List/accordion mode UI |
| Create | `src/components/InterviewQuizMode.js` | Quiz mode UI |
| Create | `src/components/InterviewLeetCodeComponent.js` | LeetCode tab UI |
| Create | `src/components/InterviewQAComponent.js` | Q&A tab shell (toolbar + mode switcher) |
| Create | `src/components/InterviewComponent.js` | Top-level tab shell |
| Modify | `src/routers/DashboardRoutes.js` | Add `/interviews` route |

---

## Task 1: Data file — Q&A questions and LeetCode problems

**Files:**
- Create: `src/data/interviewData.js`

This task has no UI. The whole module depends on this data. Write it first.

- [ ] **Step 1: Create the `src/data/` directory**

Run: `mkdir -p src/data`

- [ ] **Step 2: Create `src/data/interviewData.js`**

```js
// ─── Interview Prep Data ───
// Q&A questions: used by Flashcard and List modes
// Quiz questions: same shape + options + correctIndex
// LeetCode problems: title, difficulty, category, url, tags

export const qaQuestions = [
  // ── React ──
  {
    id: 1,
    category: 'react',
    difficulty: 'easy',
    question: {
      en: 'What is the virtual DOM and why does React use it?',
      es: '¿Qué es el DOM virtual y por qué lo usa React?',
    },
    answer: {
      en: 'The virtual DOM is an in-memory representation of the real DOM. React updates it first, then diffs it against the previous snapshot and applies only the necessary changes to the real DOM, minimising expensive reflows and repaints.',
      es: 'El DOM virtual es una representación en memoria del DOM real. React lo actualiza primero, luego calcula las diferencias con la versión anterior y aplica únicamente los cambios necesarios al DOM real, minimizando los costosos reflows y repaints.',
    },
  },
  {
    id: 2,
    category: 'react',
    difficulty: 'easy',
    question: {
      en: 'What is the difference between a controlled and an uncontrolled component?',
      es: '¿Cuál es la diferencia entre un componente controlado y uno no controlado?',
    },
    answer: {
      en: 'A controlled component has its form data managed by React state. An uncontrolled component stores its own state internally via the DOM, accessed through a ref. Controlled components give you more predictable data flow and are easier to validate.',
      es: 'Un componente controlado tiene sus datos de formulario gestionados por el estado de React. Un componente no controlado almacena su propio estado en el DOM, accedido mediante una ref. Los controlados ofrecen un flujo de datos más predecible y son más fáciles de validar.',
    },
  },
  {
    id: 3,
    category: 'react',
    difficulty: 'medium',
    question: {
      en: 'When would you use useCallback vs useMemo?',
      es: '¿Cuándo usarías useCallback vs useMemo?',
    },
    answer: {
      en: 'useCallback memoises a function reference — useful when passing callbacks to child components that are wrapped in React.memo to avoid unnecessary re-renders. useMemo memoises the result of a computation — useful for expensive calculations that should not re-run on every render. Both accept a dependency array.',
      es: 'useCallback memoriza una referencia de función — útil al pasar callbacks a componentes hijo envueltos en React.memo para evitar re-renders innecesarios. useMemo memoriza el resultado de un cálculo — útil para operaciones costosas que no deben recalcularse en cada render. Ambos aceptan un array de dependencias.',
    },
  },
  {
    id: 4,
    category: 'react',
    difficulty: 'medium',
    question: {
      en: 'What is the React reconciliation algorithm?',
      es: '¿Qué es el algoritmo de reconciliación de React?',
    },
    answer: {
      en: 'Reconciliation is the process React uses to diff two virtual DOM trees and determine the minimum number of operations to update the real DOM. React assumes elements of different types produce different trees (it unmounts them) and uses the "key" prop to match children in lists for efficient reuse.',
      es: 'La reconciliación es el proceso que usa React para comparar dos árboles del DOM virtual y determinar el mínimo de operaciones necesarias para actualizar el DOM real. React asume que elementos de tipos distintos producen árboles distintos (los desmonta) y usa la prop "key" para emparejar nodos hijos en listas para su reutilización eficiente.',
    },
  },
  {
    id: 5,
    category: 'react',
    difficulty: 'hard',
    question: {
      en: 'What is the React Fiber architecture and how does it improve on the previous stack reconciler?',
      es: '¿Qué es la arquitectura React Fiber y cómo mejora al reconciliador de pila anterior?',
    },
    answer: {
      en: 'React Fiber is a complete rewrite of the reconciler introduced in React 16. The old stack reconciler was synchronous and recursive — once started, it could not be interrupted, which could block the main thread and cause dropped frames. Fiber makes reconciliation incremental and interruptible. Work is split into units ("fibers"), and React can pause, resume, or abandon work based on priority, enabling concurrent features like Suspense and transitions.',
      es: 'React Fiber es una reescritura completa del reconciliador introducida en React 16. El reconciliador de pila anterior era sincrónico y recursivo — una vez iniciado no podía interrumpirse, bloqueando el hilo principal y causando caídas de fotogramas. Fiber hace que la reconciliación sea incremental e interrumpible. El trabajo se divide en unidades ("fibers") y React puede pausar, reanudar o cancelar trabajo según su prioridad, habilitando características concurrentes como Suspense y transiciones.',
    },
  },
  {
    id: 6,
    category: 'react',
    difficulty: 'hard',
    question: {
      en: 'How does the Context API differ from Redux, and when would you prefer one over the other?',
      es: '¿Cómo difiere la Context API de Redux, y cuándo preferirías una sobre la otra?',
    },
    answer: {
      en: 'Context is built into React and is ideal for low-frequency global state (theme, locale, current user). Every consumer re-renders when context value changes, so it is not optimised for frequently changing state shared by many components. Redux adds a predictable state container with middleware, selectors, and developer tools — better for complex, high-frequency state, or when you need fine-grained subscriptions to avoid unnecessary re-renders.',
      es: 'Context está integrado en React y es ideal para estado global de baja frecuencia de cambio (tema, idioma, usuario actual). Cada consumidor se re-renderiza cuando cambia el valor del contexto, por lo que no está optimizado para estado que cambia frecuentemente y es compartido por muchos componentes. Redux agrega un contenedor de estado predecible con middleware, selectores y herramientas de desarrollo — mejor para estado complejo de alta frecuencia o cuando se necesitan suscripciones granulares.',
    },
  },

  // ── TypeScript ──
  {
    id: 7,
    category: 'typescript',
    difficulty: 'easy',
    question: {
      en: 'What is the difference between "interface" and "type" in TypeScript?',
      es: '¿Cuál es la diferencia entre "interface" y "type" en TypeScript?',
    },
    answer: {
      en: 'Both can describe object shapes. Interfaces are extendable via "extends" and support declaration merging (you can declare the same interface in multiple places and TypeScript merges them). Types support unions, intersections, tuples, mapped types, and conditional types — things interfaces cannot express. Prefer interface for object shapes that may be extended; prefer type for unions and computed types.',
      es: 'Ambos pueden describir formas de objetos. Las interfaces son extensibles mediante "extends" y soportan fusión de declaraciones (puedes declarar la misma interfaz en múltiples lugares y TypeScript las fusiona). Los types soportan uniones, intersecciones, tuplas, tipos mapeados y tipos condicionales — cosas que las interfaces no pueden expresar. Preferir interface para formas de objeto que puedan extenderse; preferir type para uniones y tipos calculados.',
    },
  },
  {
    id: 8,
    category: 'typescript',
    difficulty: 'easy',
    question: {
      en: 'What does the "unknown" type mean and how does it differ from "any"?',
      es: '¿Qué significa el tipo "unknown" y en qué se diferencia de "any"?',
    },
    answer: {
      en: '"any" disables all type checking — you can do anything with an "any" value. "unknown" is the type-safe counterpart: it represents a value you do not know the type of, but TypeScript forces you to narrow it (via typeof, instanceof, or type guards) before you can use it. Prefer "unknown" for external inputs to preserve safety.',
      es: '"any" deshabilita toda verificación de tipos — puedes hacer cualquier cosa con un valor "any". "unknown" es su contraparte segura: representa un valor cuyo tipo desconoces, pero TypeScript te obliga a estrecharlo (via typeof, instanceof, o type guards) antes de poder usarlo. Preferir "unknown" para entradas externas para preservar la seguridad.',
    },
  },
  {
    id: 9,
    category: 'typescript',
    difficulty: 'medium',
    question: {
      en: 'What are generics and when would you use them?',
      es: '¿Qué son los genéricos y cuándo los usarías?',
    },
    answer: {
      en: 'Generics let you write reusable code that works with multiple types while preserving type safety. Instead of "any", you use a type parameter (e.g. T) that is resolved at the call site. A classic example is Array<T> or a repository interface like Repository<T>. Use generics when the same logic applies to multiple shapes and you want the compiler to enforce that the input and output types are consistent.',
      es: 'Los genéricos te permiten escribir código reutilizable que funciona con múltiples tipos mientras preservas la seguridad de tipos. En vez de "any", usas un parámetro de tipo (ej. T) que se resuelve en el punto de llamada. Un ejemplo clásico es Array<T> o una interfaz de repositorio como Repository<T>. Usa genéricos cuando la misma lógica aplica a múltiples formas y quieres que el compilador verifique que los tipos de entrada y salida sean consistentes.',
    },
  },
  {
    id: 10,
    category: 'typescript',
    difficulty: 'medium',
    question: {
      en: 'What is a discriminated union and why is it useful?',
      es: '¿Qué es una unión discriminada y por qué es útil?',
    },
    answer: {
      en: 'A discriminated union is a union of types that share a common literal property (the discriminant). TypeScript narrows the type automatically in switch/if blocks based on that property. Example: { kind: "circle", radius: number } | { kind: "square", side: number }. They model state machines and API responses cleanly, replacing fragile optional fields with explicit variants.',
      es: 'Una unión discriminada es una unión de tipos que comparten una propiedad literal común (el discriminante). TypeScript estrecha el tipo automáticamente en bloques switch/if basándose en esa propiedad. Ejemplo: { kind: "circle", radius: number } | { kind: "square", side: number }. Modelan máquinas de estado y respuestas de API de forma limpia, reemplazando campos opcionales frágiles con variantes explícitas.',
    },
  },
  {
    id: 11,
    category: 'typescript',
    difficulty: 'hard',
    question: {
      en: 'What are utility types? Name and explain at least four.',
      es: '¿Qué son los utility types? Nombra y explica al menos cuatro.',
    },
    answer: {
      en: 'Partial<T> makes all properties optional. Required<T> makes all optional properties required. Readonly<T> prevents reassignment of properties. Pick<T, K> creates a new type with only the listed keys. Omit<T, K> creates a new type without the listed keys. Record<K, V> creates an object type with keys K and values V. ReturnType<T> extracts the return type of a function type.',
      es: 'Partial<T> hace todas las propiedades opcionales. Required<T> hace todas las propiedades opcionales requeridas. Readonly<T> previene la reasignación de propiedades. Pick<T, K> crea un nuevo tipo solo con las claves indicadas. Omit<T, K> crea un nuevo tipo sin las claves indicadas. Record<K, V> crea un tipo objeto con claves K y valores V. ReturnType<T> extrae el tipo de retorno de un tipo función.',
    },
  },
  {
    id: 12,
    category: 'typescript',
    difficulty: 'hard',
    question: {
      en: 'What is the difference between "extends" and "implements" in TypeScript classes?',
      es: '¿Cuál es la diferencia entre "extends" e "implements" en clases TypeScript?',
    },
    answer: {
      en: '"extends" inherits from another class, including its implementation. "implements" declares that a class satisfies the shape of an interface or type without inheriting any implementation. A class can extend at most one class but can implement multiple interfaces. "implements" is a compile-time only check — it generates no extra runtime code.',
      es: '"extends" hereda de otra clase, incluyendo su implementación. "implements" declara que una clase satisface la forma de una interfaz o tipo sin heredar ninguna implementación. Una clase puede extender como máximo una clase pero puede implementar múltiples interfaces. "implements" es solo una verificación en tiempo de compilación — no genera código en runtime.',
    },
  },

  // ── Angular ──
  {
    id: 13,
    category: 'angular',
    difficulty: 'easy',
    question: {
      en: 'What is Angular\'s dependency injection system?',
      es: '¿Qué es el sistema de inyección de dependencias de Angular?',
    },
    answer: {
      en: 'Angular\'s DI system is a design pattern where a class declares what it needs (dependencies) instead of creating them. Angular\'s injector creates and manages instances, passing them where needed. Services are registered via @Injectable and the providers array (in a module or component). This makes classes easier to test — you inject mocks instead of real services.',
      es: 'El sistema de DI de Angular es un patrón de diseño donde una clase declara lo que necesita (dependencias) en lugar de crearlas. El inyector de Angular crea y gestiona instancias, pasándolas donde se necesitan. Los servicios se registran mediante @Injectable y el array providers (en un módulo o componente). Esto facilita las pruebas — inyectas mocks en lugar de servicios reales.',
    },
  },
  {
    id: 14,
    category: 'angular',
    difficulty: 'easy',
    question: {
      en: 'What is the difference between ngOnInit and a constructor in a component?',
      es: '¿Cuál es la diferencia entre ngOnInit y el constructor en un componente?',
    },
    answer: {
      en: 'The constructor is called by JavaScript when the class is instantiated. It is for dependency injection only — Angular\'s DI passes services here. ngOnInit is an Angular lifecycle hook called after the component is initialised and its input properties have been set. Any logic that depends on @Input values must go in ngOnInit, not the constructor.',
      es: 'El constructor es llamado por JavaScript cuando se instancia la clase. Es solo para inyección de dependencias — el DI de Angular pasa servicios aquí. ngOnInit es un hook del ciclo de vida llamado después de que el componente se inicializa y sus propiedades de entrada han sido establecidas. Cualquier lógica que dependa de valores @Input debe ir en ngOnInit, no en el constructor.',
    },
  },
  {
    id: 15,
    category: 'angular',
    difficulty: 'medium',
    question: {
      en: 'What is the difference between Observable and Promise?',
      es: '¿Cuál es la diferencia entre Observable y Promise?',
    },
    answer: {
      en: 'A Promise resolves once and is eager (starts immediately). An Observable is lazy (starts when subscribed), can emit multiple values over time, and supports cancellation via unsubscribe. Observables also support operators (map, filter, switchMap, etc.) for composing async streams. Angular\'s HttpClient returns Observables, which lets you cancel in-flight requests by unsubscribing.',
      es: 'Una Promise resuelve una vez y es eager (comienza inmediatamente). Un Observable es lazy (comienza al suscribirse), puede emitir múltiples valores a lo largo del tiempo, y soporta cancelación mediante unsubscribe. Los Observables también soportan operadores (map, filter, switchMap, etc.) para componer flujos asíncronos. El HttpClient de Angular retorna Observables, lo que permite cancelar solicitudes en vuelo desuscribiéndose.',
    },
  },
  {
    id: 16,
    category: 'angular',
    difficulty: 'medium',
    question: {
      en: 'What is change detection in Angular, and what is the OnPush strategy?',
      es: '¿Qué es la detección de cambios en Angular y qué es la estrategia OnPush?',
    },
    answer: {
      en: 'Angular\'s default change detection checks every component in the tree on every event. OnPush restricts this — a component with OnPush only re-renders when: its @Input reference changes, an event originates from within it, or an Observable it subscribes to via async pipe emits. OnPush dramatically improves performance in large applications by skipping unnecessary checks.',
      es: 'La detección de cambios por defecto de Angular verifica cada componente en el árbol en cada evento. OnPush restringe esto — un componente con OnPush solo se re-renderiza cuando: cambia la referencia de su @Input, un evento se origina dentro de él, o un Observable al que se suscribe mediante async pipe emite. OnPush mejora dramáticamente el rendimiento en aplicaciones grandes al omitir verificaciones innecesarias.',
    },
  },
  {
    id: 17,
    category: 'angular',
    difficulty: 'hard',
    question: {
      en: 'What is the difference between a module-based and a standalone component in Angular 14+?',
      es: '¿Cuál es la diferencia entre un componente basado en módulos y uno standalone en Angular 14+?',
    },
    answer: {
      en: 'In the traditional module-based approach, components must be declared in an NgModule. Standalone components (introduced in Angular 14, default from Angular 17) declare their own imports directly and do not need a module. This reduces boilerplate, makes components more self-contained and easier to lazy-load, and simplifies tree-shaking.',
      es: 'En el enfoque tradicional basado en módulos, los componentes deben declararse en un NgModule. Los componentes standalone (introducidos en Angular 14, por defecto desde Angular 17) declaran sus propias importaciones directamente y no necesitan un módulo. Esto reduce el boilerplate, hace que los componentes sean más autónomos y fáciles de lazy-load, y simplifica el tree-shaking.',
    },
  },
  {
    id: 18,
    category: 'angular',
    difficulty: 'hard',
    question: {
      en: 'What are Angular Signals and how do they differ from traditional RxJS-based state management?',
      es: '¿Qué son los Angular Signals y cómo se diferencian de la gestión de estado tradicional con RxJS?',
    },
    answer: {
      en: 'Signals (Angular 16+) are reactive primitives — a signal holds a value and notifies its consumers when it changes. Unlike Observables, they are synchronous, do not need subscriptions, and integrate directly with change detection so Angular knows exactly which components need to re-render. RxJS is still better for complex async event streams and composing multiple sources. Signals are simpler for local and shared component state.',
      es: 'Los Signals (Angular 16+) son primitivas reactivas — un signal almacena un valor y notifica a sus consumidores cuando cambia. A diferencia de los Observables, son síncronos, no necesitan suscripciones y se integran directamente con la detección de cambios para que Angular sepa exactamente qué componentes deben re-renderizarse. RxJS sigue siendo mejor para flujos de eventos asíncronos complejos. Los Signals son más simples para estado local y compartido en componentes.',
    },
  },

  // ── .NET / C# ──
  {
    id: 19,
    category: 'dotnet',
    difficulty: 'easy',
    question: {
      en: 'What is the difference between value types and reference types in C#?',
      es: '¿Cuál es la diferencia entre tipos de valor y tipos de referencia en C#?',
    },
    answer: {
      en: 'Value types (struct, int, bool, etc.) are stored on the stack (or inline in their containing object) and copied on assignment. Reference types (class, interface, delegate) are stored on the heap — only a reference (pointer) is copied on assignment. Changes through one reference are visible through others. Structs are better for small, immutable data; classes for entities with identity and behaviour.',
      es: 'Los tipos de valor (struct, int, bool, etc.) se almacenan en el stack (o en línea dentro de su objeto contenedor) y se copian en la asignación. Los tipos de referencia (class, interface, delegate) se almacenan en el heap — solo se copia una referencia (puntero) en la asignación. Los cambios a través de una referencia son visibles a través de otras. Los structs son mejores para datos pequeños e inmutables; las clases para entidades con identidad y comportamiento.',
    },
  },
  {
    id: 20,
    category: 'dotnet',
    difficulty: 'easy',
    question: {
      en: 'What is async/await in C# and how does it work under the hood?',
      es: '¿Qué es async/await en C# y cómo funciona internamente?',
    },
    answer: {
      en: 'async/await is syntactic sugar over the Task-based Asynchronous Pattern. The compiler transforms an async method into a state machine. When an await expression is hit, the method returns control to the caller if the awaited task is not yet complete. When the task completes, the state machine resumes from where it left off, without blocking the calling thread. This allows high I/O throughput without spawning new threads.',
      es: 'async/await es azúcar sintáctico sobre el patrón asíncrono basado en Task. El compilador transforma un método async en una máquina de estados. Cuando se encuentra una expresión await, el método devuelve el control al llamador si la tarea esperada aún no completó. Cuando la tarea completa, la máquina de estados se reanuda desde donde se detuvo, sin bloquear el hilo llamador. Esto permite alta capacidad de I/O sin crear nuevos hilos.',
    },
  },
  {
    id: 21,
    category: 'dotnet',
    difficulty: 'medium',
    question: {
      en: 'What is the difference between IEnumerable, ICollection, IList, and IQueryable?',
      es: '¿Cuál es la diferencia entre IEnumerable, ICollection, IList e IQueryable?',
    },
    answer: {
      en: 'IEnumerable is the base — forward-only iteration, evaluated lazily. ICollection adds Count, Add, Remove — works in memory. IList adds index-based access. IQueryable extends IEnumerable but builds an expression tree that is translated to the underlying source (e.g. SQL via EF Core) and executed there. Never call ToList() on an IQueryable before filtering if you want the query to execute on the database.',
      es: 'IEnumerable es la base — iteración unidireccional, evaluación lazy. ICollection agrega Count, Add, Remove — funciona en memoria. IList agrega acceso basado en índice. IQueryable extiende IEnumerable pero construye un árbol de expresiones que se traduce a la fuente subyacente (ej. SQL vía EF Core) y se ejecuta allí. Nunca llames ToList() en un IQueryable antes de filtrar si quieres que la consulta se ejecute en la base de datos.',
    },
  },
  {
    id: 22,
    category: 'dotnet',
    difficulty: 'medium',
    question: {
      en: 'What is dependency injection in ASP.NET Core and what are the three lifetime scopes?',
      es: '¿Qué es la inyección de dependencias en ASP.NET Core y cuáles son los tres ámbitos de vida?',
    },
    answer: {
      en: 'ASP.NET Core has built-in DI. Services are registered in Program.cs and injected via constructor. Singleton: one instance for the application lifetime. Scoped: one instance per HTTP request — the standard for DbContext and most services. Transient: a new instance every time the service is requested — for lightweight, stateless services. Never inject a Scoped service into a Singleton (captive dependency problem).',
      es: 'ASP.NET Core tiene DI integrado. Los servicios se registran en Program.cs y se inyectan por constructor. Singleton: una instancia para toda la vida de la aplicación. Scoped: una instancia por solicitud HTTP — el estándar para DbContext y la mayoría de los servicios. Transient: una nueva instancia cada vez que se solicita el servicio — para servicios ligeros y sin estado. Nunca inyectes un servicio Scoped en un Singleton (problema de dependencia cautiva).',
    },
  },
  {
    id: 23,
    category: 'dotnet',
    difficulty: 'hard',
    question: {
      en: 'What is the difference between Task.Run, Task.Factory.StartNew, and async/await for CPU-bound vs I/O-bound work?',
      es: '¿Cuál es la diferencia entre Task.Run, Task.Factory.StartNew y async/await para trabajo CPU-bound vs I/O-bound?',
    },
    answer: {
      en: 'async/await is ideal for I/O-bound work — it does not block threads; it releases the thread to the pool while waiting. Task.Run offloads CPU-bound work to a thread pool thread — use it in UI apps to keep the UI thread free. In ASP.NET Core, Task.Run is usually unnecessary for I/O (use await directly) and wasteful for CPU (you are just shifting work between pool threads). Task.Factory.StartNew is lower-level and rarely needed unless you need long-running task options.',
      es: 'async/await es ideal para trabajo I/O-bound — no bloquea hilos; libera el hilo al pool mientras espera. Task.Run desplaza trabajo CPU-bound a un hilo del pool — úsalo en apps de UI para mantener el hilo de UI libre. En ASP.NET Core, Task.Run es generalmente innecesario para I/O (usa await directamente) y un desperdicio para CPU (solo estás moviendo trabajo entre hilos del pool). Task.Factory.StartNew es de más bajo nivel y raramente necesario salvo que necesites opciones de tarea de larga duración.',
    },
  },
  {
    id: 24,
    category: 'dotnet',
    difficulty: 'hard',
    question: {
      en: 'What is the Repository and Unit of Work patterns in the context of EF Core?',
      es: '¿Qué son los patrones Repository y Unit of Work en el contexto de EF Core?',
    },
    answer: {
      en: 'Repository abstracts data access — business logic talks to an interface, not directly to DbContext. Unit of Work groups multiple repository operations into a single transaction that either commits or rolls back atomically. In EF Core, DbContext already implements both patterns: it tracks changes (Unit of Work) and exposes DbSet<T> (Repository). Adding a custom layer on top is often unnecessary indirection unless you need to swap data sources or achieve full domain isolation.',
      es: 'Repository abstrae el acceso a datos — la lógica de negocio habla con una interfaz, no directamente con DbContext. Unit of Work agrupa múltiples operaciones de repositorio en una única transacción que se confirma o revierte atómicamente. En EF Core, DbContext ya implementa ambos patrones: rastrea cambios (Unit of Work) y expone DbSet<T> (Repository). Agregar una capa personalizada encima suele ser una indirección innecesaria a menos que necesites intercambiar fuentes de datos o lograr aislamiento de dominio completo.',
    },
  },
];

// ─── Quiz Questions ───
// Same questions as Q&A, adapted with 4 options + correct index

export const quizQuestions = [
  {
    id: 1,
    category: 'react',
    difficulty: 'easy',
    question: {
      en: 'What is the main purpose of the virtual DOM in React?',
      es: '¿Cuál es el propósito principal del DOM virtual en React?',
    },
    options: {
      en: [
        'To replace the real DOM entirely',
        'To minimise real DOM operations by diffing in memory first',
        'To store component state persistently',
        'To enable server-side rendering only',
      ],
      es: [
        'Reemplazar el DOM real por completo',
        'Minimizar operaciones en el DOM real haciendo diff en memoria primero',
        'Almacenar el estado del componente de forma persistente',
        'Habilitar solo el renderizado del lado del servidor',
      ],
    },
    correctIndex: 1,
  },
  {
    id: 2,
    category: 'react',
    difficulty: 'medium',
    question: {
      en: 'What does useCallback memoize?',
      es: '¿Qué memoriza useCallback?',
    },
    options: {
      en: [
        'The result of an expensive computation',
        'A function reference so it does not change on every render',
        'The entire component tree',
        'An HTTP response to avoid re-fetching',
      ],
      es: [
        'El resultado de un cálculo costoso',
        'Una referencia de función para que no cambie en cada render',
        'Todo el árbol de componentes',
        'Una respuesta HTTP para evitar re-fetch',
      ],
    },
    correctIndex: 1,
  },
  {
    id: 3,
    category: 'typescript',
    difficulty: 'easy',
    question: {
      en: 'Which TypeScript type forces you to narrow before using a value?',
      es: '¿Qué tipo de TypeScript te obliga a estrechar antes de usar un valor?',
    },
    options: {
      en: ['any', 'unknown', 'never', 'void'],
      es: ['any', 'unknown', 'never', 'void'],
    },
    correctIndex: 1,
  },
  {
    id: 4,
    category: 'typescript',
    difficulty: 'medium',
    question: {
      en: 'Which utility type makes all properties of T optional?',
      es: '¿Qué utility type hace todas las propiedades de T opcionales?',
    },
    options: {
      en: ['Required<T>', 'Readonly<T>', 'Partial<T>', 'Pick<T, K>'],
      es: ['Required<T>', 'Readonly<T>', 'Partial<T>', 'Pick<T, K>'],
    },
    correctIndex: 2,
  },
  {
    id: 5,
    category: 'angular',
    difficulty: 'easy',
    question: {
      en: 'Which Angular lifecycle hook should you use when you need to access @Input values?',
      es: '¿Qué hook del ciclo de vida de Angular debes usar cuando necesitas acceder a valores @Input?',
    },
    options: {
      en: ['constructor', 'ngOnChanges only', 'ngOnInit', 'ngAfterViewInit'],
      es: ['constructor', 'ngOnChanges únicamente', 'ngOnInit', 'ngAfterViewInit'],
    },
    correctIndex: 2,
  },
  {
    id: 6,
    category: 'angular',
    difficulty: 'medium',
    question: {
      en: 'What does the OnPush change detection strategy do?',
      es: '¿Qué hace la estrategia de detección de cambios OnPush?',
    },
    options: {
      en: [
        'Checks the component on every event across the whole tree',
        'Disables change detection entirely',
        'Only re-renders when @Input reference changes, an internal event fires, or async pipe emits',
        'Runs change detection on a timer instead of on events',
      ],
      es: [
        'Verifica el componente en cada evento en todo el árbol',
        'Deshabilita la detección de cambios por completo',
        'Solo re-renderiza cuando cambia la referencia @Input, ocurre un evento interno, o async pipe emite',
        'Ejecuta la detección de cambios en un temporizador en vez de en eventos',
      ],
    },
    correctIndex: 2,
  },
  {
    id: 7,
    category: 'dotnet',
    difficulty: 'easy',
    question: {
      en: 'Which service lifetime creates one instance per HTTP request in ASP.NET Core?',
      es: '¿Qué lifetime de servicio crea una instancia por solicitud HTTP en ASP.NET Core?',
    },
    options: {
      en: ['Singleton', 'Scoped', 'Transient', 'PerRequest'],
      es: ['Singleton', 'Scoped', 'Transient', 'PerRequest'],
    },
    correctIndex: 1,
  },
  {
    id: 8,
    category: 'dotnet',
    difficulty: 'medium',
    question: {
      en: 'What is the key difference between IEnumerable and IQueryable?',
      es: '¿Cuál es la diferencia clave entre IEnumerable e IQueryable?',
    },
    options: {
      en: [
        'IQueryable only works with arrays',
        'IEnumerable executes queries server-side; IQueryable in memory',
        'IQueryable builds an expression tree executed at the data source (e.g. SQL)',
        'There is no difference — they are interchangeable',
      ],
      es: [
        'IQueryable solo funciona con arrays',
        'IEnumerable ejecuta consultas del lado del servidor; IQueryable en memoria',
        'IQueryable construye un árbol de expresiones ejecutado en la fuente de datos (ej. SQL)',
        'No hay diferencia — son intercambiables',
      ],
    },
    correctIndex: 2,
  },
  {
    id: 9,
    category: 'react',
    difficulty: 'hard',
    question: {
      en: 'What problem does React Fiber solve over the old stack reconciler?',
      es: '¿Qué problema resuelve React Fiber sobre el antiguo reconciliador de pila?',
    },
    options: {
      en: [
        'It adds TypeScript support to React',
        'It allows synchronous and blocking reconciliation',
        'It makes reconciliation incremental and interruptible, enabling concurrent features',
        'It removes the need for a virtual DOM',
      ],
      es: [
        'Agrega soporte de TypeScript a React',
        'Permite una reconciliación sincrónica y bloqueante',
        'Hace que la reconciliación sea incremental e interrumpible, habilitando características concurrentes',
        'Elimina la necesidad del DOM virtual',
      ],
    },
    correctIndex: 2,
  },
  {
    id: 10,
    category: 'typescript',
    difficulty: 'hard',
    question: {
      en: 'What is a discriminated union used for?',
      es: '¿Para qué se usa una unión discriminada?',
    },
    options: {
      en: [
        'To merge two interfaces at compile time',
        'To type arrays of mixed values',
        'To model variants of a type sharing a common literal property for safe narrowing',
        'To extend generic constraints',
      ],
      es: [
        'Para fusionar dos interfaces en tiempo de compilación',
        'Para tipar arrays de valores mixtos',
        'Para modelar variantes de un tipo que comparten una propiedad literal común para estrechar de forma segura',
        'Para extender restricciones genéricas',
      ],
    },
    correctIndex: 2,
  },
];

// ─── LeetCode Problems ───

export const leetcodeProblems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'arrays',
    url: 'https://leetcode.com/problems/two-sum/',
    tags: ['hash-map', 'arrays'],
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'easy',
    category: 'stack',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    tags: ['stack', 'strings'],
  },
  {
    id: 3,
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    tags: ['linked-list', 'recursion'],
  },
  {
    id: 4,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    category: 'arrays',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    tags: ['arrays', 'sliding-window'],
  },
  {
    id: 5,
    title: 'Climbing Stairs',
    difficulty: 'easy',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/climbing-stairs/',
    tags: ['dynamic-programming', 'memoization'],
  },
  {
    id: 6,
    title: 'Maximum Subarray',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/maximum-subarray/',
    tags: ['dynamic-programming', 'arrays'],
  },
  {
    id: 7,
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
    tags: ['arrays', 'prefix-sum'],
  },
  {
    id: 8,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    category: 'strings',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    tags: ['sliding-window', 'hash-map', 'strings'],
  },
  {
    id: 9,
    title: 'Container With Most Water',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/container-with-most-water/',
    tags: ['two-pointers', 'arrays'],
  },
  {
    id: 10,
    title: '3Sum',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/3sum/',
    tags: ['two-pointers', 'arrays', 'sorting'],
  },
  {
    id: 11,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    category: 'trees',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    tags: ['bfs', 'trees', 'queue'],
  },
  {
    id: 12,
    title: 'Number of Islands',
    difficulty: 'medium',
    category: 'graphs',
    url: 'https://leetcode.com/problems/number-of-islands/',
    tags: ['dfs', 'bfs', 'graphs'],
  },
  {
    id: 13,
    title: 'Coin Change',
    difficulty: 'medium',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/coin-change/',
    tags: ['dynamic-programming', 'bfs'],
  },
  {
    id: 14,
    title: 'Word Search',
    difficulty: 'medium',
    category: 'graphs',
    url: 'https://leetcode.com/problems/word-search/',
    tags: ['backtracking', 'dfs', 'matrix'],
  },
  {
    id: 15,
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    tags: ['dynamic-programming', 'binary-search'],
  },
  {
    id: 16,
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    category: 'arrays',
    url: 'https://leetcode.com/problems/trapping-rain-water/',
    tags: ['two-pointers', 'stack', 'arrays'],
  },
  {
    id: 17,
    title: 'Merge k Sorted Lists',
    difficulty: 'hard',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    tags: ['linked-list', 'heap', 'divide-and-conquer'],
  },
  {
    id: 18,
    title: 'Word Ladder',
    difficulty: 'hard',
    category: 'graphs',
    url: 'https://leetcode.com/problems/word-ladder/',
    tags: ['bfs', 'graphs', 'strings'],
  },
];
```

- [ ] **Step 3: Verify the file was created**

Run: `ls src/data/`
Expected: `interviewData.js` appears.

- [ ] **Step 4: Commit**

```bash
git add src/data/interviewData.js
git commit -m "feat: add static interview Q&A and LeetCode data"
```

---

## Task 2: Styles — `_interview.scss` and import

**Files:**
- Create: `src/styles/components/_interview.scss`
- Modify: `src/styles/styles.scss` (add one import line)

The class prefix is `iv-` throughout. Dark/light mode follows the `.iv-dark` / `.iv-light` class on the container, same pattern as `.jb-dark` / `.jb-light` in `_jobboard.scss`.

- [ ] **Step 1: Create `src/styles/components/_interview.scss`**

```scss
// ─── Interview Prep Module Styles ───

.iv-container {
  min-height: 100vh;
  padding: 40px 5% 80px;
  font-family: 'Montserrat', 'Segoe UI', sans-serif;
}

.iv-dark {
  background: #0a0a0f;
  color: #e8e8ec;
}

.iv-light {
  background: #f4f5f7;
  color: #1a1a2e;
}

// ─── Header ───

.iv-header {
  margin-bottom: 32px;
}

.iv-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #388697, #5948d5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 4px;
}

.iv-subtitle {
  opacity: 0.6;
  font-size: 0.95rem;
  margin: 0;
}

// ─── Tabs ───

.iv-tabs {
  .nav-link {
    font-weight: 600;
    font-size: 0.95rem;
    color: inherit;
    opacity: 0.55;
    border: none;
    padding: 10px 20px;
    transition: all 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }

  .nav-link.active {
    opacity: 1;
    border-bottom: 2px solid #5948d5 !important;
    background: transparent;
    color: #5948d5;
  }
}

.iv-dark .iv-tabs .nav-link {
  color: #e8e8ec;
}

.iv-dark .iv-tabs .nav-link.active {
  color: #a89aff;
  border-bottom-color: #a89aff !important;
}

// ─── Toolbar ───

.iv-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  border-radius: 14px;
  margin-bottom: 24px;
}

.iv-dark .iv-toolbar {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.iv-light .iv-toolbar {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.iv-toolbar-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.iv-toolbar-label {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

// ─── Mode & Filter Buttons ───

.iv-btn {
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.iv-dark .iv-btn {
  background: rgba(255, 255, 255, 0.06);
  color: #c8c8d0;
  border-color: rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(89, 72, 213, 0.4);
  }

  &.iv-btn-active {
    background: rgba(89, 72, 213, 0.25);
    color: #a89aff;
    border-color: rgba(89, 72, 213, 0.5);
  }
}

.iv-light .iv-btn {
  background: #f0f0f5;
  color: #444;
  border-color: rgba(0, 0, 0, 0.08);

  &:hover {
    background: #e4e4f0;
    border-color: rgba(89, 72, 213, 0.3);
  }

  &.iv-btn-active {
    background: rgba(89, 72, 213, 0.1);
    color: #5948d5;
    border-color: rgba(89, 72, 213, 0.3);
  }
}

// ─── Flashcard ───

.iv-flashcard-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 24px;
}

.iv-flashcard-progress {
  font-size: 0.85rem;
  opacity: 0.5;
  font-weight: 600;
}

.iv-flashcard-scene {
  width: 100%;
  max-width: 680px;
  height: 260px;
  perspective: 1000px;
  cursor: pointer;
}

.iv-flashcard-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  &.iv-flipped {
    transform: rotateY(180deg);
  }
}

.iv-flashcard-front,
.iv-flashcard-back {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.iv-dark .iv-flashcard-front,
.iv-dark .iv-flashcard-back {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.iv-light .iv-flashcard-front,
.iv-light .iv-flashcard-back {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.iv-flashcard-back {
  transform: rotateY(180deg);
}

.iv-flashcard-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.4;
  margin-bottom: 12px;
}

.iv-flashcard-text {
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
}

.iv-flashcard-hint {
  font-size: 0.75rem;
  opacity: 0.35;
  margin-top: 14px;
}

.iv-flashcard-answer-text {
  font-size: 0.92rem;
  line-height: 1.65;
  opacity: 0.85;
}

.iv-flashcard-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.iv-nav-btn {
  padding: 8px 22px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.iv-dark .iv-nav-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #e8e8ec;

  &:hover:not(:disabled) {
    background: rgba(89, 72, 213, 0.3);
  }
}

.iv-light .iv-nav-btn {
  background: #ebebf3;
  color: #1a1a2e;

  &:hover:not(:disabled) {
    background: rgba(89, 72, 213, 0.12);
    color: #5948d5;
  }
}

.iv-flashcard-actions {
  display: flex;
  gap: 12px;
}

.iv-btn-known {
  background: rgba(52, 199, 89, 0.15) !important;
  color: #34c759 !important;
  border-color: rgba(52, 199, 89, 0.3) !important;

  &:hover {
    background: rgba(52, 199, 89, 0.25) !important;
  }
}

.iv-btn-learning {
  background: rgba(255, 69, 58, 0.12) !important;
  color: #ff453a !important;
  border-color: rgba(255, 69, 58, 0.25) !important;

  &:hover {
    background: rgba(255, 69, 58, 0.2) !important;
  }
}

// ─── Difficulty Badge ───

.iv-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.iv-badge-easy {
  background: rgba(52, 199, 89, 0.15);
  color: #34c759;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.iv-badge-medium {
  background: rgba(255, 204, 0, 0.15);
  color: #c89800;
  border: 1px solid rgba(255, 204, 0, 0.3);
}

.iv-badge-hard {
  background: rgba(255, 69, 58, 0.12);
  color: #ff453a;
  border: 1px solid rgba(255, 69, 58, 0.25);
}

.iv-dark .iv-badge-medium {
  color: #ffcc00;
}

// ─── List Mode ───

.iv-list-group-header {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.45;
  padding: 20px 0 8px;
}

.iv-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.iv-accordion-question {
  font-size: 0.95rem;
  font-weight: 600;
  flex: 1;
  text-align: left;
}

.iv-accordion-answer {
  font-size: 0.9rem;
  line-height: 1.7;
  opacity: 0.8;
  padding: 4px 0;
}

.iv-dark .accordion-button {
  background: rgba(255, 255, 255, 0.03) !important;
  color: #e8e8ec !important;
  box-shadow: none !important;

  &:not(.collapsed) {
    background: rgba(89, 72, 213, 0.1) !important;
    color: #a89aff !important;
  }
}

.iv-dark .accordion-body {
  background: rgba(255, 255, 255, 0.02);
  color: #c8c8d0;
}

.iv-dark .accordion-item {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.07);
}

// ─── Quiz Mode ───

.iv-quiz-wrap {
  max-width: 680px;
  margin: 0 auto;
  padding-top: 24px;
}

.iv-quiz-progress {
  font-size: 0.82rem;
  opacity: 0.45;
  margin-bottom: 20px;
  font-weight: 600;
}

.iv-quiz-question {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 24px;
}

.iv-quiz-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.iv-quiz-option {
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:disabled {
    cursor: default;
  }
}

.iv-dark .iv-quiz-option {
  background: rgba(255, 255, 255, 0.04);
  color: #e8e8ec;
  border-color: rgba(255, 255, 255, 0.08);

  &:hover:not(:disabled) {
    background: rgba(89, 72, 213, 0.15);
    border-color: rgba(89, 72, 213, 0.4);
  }
}

.iv-light .iv-quiz-option {
  background: white;
  color: #1a1a2e;
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

  &:hover:not(:disabled) {
    background: rgba(89, 72, 213, 0.06);
    border-color: rgba(89, 72, 213, 0.25);
  }
}

.iv-quiz-option-correct {
  background: rgba(52, 199, 89, 0.15) !important;
  border-color: rgba(52, 199, 89, 0.4) !important;
  color: #34c759 !important;
}

.iv-quiz-option-wrong {
  background: rgba(255, 69, 58, 0.12) !important;
  border-color: rgba(255, 69, 58, 0.3) !important;
  color: #ff453a !important;
}

.iv-quiz-next-btn {
  padding: 10px 28px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #388697, #5948d5);
  color: white;
  transition: all 0.2s;
  box-shadow: 0 3px 12px rgba(89, 72, 213, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 18px rgba(89, 72, 213, 0.45);
  }
}

// ─── Quiz Score Screen ───

.iv-score-screen {
  text-align: center;
  padding: 60px 20px;
}

.iv-score-number {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #388697, #5948d5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 8px;
}

.iv-score-label {
  font-size: 1.1rem;
  opacity: 0.6;
  margin-bottom: 32px;
}

// ─── Empty State ───

.iv-empty-state {
  text-align: center;
  padding: 80px 20px;
  opacity: 0.45;

  i {
    font-size: 2.5rem;
    margin-bottom: 16px;
    display: block;
  }

  p {
    font-size: 0.95rem;
    max-width: 360px;
    margin: 0 auto;
  }
}

// ─── LeetCode Tab ───

.iv-lc-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.iv-lc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.iv-lc-card {
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.2s ease;
}

.iv-dark .iv-lc-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);

  &:hover {
    border-color: rgba(89, 72, 213, 0.3);
    background: rgba(255, 255, 255, 0.065);
  }
}

.iv-light .iv-lc-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: rgba(89, 72, 213, 0.2);
    box-shadow: 0 4px 20px rgba(89, 72, 213, 0.1);
  }
}

.iv-lc-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.iv-lc-title {
  font-size: 0.97rem;
  font-weight: 700;
  margin: 0;
}

.iv-lc-meta {
  font-size: 0.8rem;
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 6px;
}

.iv-lc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.iv-lc-tag {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 5px;
  font-weight: 600;
}

.iv-dark .iv-lc-tag {
  background: rgba(89, 72, 213, 0.15);
  color: #a89aff;
  border: 1px solid rgba(89, 72, 213, 0.2);
}

.iv-light .iv-lc-tag {
  background: rgba(89, 72, 213, 0.08);
  color: #5948d5;
  border: 1px solid rgba(89, 72, 213, 0.15);
}

.iv-lc-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #388697, #5948d5);
  color: white !important;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(89, 72, 213, 0.3);
  align-self: flex-start;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(89, 72, 213, 0.45);
  }
}

// ─── Responsive ───

@media (max-width: 768px) {
  .iv-container {
    padding: 20px 4% 60px;
  }

  .iv-title {
    font-size: 1.5rem;
  }

  .iv-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .iv-flashcard-scene {
    height: 300px;
  }

  .iv-flashcard-front,
  .iv-flashcard-back {
    padding: 24px 20px;
  }

  .iv-lc-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Import in `src/styles/styles.scss`**

The current end of `styles.scss` looks like:
```scss
@import "./components/jobboard";
// Componentes
```

Change it to:
```scss
@import "./components/jobboard";
@import "./components/interview";
// Componentes
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/components/_interview.scss src/styles/styles.scss
git commit -m "feat: add interview module styles"
```

---

## Task 3: InterviewFlashcardMode component

**Files:**
- Create: `src/components/InterviewFlashcardMode.js`

Props received from parent: `questions` (filtered array), `lang` (`'en'` or `'es'`), `darkMode` (boolean).

- [ ] **Step 1: Create `src/components/InterviewFlashcardMode.js`**

```js
import React, { useState } from 'react';

const InterviewFlashcardMode = ({ questions, lang, darkMode }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());

  // Reset position when the filtered question list changes (e.g. category filter toggled)
  React.useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [questions]);

  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-layer-group'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions. Select at least one category.'}</p>
      </div>
    );
  }

  const current = questions[index];

  const handleFlip = () => setFlipped((f) => !f);

  const handlePrev = () => {
    setFlipped(false);
    setIndex((i) => i - 1);
  };

  const handleNext = () => {
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const handleKnown = () => {
    setKnown((prev) => new Set([...prev, current.id]));
    if (index < questions.length - 1) handleNext();
  };

  const handleLearning = () => {
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(current.id);
      return next;
    });
    if (index < questions.length - 1) handleNext();
  };

  const isKnown = known.has(current.id);

  return (
    <div className='iv-flashcard-wrap'>
      <div className='iv-flashcard-progress'>
        {index + 1} / {questions.length}
        {known.size > 0 && (
          <span style={{ marginLeft: 12, color: '#34c759' }}>
            {known.size} {lang === 'es' ? 'sabidas' : 'known'}
          </span>
        )}
      </div>

      <div className='iv-flashcard-scene' onClick={handleFlip} role='button' aria-label='Flip card'>
        <div className={`iv-flashcard-inner${flipped ? ' iv-flipped' : ''}`}>
          <div className='iv-flashcard-front'>
            <span className='iv-flashcard-label'>{lang === 'es' ? 'Pregunta' : 'Question'}</span>
            <p className='iv-flashcard-text'>{current.question[lang]}</p>
            <span className='iv-flashcard-hint'>{lang === 'es' ? 'Clic para ver respuesta' : 'Click to reveal answer'}</span>
          </div>
          <div className='iv-flashcard-back'>
            <span className='iv-flashcard-label'>{lang === 'es' ? 'Respuesta' : 'Answer'}</span>
            <p className='iv-flashcard-answer-text'>{current.answer[lang]}</p>
          </div>
        </div>
      </div>

      <div className='iv-flashcard-nav'>
        <button className='iv-nav-btn' onClick={handlePrev} disabled={index === 0}>
          ← {lang === 'es' ? 'Anterior' : 'Prev'}
        </button>
        <div className='iv-flashcard-actions'>
          <button
            className={`iv-btn ${isKnown ? 'iv-btn-known' : ''} ${darkMode ? '' : ''}`}
            onClick={handleKnown}
            title={lang === 'es' ? 'La sé' : 'I know this'}
          >
            ✓ {lang === 'es' ? 'La sé' : 'Known'}
          </button>
          <button
            className={`iv-btn ${!isKnown && flipped ? 'iv-btn-learning' : ''}`}
            onClick={handleLearning}
            title={lang === 'es' ? 'Seguir repasando' : 'Still learning'}
          >
            ✗ {lang === 'es' ? 'Repasar' : 'Learning'}
          </button>
        </div>
        <button className='iv-nav-btn' onClick={handleNext} disabled={index === questions.length - 1}>
          {lang === 'es' ? 'Sig' : 'Next'} →
        </button>
      </div>
    </div>
  );
};

export default InterviewFlashcardMode;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewFlashcardMode.js
git commit -m "feat: add flashcard mode component"
```

---

## Task 4: InterviewListMode component

**Files:**
- Create: `src/components/InterviewListMode.js`

Props: `questions`, `lang`.

Groups questions by category, renders Bootstrap Accordion. Dark mode is applied via CSS class on the parent container — no `darkMode` prop needed.

- [ ] **Step 1: Create `src/components/InterviewListMode.js`**

```js
import React from 'react';
import { Accordion } from 'react-bootstrap';

const CATEGORY_LABELS = {
  react: 'React',
  typescript: 'TypeScript',
  angular: 'Angular',
  dotnet: '.NET / C#',
};

const InterviewListMode = ({ questions, lang }) => {
  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-list'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions. Select at least one category.'}</p>
      </div>
    );
  }

  const grouped = questions.reduce((acc, q) => {
    const key = q.category;
    return { ...acc, [key]: [...(acc[key] || []), q] };
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className='iv-list-group-header'>{CATEGORY_LABELS[category] || category}</div>
          <Accordion>
            {items.map((q) => (
              <Accordion.Item eventKey={String(q.id)} key={q.id}>
                <Accordion.Header>
                  <div className='iv-accordion-header'>
                    <span className='iv-accordion-question'>{q.question[lang]}</span>
                    <span className={`iv-badge iv-badge-${q.difficulty}`}>{q.difficulty}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <p className='iv-accordion-answer'>{q.answer[lang]}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default InterviewListMode;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewListMode.js
git commit -m "feat: add list mode component"
```

---

## Task 5: InterviewQuizMode component

**Files:**
- Create: `src/components/InterviewQuizMode.js`

Props: `questions`, `lang`, `darkMode`. Uses `quizQuestions` from data, filtered by the same categories passed from parent.

**Important:** receives `quizQuestions` (not `qaQuestions`) from the parent `InterviewQAComponent`. The parent must pass the right array.

- [ ] **Step 1: Create `src/components/InterviewQuizMode.js`**

```js
import React, { useState } from 'react';

const InterviewQuizMode = ({ questions, lang }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Reset quiz when the filtered question list changes (e.g. category filter toggled)
  React.useEffect(() => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, [questions]);

  const handleRestart = () => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-question-circle'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions available. Please select at least one category.'}</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className='iv-score-screen'>
        <div className='iv-score-number'>{score}/{questions.length}</div>
        <p className='iv-score-label'>
          {lang === 'es' ? `¡Completado! Respondiste ${score} de ${questions.length} correctamente.` : `Done! You got ${score} out of ${questions.length} correct.`}
        </p>
        <button className='iv-quiz-next-btn' onClick={handleRestart}>
          {lang === 'es' ? 'Reintentar' : 'Try Again'}
        </button>
      </div>
    );
  }

  const current = questions[qIndex];
  const options = current.options[lang];
  const answered = selected !== null;

  const handleSelect = (optIndex) => {
    if (answered) return;
    setSelected(optIndex);
    if (optIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  const getOptionClass = (optIndex) => {
    if (!answered) return 'iv-quiz-option';
    if (optIndex === current.correctIndex) return 'iv-quiz-option iv-quiz-option-correct';
    if (optIndex === selected) return 'iv-quiz-option iv-quiz-option-wrong';
    return 'iv-quiz-option';
  };

  return (
    <div className='iv-quiz-wrap'>
      <div className='iv-quiz-progress'>
        {lang === 'es' ? `Pregunta ${qIndex + 1} de ${questions.length}` : `Question ${qIndex + 1} of ${questions.length}`}
      </div>
      <p className='iv-quiz-question'>{current.question[lang]}</p>
      <div className='iv-quiz-options'>
        {options.map((opt, i) => (
          <button
            key={i}
            className={getOptionClass(i)}
            onClick={() => handleSelect(i)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <button className='iv-quiz-next-btn' onClick={handleNext}>
          {qIndex + 1 >= questions.length
            ? (lang === 'es' ? 'Ver resultado' : 'See Result')
            : (lang === 'es' ? 'Siguiente →' : 'Next →')}
        </button>
      )}
    </div>
  );
};

export default InterviewQuizMode;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewQuizMode.js
git commit -m "feat: add quiz mode component"
```

---

## Task 6: InterviewLeetCodeComponent

**Files:**
- Create: `src/components/InterviewLeetCodeComponent.js`

Props: `darkMode`. Reads `leetcodeProblems` directly from `interviewData.js`. LeetCode content (titles, tags, problem names) is always in English — no lang prop needed.

- [ ] **Step 1: Create `src/components/InterviewLeetCodeComponent.js`**

```js
import React, { useState } from 'react';
import { leetcodeProblems } from '../data/interviewData';

// LeetCode content is always in English (matches leetcode.com)
const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];

const InterviewLeetCodeComponent = ({ darkMode }) => {
  const [diffFilter, setDiffFilter] = useState('all');

  const filtered = leetcodeProblems.filter(
    (p) => diffFilter === 'all' || p.difficulty === diffFilter
  );

  return (
    <div>
      <div className='iv-lc-filters'>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            className={`iv-btn${diffFilter === d ? ' iv-btn-active' : ''}`}
            onClick={() => setDiffFilter(d)}
          >
            {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div className='iv-lc-grid'>
        {filtered.map((p) => (
          <div key={p.id} className='iv-lc-card'>
            <div className='iv-lc-card-header'>
              <h4 className='iv-lc-title'>{p.title}</h4>
              <span className={`iv-badge iv-badge-${p.difficulty}`}>{p.difficulty}</span>
            </div>
            <div className='iv-lc-meta'>
              <i className='fas fa-tag'></i>
              <span>Category: {p.category}</span>
            </div>
            <div className='iv-lc-tags'>
              {p.tags.map((tag) => (
                <span key={tag} className='iv-lc-tag'>{tag}</span>
              ))}
            </div>
            <a
              href={p.url}
              target='_blank'
              rel='noopener noreferrer'
              className='iv-lc-link'
            >
              <i className='fas fa-external-link-alt' /> Solve on LeetCode
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewLeetCodeComponent;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewLeetCodeComponent.js
git commit -m "feat: add LeetCode tab component"
```

---

## Task 7: InterviewQAComponent — toolbar + mode switcher

**Files:**
- Create: `src/components/InterviewQAComponent.js`

This is the Q&A tab shell. It holds:
- `mode` state (`'flashcard'`, `'list'`, `'quiz'`)
- `lang` state (`'en'`)
- `activeCategories` state (all enabled by default)
- Filters `qaQuestions` and `quizQuestions` then passes them to the active mode component.

- [ ] **Step 1: Create `src/components/InterviewQAComponent.js`**

```js
import React, { useState } from 'react';
import { qaQuestions, quizQuestions } from '../data/interviewData';
import InterviewFlashcardMode from './InterviewFlashcardMode';
import InterviewListMode from './InterviewListMode';
import InterviewQuizMode from './InterviewQuizMode';

const CATEGORIES = ['react', 'typescript', 'angular', 'dotnet'];
const CATEGORY_LABELS = {
  react: 'React',
  typescript: 'TypeScript',
  angular: 'Angular',
  dotnet: '.NET',
};
const MODES = ['flashcard', 'list', 'quiz'];
const MODE_LABELS = {
  en: { flashcard: 'Flashcard', list: 'List', quiz: 'Quiz' },
  es: { flashcard: 'Tarjetas', list: 'Lista', quiz: 'Quiz' },
};

const InterviewQAComponent = ({ darkMode }) => {
  const [mode, setMode] = useState('flashcard');
  const [lang, setLang] = useState('en');
  const [activeCategories, setActiveCategories] = useState(new Set(CATEGORIES));

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const filteredQA = qaQuestions.filter((q) => activeCategories.has(q.category));
  const filteredQuiz = quizQuestions.filter((q) => activeCategories.has(q.category));

  const modeLabels = MODE_LABELS[lang];

  return (
    <div>
      {/* Toolbar */}
      <div className='iv-toolbar'>
        {/* Mode selector */}
        <div className='iv-toolbar-group'>
          <span className='iv-toolbar-label'>{lang === 'es' ? 'Modo' : 'Mode'}</span>
          {MODES.map((m) => (
            <button
              key={m}
              className={`iv-btn${mode === m ? ' iv-btn-active' : ''}`}
              onClick={() => setMode(m)}
            >
              {modeLabels[m]}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className='iv-toolbar-group'>
          <span className='iv-toolbar-label'>{lang === 'es' ? 'Stack' : 'Stack'}</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`iv-btn${activeCategories.has(cat) ? ' iv-btn-active' : ''}`}
              onClick={() => toggleCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <div className='iv-toolbar-group' style={{ marginLeft: 'auto' }}>
          <span className='iv-toolbar-label'>Lang</span>
          {['en', 'es'].map((l) => (
            <button
              key={l}
              className={`iv-btn${lang === l ? ' iv-btn-active' : ''}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Active mode */}
      {mode === 'flashcard' && (
        <InterviewFlashcardMode questions={filteredQA} lang={lang} darkMode={darkMode} />
      )}
      {mode === 'list' && (
        <InterviewListMode questions={filteredQA} lang={lang} darkMode={darkMode} />
      )}
      {mode === 'quiz' && (
        <InterviewQuizMode questions={filteredQuiz} lang={lang} darkMode={darkMode} />
      )}
    </div>
  );
};

export default InterviewQAComponent;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewQAComponent.js
git commit -m "feat: add Q&A tab with toolbar, filters and mode switcher"
```

---

## Task 8: InterviewComponent — top-level shell

**Files:**
- Create: `src/components/InterviewComponent.js`

Thin shell. No business logic. Uses react-bootstrap uncontrolled `Tabs` + `Tab`.

- [ ] **Step 1: Create `src/components/InterviewComponent.js`**

```js
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { DarkModeContext } from './darkModeContext';
import InterviewQAComponent from './InterviewQAComponent';
import InterviewLeetCodeComponent from './InterviewLeetCodeComponent';

const InterviewComponent = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Container fluid className={`iv-container ${darkMode ? 'iv-dark' : 'iv-light'}`}>
      <div className='iv-header'>
        <h1 className='iv-title'>
          <i className='fas fa-brain' /> Interview Prep
        </h1>
        <p className='iv-subtitle'>
          React · TypeScript · Angular · .NET/C#
        </p>
      </div>

      <Tabs defaultActiveKey='qa' className='iv-tabs mb-4'>
        <Tab eventKey='qa' title='Q & A'>
          <InterviewQAComponent darkMode={darkMode} />
        </Tab>
        <Tab eventKey='leetcode' title='LeetCode'>
          <InterviewLeetCodeComponent darkMode={darkMode} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default InterviewComponent;
```

> **Note:** The LeetCode tab content (titles, tags, category names) is always in English since it mirrors LeetCode.com. No lang prop is needed.

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewComponent.js
git commit -m "feat: add interview shell component with tab layout"
```

---

## Task 9: Register route in DashboardRoutes.js

**Files:**
- Modify: `src/routers/DashboardRoutes.js:1-30`

Add the import and the route. Do NOT touch `NavbarComponent.js`.

- [ ] **Step 1: Add import to `src/routers/DashboardRoutes.js`**

After the existing `import JobBoardComponent` line, add:

```js
import InterviewComponent from '../components/InterviewComponent';
```

- [ ] **Step 2: Add route**

After the `<Route path='/jobs' element={<JobBoardComponent />} />` line, add:

```jsx
<Route path='/interviews' element={<InterviewComponent />} />
```

- [ ] **Step 3: Verify the app builds**

Run: `npm start`
Expected: App compiles without errors. Navigate to `http://localhost:3000/interviews` and verify the page renders.

- [ ] **Step 4: Smoke-test the full feature**

Manual checks:
- [ ] `/interviews` loads without errors
- [ ] Q&A tab shows the toolbar (Mode / Stack / Lang)
- [ ] Flashcard mode: click card flips it; Prev/Next navigates; Known/Learning buttons work
- [ ] List mode: questions grouped by category; clicking accordion row reveals answer
- [ ] Quiz mode: clicking an option highlights correct (green) and wrong (red); score screen appears at the end
- [ ] Filtering to a single category (e.g. only React) shows only React questions
- [ ] Deselecting all categories shows empty-state in all three modes
- [ ] EN/ES toggle changes question and answer text
- [ ] LeetCode tab: difficulty filter works; links open LeetCode in a new tab
- [ ] Dark mode toggle changes styling correctly

- [ ] **Step 5: Commit**

```bash
git add src/routers/DashboardRoutes.js
git commit -m "feat: register /interviews hidden route"
```

---

## Done

The full feature is complete when all 9 tasks are committed and the smoke-test checklist passes. The route is accessible at `/interviews` but not linked in the navbar.
