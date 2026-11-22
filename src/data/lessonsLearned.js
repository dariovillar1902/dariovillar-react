// Lecciones aprendidas de la práctica de ejercicios de código (en español).
// Basado en los errores y aciertos reales de cada ejercicio resuelto.

export const guideSteps = [
  {
    title: '1. Repetí el problema y preguntá',
    text: 'Decí con tus palabras qué entra y qué sale. Preguntá por tamaño de la entrada, duplicados, entradas vacías, si está ordenada y qué devolver si no hay solución.',
  },
  {
    title: '2. Resolvé un ejemplo a mano',
    text: 'Antes de escribir código, recorré el ejemplo en voz alta. Si no podés resolverlo a mano, todavía no entendés el problema.',
  },
  {
    title: '3. Empezá por la fuerza bruta',
    text: 'Decí la solución simple y su complejidad (por ejemplo, dos bucles anidados O(n²)). Después preguntate: ¿qué información repito que podría guardar?',
  },
  {
    title: '4. Elegí la estructura de datos',
    text: 'La mayoría de las optimizaciones salen de usar la estructura correcta: Dictionary, HashSet, Stack, dos punteros. Ver la tabla de patrones más abajo.',
  },
  {
    title: '5. Listá los casos borde antes de codear',
    text: 'Vacío, un solo elemento, duplicados, negativos, todo igual, límites (Length - 1). Mencionarlos suma puntos aunque no los programes todos.',
  },
  {
    title: '6. Codeá simple y claro',
    text: 'Nombres descriptivos, un solo propósito por bucle, sin trucos. Hablá mientras escribís. Si en producción usarías un built-in (string.Join, Split), decilo.',
  },
  {
    title: '7. Probá con tus ejemplos y decí la complejidad',
    text: 'Hacé una traza a mano con el ejemplo y con un caso borde. Cerrá con tiempo y espacio (O(n) tiempo, O(1) espacio).',
  },
];

export const patterns = [
  {
    signal: 'Buscar si ya vi un valor / el complemento de algo',
    technique: 'Dictionary o HashSet',
    examples: 'Two Sum, Contains Duplicate, Valid Anagram, First Unique Character',
  },
  {
    signal: 'Anidamiento, "el último abierto es el primero en cerrarse"',
    technique: 'Stack',
    examples: 'Valid Parentheses, evaluar expresiones',
  },
  {
    signal: 'Arreglo ordenado, o comparar desde ambos extremos',
    technique: 'Dos punteros',
    examples: 'Valid Palindrome, Merge Sorted Array, Container With Most Water',
  },
  {
    signal: 'Recorrer dos listas/arreglos a la vez',
    technique: 'Un puntero por lista, avanzar solo el usado',
    examples: 'Merge Two Sorted Lists, Merge Sorted Array',
  },
  {
    signal: 'Lista enlazada con casos borde en la cabeza',
    technique: 'Nodo dummy antes de la cabeza',
    examples: 'Merge Two Sorted Lists, Remove Nth Node',
  },
  {
    signal: 'Mejor valor hasta ahora (mínimo, máximo, acumulado)',
    technique: 'Una pasada llevando una variable',
    examples: 'Best Time to Buy and Sell Stock, Maximum Subarray',
  },
  {
    signal: 'El resultado depende de los dos anteriores',
    technique: 'Recurrencia → DP con dos variables',
    examples: 'Climbing Stairs, Fibonacci, House Robber',
  },
  {
    signal: 'Intervalos o rangos que se superponen',
    technique: 'Ordenar por inicio y fusionar',
    examples: 'Merge Intervals',
  },
  {
    signal: 'Construir un string en un bucle',
    technique: 'StringBuilder (no +=)',
    examples: 'Join, Reverse Words',
  },
];

