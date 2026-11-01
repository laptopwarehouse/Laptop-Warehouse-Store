import { CreditCard, FileText } from 'lucide-react';
import { STORE } from '../data/content';


export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Privacy Policy</h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
        <p>
          {STORE.name} collects only the personal information needed to process your order or service request: your name, mobile number, and preferred pickup branch.
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
