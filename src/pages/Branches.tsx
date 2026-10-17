import { MapPin, Phone, Clock } from 'lucide-react';
import { BRANCH_LOCATIONS, type BranchLocation } from '../data/branches';

const REGIONS: BranchLocation['region'][] = ['Metro Manila', 'Luzon Provincial', 'Visayas & Mindanao'];

export default function BranchesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Branch Locator</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {BRANCH_LOCATIONS.length} branches and counting. Walk in to test units, apply for installment, or claim online orders.
      </p>
      {REGIONS.map((region) => (
        <section key={region} className="mt-6">
          <h2 className="font-display text-lg font-bold text-brand-dark">{region}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCH_LOCATIONS.filter((b) => b.region === region).map((b) => (
              <article key={b.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900">{b.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-neutral-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" />
                  <span>
                    {b.address}
                    <span className="block text-xs text-neutral-400">({b.landmark})</span>
                  </span>
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-600">
                  <Phone className="h-4 w-4 shrink-0 text-brand-dark" /> {b.phone}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="h-4 w-4 shrink-0 text-brand-dark" /> {b.hours}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, Philippines`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-neutral-800"
                >
                  Get directions
                </a>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
