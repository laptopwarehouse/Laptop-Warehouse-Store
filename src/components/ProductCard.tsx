import { Link } from 'react-router-dom';
import { BookmarkCheck } from 'lucide-react';
import { discountPercent, formatPeso, getCategory, type Product } from '../data/catalog';
import { useCart } from '../lib/cart';
import { useStore } from '../lib/store';
import ProductArt from './ProductArt';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { inBranch, branch } = useStore();
  const off = discountPercent(product);
  const inStore = inBranch(product);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="relative block">
        <ProductArt product={product} />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {off > 0 && <span className="rounded-full bg-red-600 px-2 py-1 text-[11px] font-bold text-white">-{off}%</span>}
          {product.badge && <span className="rounded-full bg-ink px-2 py-1 text-[11px] font-bold text-brand">{product.badge}</span>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{getCategory(product.category)?.name}</p>
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-800 hover:text-brand-dark">
          {product.name}
        </Link>
        <p className={`mt-1 text-[10px] font-bold uppercase tracking-wide ${inStore ? 'text-green-700' : 'text-neutral-400'}`}>
          {inStore ? `In store · ${branch.shortName}` : 'Online only'}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.originalPrice && <p className="text-xs text-neutral-400 line-through">{formatPeso(product.originalPrice)}</p>}
            <p className="text-base font-extrabold text-neutral-900">{formatPeso(product.price)}</p>
          </div>
          {inStore && (
            <button
              type="button"
              onClick={() => add(product)}
              disabled={product.stock === 0}
              aria-label={`Reserve ${product.name} at ${branch.shortName}`}
              title={`Reserve at ${branch.shortName}`}
              className="rounded-md bg-brand p-2 text-white transition hover:bg-brand-dark disabled:opacity-40"
            >
              <BookmarkCheck className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
