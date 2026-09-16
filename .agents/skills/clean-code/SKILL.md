---
name: clean-code
description: Super-strict code quality enforcement skill. Enforces SOLID principles, KISS, DRY, YAGNI, zero tolerance for God files, strict separation of concerns (pure declarative JSX with zero business logic), dedicated custom hooks, pure testable utilities, clean reusable components, component sub-clustering by functional area, and modular Feature-Driven Architecture. Use whenever writing, refactoring, reviewing, or designing code in TypeScript/React codebases.
version: 1.2.0
---

# Clean Code & Architectural Craftsmanship (Strict Quality Floor)

This skill establishes a **zero-tolerance quality floor** for software design, component architecture, directory organization, and code cleanliness. Code written under this skill is expected to be modular, self-documenting, and free from spaghetti logic, god files, or arbitrary file placement.

---

## 🛡️ The 9 Non-Negotiable Tenets

1. **MODULAR FEATURE-DRIVEN ARCHITECTURE**: Code is organized into self-contained vertical slices under `src/features/<feature>/` with explicit public APIs (`index.ts`). Nothing is placed arbitrarily (*"a lo loco"*).
2. **STRICT FEATURE SCOPING**: A feature must have a single business domain (e.g., `pos` is strictly checkout/caja; `catalog`, `customers`, and `dian` are independent features). Never build umbrella monolith features.
3. **NO FLAT DUMPING IN `components/`**: Within a feature, components must be organized into **semantic subfolders by UI area** (`components/cart/`, `components/payment/`, `components/header/`). Never dump 15+ loose components into a flat folder.
4. **NO GOD FILES**: Any file exceeding hard length or responsibility limits is an immediate defect. One file = one clear responsibility.
5. **PURE JSX (ZERO INLINE LOGIC)**: JSX is strictly a declarative view layer. It must NEVER contain business logic, multi-statement event handlers, direct mutations, or inline calculations.
6. **LOGIC BELONGS IN HOOKS**: All component state, side effects, data subscriptions, and lifecycle orchestration belong in dedicated custom hooks (`use*`).
7. **PURE TESTABLE UTILITIES**: All math, data transformations, string parsing, and formatting must be extracted into 100% pure, deterministic functions in `utils/` or `lib/`.
8. **SOLID PRINCIPLES BY DEFAULT**: Single responsibility, open/closed extension, Liskov substitution, interface segregation (thin props), and dependency inversion.
9. **YAGNI & KISS FIRST**: Build strictly for current requirements. No speculative parameters, no hypothetical features, no convoluted abstractions when a straightforward approach works.

---

## 📏 Hard Ceilings & Metrics

Violating any of these thresholds triggers an immediate mandatory refactoring:

| Element | Hard Limit | Warning Threshold | Remediation |
| :--- | :--- | :--- | :--- |
| **Component File** | **150 lines** | 100 lines | Extract sub-components & hooks |
| **Feature Container Screen** | **80 lines** | 60 lines | Connect hook with subcomponents only |
| **Custom Hook** | **100 lines** | 70 lines | Decompose into sub-hooks or utility functions |
| **Function / Method** | **30 lines** | 20 lines | Apply Guard Clauses & Single Responsibility |
| **Flat Components in Folder** | **5 files** | 4 files | Group into semantic subfolders (`cart/`, `payment/`) |
| **JSX Inline Handler** | **1 line** (call only) | Inline arrows | Move handler to hook or component body |
| **Component Props** | **7 props** | 5 props | Group with composite objects or compound components |
| **Indentation Depth** | **3 levels** | 2 levels | Early returns (Guard clauses) |
| **`any` / Type Assertions** | **0 permitted** | Any `as` cast | Strong discriminated unions & type guards |

---

## 🗂️ The Feature-Driven Workspace Blueprint

