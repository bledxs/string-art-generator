# React Clean Components & Separation of Concerns

This reference provides absolute rules and patterns to maintain pristine JSX and enforce strict separation between Presentation, State Orchestration, and Business Logic.

---

## 🛑 Absolute Rules for JSX Purity

JSX is **markup and declarative layout**, not a programming scratchpad.

### The 5 Zero-Tolerance Banned Practices in JSX:

1. **NO MULTI-LINE INLINE ARROWS IN JSX**:
   ```tsx
   // ❌ STRICTLY FORBIDDEN
   <button onClick={() => {
     const next = count + 1;
     logEvent('click');
     if (next > 10) triggerAlert();
     setCount(next);
   }}>Click</button>
   
   // ✅ REQUIRED
   <button onClick={handleIncrement}>Click</button>
   ```

2. **NO INLINE DATA FILTERING / SORTING IN JSX**:
   ```tsx
   // ❌ STRICTLY FORBIDDEN
   <div>
     {items.filter(i => i.active && i.stock > 0).sort((a,b) => b.price - a.price).map(i => <Row key={i.id} item={i} />)}
   </div>

   // ✅ REQUIRED: Pre-calculate with useMemo or in the hook/component body
   <div>
     {visibleSortedItems.map(item => (
       <ProductRow key={item.id} item={item} />
     ))}
   </div>
   ```

3. **NO NESTED TERNARY OPERATORS**:
   ```tsx
   // ❌ STRICTLY FORBIDDEN
   <div>
     {isLoading ? <Spinner /> : isError ? <ErrorView /> : data.length === 0 ? <Empty /> : <List items={data} />}
   </div>

   // ✅ REQUIRED: Guard clauses or sub-renderers
   if (isLoading) return <Spinner />;
   if (isError) return <ErrorView error={error} />;
   if (data.length === 0) return <EmptyState />;
   return <List items={data} />;
   ```

4. **NO DIRECT ASYNC / PROMISE CALLS IN JSX**:
   ```tsx
   // ❌ STRICTLY FORBIDDEN
   <form onSubmit={async (e) => { e.preventDefault(); await fetch('/api/submit', ...); }}>
   
   // ✅ REQUIRED
   <form onSubmit={handleSubmit}>
   ```

5. **NO COMPLEX INLINE STRING FORMATTING**:
   ```tsx
   // ❌ STRICTLY FORBIDDEN
   <span>{'$' + (item.price * (1 - item.discount / 100)).toFixed(2) + ' USD'}</span>

   // ✅ REQUIRED: Delegate to a pure utility function
   <span>{formatDiscountedPrice(item.price, item.discount)}</span>
   ```

---

## 🏛️ The Gold Standard Component Structure

Every component file must follow a predictable, top-to-bottom layout:

```tsx
// 1. Imports (External libraries -> Internal components -> Hooks -> Services -> Utils/Types)
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePOSCheckout } from './hooks/usePOSCheckout';
import { formatCurrency } from '@/lib/formatters';
import type { POSCart } from './types';

// 2. Props Interface (Explicit, lean, typed)
interface POSCheckoutSummaryProps {
  cart: POSCart;
  onSuccess: (orderId: string) => void;
  className?: string;
}

// 3. Component Declaration
export function POSCheckoutSummary({ cart, onSuccess, className }: POSCheckoutSummaryProps) {
  // 3a. Hook consumption (Orchestration & State)
  const {
    totals,
    isProcessing,
    paymentMethod,
    setPaymentMethod,
    handleConfirmPayment,
  } = usePOSCheckout({ cart, onSuccess });

  // 3b. Guard Clauses / Early Returns for non-ideal states
  if (cart.items.length === 0) {
    return <EmptyCartMessage />;
  }

  // 3c. Pure Declarative Return
  return (
    <div className={className}>
      <PaymentMethodSelector
        selected={paymentMethod}
        onSelect={setPaymentMethod}
      />
      <TotalDisplay amount={formatCurrency(totals.grandTotal)} />
      <Button
        onClick={handleConfirmPayment}
        disabled={isProcessing}
        className="w-full mt-4"
      >
        {isProcessing ? 'Procesando Venta...' : 'Completar Venta'}
      </Button>
    </div>
  );
}
```

---

## 🪝 Custom Hook Design Pattern

A custom hook should act as the "brains" of the component.

### Guidelines for Hooks:
- **Max length**: 100 lines.
- **Return interface**: Return an object with clearly grouped properties:
  - `state` / reactive values (e.g. `items`, `isLoading`, `hasErrors`)
  - `actions` / event handlers (e.g. `handleSave`, `handleDelete`, `reset`)
- **Isolation**: A hook must never render JSX or manipulate DOM nodes directly.
- **Extraction trigger**: If a component has more than 2 `useState` hooks or any `useEffect`, extract them into a custom hook.

```tsx
// Example: usePOSCheckout.ts
export function usePOSCheckout({ cart, onSuccess }: UsePOSCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  const totals = useMemo(() => calculateCartTotals(cart.items), [cart.items]);

  const handleConfirmPayment = useCallback(async () => {
    try {
      setIsProcessing(true);
      const order = await salesService.createSale({ cart, paymentMethod, totals });
      onSuccess(order.id);
    } catch (error) {
      toast.error('Error al procesar la venta');
    } finally {
      setIsProcessing(false);
    }
  }, [cart, paymentMethod, totals, onSuccess]);

  return {
    totals,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    handleConfirmPayment,
  };
}
```

---

## 🧩 Reusable vs Domain Components

Maintain a clear distinction between:

| Dimension | Reusable Primitives (`components/ui/`) | Feature / Domain Components (`components/pos/`) |
| :--- | :--- | :--- |
| **Dependencies** | Zero domain knowledge, purely generic | Specific to business domain (e.g., invoices, taxes) |
| **Styling** | Highly configurable (variants via `cva`) | Tailored to domain layouts |
| **State** | Only local UI state (e.g., open/closed) | Bound to domain hooks or stores |
| **Example** | `Modal`, `Button`, `DataTable`, `Input` | `SaleInvoicePreview`, `TaxBreakdownCard` |
