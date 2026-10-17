import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import { PRODUCTS, discountPercent, formatPeso, getCategory, getProduct } from '../data/catalog';
import { INSTALLMENT_PLANS, PAYMENT_METHODS } from '../data/content';
import { useCart } from '../lib/cart';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { productId } = useParams();
  const product = getProduct(productId ?? '');
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [months, setMonths] = useState(6);

  const related = useMemo(() => (product ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []), [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="font-display text-xl font-bold">Product not found</p>
        <Link to="/shop" className="mt-3 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-ink">
          Back to shop
        </Link>
      </div>
    );
  }

  const off = discountPercent(product);
  const plan = INSTALLMENT_PLANS.find((p) => p.months === months) ?? INSTALLMENT_PLANS[1];
  const monthly = Math.ceil((product.price * (1 + plan.rate)) / plan.months / 5) * 5;

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-neutral-500">
        <Link to="/" className="hover:text-brand-dark">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/category/${product.category}`} className="hover:text-brand-dark">
          {getCategory(product.category)?.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-neutral-700">{product.name}</span>
      </nav>

      <div className="grid gap-6 rounded-xl bg-white p-4 shadow-sm md:grid-cols-2 md:p-6">
        <div className="relative">
          <ProductArt product={product} className="rounded-xl border border-neutral-200" />
          {off > 0 && <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">-{off}%</span>}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{product.brand}</p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-tight md:text-3xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-baseline gap-2">
            <p className="text-3xl font-extrabold text-brand-dark">{formatPeso(product.price)}</p>
            {product.originalPrice && <p className="text-lg text-neutral-400 line-through">{formatPeso(product.originalPrice)}</p>}
            {off > 0 && <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">Save {off}%</span>}
          </div>
          <p className={`mt-2 text-sm font-semibold ${product.stock <= 3 ? 'text-red-600' : 'text-green-700'}`}>
            {product.stock === 0 ? 'Out of stock' : product.stock <= 3 ? `Only ${product.stock} left in stock` : 'In stock'}
          </p>

          <ul className="mt-4 space-y-1.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {h}
              </li>
            ))}
          </ul>
          {product.freebies && (
            <p className="mt-3 rounded-md bg-brand/10 px-3 py-2 text-sm font-semibold text-brand-dark">Free with this unit: {product.freebies.join(', ')}</p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-neutral-300">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-neutral-100">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(Math.min(product.stock, qty + 1))} disabled={qty >= product.stock} className="p-2.5 hover:bg-neutral-100 disabled:opacity-40">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => add(product, qty)}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-brand-dark disabled:opacity-40"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-neutral-200 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Installment from</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {INSTALLMENT_PLANS.map((p) => (
                <button
                  key={p.months}
                  type="button"
                  onClick={() => setMonths(p.months)}
                  className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold ${months === p.months ? 'border-brand bg-brand/10 text-brand-dark' : 'border-neutral-300 text-neutral-600'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-lg font-extrabold">
              ≈ {formatPeso(monthly)} <span className="text-xs font-medium text-neutral-500">/mo for {plan.months} months via BillEase or Home Credit</span>
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="flex items-center gap-1.5 font-bold">
                <Truck className="h-4 w-4 text-brand-dark" /> Delivery
              </p>
              <p className="mt-1 text-xs text-neutral-500">Nationwide shipping. Free delivery within Metro Manila for orders over ₱10,000.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="font-bold">Payments</p>
              <p className="mt-1 text-xs text-neutral-500">{PAYMENT_METHODS.join(', ')}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-500">Warranty: {product.warranty}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="rounded-xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="font-display text-lg font-bold">Specifications</h2>
          <dl className="mt-4 divide-y divide-neutral-100">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3 py-2.5 text-sm sm:grid-cols-[180px_1fr]">
                <dt className="font-semibold text-neutral-500">{k}</dt>
                <dd className="text-neutral-800">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[120px_1fr] gap-3 py-2.5 text-sm sm:grid-cols-[180px_1fr]">
              <dt className="font-semibold text-neutral-500">Warranty</dt>
              <dd className="text-neutral-800">{product.warranty}</dd>
            </div>
          </dl>
        </section>
        {related.length > 0 && (
          <aside>
            <h2 className="mb-3 font-display text-lg font-bold">You may also like</h2>
            <div className="grid grid-cols-2 gap-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
