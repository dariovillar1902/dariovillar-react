// Warm-up coding exercises (C#). Statements are original; related LeetCode problems are linked by URL.
// Solutions are tested C# (xUnit-free harness) before being pasted here.

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
    "related": []
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
    ]
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
  }
];
