"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface RegistrationResponse {
  message: string;
}

export interface AuthResponse {
  userId: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  role: string;
  expiresAt?: number;
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

function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt;
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
      const userData = localStorage.getItem("kesy-user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData) as AuthResponse;

          if (parsedUser.expiresAt && isTokenExpired(parsedUser.expiresAt)) {
            console.log("Access token expired, removing user data");
            localStorage.removeItem("kesy-user");
            setUser(null);
          } else if (parsedUser.expiresAt) {
            setUser(parsedUser);
          } else {
            console.log("Invalid user data format, removing");
            localStorage.removeItem("kesy-user");
            setUser(null);
          }
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          localStorage.removeItem("kesy-user");
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, [router]);

  const login = (user: AuthResponse) => {
    const expiresAt = Date.now() + user.expiresIn;

    const userWithExpiry = {
      ...user,
      expiresAt,
    };

    setUser(userWithExpiry);
    if (typeof window !== "undefined") {
      localStorage.setItem("kesy-user", JSON.stringify(userWithExpiry));
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kesy-user");
    }
    setUser(null);
    router.push("/kesy");
  };

  const isAuthenticated =
    !!user && user.expiresAt !== undefined && !isTokenExpired(user.expiresAt);

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
