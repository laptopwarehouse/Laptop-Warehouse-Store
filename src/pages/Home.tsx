import { Link } from 'react-router-dom';
import { CreditCard, Laptop, Percent, ShieldCheck, Smartphone, Truck } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { ARTICLES, STORE } from '../data/content';
import { BRANCH_LOCATIONS } from '../data/branches';
import CategorySection from '../components/CategorySection';

const HOME_SECTIONS: { title: string; category: string }[] = [
  { title: 'Gaming Laptops', category: 'gaming-laptops' },
  { title: 'Everyday Laptops', category: 'everyday-laptops' },
  { title: 'Premium Laptops', category: 'premium-laptops' },
  { title: 'Desktops & All-in-One', category: 'desktops' },
  { title: 'Monitors & Printers', category: 'monitors-printers' },
  { title: 'Phones & Tablets', category: 'phones-tablets' },
  { title: 'Accessories', category: 'accessories' },
  { title: 'Software & Upgrades', category: 'software-upgrades' },
];

const SELLING_POINTS = [
  { icon: Truck, title: 'Nationwide Delivery', sub: 'Fast & safe shipments' },
  { icon: ShieldCheck, title: 'Genuine & Sealed', sub: 'Full store warranty' },
  { icon: CreditCard, title: '0% Installment', sub: 'BillEase & Home Credit' },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 py-5">
      {/* Promo banner grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/shop"
          className="group relative overflow-hidden rounded-xl bg-ink p-5 text-white md:col-span-2 lg:row-span-2 lg:min-h-[320px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(252,155,8,0.35),transparent_60%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="font-display text-2xl font-bold leading-tight md:text-3xl">
                Great laptops.
                <br />
                <span className="text-brand">Warehouse prices.</span>
              </p>
              <p className="mt-3 max-w-sm text-sm text-neutral-300">
                Brand-new laptops, gaming rigs, desktops and gadgets — priced like you're buying from the warehouse. Because you are.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition group-hover:bg-brand-dark">
                <Laptop className="h-4 w-4" /> Shop now
              </span>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-neutral-200">
                {SELLING_POINTS.map((s) => (
                  <span key={s.title} className="flex items-center gap-1.5">
                    <s.icon className="h-4 w-4 text-brand" /> {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
        <Link to="/installments" className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Percent className="h-6 w-6 text-brand" />
          <p className="mt-2 font-display font-bold text-neutral-900">No credit card? No problem.</p>
          <p className="mt-1 text-sm text-neutral-500">Up to 0% downpayment. Low interest rates via BillEase & Home Credit.</p>
          <span className="mt-3 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">More info</span>
        </Link>
        <Link to="/branches" className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Smartphone className="h-6 w-6 text-brand" />
          <p className="mt-2 font-display font-bold text-neutral-900">{BRANCH_LOCATIONS.length} branches nationwide</p>
          <p className="mt-1 text-sm text-neutral-500">Find the branch nearest you — walk in, test the unit, bring it home.</p>
          <span className="mt-3 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Locate a store</span>
        </Link>
        <Link to="/category/software-upgrades" className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <ShieldCheck className="h-6 w-6 text-brand" />
          <p className="mt-2 font-display font-bold text-neutral-900">Genuine software & upgrades</p>
          <p className="mt-1 text-sm text-neutral-500">Microsoft 365, antivirus, and same-day RAM/SSD upgrades at any branch.</p>
          <span className="mt-3 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Shop upgrades</span>
        </Link>
        <Link to="/category/gaming-laptops" className="rounded-xl bg-gradient-to-br from-brand to-brand-dark p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Laptop className="h-6 w-6 text-ink" />
          <p className="mt-2 font-display font-bold text-ink">RTX gaming deals</p>
          <p className="mt-1 text-sm font-medium text-ink/70">The best RTX 40-series prices in the country.</p>
          <span className="mt-3 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand">Level up</span>
        </Link>
      </div>

      {/* Category chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className="shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold hover:border-brand hover:text-brand-dark"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {HOME_SECTIONS.map((s) => (
        <CategorySection key={s.category} title={s.title} to={`/category/${s.category}`} products={PRODUCTS.filter((p) => p.category === s.category)} />
      ))}

      {/* Blog teaser */}
      <section className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-ink px-4 py-3">
          <h2 className="font-display text-lg font-bold text-white">
            <span className="mr-2 inline-block h-4 w-1.5 rounded-sm bg-brand align-middle" />
            {STORE.name} Blog
          </h2>
          <Link to="/blog" className="rounded-md bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink hover:bg-brand-dark">
            See all
          </Link>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.slice(0, 4).map((a) => (
            <Link key={a.slug} to={`/blog/${a.slug}`} className="rounded-lg border border-neutral-200 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">{a.category}</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">{a.title}</p>
              <p className="mt-2 line-clamp-3 text-xs text-neutral-500">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
