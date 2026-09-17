# God File Elimination & Refactoring Playbook

A **God File** is an anti-pattern where a single file knows too much, does too much, or centralizes too many unrelated responsibilities. It is the primary cause of regression bugs, untestable code, merge conflicts, and developer cognitive fatigue.

---

## 🚨 Anatomy of a God File

A file is classified as a **God File** if it matches any 2 of the following criteria:

1. **Exceeds 200 lines of code** (150 lines for React components).
2. **Has more than 3 distinct responsibilities** (e.g. database querying + business calculation + modal management).
3. **Contains more than 4 `useState` or 2 `useEffect` hooks** in the same component.
4. **Mixes layers**: Imports raw database drivers/HTTP clients directly into UI presentation.
5. **Contains inline helper functions** that could be pure utilities.
6. **Declares multiple distinct components** within the same file.

---

## 🔨 The 5-Step Deconstruction Playbook

When confronting a God Component, follow this deterministic 5-step refactoring recipe:

```
[God Component (350+ lines)]
           │
           ├─ Step 1 ──► [types.ts] (Extract contracts, models & interfaces)
           ├─ Step 2 ──► [utils/calculations.ts] (Extract pure deterministic logic)
           ├─ Step 3 ──► [useFeatureState.ts] (Extract state, effects & callbacks)
           ├─ Step 4 ──► [SubComponents/*.tsx] (Extract discrete UI panels)
           └─ Step 5 ──► [FeatureContainer.tsx] (Lean <80 lines coordinator)
```

### Step 1: Extract Types & Contracts (`types.ts`)
- Cut all interface and type definitions from the component file.
- Move them to a dedicated `types.ts` in the feature folder.
- Ensure strict types: eliminate all `any`, `unknown` without validation, or loose index signatures.

### Step 2: Extract Pure Calculations & Formats (`utils.ts`)
- Identify all functions that do not touch React state (e.g., total calculations, date formatting, string validations).
- Move them to a pure utility file.
- Make them 100% deterministic (same input -> same output).
- Write unit tests for these pure functions immediately.

### Step 3: Extract Orchestration into Custom Hook (`useFeature.ts`)
- Cut all `useState`, `useEffect`, `useRef`, and asynchronous handler functions.
- Place them inside a custom hook (e.g., `usePOSRegister()`).
- Return a strictly typed API: `{ state, actions, refs }`.

### Step 4: Extract Presentational Subcomponents
- Break large JSX blocks into dedicated subcomponents:
  - Header / Toolbar -> `RegisterHeader.tsx`
  - Item List -> `RegisterItemList.tsx`
  - Summary / Action Bar -> `RegisterSummary.tsx`
- Each subcomponent must have its own typed props interface.
- Keep subcomponents under 80 lines.

### Step 5: Assemble the Lean Coordinator Component
- The original component becomes a lightweight conductor:
  1. Calls the custom hook.
  2. Passes slice of state and callbacks to each subcomponent.
  3. Returns clean, readable JSX (< 80 lines).

---

## 🚫 Additional Lethal Anti-Patterns

### 1. Prop Drilling Nightmare
- Passing props through 5 intermediary components that don't need them just to reach a leaf child.
- **Solution**: Use **Component Composition** (`children` or slots) or React Context for global UI state.

### 2. Side-Effect Soup (`useEffect` Chains)
- Triggering an effect that sets state, which triggers a second effect that sets another state, causing cascading re-renders and race conditions.
- **Solution**: Consolidate into an event handler or `useReducer`. State transitions should be explicit and triggered by user actions or single events, not reactive cascades.

### 3. Multiple Components in One File
- Defining `CardItem`, `CardHeader`, `CardFooter`, `BadgeHelper` inside `Card.tsx`.
- **Rule**: One export component per file. Sub-components belong in their own file within the same directory or subfolder.
