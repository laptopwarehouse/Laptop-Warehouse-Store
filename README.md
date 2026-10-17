# Laptop Warehouse Store

Laptop Warehouse's online storefront — a WooCommerce-style catalog rebuilt as a fast React SPA and branded like the real shop: promo banner grid, category carousels with sale badges, live search, filterable category/brand pages, product pages with installment estimates, cart + checkout (delivery or branch pickup, BillEase/Home Credit), a 19-branch locator, blog, and warranty/privacy pages.

Built from a structural analysis (REA web-bundle inspection) of a comparable Philippine laptop store — original code, copy, and product data; no third-party assets copied.

## Stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4
- React Router 7 (SPA routing)

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
```

## Deploy (Cloudflare Pages)

```bash
npm run build  # outputs dist/
```

Deploy `dist/`. `public/_redirects` handles SPA fallback and `public/_headers` sets security headers.

## Env / checks

- Node >= 20
- `npm run lint` — typecheck
- No backend needed: checkout is a guided demo flow (order reference via SMS confirmation). Payments listed are in-store/delivery-based.
