import { ChevronDown, MapPin } from 'lucide-react';
import { BRANCH_LOCATIONS, type BranchLocation } from '../data/branches';
import { useStore } from '../lib/store';

const REGIONS: BranchLocation['region'][] = ['Metro Manila', 'Luzon Provincial', 'Visayas & Mindanao'];
const MAIN_ID = 'mnl-manila-sampaloc';

export default function BranchSelect({
  dark = false,
  className = '',
  label = 'Your store',
}: {
  dark?: boolean;
  className?: string;
  label?: string;
}) {
  const { branch, setBranch } = useStore();
  return (
    <label className={`relative flex items-center gap-2 rounded-md px-3 py-2 ${dark ? 'bg-white/10 text-white' : 'border border-neutral-300 bg-white text-neutral-800'} ${className}`}>
      <MapPin className={`h-4 w-4 shrink-0 ${dark ? 'text-brand' : 'text-brand-dark'}`} />
      <span className="min-w-0 flex-1">
        <span className={`block text-[9px] font-bold uppercase tracking-widest ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{label}</span>
        <select
          aria-label="Choose your branch"
          value={branch.id}
          onChange={(e) => setBranch(e.target.value)}
          className={`w-full appearance-none truncate bg-transparent pr-5 text-xs font-bold outline-none ${dark ? 'text-white' : 'text-neutral-900'}`}
        >
          {REGIONS.map((r) => (
            <optgroup key={r} label={r} className="text-neutral-900">
              {BRANCH_LOCATIONS.filter((b) => b.region === r).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.shortName}
                  {b.id === MAIN_ID ? ' (Main)' : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </span>
      <ChevronDown className={`pointer-events-none absolute right-2.5 h-4 w-4 ${dark ? 'text-neutral-400' : 'text-neutral-500'}`} />
    </label>
  );
}
