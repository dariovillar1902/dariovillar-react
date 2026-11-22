// Warm-up coding exercises (C#). Statements are original; related LeetCode problems are linked by URL.
// Every solution is tested C# (standalone harness) before being pasted here.
// `source` marks where an exercise came from; `lesson` is what went wrong in my first attempt.

export const codingExercises = [
  {
    "id": 1,
    "slug": "join",
    "title": "Join strings with a delimiter",
    "difficulty": "easy",
    "tags": [
      "strings",
      "arrays",
      "StringBuilder"
    ],
    "prompt": "Given an array of strings and a delimiter, return one string with every entry separated by the delimiter. Do not use string.Join.",
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
      "Add the delimiter before every element except the first. You never need an \"is this the last item?\" check.",
      "Loop with i < list.Length (not <=), or you read past the end.",
      "Use StringBuilder: += on strings inside a loop is O(n²)."
    ],
    "edgeCases": [
      "Empty array returns \"\"",
      "Single element has no delimiter",
      "Multi-character delimiter such as \", \"",
      "Null input"
    ],
    "complexity": "O(n) time over total characters, O(n) space",
    "solution": "static string Join(string[] list, string delimiter)\n{\n    if (list is null || list.Length == 0) return string.Empty;\n\n    var sb = new StringBuilder(list[0]);\n    for (int i = 1; i < list.Length; i++)\n        sb.Append(delimiter).Append(list[i]);\n\n    return sb.ToString();\n}",
    "related": [],
    "source": "Fleetworthy interview",
    "lesson": "Keywords (for, if) are lowercase; the for header order is init; condition; increment. Loop with i < Length, not <=, and compare with == (not =). Initialize the string and handle the empty array."
  },
  {
    "id": 2,
    "slug": "split",
    "title": "Split a string by a delimiter",
    "difficulty": "medium",
    "tags": [
      "strings",
      "IndexOf",
      "Substring"
    ],
    "prompt": "Given an input string and a delimiter, return the list of segments separated by the delimiter. Do not use string.Split.",
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
      "Walk the string with IndexOf(delimiter, start). Each hit ends one segment.",
      "Substring takes (start, LENGTH), not (start, end). The segment length is index - start.",
      "After a hit, move start to index + delimiter.Length so the delimiter is not part of the next segment.",
      "A delimiter can be longer than one character, so compare strings, not chars."
    ],
    "edgeCases": [
      "Empty input returns [\"\"]",
      "Consecutive delimiters give empty segments",
      "Trailing delimiter gives a trailing \"\"",
      "Empty delimiter must throw (it would loop forever)"
    ],
    "complexity": "O(n) time, O(n) space for the output",
    "solution": "static List<string> Split(string input, string delimiter)\n{\n    if (input is null) throw new ArgumentNullException(nameof(input));\n    if (string.IsNullOrEmpty(delimiter))\n        throw new ArgumentException(\"Delimiter cannot be empty.\", nameof(delimiter));\n\n    var result = new List<string>();\n    int start = 0;\n    int index;\n\n    while ((index = input.IndexOf(delimiter, start, StringComparison.Ordinal)) >= 0)\n    {\n        result.Add(input.Substring(start, index - start));\n        start = index + delimiter.Length;\n    }\n\n    result.Add(input.Substring(start));\n    return result;\n}",
    "related": [
      {
        "title": "Find the Index of the First Occurrence in a String",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
      }
    ],
    "source": "Fleetworthy interview",
    "lesson": "Substring takes (start, LENGTH), not (start, end). The next segment starts at index + delimiter.Length. new List<string>() needs the type, and a multi-character delimiter means comparing strings (IndexOf), not chars."
  },
  {
    "id": 3,
    "slug": "reverse-words",
    "title": "Reverse the words in a sentence",
    "difficulty": "medium",
    "tags": [
      "strings",
      "two-pointers"
    ],
    "prompt": "Given a sentence, return its words in reverse order, separated by a single space. Ignore leading, trailing and repeated spaces.",
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
      "First collect the words by skipping spaces, then read them back to front.",
      "Do not use Split/Reverse if the interviewer asks for the manual version; then explain you would use them in production."
    ],
    "edgeCases": [
      "Empty string",
      "Only spaces",
      "A single word",
      "Multiple spaces between words"
    ],
    "complexity": "O(n) time, O(n) space",
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
    "title": "Palindrome check (ignore punctuation and case)",
    "difficulty": "easy",
    "tags": [
      "strings",
      "two-pointers"
    ],
    "prompt": "Return true if the string reads the same forwards and backwards, considering only letters and digits and ignoring case.",
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
      "Two pointers from both ends moving inward, skipping characters that are not letters or digits.",
      "Compare with char.ToLowerInvariant. No need to build a cleaned copy of the string."
    ],
    "edgeCases": [
      "Empty string is a palindrome",
      "Only punctuation",
      "Single character",
      "Mixed case"
    ],
    "complexity": "O(n) time, O(1) space",
    "solution": "static bool IsPalindrome(string s)\n{\n    int left = 0, right = s.Length - 1;\n    while (left < right)\n    {\n        while (left < right && !char.IsLetterOrDigit(s[left])) left++;\n        while (left < right && !char.IsLetterOrDigit(s[right])) right--;\n        if (char.ToLowerInvariant(s[left]) != char.ToLowerInvariant(s[right]))\n            return false;\n        left++;\n        right--;\n    }\n    return true;\n}",
    "related": [
      {
        "title": "Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      }
    ]
  },
  {
    "id": 5,
    "slug": "first-unique",
    "title": "First non-repeating character",
    "difficulty": "easy",
    "tags": [
      "strings",
      "hash-map"
    ],
    "prompt": "Return the index of the first character that appears exactly once in the string, or -1 if none does.",
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
      "Pass 1: count each character. Pass 2: return the first index whose count is 1.",
      "A Dictionary<char,int> works for any text; an int[26] works if the input is only lowercase letters (say that assumption out loud)."
    ],
    "edgeCases": [
      "Empty string returns -1",
      "All characters repeat",
      "Unicode or uppercase (clarify the alphabet)"
    ],
    "complexity": "O(n) time, O(k) space for k distinct characters",
    "solution": "static int FirstUniqueChar(string s)\n{\n    var counts = new Dictionary<char, int>();\n    foreach (var c in s)\n        counts[c] = counts.GetValueOrDefault(c) + 1;\n\n    for (int i = 0; i < s.Length; i++)\n        if (counts[s[i]] == 1) return i;\n\n    return -1;\n}",
    "related": [
      {
        "title": "First Unique Character in a String",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      }
    ]
  },
  {
    "id": 6,
    "slug": "dedupe",
    "title": "Remove duplicates, keep order",
    "difficulty": "easy",
    "tags": [
      "arrays",
      "hash-set"
    ],
    "prompt": "Given an array of integers, return a list with duplicates removed, keeping the first occurrence of each value in its original order.",
    "examples": [
      {
        "input": "[3, 1, 3, 2, 1]",
        "output": "[3, 1, 2]"
      }
    ],
    "hints": [
      "HashSet.Add returns false when the item already exists, which makes the check and the insert a single call.",
      "If the array is already sorted, you can do it in O(1) extra space with two pointers. Ask whether it is sorted."
    ],
    "edgeCases": [
      "Empty array",
      "All values equal",
      "Negative numbers",
      "Already unique"
    ],
    "complexity": "O(n) time, O(n) space",
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
    "title": "Merge two sorted arrays",
    "difficulty": "easy",
    "tags": [
      "arrays",
      "two-pointers"
    ],
    "prompt": "Given two sorted integer arrays, return a single sorted array containing all elements of both.",
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
      "One pointer per array. Take the smaller current element each step.",
      "When one array runs out, copy the rest of the other.",
      "Use <= when comparing so equal values keep a stable order."
    ],
    "edgeCases": [
      "One or both arrays empty",
      "Duplicates across arrays",
      "Very different lengths"
    ],
    "complexity": "O(n + m) time, O(n + m) space",
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
    "title": "Merge overlapping time windows",
    "difficulty": "medium",
    "tags": [
      "arrays",
      "sorting",
      "intervals"
    ],
    "prompt": "Given a list of (start, end) windows, such as vehicle maintenance or inspection windows, merge all that overlap or touch and return the merged list in order.",
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
      "Sort by start first. Then each window either overlaps the last merged one or starts a new one.",
      "Overlap test: current.Start <= last.End. Merge by taking Math.Max of the two ends, since one window can contain the other.",
      "Ask whether touching windows (end == start) count as overlapping."
    ],
    "edgeCases": [
      "Empty list",
      "One window contains another",
      "Touching windows",
      "Unsorted input"
    ],
    "complexity": "O(n log n) time for the sort, O(n) space",
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
    "title": "Two Sum",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "hash-map"
    ],
    "prompt": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Exactly one solution exists and you may not use the same element twice.",
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
      "Brute force is two nested loops, O(n²). Start by saying that out loud.",
      "For each number, the number you need is target - nums[i]. Have you seen it already?",
      "A Dictionary<int,int> (value -> index) answers that in O(1). Check BEFORE inserting so you never reuse the same element."
    ],
    "edgeCases": [
      "Duplicate values ([3,3])",
      "Negative numbers",
      "The answer includes index 0"
    ],
    "complexity": "O(n) time, O(n) space",
    "solution": "static int[] TwoSum(int[] nums, int target)\n{\n    var seen = new Dictionary<int, int>(); // value -> index\n\n    for (int i = 0; i < nums.Length; i++)\n    {\n        int complement = target - nums[i];\n\n        if (seen.TryGetValue(complement, out int j))\n            return new[] { j, i };\n\n        seen[nums[i]] = i;\n    }\n\n    return Array.Empty<int>(); // the problem guarantees a solution\n}",
    "lesson": "C# arrays have a fixed size: int[] x = [] can never grow, and LINQ Append returns a NEW sequence instead of changing the array, so the result was discarded and the method returned []. Use a Dictionary (or a List) and do the lookup in O(1).",
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
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "stack",
      "strings"
    ],
    "prompt": "Given a string containing only ()[]{}, determine whether it is valid: every bracket is closed by the same type, in the correct order.",
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
      "The last bracket opened must be the first one closed: that is a stack.",
      "Map each closing bracket to its opening bracket in a Dictionary<char,char>. TryGetValue tells you in one lookup whether the char is a closer.",
      "At the end the stack must be empty, otherwise something was never closed."
    ],
    "edgeCases": [
      "\"((\"  unclosed",
      "\"([)]\" interleaved",
      "\")\" closer with an empty stack",
      "Empty string is valid"
    ],
    "complexity": "O(n) time, O(n) space",
    "solution": "static bool IsValid(string s)\n{\n    var stack = new Stack<char>();\n    var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };\n\n    foreach (char c in s)\n    {\n        if (pairs.TryGetValue(c, out char open))\n        {\n            if (stack.Count == 0 || stack.Pop() != open) return false;\n        }\n        else\n        {\n            stack.Push(c);\n        }\n    }\n\n    return stack.Count == 0;\n}",
    "lesson": "One boolean per bracket type cannot represent nesting or counts: \"(())\", \"((\" and \"([)]\" all gave wrong answers, and bool[] x = [] crashes on the first write. Use a Stack and check that it is empty at the end.",
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
    "title": "Merge two sorted linked lists",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "prompt": "Given the heads of two sorted linked lists, merge them into one sorted list by splicing together the existing nodes, and return its head.",
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
      "A linked list has no index and no Count. You can only follow .next from the head.",
      "Compare the two CURRENT nodes, attach the smaller one, and advance only the list you took from.",
      "Use a dummy head node so you do not special-case the first node, and attach whatever is left at the end (list1 ?? list2)."
    ],
    "edgeCases": [
      "Both lists empty returns null",
      "One list empty",
      "Different lengths",
      "Duplicates (use <= for a stable merge)"
    ],
    "complexity": "O(n + m) time, O(1) space",
    "solution": "static ListNode? MergeTwoLists(ListNode? list1, ListNode? list2)\n{\n    var dummy = new ListNode();   // placeholder before the real head\n    var tail = dummy;\n\n    while (list1 != null && list2 != null)\n    {\n        if (list1.val <= list2.val)\n        {\n            tail.next = list1;\n            list1 = list1.next;\n        }\n        else\n        {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n        tail = tail.next;\n    }\n\n    tail.next = list1 ?? list2;   // append whatever is left\n    return dummy.next;\n}",
    "lesson": "Treating the lists like arrays (list1[i], .Count, +=) does not compile, and comparing by position is wrong. Keep one pointer per list, advance only the one you used, and re-link existing nodes through a dummy head.",
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
    "title": "Best time to buy and sell stock",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "arrays",
      "greedy"
    ],
    "prompt": "prices[i] is the price of a stock on day i. Choose one day to buy and a later day to sell to maximize profit. Return the maximum profit, or 0 if no profit is possible.",
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
      "Brute force tries every buy/sell pair, O(n²).",
      "The best sale on day i is prices[i] minus the lowest price seen so far. Track that minimum in one pass."
    ],
    "edgeCases": [
      "Strictly decreasing prices return 0",
      "A single element returns 0",
      "All prices equal"
    ],
    "complexity": "O(n) time, O(1) space",
    "solution": "static int MaxProfit(int[] prices)\n{\n    int minPrice = prices[0];\n    int maxProfit = 0;\n\n    for (int i = 1; i < prices.Length; i++)\n    {\n        if (prices[i] < minPrice)\n            minPrice = prices[i];\n        else\n            maxProfit = Math.Max(maxProfit, prices[i] - minPrice);\n    }\n\n    return maxProfit;\n}",
    "lesson": "Your solution was correct. Polish: start the loop at i = 1, use else-if (a new minimum cannot also be a best sale), use short names like minPrice/maxProfit, and watch for stray characters when pasting.",
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
    "title": "Climbing stairs",
    "difficulty": "easy",
    "source": "LeetCode",
    "tags": [
      "dynamic-programming",
      "fibonacci"
    ],
    "prompt": "You climb a staircase of n steps, taking 1 or 2 steps at a time. In how many distinct ways can you reach the top?",
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
      "The last move was 1 step from n-1 or 2 steps from n-2, so ways(n) = ways(n-1) + ways(n-2): Fibonacci.",
      "Plain recursion is O(2ⁿ) because of overlapping subproblems. Memoize, then notice you only need the last two values.",
      "n <= 45 keeps the answer inside an int (ways(45) = 1,836,311,903)."
    ],
    "edgeCases": [
      "n = 1 returns 1",
      "n = 2 returns 2",
      "Large n: overflow beyond int"
    ],
    "complexity": "O(n) time, O(1) space",
    "solution": "static int ClimbStairs(int n)\n{\n    if (n <= 2) return n;\n\n    int prev = 1;   // ways to reach step i-2\n    int curr = 2;   // ways to reach step i-1\n\n    for (int i = 3; i <= n; i++)\n        (prev, curr) = (curr, prev + curr);\n\n    return curr;\n}",
    "lesson": "Name the recurrence first. Then go brute force -> memoization -> two variables. The follow-up \"1, 2 or 3 steps\" just adds ways(n-3).",
    "related": [
      {
        "title": "Climbing Stairs",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      }
    ]
  }
];
