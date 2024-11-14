import { create } from "zustand";

interface ModalStore {
  modals: Record<string, boolean>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  openModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: true } })),
  closeModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: false } })),
}));
