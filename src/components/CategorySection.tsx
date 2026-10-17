import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../data/catalog';
import ProductCard from './ProductCard';

export default function CategorySection({ title, to, products }: { title: string; to: string; products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });
  if (!products.length) return null;
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3">
        <h2 className="font-display text-lg font-bold text-white md:text-xl">
          <span className="mr-2 inline-block h-4 w-1.5 rounded-sm bg-brand align-middle" />
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className="hidden rounded-md bg-white/10 p-1.5 text-white hover:bg-white/20 sm:block">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className="hidden rounded-md bg-white/10 p-1.5 text-white hover:bg-white/20 sm:block">
            <ChevronRight className="h-4 w-4" />
          </button>
          <Link to={to} className="rounded-md bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink hover:bg-brand-dark">
            See all
          </Link>
        </div>
      </div>
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto p-3">
        {products.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
