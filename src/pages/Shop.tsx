import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { BRANDS, CATEGORIES, PRODUCTS, brandSlug, getCategory, type Product } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../lib/search';
import { useStore } from '../lib/store';
import { MapPin } from 'lucide-react';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Name A–Z' },
] as const;

function sortProducts(list: Product[], sort: string) {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false));
  }
}

export default function Shop({ mode }: { mode: 'all' | 'category' | 'brand' | 'search' }) {
  const { categoryId, brandId } = useParams();
  const [params] = useSearchParams();
  const q = params.get('search') ?? '';
  const brandName = mode === 'brand' ? BRANDS.find((b) => brandSlug(b) === brandId) : undefined;
  const category = mode === 'category' ? getCategory(categoryId ?? '') : undefined;

  const base = useMemo(() => {
    if (mode === 'category') return category ? PRODUCTS.filter((p) => p.category === category.id) : [];
    if (mode === 'brand') return brandName ? PRODUCTS.filter((p) => p.brand === brandName) : [];
    if (mode === 'search') return searchProducts(q);
    return PRODUCTS;
  }, [mode, category, brandName, q]);

  const min = Math.min(...base.map((p) => p.price));
  const max = Math.max(...base.map((p) => p.price));
  const [sort, setSort] = useState<string>('featured');
  const [brands, setBrands] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [cap, setCap] = useState(max);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { branch, openPicker } = useStore();

  const shown = useMemo(
    () => sortProducts(base.filter((p) => p.price <= cap && (!brands.length || brands.includes(p.brand)) && (!cats.length || cats.includes(p.category))), sort),
    [base, brands, cats, cap, sort],
  );

  const title =
    mode === 'category' ? (category?.name ?? 'Category') : mode === 'brand' ? (brandName ?? 'Brand') : mode === 'search' ? `Results for “${q}”` : 'All Products';
  const toggle = (list: string[], v: string, set: (v: string[]) => void) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filters = (
    <div className="space-y-5">
      {mode !== 'category' && (
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">Category</h3>
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggle(cats, c.id, setCats)} className="h-4 w-4 accent-brand" />
              {c.name}
            </label>
          ))}
        </div>
      )}
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">Brand</h3>
        {Array.from(new Set(base.map((p) => p.brand))).sort().map((b) => (
          <label key={b} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} className="h-4 w-4 accent-brand" />
            {b}
          </label>
        ))}
      </div>
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">Max price</h3>
        <input
          type="range"
          min={min}
          max={max}
          step={500}
          value={cap}
          onChange={(e) => setCap(Number(e.target.value))}
          className="w-full accent-brand"
          aria-label="Maximum price"
        />
        <p className="text-sm font-semibold">Up to ₱{cap.toLocaleString('en-PH')}</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-neutral-500">
        <Link to="/" className="hover:text-brand-dark">
          Home
        </Link>
        {category && (
          <>
            <span className="mx-1.5">/</span>
            <span className="font-semibold text-neutral-700">{category.name}</span>
          </>
        )}
        {brandName && (
          <>
            <span className="mx-1.5">/</span>
            <span className="font-semibold text-neutral-700">{brandName}</span>
          </>
        )}
      </nav>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          {category && <p className="text-sm text-neutral-500">{category.tagline}</p>}
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-400">
            <MapPin className="h-3 w-3" />
            Showing stock for{' '}
            <button type="button" onClick={openPicker} className="font-bold text-brand-dark underline underline-offset-2 hover:text-brand">
              {branch.shortName}
            </button>
            <span className="mx-1">·</span> {shown.length} items
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
          <label className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} rounded-xl bg-white p-4 shadow-sm lg:block`}>{filters}</aside>
        {shown.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-neutral-500">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
