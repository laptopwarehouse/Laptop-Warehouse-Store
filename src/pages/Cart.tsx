import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { formatPeso } from '../data/catalog';
import { useCart } from '../lib/cart';
import ProductArt from '../components/ProductArt';

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Your Cart</h1>
      {lines.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-10 text-center shadow-sm">
          <ShoppingCart className="mx-auto h-10 w-10 text-neutral-300" />
          <p className="mt-3 text-neutral-500">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {lines.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
              <ProductArt product={product} className="w-20 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold hover:text-brand-dark">
                  {product.name}
                </Link>
                <p className="text-sm font-bold text-brand-dark">{formatPeso(product.price)}</p>
              </div>
              <div className="flex items-center rounded-md border border-neutral-300">
                <button type="button" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)} className="p-2 hover:bg-neutral-100">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold">{qty}</span>
                <button type="button" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)} disabled={qty >= product.stock} className="p-2 hover:bg-neutral-100 disabled:opacity-40">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="hidden w-24 text-right text-sm font-bold sm:block">{formatPeso(product.price * qty)}</p>
              <button type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)} className="rounded-md p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex justify-between text-lg font-extrabold">
              <span>Subtotal</span>
              <span>{formatPeso(subtotal)}</span>
            </div>
            <Link to="/checkout" className="mt-3 block rounded-md bg-brand py-3 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-dark">
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
