import { Check, MapPin, X } from 'lucide-react';
import { BRANCH_LOCATIONS, type BranchLocation } from '../data/branches';
import { useStore } from '../lib/store';
import { STORE } from '../data/content';

const REGIONS: BranchLocation['region'][] = ['Metro Manila', 'Luzon Provincial', 'Visayas & Mindanao'];

export default function StorePicker() {
  const { branch, pickerOpen, chosen, closePicker, choose } = useStore();
  if (!pickerOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Choose your store">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/60" onClick={closePicker} disabled={!chosen} />
      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-ink px-5 py-4">
          <div>
            <p className="font-display text-lg font-bold text-white">Choose your branch</p>
            <p className="text-xs text-neutral-400">We&apos;ll show the stock available at your store. Main store: Manila Sampaloc.</p>
          </div>
          {chosen && (
            <button type="button" onClick={closePicker} aria-label="Close" className="rounded-md p-1.5 text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {REGIONS.map((region) => (
            <div key={region}>
              <p className="px-2 pb-1 pt-3 text-[11px] font-bold uppercase tracking-widest text-neutral-400">{region}</p>
              <div className="grid gap-1">
                {BRANCH_LOCATIONS.filter((b) => b.region === region).map((b) => {
                  const active = b.id === branch.id;
                  const isMain = b.id === 'mnl-manila-sampaloc';
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => choose(b.id)}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                        active ? 'border-brand bg-brand/10' : 'border-transparent hover:bg-neutral-100'
                      }`}
                    >
                      <MapPin className={`h-4 w-4 shrink-0 ${active ? 'text-brand-dark' : 'text-neutral-400'}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {b.name}
                          {isMain && <span className="ml-2 rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Main</span>}
                        </span>
                        <span className="block truncate text-xs text-neutral-500">{b.address}</span>
                      </span>
                      {active && <Check className="h-4 w-4 shrink-0 text-brand-dark" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-200 px-4 py-3 text-center text-xs text-neutral-500">
          Items not stocked at your branch can still be ordered online or via{' '}
          <a href={STORE.shopee} target="_blank" rel="noreferrer" className="font-semibold text-brand-dark hover:underline">
            Shopee
          </a>
          .
        </div>
      </div>
    </div>
  );
}