```
src/
├── app/                        # Shell: Providers, routes, global layouts
├── features/                   # Self-contained business domains (Specific scope!)
│   ├── <feature-name>/
│   │   ├── components/         # Sub-divided by functional area (NO flat dumping!)
│   │   │   ├── <sub-area-1>/   # e.g., cart/ (CartItem.tsx, CartTotals.tsx)
│   │   │   ├── <sub-area-2>/   # e.g., payment/ (PaymentModal.tsx, MethodGrid.tsx)
│   │   │   └── <sub-area-3>/   # e.g., header/ (POSHeader.tsx, ShiftStatus.tsx)
│   │   ├── hooks/              # Custom hooks for state/orchestration (< 100 lines)
│   │   ├── services/           # Data access (Dexie, API, Supabase)
│   │   ├── utils/              # Pure domain calculations (< 30 lines/fn)
│   │   ├── types.ts            # Domain contracts & interfaces
│   │   ├── [Feature]Screen.tsx # Lean container (< 80 lines)
│   │   └── index.ts            # Public API (only allowed entry point for outsiders)
├── shared/                     # Cross-cutting primitives (Zero domain knowledge)
│   ├── ui/                     # Design system atoms (Button, Modal, Input, Table...)
│   ├── hooks/                  # Agnostic hooks (useDebounce, useMediaQuery...)
│   ├── utils/                  # Pure shared utils (formatCurrency, cn, dates...)
│   └── types/                  # Global primitive types
```

### Module Boundary Rules:
- **`shared/` NEVER imports from `features/` or `app/`**.
- **`features/` only import from other features via their `index.ts`** (No deep private imports).
- **Colocation**: If an item is only used in one feature, it stays in that feature. Never elevate to `shared/` until used in ≥ 2 distinct features.

---

## 🚫 Strict Anti-Patterns (Immediate Rejections)

### 1. The Flat Component Dump (*"Bolsa de componentes"*)
- Dumping 15 different component files into `features/pos/components/` without semantic categorization.
- **Rule**: Group by UI sub-area (`cart/`, `payment/`, `catalog-view/`, `header/`). Max 5 loose files per directory.

### 2. The Umbrella Feature Monolith
- Cramming customer management, inventory catalog, and DIAN tax rules into `pos/`.
- **Rule**: Keep features strictly scoped. `customers/`, `catalog/`, `dian/`, `hardware/` are independent slices.

### 3. The JSX Logic Dump
- Inline calculations, multi-line handlers, or array operations in JSX.
- **Rule**: Handlers and derived data are computed in hooks or component bodies before the `return`.

### 4. The God Component
- Components exceeding 150 lines or managing modals, queries, and business math all at once.
- **Rule**: Break down using the 5-step deconstruction recipe into container, hook, subcomponents, and utils.

---

## 📋 Commands & Workflows

| Command | Action | Primary Reference |
| :--- | :--- | :--- |
| `audit [file]` | Review a file against strict clean code & architectural standards | [code-review-checklist.md](reference/code-review-checklist.md) |
| `refactor [file]` | Break down a God file into the 4-layer feature architecture | [anti-patterns-god-files.md](reference/anti-patterns-god-files.md) |
| `scaffold [name]` | Scaffold a new vertical slice with sub-clustered components | [feature-architecture.md](reference/feature-architecture.md) |
| `solid-check` | Verify compliance with SOLID, KISS, DRY, and YAGNI | [solid-kiss-dry-yagni.md](reference/solid-kiss-dry-yagni.md) |

---

## 📚 Deep-Dive References

- [Feature-Driven Architecture & Module Boundaries](reference/feature-architecture.md)
- [SOLID, KISS, DRY & YAGNI Guide](reference/solid-kiss-dry-yagni.md)
- [React Clean Components & JSX Purity Guide](reference/react-clean-components.md)
- [God File Elimination & Refactoring Playbook](reference/anti-patterns-god-files.md)
- [Pre-Commit / Code Review Checklist](reference/code-review-checklist.md)
