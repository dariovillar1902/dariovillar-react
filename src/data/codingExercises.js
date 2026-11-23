// Ejercicios de calentamiento en C# (contenido en español). Los enunciados son originales;
// los problemas relacionados de LeetCode se enlazan por URL.
// Cada solución es C# probado en un harness aparte antes de pegarse acá.
// `source` indica el origen del ejercicio; `lesson` es lo que falló en mi primer intento.

export const codingExercises = [
  {
    "id": 1,
    "slug": "join",
    "title": "Unir strings con un delimitador",
    "difficulty": "easy",
    "tags": [
      "strings",
      "arrays",
      "StringBuilder"
    ],
    "prompt": "Dado un arreglo de strings y un delimitador, devolvé un único string con cada elemento separado por el delimitador. No uses string.Join.",
    "examples": [
      {
        "input": "list = [\"a\",\"b\",\"c\"], delimiter = \":\"",
        "output": "\"a:b:c\""
      },
      {
        "input": "list = [\"a\"], delimiter = \":\"",
        "output": "\"a\""
      }
    ],
    "hints": [
      "Agregá el delimitador antes de cada elemento menos el primero. Así nunca necesitás preguntar \"¿es el último?\".",
      "Iterá con i < list.Length (no <=), o leés más allá del final.",
      "Usá StringBuilder: += sobre strings dentro de un bucle es O(n²)."
    ],
    "edgeCases": [
      "Arreglo vacío devuelve \"\"",
      "Un solo elemento no lleva delimitador",
      "Delimitador de varios caracteres, como \", \"",
      "Entrada null"
    ],
    "complexity": "O(n) en tiempo sobre el total de caracteres, O(n) en espacio",
    "solution": "static string Join(string[] list, string delimiter)\n{\n    if (list is null || list.Length == 0) return string.Empty;\n\n    var sb = new StringBuilder(list[0]);\n    for (int i = 1; i < list.Length; i++)\n        sb.Append(delimiter).Append(list[i]);\n\n    return sb.ToString();\n}",
    "related": [],
    "source": "Entrevista Fleetworthy",
    "lesson": "Las palabras clave (for, if) van en minúscula; el encabezado del for es inicialización; condición; incremento. Iterá con i < Length, no <=, y comparás con == (no =). Inicializá el string y manejá el arreglo vacío."
  },
  {
    "id": 2,
    "slug": "split",
    "title": "Dividir un string por un delimitador",
    "difficulty": "medium",
    "tags": [
      "strings",
      "IndexOf",
      "Substring"
    ],
    "prompt": "Dado un string de entrada y un delimitador, devolvé la lista de segmentos separados por el delimitador. No uses string.Split.",
    "examples": [
      {
        "input": "input = \"ab:c:def\", delimiter = \":\"",
        "output": "[\"ab\", \"c\", \"def\"]"
      },
      {
        "input": "input = \"a--b--c\", delimiter = \"--\"",
        "output": "[\"a\", \"b\", \"c\"]"
      }
    ],
    "hints": [
      "Recorré el string con IndexOf(delimitador, start). Cada coincidencia termina un segmento.",
      "Substring recibe (start, LONGITUD), no (start, end). La longitud del segmento es index - start.",
      "Después de una coincidencia, mové start a index + delimiter.Length para que el delimitador no quede en el segmento siguiente.",
      "El delimitador puede tener más de un carácter, así que compará strings, no chars."
    ],
    "edgeCases": [
      "Entrada vacía devuelve [\"\"]",
      "Delimitadores consecutivos generan segmentos vacíos",
      "Un delimitador al final genera un \"\" al final",
      "Un delimitador vacío debe lanzar excepción (haría un bucle infinito)"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio para la salida",
    "solution": "static List<string> Split(string input, string delimiter)\n{\n    if (input is null) throw new ArgumentNullException(nameof(input));\n    if (string.IsNullOrEmpty(delimiter))\n        throw new ArgumentException(\"Delimiter cannot be empty.\", nameof(delimiter));\n\n    var result = new List<string>();\n    int start = 0;\n    int index;\n\n    while ((index = input.IndexOf(delimiter, start, StringComparison.Ordinal)) >= 0)\n    {\n        result.Add(input.Substring(start, index - start));\n        start = index + delimiter.Length;\n    }\n\n    result.Add(input.Substring(start));\n    return result;\n}",
    "related": [
      {
        "title": "Find the Index of the First Occurrence in a String",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
      }
    ],
    "source": "Entrevista Fleetworthy",
    "lesson": "Substring recibe (start, LONGITUD), no (start, end). El siguiente segmento empieza en index + delimiter.Length. new List<string>() necesita el tipo, y un delimitador de varios caracteres implica comparar strings (IndexOf), no chars."
  },
  {
    "id": 3,
    "slug": "reverse-words",
    "title": "Invertir las palabras de una oración",
    "difficulty": "medium",
    "tags": [
      "strings",
      "two-pointers"
    ],
    "prompt": "Dada una oración, devolvé sus palabras en orden inverso, separadas por un único espacio. Ignorá los espacios al inicio, al final y los repetidos.",
    "examples": [
      {
        "input": "\"the sky is blue\"",
        "output": "\"blue is sky the\""
      },
      {
        "input": "\"  hello   world  \"",
        "output": "\"world hello\""
      }
    ],
    "hints": [
      "Primero juntá las palabras salteando espacios, y después leelas de atrás hacia adelante.",
      "No uses Split/Reverse si el entrevistador pide la versión manual; explicá que en producción sí los usarías."
    ],
    "edgeCases": [
      "String vacío",
      "Solo espacios",
      "Una sola palabra",
      "Varios espacios entre palabras"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio",
    "solution": "static string ReverseWords(string input)\n{\n    var words = new List<string>();\n    int i = 0;\n    while (i < input.Length)\n    {\n        while (i < input.Length && input[i] == ' ') i++;\n        int start = i;\n        while (i < input.Length && input[i] != ' ') i++;\n        if (i > start) words.Add(input.Substring(start, i - start));\n    }\n\n    var sb = new StringBuilder();\n    for (int w = words.Count - 1; w >= 0; w--)\n    {\n        sb.Append(words[w]);\n        if (w > 0) sb.Append(' ');\n    }\n    return sb.ToString();\n}",
    "related": [
      {
        "title": "Reverse Words in a String",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/"
      }
    ]
  },
  {
    "id": 4,
    "slug": "palindrome",
    "title": "Palíndromo (ignorando signos y mayúsculas)",
    "difficulty": "easy",
    "tags": [
      "strings",
      "two-pointers"
    ],
    "prompt": "Devolvé true si el string se lee igual al derecho y al revés, considerando solo letras y dígitos e ignorando mayúsculas y minúsculas.",
    "examples": [
      {
        "input": "\"A man, a plan, a canal: Panama\"",
        "output": "true"
      },
      {
        "input": "\"race a car\"",
        "output": "false"
      }
    ],
    "hints": [
      "Dos punteros desde los extremos hacia el centro, salteando los caracteres que no son letras ni dígitos.",
      "Compará con char.ToLowerInvariant. No hace falta construir una copia limpia del string."
    ],
    "edgeCases": [
      "El string vacío es palíndromo",
      "Solo signos de puntuación",
      "Un solo carácter",
      "Mayúsculas y minúsculas mezcladas"
    ],
    "complexity": "O(n) en tiempo, O(1) en espacio",
    "solution": "static bool IsPalindrome(string s)\n{\n    int left = 0, right = s.Length - 1;\n    while (left < right)\n    {\n        while (left < right && !char.IsLetterOrDigit(s[left])) left++;\n        while (left < right && !char.IsLetterOrDigit(s[right])) right--;\n        if (char.ToLowerInvariant(s[left]) != char.ToLowerInvariant(s[right]))\n            return false;\n        left++;\n        right--;\n    }\n    return true;\n}",
    "related": [
      {
        "title": "Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      }
    ],
    "source": "LeetCode",
    "lesson": "La regex [^a-z] borraba las mayúsculas y los dígitos en vez de pasarlas a minúscula y conservarlos: fallaba \"A man, a plan, a canal: Panama\" y \"0P\". Pasá a minúsculas ANTES de filtrar y permití 0-9, o usá dos punteros con char.IsLetterOrDigit (O(1) de espacio). Y Math.Floor((double)(n / 2)) es ruido: n / 2 ya es una división entera."
  },
  {
    "id": 5,
    "slug": "first-unique",
    "title": "Primer carácter que no se repite",
    "difficulty": "easy",
    "tags": [
      "strings",
      "hash-map"
    ],
    "prompt": "Devolvé el índice del primer carácter que aparece exactamente una vez en el string, o -1 si no hay ninguno.",
    "examples": [
      {
        "input": "\"leetcode\"",
        "output": "0"
      },
      {
        "input": "\"loveleetcode\"",
        "output": "2"
      },
      {
        "input": "\"aabb\"",
        "output": "-1"
      }
    ],
    "hints": [
      "Pasada 1: contá cada carácter. Pasada 2: devolvé el primer índice cuyo conteo sea 1.",
      "Un Dictionary<char,int> sirve para cualquier texto; un int[26] sirve si la entrada son solo minúsculas (decí ese supuesto en voz alta)."
    ],
    "edgeCases": [
      "String vacío devuelve -1",
      "Todos los caracteres se repiten",
      "Unicode o mayúsculas (aclará el alfabeto)"
    ],
    "complexity": "O(n) en tiempo, O(k) en espacio para k caracteres distintos",
    "solution": "static int FirstUniqueChar(string s)\n{\n    var counts = new Dictionary<char, int>();\n    foreach (var c in s)\n        counts[c] = counts.GetValueOrDefault(c) + 1;\n\n    for (int i = 0; i < s.Length; i++)\n        if (counts[s[i]] == 1) return i;\n\n    return -1;\n}",
    "related": [
      {
        "title": "First Unique Character in a String",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      }
    ],
    "source": "LeetCode",
    "lesson": "Tu versión era correcta pero O(n²): LastIndexOf y Dictionary.ContainsValue recorren todo en cada vuelta, y el Dictionary<int,int> (índice -> carácter) no aportaba nada. Contá las apariciones en una pasada (int[26] con c - 'a') y devolvé el primer índice con conteo 1: O(n) en tiempo y O(1) en espacio."
  },
  {
    "id": 6,
    "slug": "dedupe",
    "title": "Eliminar duplicados manteniendo el orden",
    "difficulty": "easy",
    "tags": [
      "arrays",
      "hash-set"
    ],
    "prompt": "Dado un arreglo de enteros, devolvé una lista sin duplicados, conservando la primera aparición de cada valor en su orden original.",
    "examples": [
      {
        "input": "[3, 1, 3, 2, 1]",
        "output": "[3, 1, 2]"
      }
    ],
    "hints": [
      "HashSet.Add devuelve false si el elemento ya existe, así que verificar e insertar es una sola llamada.",
      "Si el arreglo ya está ordenado, se puede hacer con O(1) de espacio extra usando dos punteros. Preguntá si está ordenado."
    ],
    "edgeCases": [
      "Arreglo vacío",
      "Todos los valores iguales",
      "Números negativos",
      "Ya es único"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio",
    "solution": "static List<int> RemoveDuplicates(int[] items)\n{\n    var seen = new HashSet<int>();\n    var result = new List<int>();\n    foreach (var item in items)\n        if (seen.Add(item)) result.Add(item);\n\n    return result;\n}",
    "related": [
      {
        "title": "Contains Duplicate",
        "url": "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        "title": "Remove Duplicates from Sorted Array",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
      }
    ]
  },
  {
    "id": 7,
    "slug": "merge-sorted",
    "title": "Fusionar dos arreglos ordenados",
    "difficulty": "easy",
    "tags": [
      "arrays",
      "two-pointers"
    ],
    "prompt": "Dados dos arreglos de enteros ordenados, devolvé un único arreglo ordenado con todos los elementos de ambos.",
    "examples": [
      {
        "input": "a = [1,3,5], b = [2,4,6]",
        "output": "[1,2,3,4,5,6]"
      },
      {
        "input": "a = [1,2], b = []",
        "output": "[1,2]"
      }
    ],
    "hints": [
      "Un puntero por arreglo. En cada paso tomá el elemento actual más chico.",
      "Cuando un arreglo se agota, copiá el resto del otro.",
      "Usá <= al comparar para que los valores iguales mantengan un orden estable."
    ],
    "edgeCases": [
      "Uno o ambos arreglos vacíos",
      "Duplicados entre los arreglos",
      "Longitudes muy distintas"
    ],
    "complexity": "O(n + m) en tiempo, O(n + m) en espacio",
    "solution": "static int[] MergeSorted(int[] a, int[] b)\n{\n    var result = new int[a.Length + b.Length];\n    int i = 0, j = 0, k = 0;\n\n    while (i < a.Length && j < b.Length)\n        result[k++] = a[i] <= b[j] ? a[i++] : b[j++];\n\n    while (i < a.Length) result[k++] = a[i++];\n    while (j < b.Length) result[k++] = b[j++];\n\n    return result;\n}",
    "related": [
      {
        "title": "Merge Sorted Array",
        "url": "https://leetcode.com/problems/merge-sorted-array/"
      },
      {
        "title": "Merge Two Sorted Lists",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
      }
    ]
  },
  {
    "id": 8,
    "slug": "intervals",
    "title": "Fusionar ventanas de tiempo superpuestas",
    "difficulty": "medium",
    "tags": [
      "arrays",
      "sorting",
      "intervals"
    ],
    "prompt": "Dada una lista de ventanas (inicio, fin), por ejemplo ventanas de mantenimiento o inspección de vehículos, fusioná todas las que se superponen o se tocan y devolvé la lista fusionada en orden.",
    "examples": [
      {
        "input": "[(8,10), (1,3), (2,6), (15,18)]",
        "output": "[(1,6), (8,10), (15,18)]"
      },
      {
        "input": "[(1,4), (4,5)]",
        "output": "[(1,5)]"
      }
    ],
    "hints": [
      "Ordená por inicio primero. Después cada ventana se superpone con la última fusionada o empieza una nueva.",
      "Test de superposición: current.Start <= last.End. Fusioná tomando Math.Max de los dos fines, porque una ventana puede contener a la otra.",
      "Preguntá si las ventanas que se tocan (fin == inicio) cuentan como superpuestas."
    ],
    "edgeCases": [
      "Lista vacía",
      "Una ventana contiene a otra",
      "Ventanas que se tocan",
      "Entrada desordenada"
    ],
    "complexity": "O(n log n) en tiempo por el ordenamiento, O(n) en espacio",
    "solution": "static List<(int Start, int End)> MergeIntervals(List<(int Start, int End)> intervals)\n{\n    var sorted = intervals.OrderBy(x => x.Start).ToList();\n    var result = new List<(int Start, int End)>();\n\n    foreach (var current in sorted)\n    {\n        if (result.Count > 0 && current.Start <= result[^1].End)\n            result[^1] = (result[^1].Start, Math.Max(result[^1].End, current.End));\n        else\n            result.Add(current);\n    }\n\n    return result;\n}",
    "related": [
      {
        "title": "Merge Intervals",
        "url": "https://leetcode.com/problems/merge-intervals/"
      }
    ]
  },
  {
    "id": 9,
    "slug": "two-sum",
    "title": "Two Sum: dos números que suman el objetivo",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "hash-map"
    ],
    "prompt": "Dado un arreglo de enteros nums y un entero target, devolvé los índices de los dos números que suman target. Existe exactamente una solución y no podés usar el mismo elemento dos veces.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]"
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]"
      }
    ],
    "hints": [
      "La fuerza bruta son dos bucles anidados, O(n²). Decilo en voz alta al empezar.",
      "Para cada número, el que necesitás es target - nums[i]. ¿Ya lo viste antes?",
      "Un Dictionary<int,int> (valor -> índice) responde eso en O(1). Buscá ANTES de insertar para no reutilizar el mismo elemento."
    ],
    "edgeCases": [
      "Valores duplicados ([3,3])",
      "Números negativos",
      "La respuesta incluye el índice 0"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio",
    "solution": "static int[] TwoSum(int[] nums, int target)\n{\n    var seen = new Dictionary<int, int>(); // valor -> índice\n\n    for (int i = 0; i < nums.Length; i++)\n    {\n        int complement = target - nums[i];\n\n        if (seen.TryGetValue(complement, out int j))\n            return new[] { j, i };\n\n        seen[nums[i]] = i;\n    }\n\n    return Array.Empty<int>(); // el problema garantiza una solución\n}",
    "lesson": "Los arreglos de C# tienen tamaño fijo: int[] x = [] nunca puede crecer, y Append de LINQ devuelve una secuencia NUEVA en vez de modificar el arreglo, así que el resultado se descartaba y el método devolvía []. Usá un Dictionary (o una List) y buscá en O(1).",
    "related": [
      {
        "title": "Two Sum",
        "url": "https://leetcode.com/problems/two-sum/"
      }
    ]
  },
  {
    "id": 10,
    "slug": "valid-parens",
    "title": "Valid Parentheses: paréntesis válidos",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "stack",
      "strings"
    ],
    "prompt": "Dado un string que solo contiene ()[]{}, determiná si es válido: cada bracket se cierra con el mismo tipo y en el orden correcto.",
    "examples": [
      {
        "input": "\"()[]{}\"",
        "output": "true"
      },
      {
        "input": "\"(]\"",
        "output": "false"
      },
      {
        "input": "\"([])\"",
        "output": "true"
      }
    ],
    "hints": [
      "El último bracket abierto debe ser el primero en cerrarse: eso es un stack.",
      "Mapeá cada bracket de cierre con su apertura en un Dictionary<char,char>. TryGetValue te dice en una sola búsqueda si el carácter es un cierre.",
      "Al final el stack debe estar vacío; si no, algo quedó sin cerrar."
    ],
    "edgeCases": [
      "\"((\" sin cerrar",
      "\"([)]\" entrelazados",
      "\")\" cierre con el stack vacío",
      "El string vacío es válido"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio",
    "solution": "static bool IsValid(string s)\n{\n    var stack = new Stack<char>();\n    var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };\n\n    foreach (char c in s)\n    {\n        if (pairs.TryGetValue(c, out char open))\n        {\n            if (stack.Count == 0 || stack.Pop() != open) return false;\n        }\n        else\n        {\n            stack.Push(c);\n        }\n    }\n\n    return stack.Count == 0;\n}",
    "lesson": "Un booleano por tipo de bracket no puede representar anidamiento ni cantidades: \"(())\", \"((\" y \"([)]\" daban mal, y bool[] x = [] se rompe en la primera escritura. Usá un Stack y verificá que quede vacío al final.",
    "related": [
      {
        "title": "Valid Parentheses",
        "url": "https://leetcode.com/problems/valid-parentheses/"
      }
    ]
  },
  {
    "id": 11,
    "slug": "merge-lists",
    "title": "Fusionar dos listas enlazadas ordenadas",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "prompt": "Dadas las cabezas de dos listas enlazadas ordenadas, fusionalas en una sola lista ordenada empalmando los nodos existentes, y devolvé su cabeza.",
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]"
      },
      {
        "input": "list1 = [], list2 = [0]",
        "output": "[0]"
      }
    ],
    "hints": [
      "Una lista enlazada no tiene índice ni Count. Solo podés seguir .next desde la cabeza.",
      "Compará los dos nodos ACTUALES, enlazá el más chico y avanzá solo la lista de la que lo tomaste.",
      "Usá un nodo dummy como cabeza para no tratar el primer nodo como caso especial, y enlazá lo que sobre al final (list1 ?? list2)."
    ],
    "edgeCases": [
      "Ambas listas vacías devuelve null",
      "Una lista vacía",
      "Longitudes distintas",
      "Duplicados (usá <= para una fusión estable)"
    ],
    "complexity": "O(n + m) en tiempo, O(1) en espacio",
    "solution": "static ListNode? MergeTwoLists(ListNode? list1, ListNode? list2)\n{\n    var dummy = new ListNode();   // marcador antes de la cabeza real\n    var tail = dummy;\n\n    while (list1 != null && list2 != null)\n    {\n        if (list1.val <= list2.val)\n        {\n            tail.next = list1;\n            list1 = list1.next;\n        }\n        else\n        {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n        tail = tail.next;\n    }\n\n    tail.next = list1 ?? list2;   // enlazar lo que sobre\n    return dummy.next;\n}",
    "lesson": "Tratar las listas como arreglos (list1[i], .Count, +=) no compila, y comparar por posición está mal. Mantené un puntero por lista, avanzá solo el que usaste y re-enlazá los nodos existentes con un nodo dummy.",
    "related": [
      {
        "title": "Merge Two Sorted Lists",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
      }
    ]
  },
  {
    "id": 12,
    "slug": "max-profit",
    "title": "Mejor momento para comprar y vender acciones",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "greedy"
    ],
    "prompt": "prices[i] es el precio de una acción el día i. Elegí un día para comprar y un día posterior para vender de modo de maximizar la ganancia. Devolvé la ganancia máxima, o 0 si no es posible ganar.",
    "examples": [
      {
        "input": "[7,1,5,3,6,4]",
        "output": "5"
      },
      {
        "input": "[7,6,4,3,1]",
        "output": "0"
      }
    ],
    "hints": [
      "La fuerza bruta prueba todos los pares compra/venta, O(n²).",
      "La mejor venta del día i es prices[i] menos el precio más bajo visto hasta ahora. Llevá ese mínimo en una sola pasada."
    ],
    "edgeCases": [
      "Precios estrictamente decrecientes devuelve 0",
      "Un solo elemento devuelve 0",
      "Todos los precios iguales"
    ],
    "complexity": "O(n) en tiempo, O(1) en espacio",
    "solution": "static int MaxProfit(int[] prices)\n{\n    int minPrice = prices[0];\n    int maxProfit = 0;\n\n    for (int i = 1; i < prices.Length; i++)\n    {\n        if (prices[i] < minPrice)\n            minPrice = prices[i];\n        else\n            maxProfit = Math.Max(maxProfit, prices[i] - minPrice);\n    }\n\n    return maxProfit;\n}",
    "lesson": "Tu solución estaba bien. Detalles: empezá el bucle en i = 1, usá else-if (un nuevo mínimo no puede ser también la mejor venta), nombres cortos como minPrice/maxProfit, y cuidado con caracteres sueltos al pegar.",
    "related": [
      {
        "title": "Best Time to Buy and Sell Stock",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      }
    ]
  },
  {
    "id": 13,
    "slug": "climb-stairs",
    "title": "Subir escaleras",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "dynamic-programming",
      "fibonacci"
    ],
    "prompt": "Subís una escalera de n escalones, de a 1 o 2 escalones por vez. ¿De cuántas formas distintas podés llegar a la cima?",
    "examples": [
      {
        "input": "n = 2",
        "output": "2"
      },
      {
        "input": "n = 3",
        "output": "3"
      }
    ],
    "hints": [
      "El último movimiento fue 1 escalón desde n-1 o 2 escalones desde n-2, así que ways(n) = ways(n-1) + ways(n-2): Fibonacci.",
      "La recursión simple es O(2ⁿ) por subproblemas superpuestos. Memoizá y después notá que solo necesitás los dos últimos valores.",
      "n <= 45 mantiene la respuesta dentro de un int (ways(45) = 1.836.311.903)."
    ],
    "edgeCases": [
      "n = 1 devuelve 1",
      "n = 2 devuelve 2",
      "n grande: overflow más allá de int"
    ],
    "complexity": "O(n) en tiempo, O(1) en espacio",
    "solution": "static int ClimbStairs(int n)\n{\n    if (n <= 2) return n;\n\n    int prev = 1;   // formas de llegar al escalón i-2\n    int curr = 2;   // formas de llegar al escalón i-1\n\n    for (int i = 3; i <= n; i++)\n        (prev, curr) = (curr, prev + curr);\n\n    return curr;\n}",
    "lesson": "Nombrá primero la recurrencia. Después andá de fuerza bruta -> memoización -> dos variables. El follow-up \"1, 2 o 3 escalones\" solo suma ways(n-3).",
    "related": [
      {
        "title": "Climbing Stairs",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      }
    ]
  },
  {
    "id": 14,
    "slug": "anagram",
    "title": "Anagrama válido",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "strings",
      "hash-map",
      "counting"
    ],
    "prompt": "Dados dos strings s y t, devolvé true si t es un anagrama de s (las mismas letras con las mismas cantidades, en cualquier orden), y false en caso contrario. Ambos contienen solo letras minúsculas del inglés.",
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true"
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "output": "false"
      }
    ],
    "hints": [
      "Si las longitudes son distintas no pueden ser anagramas: cortá enseguida.",
      "Contá las letras de s en un int[26] (c - 'a') y descontá las de t. Si un contador ya está en 0, devolvé false.",
      "Con longitudes iguales, si cada letra de t encontró lugar, todos los conteos terminan en 0.",
      "Si el follow-up pide Unicode, cambiá el arreglo por un Dictionary<char,int>."
    ],
    "edgeCases": [
      "Longitudes distintas (\"ab\" y \"a\" debe dar false)",
      "Letras repetidas",
      "Mismas letras con distinta cantidad (\"aab\" y \"abb\")",
      "Un solo carácter"
    ],
    "complexity": "O(n) en tiempo, O(1) en espacio (arreglo de 26)",
    "solution": "static bool IsAnagram(string s, string t)\n{\n    if (s.Length != t.Length) return false;\n\n    var counts = new int[26];\n\n    foreach (char c in s)\n        counts[c - 'a']++;\n\n    foreach (char c in t)\n    {\n        if (counts[c - 'a'] == 0) return false;\n        counts[c - 'a']--;\n    }\n\n    return true;\n}",
    "lesson": "La lógica de conteo estaba bien, pero faltaba comparar longitudes: con s = \"ab\" y t = \"a\" quedaba un contador en 1 y se devolvía true. Los ejemplos del enunciado pasaban igual, por eso hay que probar casos con longitudes distintas.",
    "related": [
      {
        "title": "Valid Anagram",
        "url": "https://leetcode.com/problems/valid-anagram/"
      },
      {
        "title": "Group Anagrams",
        "url": "https://leetcode.com/problems/group-anagrams/"
      }
    ]
  },
  {
    "id": 15,
    "slug": "lcp",
    "title": "Prefijo común más largo",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "strings",
      "vertical-scan"
    ],
    "prompt": "Escribí una función que encuentre el prefijo común más largo entre un arreglo de strings. Si no hay prefijo común, devolvé \"\".",
    "examples": [
      {
        "input": "[\"flower\",\"flow\",\"flight\"]",
        "output": "\"fl\""
      },
      {
        "input": "[\"dog\",\"racecar\",\"car\"]",
        "output": "\"\""
      }
    ],
    "hints": [
      "Usá el primer string como referencia y comparé cada posición contra todos los demás (escaneo vertical).",
      "Cortá en el primer desacuerdo con Substring(0, i). Si algún string se terminó (i == strs[j].Length), también cortás.",
      "Si el bucle termina sin cortar, el primer string completo es el prefijo."
    ],
    "edgeCases": [
      "Un solo string devuelve ese string",
      "Strings idénticos",
      "Un string es prefijo de otro ([\"ab\",\"a\"])",
      "Sin prefijo común ([\"ab\",\"xy\",\"xy\"])",
      "Un string vacío"
    ],
    "complexity": "O(S) en tiempo (S = total de caracteres), O(1) en espacio",
    "solution": "static string LongestCommonPrefix(string[] strs)\n{\n    if (strs.Length == 0) return \"\";\n\n    for (int i = 0; i < strs[0].Length; i++)\n    {\n        char c = strs[0][i];\n\n        for (int j = 1; j < strs.Length; j++)\n        {\n            if (i == strs[j].Length || strs[j][i] != c)\n                return strs[0].Substring(0, i);\n        }\n    }\n\n    return strs[0];\n}",
    "lesson": "Comparar pares consecutivos y guardar un número que se pisa (longestMatch) no calcula el prefijo de TODOS los strings. Además Substring(0, i) lanza excepción si i supera el largo, y con i < Length nunca se prueba el string completo ([\"abc\",\"abc\"] daba \"ab\"). Parchear con Math.Min arregló los ejemplos pero siguieron fallando 5 de 10 casos. Usá una sola referencia (el primer string) y cortá en el primer desacuerdo; si un parche no alcanza, cambiá el diseño.",
    "related": [
      {
        "title": "Longest Common Prefix",
        "url": "https://leetcode.com/problems/longest-common-prefix/"
      }
    ]
  },
  {
    "id": 16,
    "slug": "contains-duplicate",
    "title": "Contiene duplicados",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "hash-set"
    ],
    "prompt": "Dado un arreglo de enteros nums, devolvé true si algún valor aparece al menos dos veces, y false si todos los elementos son distintos.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "true"
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "false"
      },
      {
        "input": "nums = [1,1,1,3,3,4,3,2,4,2]",
        "output": "true"
      }
    ],
    "hints": [
      "Solo necesitás saber si ya viste un valor: no hace falta guardar índices ni pares clave-valor.",
      "Un HashSet<int> alcanza. Add devuelve false si el valor ya estaba, así que chequeás e insertás en una sola llamada.",
      "Con hasta 10^5 elementos, una búsqueda O(n) dentro del bucle (ContainsValue, IndexOf, Contains de un arreglo) vuelve todo O(n²)."
    ],
    "edgeCases": [
      "Un solo elemento (nunca hay duplicados)",
      "Todos iguales",
      "Duplicados al principio y al final",
      "Negativos y valores en los extremos de int"
    ],
    "complexity": "O(n) en tiempo, O(n) en espacio",
    "solution": "public static bool ContainsDuplicate(int[] nums)\n{\n    var seen = new HashSet<int>();\n\n    foreach (int n in nums)\n    {\n        if (!seen.Add(n)) return true;   // Add returns false if it was already there\n    }\n\n    return false;\n}",
    "lesson": "Tu versión era correcta pero O(n²): Dictionary.ContainsValue recorre todas las entradas en cada vuelta, y el Dictionary (índice -> valor) no aportaba nada porque solo buscabas por valor. Cuando solo preguntás \"¿ya lo vi?\", usá un HashSet: Add chequea e inserta en O(1). Alternativas para decir en voz alta: fuerza bruta O(n²), ordenar y comparar vecinos O(n log n), HashSet O(n).",
    "related": [
      {
        "title": "Contains Duplicate",
        "url": "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        "title": "Contains Duplicate II",
        "url": "https://leetcode.com/problems/contains-duplicate-ii/"
      }
    ]
  },
  {
    "id": 17,
    "slug": "move-zeroes",
    "title": "Mover los ceros al final",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "two-pointers",
      "in-place"
    ],
    "prompt": "Dado un arreglo de enteros nums, movés todos los 0 al final manteniendo el orden relativo de los elementos distintos de cero. Tenés que hacerlo in-place, sin crear una copia del arreglo.",
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]"
      },
      {
        "input": "nums = [0]",
        "output": "[0]"
      }
    ],
    "hints": [
      "No pienses en mover los ceros: pensá en mover los NO ceros al frente, en orden. Los ceros quedan al final solos.",
      "Usá dos índices: read recorre todo el arreglo y write marca el próximo lugar donde va un valor distinto de cero.",
      "Como write nunca pasa a read, solo pisás posiciones que ya leíste: por eso no hace falta una copia.",
      "Al terminar, rellená con ceros desde write hasta el final (o intercambiá nums[write] con nums[read] y te ahorrás ese bucle)."
    ],
    "edgeCases": [
      "Un solo elemento ([0] y [5])",
      "Sin ceros ([1,2,3])",
      "Todos ceros ([0,0,0])",
      "Ceros solo al final ([1,2,0,0])",
      "Ceros al principio ([0,0,1])"
    ],
    "complexity": "O(n) en tiempo, O(1) en espacio",
    "solution": "public static void MoveZeroes(int[] nums)\n{\n    int write = 0;                       // next spot for a non-zero value\n\n    for (int read = 0; read < nums.Length; read++)\n    {\n        if (nums[read] != 0)\n        {\n            nums[write] = nums[read];\n            write++;\n        }\n    }\n\n    for (int i = write; i < nums.Length; i++)\n        nums[i] = 0;\n}",
    "lesson": "Tu código movía cada cero UNA sola posición a la derecha, pero un cero puede tener que cruzar varios elementos. Con [0,1,0,3,12] devolvía [1,0,3,12,0] (esperado [1,3,12,0,0]) y con [0,0,1] devolvía [0,1,0]. Parchear con más intercambios lleva a O(n²): el diseño era el problema. \"In-place\" no prohíbe variables extra, prohíbe un segundo arreglo: usá un puntero de lectura y uno de escritura que avanzan juntos.",
    "related": [
      {
        "title": "Move Zeroes",
        "url": "https://leetcode.com/problems/move-zeroes/"
      },
      {
        "title": "Remove Element",
        "url": "https://leetcode.com/problems/remove-element/"
      },
      {
        "title": "Remove Duplicates from Sorted Array",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
      }
    ]
  }
];
