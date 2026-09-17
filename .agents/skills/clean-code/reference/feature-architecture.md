# Feature-Driven Architecture & Module Boundaries

This document defines the strict directory structure, boundary contracts, and architectural rules for this codebase. Code must never be placed arbitrarily ("a lo loco"); it must strictly conform to this domain-driven vertical slice structure.

---

## 🎯 Feature Specificity & Domain Scoping

A feature must have a **single, well-defined business domain**. A feature is NEVER allowed to become an umbrella monolith for multiple disparate domains.

### 🚫 Monolithic Feature Anti-Pattern
Treating `pos/` as a catch-all dumping ground that manages:
- POS Cart & Register +
- Full Product & Inventory CRUD +
- Customer CRM & Credit accounts +
- DIAN XML signing & Electronic Invoicing +
- Thermal Printer & Hardware protocols.

### ✅ Properly Scoped Slices
Each business capability is an independent, specialized feature:
- `features/pos/`: Strictly the live cashier checkout experience (cart, payment tender, active order).
- `features/catalog/`: Products, categories, price lists, inventory adjustments.
- `features/customers/`: Customer directory, credit lines, tax IDs (NIT/CC).
- `features/dian/`: DIAN e-invoicing, CUFE generation, resolution ranges, XML transmission.
- `features/cash/`: Cash drawer register, open/close shifts, X/Z arqueos.
- `features/hardware/`: ESC/POS printers, serial scales, barcode listeners.

When `pos` needs customer data, it consumes the **Public API (`index.ts`)** of `customers`, rather than reimplementing or embedding customer screens inside `pos`.

---

## 🏗️ The High-Level Directory Architecture

```
src/
├── app/                        # Application shell, providers, router, top-level layouts
│   ├── providers/              # Global context providers (Theme, QueryClient, AuthProvider)
│   ├── router/                 # App routes and route guards
│   └── layouts/                # Base shells (POSLayout, AdminLayout, AuthLayout)
│
├── features/ (or modules/)     # Vertical slices by specific business domain
│   ├── pos/                    # Point of Sale (Register, Cart, Tender)
│   ├── catalog/                # Products, categories, modifiers, inventory
│   ├── sales/                  # Sale history, receipts, refunds
│   ├── cash/                   # Shifts, cash register operations, X/Z cuts
│   ├── dian/                   # Electronic invoicing & DIAN compliance
│   ├── customers/              # Customer CRM, loyalty programs
│   ├── reports/                # Analytics, exports, metrics
│   └── hardware/               # Thermal printer, barcode scanner, cash drawer
│
├── shared/                     # Universal, domain-agnostic foundation
│   ├── ui/                     # Design system primitives (Button, Modal, Input, Table)
│   ├── hooks/                  # Domain-agnostic hooks (useDebounce, useMediaQuery, useKeypress)
│   ├── utils/                  # Universal pure functions (currency, dates, cn, validation)
│   └── types/                  # Global base types (API response wrappers, common enums)
│
└── assets/                     # Static assets, SVG icons, fonts
```

---

## 📦 Anatomy of a Feature Slice (`src/features/<feature-name>/`)

### Zero Flat Dumping in `components/`: Semantic Sub-clustering
Inside a feature, the `components/` directory **must NEVER be a flat list of 15+ mixed components**. Components must be organized into **semantic subfolders by functional UI area**:

```
src/features/pos/
├── components/                 # Organized by UI sub-area (NO flat dumping)
│   ├── cart/                   # Specific to cart management
│   │   ├── CartItemList.tsx
│   │   ├── CartItemRow.tsx
│   │   ├── CartTotalsSummary.tsx
│   │   └── CartDiscountModal.tsx
│   ├── payment/                # Specific to the payment/tender modal
│   │   ├── PaymentModal.tsx
│   │   ├── PaymentMethodGrid.tsx
│   │   ├── CashTenderForm.tsx
│   │   └── CardTenderForm.tsx
│   ├── catalog-panel/          # Quick-selection product grid inside POS
│   │   ├── POSProductGrid.tsx
│   │   ├── POSProductCard.tsx
│   │   └── POSCategoryTabs.tsx
│   └── header/                 # POS top bar and cashier shift indicator
│       ├── POSHeader.tsx
│       └── ShiftStatusIndicator.tsx
│
├── hooks/                      # Custom hooks for state & orchestration (< 100 lines)
│   ├── usePOSCart.ts
│   ├── usePOSPayment.ts
│   └── usePOSScanner.ts
│
├── services/                   # External interactions (Dexie, HTTP, Supabase, storage)
│   └── posTransactionService.ts
│
├── utils/                      # Pure, deterministic domain calculations (< 30 lines/fn)
│   └── posCalculations.ts      # (Cart subtotal, tax breakdown, change calculations)
│
├── types/ (or types.ts)        # Domain contracts, payloads, and interfaces
│   └── pos.types.ts
│
├── POSScreen.tsx               # Main feature coordinator screen (< 80 lines)
└── index.ts                    # The Public API Barrel (ONLY what external features can import)
```

---

## 🛡️ Strict Dependency Flow & Boundary Rules

### 1. Unidirectional Dependency Rule
```
[ app/ ] ──────► [ features/ ] ──────► [ shared/ ]
```
- **`app/`** can import from `features/` and `shared/`.
- **`features/`** can import from `shared/`, and from other features ONLY via their `index.ts`.
- **`shared/`** can **NEVER** import anything from `features/` or `app/`. It must remain 100% domain-agnostic.

### 2. The Public API Gate (`index.ts`)
- Every feature must provide an `index.ts` acting as its public gateway.
- **FORBIDDEN**: Deep imports across features.
  ```ts
  // ❌ STRICTLY FORBIDDEN: Deep internal import
  import { PaymentMethodGrid } from '@/features/pos/components/payment/PaymentMethodGrid';
  import { calculateTax } from '@/features/pos/utils/calculations';
  
  // ✅ MANDATED: Import only exported symbols from the feature root
  import { POSScreen, usePOSCart, type CartItem } from '@/features/pos';
  ```

### 3. The Colocation Rule (Keep it Local)
- **Do not dump into `shared/` prematurely.**
- If a component, hook, or utility is only used within `pos/`, it **must live inside `features/pos/`**.
- Only promote an element to `shared/` when it is genuinely domain-agnostic AND needed by at least **2 independent features**.

### 4. Zero Circular Dependencies
- A feature must never import from another feature that imports back from it (`A -> B -> A`).
- If two features need to share domain logic, extract the shared abstraction to a dedicated domain module or coordinate via `app/` providers/mediators.

---

## 🎯 Container vs Presentational Component Rule

To prevent God components in features:
1. **The Feature Screen / Container (`[Feature]Screen.tsx`)**:
   - Max 80 lines.
   - Does NOT contain direct styling spaghetti or JSX depth > 3.
   - Connects the feature's primary hook to its sub-area components.
2. **Presentational Subcomponents (`components/<sub-area>/*.tsx`)**:
   - Receive thin, strictly-typed props.
   - Contain zero direct mutations or database calls.
   - Delegate all events to callbacks.
