import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BRANCH_LOCATIONS, type BranchLocation } from '../data/branches';
import type { Product } from '../data/catalog';

const STORAGE_KEY = 'lw-branch-v1';
const DEFAULT_BRANCH_ID = 'mnl-manila-sampaloc';

interface StoreState {
  branch: BranchLocation;
  setBranch: (id: string) => void;
  /** True if the product is stocked in the selected branch. */
  inBranch: (p: Product) => boolean;
}

const StoreContext = createContext<StoreState | null>(null);

const byId = (id: string) => BRANCH_LOCATIONS.find((b) => b.id === id);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [branchId, setBranchId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && byId(saved) ? saved : DEFAULT_BRANCH_ID;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, branchId);
  }, [branchId]);

  const value = useMemo<StoreState>(() => {
    const branch = byId(branchId) ?? byId(DEFAULT_BRANCH_ID) ?? BRANCH_LOCATIONS[0];
    return {
      branch,
      setBranch: (id) => {
        if (byId(id)) setBranchId(id);
      },
      inBranch: (p) => {
        const a = p.availability ?? 'metro';
        return a === 'all' || (a === 'metro' && branch.region === 'Metro Manila');
      },
    };
  }, [branchId]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
