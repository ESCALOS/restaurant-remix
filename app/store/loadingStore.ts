import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  withLoading: (callback: () => Promise<void>) => Promise<void>;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  withLoading: async (callback: () => Promise<void>) => {
    set({ isLoading: true });
    try {
      await callback();
    } finally {
      set({ isLoading: false });
    }
  },
}));
