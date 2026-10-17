import { PRODUCTS, getCategory, type Product } from '../data/catalog';

export function searchProducts(query: string, limit?: number): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const results = PRODUCTS.filter((p) => {
    const hay = [p.name, p.brand, getCategory(p.category)?.name ?? '', ...p.highlights].join(' ').toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
  return limit ? results.slice(0, limit) : results;
}
