import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin } from 'lucide-react';
import { formatPeso } from '../data/catalog';
import { INSTALLMENT_PLANS, PAYMENT_METHODS } from '../data/content';
import { BRANCH_LOCATIONS } from '../data/branches';
import { useCart } from '../lib/cart';
import { useStore } from '../lib/store';

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const { branch } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [orderRef, setOrderRef] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    branch: branch.id,
    payment: 'Cash',
    months: 6,
  });

  const pickupBranch = BRANCH_LOCATIONS.find((b) => b.id === form.branch) ?? branch;
  const plan = INSTALLMENT_PLANS.find((p) => p.months === form.months) ?? INSTALLMENT_PLANS[1];
  const isInstallment = form.payment === 'BillEase' || form.payment === 'Home Credit';
  const total = isInstallment ? Math.ceil((subtotal * (1 + plan.rate)) / 5) * 5 : subtotal;
  const monthly = Math.ceil(total / plan.months / 5) * 5;

  const valid = useMemo(() => {
    if (!form.name.trim() || !/^0?9\d{9}$/.test(form.phone.replace(/\s|-/g, ''))) return false;
    return !!form.branch;
  }, [form]);

  const submit = () => {
    setOrderRef(`LW-${Date.now().toString(36).toUpperCase()}`);
    clear();
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h1 className="mt-4 font-display text-2xl font-bold">Reservation received</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Reference <span className="font-mono font-bold text-brand-dark">{orderRef}</span>. Show it at {pickupBranch.name} to pay and claim
          your unit — our team will text you when it&apos;s ready for pickup.
        </p>
        {isInstallment && (
          <p className="mt-3 rounded-lg bg-brand/10 p-3 text-sm text-neutral-700">
            {form.payment} is processed at the store: bring 1 valid ID and your active mobile number. Estimated {formatPeso(monthly)}/mo for{' '}
            {plan.months} months.
          </p>
        )}
        <p className="mt-3 text-xs text-neutral-500">Want it delivered instead? Order through our Shopee, TikTok Shop, or Lazada stores.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">
          Continue browsing
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="font-display text-xl font-bold">Nothing to reserve</p>
        <Link to="/shop" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
          Back to shop
        </Link>
      </div>
    );
  }

  const input = 'w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand';
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1fr_340px]">
      <div>
        <button type="button" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm font-semibold text-neutral-500 hover:text-brand-dark">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="font-display text-2xl font-bold">Reserve for pickup</h1>
        <p className="mt-1 text-sm text-neutral-500">
          No online payment — we hold the unit at your branch and you pay when you claim it. For delivery, order via our online stores.
        </p>
        <form
          className="mt-4 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <section className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="font-display font-bold">1. Contact details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name *" value={form.name} onChange={set('name')} className={input} />
              <input
                required
                inputMode="numeric"
                placeholder="Mobile number (09xx xxx xxxx) *"
                value={form.phone}
                onChange={set('phone')}
                className={input}
              />
              <input type="email" placeholder="Email (optional)" value={form.email} onChange={set('email')} className={`${input} sm:col-span-2`} />
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="font-display font-bold">2. Pickup branch</h2>
            <div className="mt-3">
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                <MapPin className="h-3.5 w-3.5" /> Claim and pay at
              </label>
              <select required value={form.branch} onChange={set('branch')} className={input}>
                <option value="">Select branch…</option>
                {BRANCH_LOCATIONS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — {b.region}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-neutral-500">
                {pickupBranch.address}. Items are held for 48 hours after confirmation.
              </p>
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="font-display font-bold">3. Pay at the store</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm((v) => ({ ...v, payment: m }))}
                  className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2.5 text-xs font-semibold ${
                    form.payment === m ? 'border-brand bg-brand/10 text-brand-dark' : 'border-neutral-300 text-neutral-600'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" /> {m}
                </button>
              ))}
            </div>
            {isInstallment && (
              <div className="mt-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-500">Installment term</label>
                <div className="flex flex-wrap gap-2">
                  {INSTALLMENT_PLANS.map((p) => (
                    <button
                      key={p.months}
                      type="button"
                      onClick={() => setForm((v) => ({ ...v, months: p.months }))}
                      className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold ${
                        form.months === p.months ? 'border-brand bg-brand/10 text-brand-dark' : 'border-neutral-300 text-neutral-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <button
            type="submit"
            disabled={!valid}
            className="w-full rounded-md bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-dark disabled:opacity-40"
          >
            Place reservation
          </button>
          {!valid && <p className="text-center text-xs text-neutral-500">Fill in your name, a valid mobile number, and a pickup branch.</p>}
        </form>
      </div>

      <aside className="h-fit rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-display font-bold">Reservation summary</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex justify-between gap-2">
              <span className="line-clamp-1 flex-1">
                {product.name} <span className="text-neutral-400">×{qty}</span>
              </span>
              <span className="font-semibold">{formatPeso(product.price * qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1.5 border-t border-neutral-200 pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Subtotal</dt>
            <dd className="font-semibold">{formatPeso(subtotal)}</dd>
          </div>
          {isInstallment && (
            <div className="flex justify-between">
              <dt className="text-neutral-500">Installment charge ({plan.label})</dt>
              <dd className="font-semibold">{formatPeso(total - subtotal)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-extrabold">
            <dt>Total due at pickup</dt>
            <dd>{formatPeso(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
