# SOLID, KISS, DRY & YAGNI Guide

This reference details the core software engineering principles adapted specifically for modern TypeScript and component-based architectures.

---

## 1. Single Responsibility Principle (SRP)

> *"A class or module should have one, and only one, reason to change."*

In React and TypeScript:
- **A Component** changes only when the UI presentation or layout changes.
- **A Custom Hook** changes only when the state lifecycle or client-side orchestration changes.
- **A Service** changes only when the external data source, protocol, or endpoint contract changes.
- **A Utility** changes only when the underlying mathematical or formatting algorithm changes.

### ❌ Violation (Multiple Responsibilities)
```tsx
// ❌ Violates SRP: mixes data fetching, data formatting, business logic, and UI rendering
export function ProductPriceTag({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  if (!product) return <span>Loading...</span>;

  // Business logic & formatting mixed with UI
  const tax = product.price * 0.19;
  const formatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price + tax);

  return <span className="text-bold">{formatted} (IVA incluido)</span>;
}
```

### ✅ Clean Adherence (SRP)
```tsx
// 1. Pure utility (formatCurrency.ts)
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
}

// 2. Pure domain calculation (taxes.ts)
export function calculateCOPPriceWithTax(netPrice: number, taxRate = 0.19): number {
  return netPrice * (1 + taxRate);
}

// 3. Reusable hook (useProduct.ts)
export function useProduct(productId: string) {
  // uses React Query / SWR / store or service
  return useQuery({ queryKey: ['product', productId], queryFn: () => productService.getById(productId) });
}

// 4. Pure presentational component (ProductPriceTag.tsx)
interface ProductPriceTagProps {
  finalPrice: number;
}
export function ProductPriceTag({ finalPrice }: ProductPriceTagProps) {
  return <span className="font-semibold text-foreground">{formatCOP(finalPrice)} (IVA incluido)</span>;
}
```

---

## 2. Open / Closed Principle (OCP)

> *"Software entities should be open for extension, but closed for modification."*

In Component Architecture:
- Extend UI behavior through **composition**, **slots/children**, and **render props**, rather than giant nested `switch` or `if/else` statements modifying existing files.

### ❌ Violation (Modification Cascades)
```tsx
// ❌ Every time a new badge type is introduced, this file must be modified
function StatusBadge({ status }: { status: 'paid' | 'pending' | 'failed' | 'refunded' | 'cancelled' }) {
  if (status === 'paid') return <span className="bg-green-500">Pagado</span>;
  if (status === 'pending') return <span className="bg-yellow-500">Pendiente</span>;
  if (status === 'failed') return <span className="bg-red-500">Fallido</span>;
  if (status === 'refunded') return <span className="bg-blue-500">Reembolsado</span>;
  return <span className="bg-gray-500">Cancelado</span>;
}
```

### ✅ Clean Adherence (OCP with Polymorphic Variants)
```tsx
// ✅ Open for extension: styles & labels are decoupled or variant-mapped
export interface BadgeVariantConfig {
  label: string;
  className: string;
}

export const STATUS_CONFIG: Record<string, BadgeVariantConfig> = {
  paid: { label: 'Pagado', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  pending: { label: 'Pendiente', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  failed: { label: 'Fallido', className: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
};

export function StatusBadge({ status, config = STATUS_CONFIG }: { status: string; config?: Record<string, BadgeVariantConfig> }) {
  const current = config[status] ?? { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border', current.className)}>
      {current.label}
    </span>
  );
}
```

---

## 3. Liskov Substitution Principle (LSP)

> *"Subtypes must be substitutable for their base types without altering correctness."*

In React & TypeScript:
- Custom wrappers (e.g. `CustomButton`, `SearchInput`) must faithfully fulfill standard HTML or base component contracts.
- Do not suppress standard attributes or introduce conflicting signatures.

```tsx
// ✅ Correct: Inherits and transparently supports all native button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', isLoading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button disabled={disabled || isLoading} {...rest}>
      {isLoading ? <Spinner className="mr-2" /> : null}
      {children}
    </button>
  );
}
```

---

## 4. Interface Segregation Principle (ISP)

> *"Clients should not be forced to depend upon interfaces that they do not use."*

In React:
- **Never pass full domain entities** when a component only needs 1 or 2 fields.
- Avoid "fat props" that force mock-heavy tests and tie UI components to database schemas.

### ❌ Violation (Fat Interface)
```tsx
// ❌ Component depends on a massive Customer object with 30 DB fields
function CustomerAvatar({ customer }: { customer: CustomerCompleteRecord }) {
  return <img src={customer.avatarUrl} alt={customer.fullName} />;
}
```

### ✅ Clean Adherence (Segregated Interface)
```tsx
// ✅ Lean, reusable anywhere (users, staff, customers, contractors)
interface AvatarDisplayProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarDisplay({ imageUrl, name, size = 'md' }: AvatarDisplayProps) {
  return (
    <div className={cn('rounded-full overflow-hidden', sizeClasses[size])}>
      {imageUrl ? <img src={imageUrl} alt={name} /> : <span>{name.charAt(0)}</span>}
    </div>
  );
}
```

---

## 5. Dependency Inversion Principle (DIP)

> *"High-level modules should not depend on low-level details. Both should depend on abstractions."*

In Frontend Architecture:
- UI components and custom hooks should not directly import raw database clients (e.g., Dexie direct queries, raw Supabase client, direct `fetch()`).
- Data access must be mediated through an abstracted **Service Layer** or **Repository Interface**.

```tsx
// 1. Contract abstraction
export interface CustomerRepository {
  getById(id: string): Promise<Customer | null>;
  search(query: string): Promise<Customer[]>;
}

// 2. High-level hook depends on the repository contract, not the raw DB
export function useCustomerSearch(repo: CustomerRepository, debounceMs = 300) {
  const [results, setResults] = useState<Customer[]>([]);
  // ...
}
```

---

## 6. YAGNI (You Aren't Gonna Need It)

- **Rule**: Implement features and abstractions only when you have a proven, current requirement.
- **Banned**:
  - Unused generic type parameters.
  - "Future-proofing" flags: `enableFeatureXMaybeLater?: boolean`.
  - Empty stub functions for hypothetical tomorrow features.
  - Premature caching layers before performance bottlenecks are measured.

---

## 7. KISS (Keep It Simple, Stupid)

- **Rule**: Favor clear, readable code over clever, convoluted abstractions.
- If an engineer with 1 year of experience cannot understand the code in 60 seconds, it is overcomplicated.
- Prefer explicit variable names and step-by-step logic over dense nested regexes or chaining 6 array operations in one unreadable statement.

---

## 8. DRY (Don't Repeat Yourself) — The Pragmatic Balance

- **Rule**: Every piece of business knowledge, formula, or validation must have a single authoritative representation.
- **The Rule of Three**: Do not extract a shared abstraction on the second repetition; wait until the third, once patterns and variations are proven.
- **AHA Programming**: *Avoid Hasty Abstractions*. Duplication is far cheaper than the wrong abstraction.
