import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { BRANDS, CATEGORIES, brandSlug } from '../data/catalog';
import { PAYMENT_METHODS, STORE } from '../data/content';
import { BRANCH_LOCATIONS } from '../data/branches';

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

export default function Footer() {
  const mm = BRANCH_LOCATIONS.filter((b) => b.region === 'Metro Manila').length;
  return (
    <footer className="mt-10 bg-ink text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-full ring-1 ring-brand/60" />
            <div className="leading-none">
              <p className="font-display font-bold tracking-widest text-brand">LAPTOP</p>
              <p className="text-[10px] font-semibold tracking-[0.35em] text-white">WAREHOUSE</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            {STORE.tagline} Brand-new units, genuine software, and nationwide delivery — with {BRANCH_LOCATIONS.length} branches across the Philippines, {mm} of them in Metro Manila.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-brand" /> {STORE.phone}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-brand" /> Mon–Sat, 9:00 AM – 7:00 PM
          </p>
          <div className="mt-4 flex gap-2">
            <a href={STORE.facebook} aria-label="Facebook" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <FacebookIcon />
            </a>
            <a href={STORE.tiktok} aria-label="TikTok" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.95 3.73 2.29V10.2c-1.3-.12-2.56-.63-3.6-1.42-.48-.37-.9-.81-1.25-1.31v8.83c0 .87-.15 1.76-.52 2.54-.74 1.53-2.18 2.65-3.83 3.01-1.57.36-3.26.15-4.71-.58-1.55-.76-2.73-2.19-3.26-3.83-.58-1.74-.32-3.69.69-5.23 1.14-1.73 3.05-2.8 5.12-2.85.22 0 .43.01.65.03v3.74c-.58-.16-1.2-.17-1.79.01-.73.22-1.36.71-1.76 1.36-.54.85-.59 1.95-.14 2.85.42.85 1.25 1.45 2.19 1.6 1.01.17 2.08-.25 2.64-1.1.25-.38.38-.82.38-1.28V.02z" />
              </svg>
            </a>
            <a href={STORE.instagram} aria-label="Instagram" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <nav aria-label="Footer categories">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Categories</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.id}`} className="hover:text-brand">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer brands">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Top Brands</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {BRANDS.map((b) => (
              <li key={b}>
                <Link to={`/brand/${brandSlug(b)}`} className="hover:text-brand">
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/branches" className="flex items-center gap-2 hover:text-brand">
                <MapPin className="h-3.5 w-3.5" /> Branch locator
              </Link>
            </li>
            <li>
              <Link to="/installments" className="flex items-center gap-2 hover:text-brand">
                Installment options
              </Link>
            </li>
            <li>
              <Link to="/terms" className="flex items-center gap-2 hover:text-brand">
                <ShieldCheck className="h-3.5 w-3.5" /> Warranty terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-brand">
                Privacy policy
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wider text-white">Shop with us online</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={STORE.shopee} target="_blank" rel="noreferrer" className="hover:text-brand">
                Shopee — Laptop Warehouse Sandigan
              </a>
            </li>
            <li>
              <a href={STORE.tiktok} target="_blank" rel="noreferrer" className="hover:text-brand">
                TikTok Shop — @laptopwarehousemain
              </a>
            </li>
            <li>
              <a href={STORE.lazada} target="_blank" rel="noreferrer" className="hover:text-brand">
                Lazada — Laptop Warehouse Official
              </a>
            </li>
          </ul>
          <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wider text-white">We accept</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="rounded bg-white/10 px-2 py-1 text-[11px] font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {STORE.name}. All rights reserved. Prices are in Philippine pesos and may change without notice.
      </div>
    </footer>
  );
}
