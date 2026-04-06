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
      en: "What is Angular's dependency injection system?",
      es: '¿Qué es el sistema de inyección de dependencias de Angular?',
    },
    answer: {
      en: "Angular's DI system is a design pattern where a class declares what it needs (dependencies) instead of creating them. Angular's injector creates and manages instances, passing them where needed. Services are registered via @Injectable and the providers array (in a module or component). This makes classes easier to test — you inject mocks instead of real services.",
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
      en: "The constructor is called by JavaScript when the class is instantiated. It is for dependency injection only — Angular's DI passes services here. ngOnInit is an Angular lifecycle hook called after the component is initialised and its input properties have been set. Any logic that depends on @Input values must go in ngOnInit, not the constructor.",
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
      en: "A Promise resolves once and is eager (starts immediately). An Observable is lazy (starts when subscribed), can emit multiple values over time, and supports cancellation via unsubscribe. Observables also support operators (map, filter, switchMap, etc.) for composing async streams. Angular's HttpClient returns Observables, which lets you cancel in-flight requests by unsubscribing.",
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
      en: "Angular's default change detection checks every component in the tree on every event. OnPush restricts this — a component with OnPush only re-renders when: its @Input reference changes, an event originates from within it, or an Observable it subscribes to via async pipe emits. OnPush dramatically improves performance in large applications by skipping unnecessary checks.",
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
