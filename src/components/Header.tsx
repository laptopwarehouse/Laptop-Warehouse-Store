import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, Menu, Newspaper, Search, ShoppingCart, X } from 'lucide-react';
import { BRANDS, CATEGORIES, brandSlug, formatPeso } from '../data/catalog';
import { STORE } from '../data/content';
import { useCart } from '../lib/cart';
import BranchSelect from './BranchSelect';
import { searchProducts } from '../lib/search';
import ProductArt from './ProductArt';

function FacebookIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.95 3.73 2.29V10.2c-1.3-.12-2.56-.63-3.6-1.42-.48-.37-.9-.81-1.25-1.31v8.83c0 .87-.15 1.76-.52 2.54-.74 1.53-2.18 2.65-3.83 3.01-1.57.36-3.26.15-4.71-.58-1.55-.76-2.73-2.19-3.26-3.83-.58-1.74-.32-3.69.69-5.23 1.14-1.73 3.05-2.8 5.12-2.85.22 0 .43.01.65.03v3.74c-.58-.16-1.2-.17-1.79.01-.73.22-1.36.71-1.76 1.36-.54.85-.59 1.95-.14 2.85.42.85 1.25 1.45 2.19 1.6 1.01.17 2.08-.25 2.64-1.1.25-.38.38-.82.38-1.28V.02z" />
    </svg>
  );
}

function SearchBox({ mobile = false }: { mobile?: boolean }) {
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const results = searchProducts(q, 6);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path: string) => {
    setFocused(false);
    setQ('');
    navigate(path);
  };

  return (
    <div ref={boxRef} className={`relative ${mobile ? 'w-full' : 'w-full min-w-0'}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) go(`/shop?search=${encodeURIComponent(q.trim())}`);
        }}
        className="flex overflow-hidden rounded-md bg-white ring-1 ring-transparent focus-within:ring-2 focus-within:ring-brand"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search laptops, brands, accessories..."
          aria-label="Search products"
          className="w-full px-3 py-2.5 text-sm text-neutral-800 outline-none"
        />
        <button type="submit" aria-label="Search" className="bg-brand px-4 text-white hover:bg-brand-dark">
          <Search className="h-4 w-4" />
        </button>
      </form>
      {focused && q.trim().length > 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl">
          {results.length === 0 && <p className="px-4 py-3 text-sm text-neutral-500">No matches for “{q}”.</p>}
          {results.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(`/product/${p.id}`)}
              className="flex w-full items-center gap-3 border-b border-neutral-100 px-3 py-2 text-left hover:bg-neutral-50"
            >
              <ProductArt product={p} className="w-12 shrink-0 rounded" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-neutral-800">{p.name}</span>
                <span className="block text-xs font-bold text-brand-dark">{formatPeso(p.price)}</span>
              </span>
            </button>
          ))}
          {results.length > 0 && (
            <button
              type="button"
              onClick={() => go(`/shop?search=${encodeURIComponent(q.trim())}`)}
              className="w-full bg-neutral-50 px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand-dark hover:bg-neutral-100"
            >
              View all results
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function MegaNav() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
      isActive ? 'bg-brand/20 text-brand' : 'text-neutral-300 hover:bg-white/10 hover:text-white'
    }`;
  return (
    <nav aria-label="Shop" className="mx-auto hidden max-w-7xl items-center gap-1 px-4 md:flex">
      <NavLink to="/" end className={linkCls}>
        Home
      </NavLink>
      <div className="group relative">
        <button type="button" className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-white">
          Shop by Category <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <div className="invisible absolute left-0 top-full z-50 w-64 rounded-lg border border-neutral-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              {c.name}
              <ChevronDown className="h-3 w-3 -rotate-90 text-neutral-400" />
            </Link>
          ))}
        </div>
      </div>
      <div className="group relative">
        <button type="button" className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-white">
          Shop by Brand <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <div className="invisible absolute left-0 top-full z-50 w-[30rem] rounded-lg border border-neutral-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="grid grid-cols-3">
            {BRANDS.map((b) => (
              <Link key={b} to={`/brand/${brandSlug(b)}`} className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
                {b}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <NavLink to="/branches" className={linkCls}>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> Branches
        </span>
      </NavLink>
      <NavLink to="/blog" className={linkCls}>
        <span className="flex items-center gap-1.5">
          <Newspaper className="h-3.5 w-3.5" /> Blog
        </span>
      </NavLink>
      <NavLink to="/installments" className={linkCls}>
        Installments
      </NavLink>
    </nav>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-brand text-white">
        <p className="mx-auto max-w-7xl truncate px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-widest">
          Brand-new laptops at warehouse prices — 19 branches nationwide
        </p>
      </div>
      <div className="bg-ink">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:gap-6">
          <button
            type="button"
            className="rounded-md p-2 text-white hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Laptop Warehouse home">
            <img src="/logo.png" alt="Laptop Warehouse" className="h-10 w-10 rounded-full ring-1 ring-brand/60" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg font-bold tracking-widest text-brand">LAPTOP</span>
              <span className="text-[10px] font-semibold tracking-[0.35em] text-white">WAREHOUSE</span>
            </span>
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBox />
          </div>
          <BranchSelect dark className="hidden w-44 sm:flex" />
          <div className="ml-auto flex items-center gap-1">
            <a href={STORE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hidden rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white lg:block">
              <FacebookIcon />
            </a>
            <a href={STORE.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="hidden rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white lg:block">
              <TikTokIcon />
            </a>
            <a href={STORE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white lg:block">
              <InstagramIcon />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              aria-label={`Reservation list, ${count} items`}
            >
              <ShoppingCart className="h-4 w-4 text-brand" />
              <span className="hidden text-xs font-bold uppercase tracking-wide md:inline">Reserve</span>
              <span className="rounded bg-brand px-1.5 py-0.5 text-xs font-bold text-white">{count}</span>
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <SearchBox mobile />
        </div>
      </div>
      <div className="bg-ink-soft">
        <MegaNav />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between bg-ink px-4 py-3">
              <span className="font-display font-bold text-brand">MENU</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close" className="rounded-md p-1.5 text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-3" aria-label="Mobile">
              <BranchSelect className="mb-2 w-full" />
              <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 font-semibold hover:bg-neutral-100">
                Home
              </Link>
              <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-widest text-neutral-400">Shop by Category</p>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/category/${c.id}`} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {c.name}
                </Link>
              ))}
              <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-widest text-neutral-400">Shop by Brand</p>
              <div className="grid grid-cols-2">
                {BRANDS.map((b) => (
                  <Link key={b} to={`/brand/${brandSlug(b)}`} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                    {b}
                  </Link>
                ))}
              </div>
              <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-widest text-neutral-400">More</p>
              <Link to="/branches" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 font-semibold hover:bg-neutral-100">
                Branch Locator
              </Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 font-semibold hover:bg-neutral-100">
                Blog
              </Link>
              <Link to="/installments" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 font-semibold hover:bg-neutral-100">
                Installment Options
              </Link>
              <Link to="/privacy" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100">
                Privacy Policy
              </Link>
              <Link to="/terms" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100">
                Warranty Terms
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
