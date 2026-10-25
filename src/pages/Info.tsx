import { Link } from 'react-router-dom';
import { CreditCard, FileText, Phone } from 'lucide-react';
import { INSTALLMENT_PLANS, STORE } from '../data/content';
import { BRANCH_LOCATIONS } from '../data/branches';

export function InstallmentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">No credit card? No problem.</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Take home your laptop today and pay it off in installments through <b>BillEase</b> or <b>Home Credit</b> — no credit card required. Up to 0%
        downpayment for qualified customers.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {['BillEase', 'Home Credit'].map((provider) => (
          <div key={provider} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold">{provider}</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>1 valid government ID</li>
              <li>Active mobile number</li>
              <li>In-store approval in 15–30 minutes</li>
              <li>0% downpayment for qualified customers</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="bg-ink px-4 py-3">
          <h2 className="font-display font-bold text-white">
            <span className="mr-2 inline-block h-4 w-1.5 rounded-sm bg-brand align-middle" />
            Typical terms
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-widest text-neutral-400">
              <th className="px-4 py-2.5">Term</th>
              <th className="px-4 py-2.5">Sample on ₱30,000</th>
            </tr>
          </thead>
          <tbody>
            {INSTALLMENT_PLANS.map((p) => (
              <tr key={p.months} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-2.5 font-semibold">{p.label}</td>
                <td className="px-4 py-2.5">
                  ≈ ₱{Math.ceil((30000 * (1 + p.rate)) / p.months / 5) * 5}/mo
                  {p.rate === 0 && <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">0% interest</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Indicative figures only. Final terms, rates and approval are decided by the installment provider at the branch. Bring your valid ID to any of our{' '}
        {BRANCH_LOCATIONS.length} branches or call {STORE.phone}.
      </p>
      <Link to="/branches" className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">
        <Phone className="h-4 w-4" /> Find a branch
      </Link>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Privacy Policy</h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
        <p>
          {STORE.name} collects only the personal information needed to process your order or service request: your name, mobile number, delivery
          address, and — when paying by installment — the documents required by the installment provider.
        </p>
        <p>
          We use this information to confirm and fulfil orders, process warranty claims, and contact you about your purchase. We do not sell or share
          your personal data with third parties except payment and logistics providers needed to complete your order.
        </p>
        <p>
          Order details are kept only as long as needed for warranty and record-keeping requirements under Philippine law. You may request a copy or
          correction of your personal data by emailing {STORE.email} or visiting any branch.
        </p>
        <p>This site does not use tracking cookies. Your shopping cart is stored locally on your device.</p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Warranty Terms & Conditions</h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
        <div className="rounded-lg bg-brand/10 p-4 font-medium">
          All laptops and desktops include a 1-year parts and service warranty unless otherwise stated. Accessories carry 3 months to 1 year depending
          on the brand.
        </div>
        <h2 className="flex items-center gap-2 font-display font-bold">
          <FileText className="h-4 w-4 text-brand-dark" /> Covered
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Manufacturing defects in materials and workmanship</li>
          <li>Dead on arrival units (reported within 7 days) — replaced outright</li>
          <li>Parts and service labor at any {STORE.name} branch</li>
        </ul>
        <h2 className="flex items-center gap-2 font-display font-bold">
          <FileText className="h-4 w-4 text-brand-dark" /> Not covered
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Physical, liquid or electrical damage caused by misuse or accidents</li>
          <li>Unauthorized repairs, tampering or removal of warranty seals</li>
          <li>Software issues, viruses, or data loss</li>
          <li>Normal wear (battery capacity, cosmetics)</li>
        </ul>
        <h2 className="flex items-center gap-2 font-display font-bold">
          <CreditCard className="h-4 w-4 text-brand-dark" /> Claims
        </h2>
        <p>
          Bring the unit and your official receipt or order reference to any branch. Units under warranty are diagnosed within 3–5 working days. Keep
          your box for the first 30 days.
        </p>
        <p className="text-xs text-neutral-500">These terms follow the Consumer Act of the Philippines (RA 7394). Manufacturer warranties may apply in addition to store warranty.</p>
      </div>
    </div>
  );
}
