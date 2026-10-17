import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { formatPeso } from '../data/catalog';
import { useCart } from '../lib/cart';
import ProductArt from './ProductArt';

export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, remove } = useCart();
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button type="button" aria-label="Close cart" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between bg-ink px-4 py-3">
          <p className="flex items-center gap-2 font-display font-bold text-white">
            <ShoppingCart className="h-4 w-4 text-brand" /> Your Cart
          </p>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1.5 text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {lines.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingCart className="h-10 w-10 text-neutral-300" />
              <p className="text-sm text-neutral-500">Your cart is empty.</p>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-ink hover:bg-brand-dark">
                Continue shopping
              </button>
            </div>
          )}
          {lines.map(({ product, qty }) => (
            <div key={product.id} className="mb-3 flex gap-3 rounded-lg border border-neutral-200 p-2">
              <ProductArt product={product} className="w-20 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.id}`} onClick={() => setOpen(false)} className="line-clamp-2 text-sm font-semibold hover:text-brand-dark">
                  {product.name}
                </Link>
                <p className="mt-0.5 text-sm font-bold text-brand-dark">{formatPeso(product.price)}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex items-center rounded-md border border-neutral-300">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(product.id, qty - 1)} className="p-1.5 hover:bg-neutral-100">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty(product.id, qty + 1)} disabled={qty >= product.stock} className="p-1.5 hover:bg-neutral-100 disabled:opacity-40">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)} className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-neutral-200 p-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="text-lg font-extrabold">{formatPeso(subtotal)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/checkout');
              }}
              className="w-full rounded-md bg-brand py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-brand-dark"
            >
              Proceed to checkout
            </button>
            <Link to="/cart" onClick={() => setOpen(false)} className="mt-2 block text-center text-xs font-semibold text-neutral-500 hover:text-brand-dark">
              View cart page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
