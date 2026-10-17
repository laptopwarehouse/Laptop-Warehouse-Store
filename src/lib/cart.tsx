import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProduct, type Product } from '../data/catalog';

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'lw-cart-v1';
const CartContext = createContext<CartState | null>(null);

function load(): Record<string, number> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartState>(() => {
    const lines = Object.entries(items)
      .map(([id, qty]) => ({ product: getProduct(id), qty }))
      .filter((l): l is CartLine => !!l.product && l.qty > 0);
    const clamp = (p: Product, q: number) => Math.max(0, Math.min(q, p.stock));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
      add: (product, qty = 1) => {
        setItems((prev) => ({ ...prev, [product.id]: clamp(product, (prev[product.id] ?? 0) + qty) }));
        setOpen(true);
      },
      setQty: (id, qty) => {
        const p = getProduct(id);
        if (!p) return;
        setItems((prev) => ({ ...prev, [id]: clamp(p, qty) }));
      },
      remove: (id) =>
        setItems((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        }),
      clear: () => setItems({}),
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
