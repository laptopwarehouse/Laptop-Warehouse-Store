import type { Product } from '../data/catalog';

function Device({ kind, color }: { kind: Product['art']; color: string }) {
  const screen = (
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#1f2937" />
      <stop offset="0.55" stopColor={color} stopOpacity="0.85" />
      <stop offset="1" stopColor="#0b0b0f" />
    </linearGradient>
  );
  switch (kind) {
    case 'laptop':
      return (
        <g>
          <defs>{screen}</defs>
          <rect x="40" y="30" width="120" height="78" rx="5" fill="#18181b" />
          <rect x="45" y="35" width="110" height="68" rx="2" fill="url(#screen)" />
          <path d="M28 110h144l-8 10H36z" fill={color} />
          <rect x="88" y="110" width="24" height="3" rx="1.5" fill="#00000033" />
        </g>
      );
    case 'aio':
    case 'monitor':
      return (
        <g>
          <defs>{screen}</defs>
          <rect x="30" y="22" width="140" height={kind === 'aio' ? 88 : 82} rx="5" fill="#18181b" />
          <rect x="35" y="27" width="130" height={kind === 'aio' ? 70 : 72} rx="2" fill="url(#screen)" />
          {kind === 'aio' && <rect x="35" y="99" width="130" height="8" fill={color} />}
          <path d="M92 110h16l6 14H86z" fill="#3f3f46" />
          <rect x="76" y="123" width="48" height="5" rx="2.5" fill="#27272a" />
        </g>
      );
    case 'desktop':
      return (
        <g>
          <rect x="70" y="18" width="62" height="112" rx="6" fill="#18181b" />
          <rect x="76" y="26" width="50" height="62" rx="3" fill={color} opacity="0.8" />
          <circle cx="101" cy="57" r="16" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
          <rect x="80" y="100" width="42" height="3" rx="1.5" fill="#52525b" />
          <rect x="80" y="108" width="42" height="3" rx="1.5" fill="#52525b" />
        </g>
      );
    case 'printer':
      return (
        <g>
          <rect x="62" y="20" width="76" height="26" rx="2" fill="#f4f4f5" stroke="#d4d4d8" />
          <rect x="36" y="44" width="128" height="58" rx="8" fill="#27272a" />
          <rect x="36" y="44" width="128" height="10" rx="4" fill={color} />
          <rect x="58" y="96" width="84" height="26" rx="2" fill="#fafafa" stroke="#d4d4d8" />
          <circle cx="146" cy="70" r="4" fill="#22c55e" />
        </g>
      );
    case 'phone':
      return (
        <g>
          <rect x="74" y="12" width="52" height="116" rx="10" fill="#18181b" />
          <rect x="78" y="18" width="44" height="104" rx="7" fill={color} opacity="0.85" />
          <rect x="92" y="21" width="16" height="4" rx="2" fill="#18181b" />
        </g>
      );
    case 'tablet':
      return (
        <g>
          <rect x="42" y="22" width="116" height="96" rx="9" fill="#18181b" />
          <rect x="48" y="28" width="104" height="84" rx="5" fill={color} opacity="0.85" />
          <rect x="156" y="40" width="4" height="60" rx="2" fill="#a1a1aa" transform="rotate(12 158 70)" />
        </g>
      );
    case 'headset':
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M55 92V72a45 45 0 0 1 90 0v20" stroke="#27272a" strokeWidth="9" />
          <rect x="42" y="82" width="26" height="40" rx="10" fill={color} />
          <rect x="132" y="82" width="26" height="40" rx="10" fill={color} />
          <path d="M55 118c0 10 10 14 26 12" stroke="#52525b" strokeWidth="4" />
        </g>
      );
    case 'mouse':
      return (
        <g>
          <rect x="72" y="22" width="56" height="98" rx="28" fill="#18181b" />
          <path d="M100 22v34" stroke="#3f3f46" strokeWidth="2" />
          <rect x="96" y="34" width="8" height="14" rx="4" fill={color} />
          <path d="M80 100c10 10 30 10 40 0" stroke={color} strokeWidth="3" fill="none" />
        </g>
      );
    case 'keyboard':
      return (
        <g>
          <rect x="20" y="44" width="160" height="58" rx="7" fill="#18181b" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 12 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={27 + c * 12.4} y={51 + r * 12} width="10" height="9" rx="1.5" fill={(r + c) % 5 === 0 ? color : '#3f3f46'} />
            )),
          )}
        </g>
      );
    case 'controller':
      return (
        <g>
          <path d="M50 60c10-14 90-14 100 0l14 46c3 12-12 20-22 10l-14-14H72l-14 14c-10 10-25 2-22-10z" fill={color} />
          <circle cx="76" cy="74" r="9" fill="#18181b" />
          <circle cx="124" cy="74" r="4" fill="#18181b" />
          <circle cx="134" cy="66" r="4" fill="#18181b" />
          <circle cx="134" cy="82" r="4" fill="#18181b" />
          <circle cx="144" cy="74" r="4" fill="#18181b" />
        </g>
      );
    case 'software':
      return (
        <g>
          <path d="M60 24h70l14 10v92H60z" fill={color} />
          <path d="M130 24l14 10h-14z" fill="#00000040" />
          <rect x="70" y="44" width="62" height="40" rx="3" fill="#ffffff" opacity="0.9" />
          <rect x="70" y="92" width="48" height="5" rx="2.5" fill="#ffffff" opacity="0.7" />
          <rect x="70" y="102" width="34" height="5" rx="2.5" fill="#ffffff" opacity="0.5" />
        </g>
      );
    case 'ram':
      return (
        <g>
          <rect x="26" y="52" width="148" height="38" rx="3" fill="#166534" />
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={38 + i * 34} y="58" width="26" height="20" rx="2" fill="#18181b" />
          ))}
          <rect x="26" y="52" width="148" height="10" fill={color} opacity="0.9" />
          {Array.from({ length: 30 }).map((_, i) => (
            <rect key={i} x={30 + i * 4.8} y="86" width="2.6" height="6" fill="#eab308" />
          ))}
        </g>
      );
  }
}

export default function ProductArt({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-b from-white to-neutral-100 ${className}`}>
      <svg viewBox="0 0 200 140" className="absolute inset-x-0 top-[12%] mx-auto w-[86%]" role="img" aria-label={product.name}>
        <ellipse cx="100" cy="132" rx="74" ry="5" fill="#00000014" />
        <Device kind={product.art} color={product.color} />
      </svg>
      <div className="absolute inset-x-3 bottom-3 space-y-0.5">
        {product.highlights.slice(0, 3).map((h) => (
          <p key={h} className="truncate text-[10px] font-semibold uppercase leading-tight text-neutral-700">
            {h}
          </p>
        ))}
      </div>
      <span className="absolute right-3 top-3 font-display text-[11px] font-bold uppercase tracking-wider text-neutral-500">{product.brand}</span>
    </div>
  );
}