export const mistakes = [
  {
    exercise: 'Join (entrevista Fleetworthy)',
    wrong: 'For / If con mayúscula, el encabezado del for con comas, i <= Length, "=" en vez de "==", string sin inicializar.',
    right: 'for (int i = 1; i < list.Length; i++) con palabras clave en minúscula. Agregá el delimitador antes de cada elemento menos el primero y así no necesitás preguntar "¿es el último?".',
  },
  {
    exercise: 'Split (entrevista Fleetworthy)',
    wrong: 'Substring(inicio, fin) cuando en C# es Substring(inicio, LONGITUD); el siguiente segmento empezaba en el delimitador; new List() sin tipo; comparar char contra string.',
    right: 'IndexOf(delimitador, start) en un while; segmento = Substring(start, index - start); start = index + delimiter.Length; validar delimitador vacío.',
  },
  {
    exercise: 'Two Sum',
    wrong: 'int[] x = [] no puede crecer, y Append de LINQ devuelve una secuencia nueva sin modificar el arreglo: el resultado se descartaba y devolvía [].',
    right: 'Dictionary<int,int> valor → índice. Buscar target - nums[i] ANTES de insertar. O(n) en vez de O(n²).',
  },
  {
    exercise: 'Valid Parentheses',
    wrong: 'Un bool por tipo de bracket no representa anidamiento ni cantidades: "(())", "((" y "([)]" daban mal. Además bool[] x = [] se rompe en el primer acceso.',
    right: 'Stack<char> + Dictionary de cierre → apertura. Al final, el stack debe estar vacío.',
  },
  {
    exercise: 'Merge Two Sorted Lists',
    wrong: 'Tratar la lista enlazada como arreglo (list1[i], .Count, +=), comparar por posición, un Dictionary sin usar copiado de otro ejercicio.',
    right: 'Un puntero por lista, avanzar solo la lista de la que tomaste el nodo, nodo dummy y re-enlazar los nodos existentes. Al final: tail.next = list1 ?? list2.',
  },
  {
    exercise: 'Best Time to Buy and Sell Stock',
    wrong: 'Estaba bien. Detalles: empezar en i = 1, usar else-if, nombres cortos (minPrice, maxProfit) y cuidado con caracteres sueltos al pegar.',
    right: 'Mínimo hasta ahora + mejor ganancia en una sola pasada. O(n) tiempo, O(1) espacio.',
  },
];

export const csharpChecklist = [
  'Los arreglos tienen tamaño fijo: no crecen. Para agregar elementos usá List<T>.',
  'Append / Concat / Where de LINQ no modifican la colección original: devuelven una nueva. Guardá el resultado o usá Add.',
  'Arreglo: .Length. List<T>: .Count. string: .Length. Lista enlazada: no tiene ninguno, se recorre con .next.',
  'Un arreglo no tiene IndexOf de instancia: es Array.IndexOf(arr, x). Y es O(n).',
  'Substring(inicio, longitud), no (inicio, fin).',
  'for (inicialización; condición; incremento). Palabras clave en minúscula. "==" compara, "=" asigna.',
  'char y string son distintos: \'a\' vs "a". Para delimitadores de varios caracteres comparás strings.',
  'Para strings en bucle usá StringBuilder; += es O(n²).',
  'TryGetValue hace la búsqueda y te da el valor en una sola llamada, sin KeyNotFoundException.',
  'Ya existe un built-in (string.Join, Split, Reverse, Contains)? En la entrevista implementá a mano si te lo piden, y aclará que en producción usarías el built-in.',
];

export const sayAloud = [
  '"Antes de codear, ¿puedo confirmar entradas, tamaños y qué devuelvo si no hay solución?"',
  '"La solución de fuerza bruta es X con complejidad O(...). Puedo mejorarla guardando Y."',
  '"Elijo un Dictionary porque necesito buscar en O(1)."',
  '"Casos borde que voy a cubrir: vacío, un elemento, duplicados."',
  '"En producción usaría el método built-in, pero acá lo implemento a mano."',
  '"Voy a probarlo con el ejemplo del enunciado y con un caso borde."',
  '"La complejidad es O(n) en tiempo y O(1) en espacio."',
  'Si te trabás: "Déjame pensar en voz alta" y explicá qué probaste. Los entrevistadores evalúan tu razonamiento, no solo el resultado.',
];

export const universalEdgeCases = [
  'Entrada vacía o null',
  'Un solo elemento',
  'Todos los elementos iguales / duplicados',
  'Números negativos y cero',
  'Primer y último índice (off-by-one: < vs <=)',
  'Entradas muy grandes (overflow de int)',
  'Datos ya ordenados o en orden inverso',
];
