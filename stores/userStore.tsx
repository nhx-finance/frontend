import { create } from "zustand";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  province: string;
  timezone: string;
  termsAgreed: boolean;
  termsVersion: string;
  profileComplete: boolean;
  kycStatus: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  deleteUser: () => set({ user: null }),
}));
