"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface RegistrationResponse {
  message: string;
}

export interface AuthResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  role: string;
}

export interface KESYContextType {
  user: AuthResponse | null;
  login: (user: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const KESYContext = createContext<KESYContextType | undefined>(undefined);

export const useKESYAuth = () => {
  const context = useContext(KESYContext);
  if (context === undefined) {
    throw new Error("useKESYAuth must be used within a KESYAuthProvider");
  }
  return context;
};

function checkExpiry(expiry: number): boolean {
  return Date.now() > Date.now() + expiry;
}

export const KESYAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("kesy-user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user) as AuthResponse;

          const isExpired = checkExpiry(parsedUser.expiresIn);
          if (isExpired) {
            localStorage.removeItem("kesy-user");
            console.log("User expired, logging out");
            setUser(null);
            router.push("/kesy/login");
          }
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          localStorage.removeItem("kesy-user");
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = (user: AuthResponse) => {
    setUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("kesy-user", JSON.stringify(user));
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kesy-user");
    }
    setUser(null);
    router.push("/kesy");
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading: loading,
    error: null,
  };

  return <KESYContext.Provider value={value}>{children}</KESYContext.Provider>;
};
