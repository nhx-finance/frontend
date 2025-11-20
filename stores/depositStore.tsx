import { create } from "zustand";

interface DepositStore {
  depositAmount: number;
  kesyAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  setKESYAmount: (kesyAmount: number) => void;
}

export const useDepositStore = create<DepositStore>((set) => ({
  depositAmount: 0,
  kesyAmount: 0,
  setDepositAmount: (depositAmount) => set({ depositAmount }),
  setKESYAmount: (kesyAmount) => set({ kesyAmount }),
}));
