# Pre-Commit & Code Review Checklist (Zero-Tolerance Floor)

Every single file created or modified must pass this 10-point verification before being considered complete. A single violation is grounds for rejecting the change.

---

## 📋 The 10-Point Verification Matrix

| # | Checkpoint | Rule & Criteria | Pass Condition |
| :-: | :--- | :--- | :--- |
| **1** | **Line Ceilings** | Component ≤ 150 lines, Hook ≤ 100 lines, Function ≤ 30 lines. | Strict compliance. |
| **2** | **JSX Purity** | Zero inline arrow functions with logic, zero array filtering/sorting in JSX. | Pure declarative markup only. |
| **3** | **Single Responsibility** | Exactly one reason to change. No DB calls in UI, no UI in services. | 1 primary responsibility per file. |
| **4** | **Custom Hook Extraction** | Components with >2 state variables or any `useEffect` delegate to a hook. | Logic cleanly extracted. |
| **5** | **Pure Utility Extraction** | Formatting, math, and string transformations isolated in pure functions. | 100% deterministic & testable. |
| **6** | **Interface Segregation** | Component props only ask for what they render. No dumping full models. | Minimal, cohesive prop interfaces. |
| **7** | **TypeScript Strictness** | Zero `any`, zero unvetted `as` casts, explicit return types on hooks & APIs. | Full type safety. |
| **8** | **KISS & Guard Clauses** | Max indentation depth of 3. Early returns used to eliminate `if/else` ladders. | Linear, readable execution flow. |
| **9** | **YAGNI Compliance** | No speculative code, unused parameters, dead imports, or "just in case" flags. | Only what is currently needed. |
| **10**| **DRY with Pragmatism** | Business rules have a single source of truth; no duplicate algorithms. | No redundant business logic. |

---

## 🔍 Fast Review Procedure

When auditing code, run through this mental scanner:

```
1. SCAN SIZES:
   - Is any file > 150 lines? ──► REFACTOR
   - Is any function > 30 lines? ──► SPLIT

2. SCAN JSX:
   - Do you see `onClick={() => { ...multiple lines... }}`? ──► EXTRACT HANDLER
   - Do you see `array.filter().map()` inside return? ──► EXTRACT TO useMemo
   - Do you see nested ternaries `? : ? :`? ──► REWRITE WITH GUARD CLAUSES

3. SCAN TYPES:
   - Is there an `any`? ──► DEFINE INTERFACE / UNION
   - Are props accepting whole domain records unnecessarily? ──► TRIM PROPS

4. SCAN RESPONSIBILITIES:
   - Does this component fetch data directly from a DB/HTTP client? ──► MOVE TO SERVICE/HOOK
   - Does this component format dates or currencies inline? ──► MOVE TO UTILS
```

---

## 🎯 Scoring & Verdict

- **10/10**: **PASSED (Impeccable Craftsmanship)** - Ready to commit.
- **8-9/10**: **CONDITIONAL** - Minor improvements needed before completion.
- **< 8/10**: **REJECTED** - Mandatory refactor required using the 5-Step Deconstruction Playbook.
