# Interview Prep Module — Design Spec
**Date:** 2026-04-06
**Status:** Approved by user

---

## Overview

A hidden interview preparation module accessible via `/interviews` (not linked in the navbar, same pattern as `/jobs`). It helps the user practice and review interview questions relevant to their stack and skillset.

---

## Architecture

### Approach
Tab-driven layout with isolated mode sub-components (Option B). `InterviewComponent` is a thin shell; each tab and each mode is its own focused component. Data is fully static and lives in a single `interviewData.js` file.

### File Structure

```
src/
├── components/
│   ├── InterviewComponent.js           # Shell: tab switcher (Q&A / LeetCode)
│   ├── InterviewQAComponent.js         # Q&A tab: mode selector + filters + language toggle
│   ├── InterviewFlashcardMode.js       # Flashcard mode sub-component
│   ├── InterviewListMode.js            # List mode sub-component
│   ├── InterviewQuizMode.js            # Quiz mode sub-component
│   └── InterviewLeetCodeComponent.js   # LeetCode tab: curated problem links
├── data/
│   └── interviewData.js                # All Q&A data + LeetCode links (static)
└── styles/
    └── components/_interview.scss      # Styles, imported in styles.scss
```

### Route
- Path: `/interviews`
- Added to `DashboardRoutes.js`
- NOT added to `NavbarComponent.js`

---

## Data Model

### Q&A Questions (Flashcard & List modes)

```js
{
  id: Number,
  category: 'react' | 'typescript' | 'angular' | 'dotnet',
  question: { en: String, es: String },
  answer: { en: String, es: String },
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### Quiz Questions

Same shape as Q&A questions, plus:

```js
{
  options: { en: String[], es: String[] },  // always 4 options
  correctIndex: Number                       // 0-based index into options array
}
```

### LeetCode Problems

```js
{
  id: Number,
  title: String,
  difficulty: 'easy' | 'medium' | 'hard',
  category: String,                          // e.g. 'arrays', 'trees', 'dynamic-programming'
  url: String,                               // direct LeetCode URL
  tags: String[]
}
```

---

## Components

### `InterviewComponent`
- Top-level shell component
- Renders two tabs: **Q&A** and **LeetCode Problems** using react-bootstrap uncontrolled `Tabs` + `Tab` components — no `activeKey` state in this component
- Consumes `DarkModeContext` for theming
- No business logic

### `InterviewQAComponent`
- Renders a toolbar with three controls:
  1. **Mode selector:** 3 buttons — Flashcard / List / Quiz (active state highlighted)
  2. **Filter pills:** All | React | TypeScript | Angular | .NET — multi-select, all active by default
  3. **Language toggle:** EN / ES — uses local `useState` initialized to `'en'`; does not read from or write to `LanguageContext`; independent of the global site language toggle
- Filters the question list from `interviewData.js` based on selected categories
- Passes filtered questions + language to the active mode sub-component

### `InterviewFlashcardMode`
- Displays one question at a time in a centered card
- CSS flip animation to reveal the answer on click/tap
- Previous / Next navigation
- "Known ✓ / Still learning ✗" buttons for in-session tracking; tracking state lives inside `InterviewFlashcardMode` via local `useState` (resets on page refresh — no persistence)
- Progress indicator: `3 / 24`

### `InterviewListMode`
- All filtered questions listed, grouped by category with a section header
- Each item is a Bootstrap Accordion row — click to expand the answer
- Difficulty badge (easy / medium / hard) shown on each row

### `InterviewQuizMode`
- One question at a time with 4 answer options as clickable buttons
- On selection: immediately highlights correct (green) and wrong (red)
- "Next" button appears after answering
- Final score screen: `You got 7 / 10 correct` with a restart option
- **Empty state:** if no questions match the active filters (all categories deselected), renders a "No questions available. Please select at least one category." message instead of the quiz UI
- **Minimum content:** each category will have at least 5 questions to ensure a meaningful quiz session even when filtering to a single category

### `InterviewLeetCodeComponent`
- Card or table list of curated LeetCode problems
- Columns/fields: title, difficulty badge, category, tags, link button to LeetCode
- Filter by difficulty: All / Easy / Medium / Hard
- The `category` field from the data model is displayed only (not filterable) to keep the UI simple

---

## Styling

- New file: `src/styles/components/_interview.scss`
- Imported in `src/styles/styles.scss`
- Follows existing dark/light mode conventions (classes toggled via `DarkModeContext`)
- Flip animation for flashcard implemented with CSS `perspective` + `transform-style: preserve-3d`

---

## Content

- Questions are curated manually and hardcoded in `interviewData.js`
- Coverage: React, TypeScript, Angular, .NET/C# — balanced across difficulties
- LeetCode problems: curated list of commonly asked problems, linked directly
- All Q&A text has both `en` and `es` keys

---

## Out of Scope

- Persistent progress tracking (no localStorage or backend)
- Authentication / access control (route is hidden but not protected)
- Dynamic fetching from external APIs
- Fetching directly from the liquidslr/interview-company-wise-problems GitHub repo
