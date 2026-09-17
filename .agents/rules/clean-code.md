# Code Quality & Clean Architecture Rules (MANDATORY)

These rules are strictly enforced for all code generated, modified, or refactored in this repository.

## 1. Feature Specificity & Scoping (No Monolith Features)
- **Single Business Domain**: Each feature slice in `src/features/<feature-name>/` covers exactly one domain responsibility (e.g., `pos` is only live checkout; `catalog`, `customers`, `dian`, `cash`, `hardware` are separate feature slices).
- **Communication via Public API**: Features communicate only through feature `index.ts`. No deep private cross-imports.

## 2. Component Sub-clustering (NO Flat Component Dumping)
- **Within a Feature**: The `components/` folder must NEVER be a flat dump of 10+ mixed components.
- **Semantic Subfolders Required**: Subcomponents must be grouped by UI sub-area:
  - `components/<sub-area-1>/` (e.g. `components/cart/`, `components/payment/`, `components/header/`).
  - Max 5 files per folder before sub-grouping is required.

## 3. Zero Tolerance for God Files
- **Component Screens**: Maximum 80 lines (container connecting hook to subcomponents).
- **Subcomponents**: Maximum 150 lines of code.
- **Custom Hooks**: Maximum 100 lines of code.
- **Functions/Methods**: Maximum 30 lines of code. One function = one task.
- **Single Responsibility**: Never mix UI rendering, database querying, business logic, and formatting in the same file.

## 4. Pure Declarative JSX (No Business Logic in Markup)
- **Zero inline arrow handlers with logic**: Extract all click/submit/change handlers to the component body or custom hook.
- **Zero inline data transformations**: Never do `.filter()`, `.sort()`, or `.reduce()` inside the JSX return. Pre-calculate or memoize (`useMemo`) beforehand.
- **Zero nested ternaries**: Use guard clauses (early returns) or separate components.
- **Zero inline math/formatting**: Extract currency, date, and unit formatting to pure utility functions.

## 5. Dedicated Custom Hooks for State & Effects
- Any component requiring more than 2 state variables (`useState`) or any side effect (`useEffect`) must delegate to a dedicated custom hook (`use*`).
- Hooks expose clean reactive state and action handlers.

## 6. Pure Utilities & Domain Calculations
- All calculations (e.g. tax computations, totals, validations) must be pure functions residing in `src/lib/` or `src/utils/` (or feature-specific `utils/`).
- Pure functions must be 100% deterministic with zero side effects.

## 7. SOLID, KISS, DRY & YAGNI
- **KISS**: Write code that is clear and easily readable. Max indentation depth: 3 levels.
- **DRY**: Single source of truth for business rules and schemas.
- **YAGNI**: Build strictly for current requirements. Never add speculative code, unused generic abstractions, or dead code.
- **TypeScript Strictness**: Zero `any`. Zero unverified type assertions.
