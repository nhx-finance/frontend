"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { KESY_URL } from "@/lib/utils";

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
  loginTimestamp?: number;
}

export interface KESYContextType {
  user: AuthResponse | null;
  login: (user: AuthResponse) => void;
  logout: () => void;
  updateTokens: (accessToken: string, expiresIn: number) => void;
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

function checkExpiry(expiresIn: number, loginTimestamp: number): boolean {
  return Date.now() > loginTimestamp + expiresIn;
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

          const loginTimestamp = parsedUser.loginTimestamp || Date.now();

          const isExpired = checkExpiry(parsedUser.expiresIn, loginTimestamp);

          if (isExpired) {
            console.log(
              "Access token expired, will attempt refresh on next request"
            );
            setUser({ ...parsedUser, loginTimestamp });
          } else {
            setUser({ ...parsedUser, loginTimestamp });
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
    const userWithTimestamp = {
      ...user,
      loginTimestamp: Date.now(),
    };
    setUser(userWithTimestamp);
    if (typeof window !== "undefined") {
      localStorage.setItem("kesy-user", JSON.stringify(userWithTimestamp));
    }
  };

  const updateTokens = useCallback((accessToken: string, expiresIn: number) => {
    setUser((currentUser) => {
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          accessToken,
          expiresIn,
          loginTimestamp: Date.now(),
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("kesy-user", JSON.stringify(updatedUser));
        }
        return updatedUser;
      }
      return currentUser;
    });
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kesy-user");
    }
    setUser(null);
    router.push("/kesy");
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTokenRefresh = (event: CustomEvent) => {
      const { accessToken, expiresIn } = event.detail;
      updateTokens(accessToken, expiresIn);
    };

    window.addEventListener(
      "tokenRefreshed",
      handleTokenRefresh as EventListener
    );

    return () => {
      window.removeEventListener(
        "tokenRefreshed",
        handleTokenRefresh as EventListener
      );
    };
  }, [updateTokens]);

  useEffect(() => {
    if (!user || typeof window === "undefined") return;

    const checkAndRefresh = async () => {
      const loginTimestamp = user.loginTimestamp || Date.now();
      const timeUntilExpiry = loginTimestamp + user.expiresIn - Date.now();

      if (timeUntilExpiry > 0 && timeUntilExpiry < 5 * 60 * 1000) {
        try {
          const response = await fetch(`${KESY_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: user.refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            updateTokens(data.accessToken, data.expiresIn);
            console.log("Token refreshed proactively");
          } else if (response.status === 401) {
            console.log("Refresh token expired, logging out");
            logout();
          }
        } catch (error) {
          console.error("Proactive token refresh failed:", error);
        }
      }
    };

    checkAndRefresh();
    const interval = setInterval(checkAndRefresh, 60 * 1000);

    return () => clearInterval(interval);
  }, [user, logout, updateTokens]);

  const value = {
    user,
    login,
    logout,
    updateTokens,
    isAuthenticated,
    isLoading: loading,
    error: null,
  };

  return <KESYContext.Provider value={value}>{children}</KESYContext.Provider>;
};
