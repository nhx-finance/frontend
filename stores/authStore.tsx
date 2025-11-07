import { create } from "zustand";

export interface AuthStore {
  userEmail: string;
  setUserEmail: (userEmail: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userEmail: "",
  setUserEmail: (userEmail) => set({ userEmail }),
}));
