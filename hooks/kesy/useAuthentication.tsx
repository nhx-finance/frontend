"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosInstance } from "axios";
import { KESY_URL } from "@/lib/utils";
import {
  AuthResponse,
  RegistrationResponse,
  useKESYAuth,
} from "@/contexts/KESYContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DetailsFormData } from "@/components/details-form";
import { LoginErrorResponse } from "../use-login";

export interface AuthParams {
  email: string;
  password: string;
}

export interface OTPParams {
  email: string;
  otp: string;
}

async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  expiresIn: number;
} | null> {
  try {
    const response = await axios.post(
      `${KESY_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
      };
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function authAxios(): AxiosInstance {
  let user: AuthResponse | null = null;
  if (typeof window !== "undefined") {
    const rawUser = localStorage.getItem("kesy-user");
    if (rawUser) {
      try {
        user = JSON.parse(rawUser) as AuthResponse;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }

  const instance = axios.create({
    baseURL: KESY_URL,
    headers: {
      Authorization: user ? `Bearer ${user.accessToken}` : "",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const rawUser = localStorage.getItem("kesy-user");
        if (rawUser) {
          try {
            const currentUser = JSON.parse(rawUser) as AuthResponse;
            if (currentUser.accessToken) {
              config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
            }
          } catch (error) {
            console.error("Error parsing user in request interceptor:", error);
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (originalRequest.url?.includes("/auth/refresh")) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("kesy-user");
            toast.error("Session expired", {
              description: "Please login again to continue.",
            });
            window.location.href = "/kesy/login";
          }
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (typeof window === "undefined") {
          return Promise.reject(error);
        }

        const rawUser = localStorage.getItem("kesy-user");
        if (!rawUser) {
          toast.error("Please login to continue", {
            description: "You are not logged in. Please login first.",
          });
          return Promise.reject(error);
        }

        try {
          const currentUser = JSON.parse(rawUser) as AuthResponse;
          if (!currentUser.refreshToken) {
            toast.error("Please login to continue", {
              description: "No refresh token available.",
            });
            return Promise.reject(error);
          }

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return instance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          isRefreshing = true;

          const refreshResult = await refreshAccessToken(
            currentUser.refreshToken
          );

          if (!refreshResult) {
            localStorage.removeItem("kesy-user");
            toast.error("Session expired", {
              description: "Please login again to continue.",
            });
            window.location.href = "/kesy/login";
            processQueue(error, null);
            isRefreshing = false;
            return Promise.reject(error);
          }

          const updatedUser = {
            ...currentUser,
            accessToken: refreshResult.accessToken,
            expiresIn: refreshResult.expiresIn,
            loginTimestamp: Date.now(),
          };
          localStorage.setItem("kesy-user", JSON.stringify(updatedUser));

          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("tokenRefreshed", {
                detail: {
                  accessToken: refreshResult.accessToken,
                  expiresIn: refreshResult.expiresIn,
                },
              })
            );
          }

          originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
          processQueue(null, refreshResult.accessToken);
          isRefreshing = false;

          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;
          localStorage.removeItem("kesy-user");
          toast.error("Session expired", {
            description: "Please login again to continue.",
          });
          window.location.href = "/kesy/login";
          return Promise.reject(refreshError);
        }
      }

      if (error.response?.status === 403) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("kesy-user");
          toast.error("Session expired", {
            description: "Please login again to continue.",
          });
          window.location.href = "/kesy/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

async function registerUser(data: AuthParams): Promise<RegistrationResponse> {
  const response = await axios.post(`${KESY_URL}/auth/signup`, data);

  if (response.status !== 201) {
    toast.error("Registration failed. Try again later.");
    console.error(response.data);
    throw new Error("Failed to register user");
  }
  return response.data;
}

async function verifyOTP(data: OTPParams): Promise<AuthResponse> {
  const response = await axios.post(`${KESY_URL}/auth/verify-otp`, data);
  if (response.status !== 200) {
    toast.error("OTP verification failed. Try again later.");
    console.error(response.data);
    throw new Error("Failed to verify OTP");
  }
  return response.data;
}

async function loginUser(data: AuthParams): Promise<AuthResponse> {
  const response = await axios.post(`${KESY_URL}/auth/login`, data);
  if (response.status !== 200) {
    toast.error("Login failed. Try again later.");
    console.error(response.data);
    throw new Error("Failed to login");
  }
  return response.data;
}

async function submitUserDetails(data: DetailsFormData): Promise<AuthResponse> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.post(
    `${KESY_URL}/user/details`,
    data
  );

  if (response.status !== 200) {
    toast.error("Failed to submit user details. Try again later.");
    console.error(response.data);
    throw new Error("Failed to submit user details");
  }
  return response.data;
}

export const useLogin = () => {
  const router = useRouter();
  const { login } = useKESYAuth();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const isAdmin = data.role.toLowerCase() === "admin";
      if (isAdmin) {
        router.push("/kesy/admin/dashboard");
      } else {
        router.push("/kesy/dashboard");
      }
      toast.success("Login successful. Welcome back to KESY!");
      login(data);
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as LoginErrorResponse;
      toast.error("Login failed.", {
        description: errorResponse.error.message,
      });
      console.error(error);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful.", {
        description: "Please check your email for the verification code.",
      });
      router.push("/kesy/otp");
    },
    onError: (error) => {
      toast.error("Registration failed.", {
        description: error.message,
      });
      console.error(error);
    },
  });
};

export const useVerifyOTP = () => {
  const router = useRouter();
  const { login } = useKESYAuth();
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      toast.success(
        "OTP verified successfully. Please complete setting up your account."
      );
      router.push("/kesy/details");
      login(data);
    },
    onError: (error) => {
      toast.error("OTP verification failed. Try again later.", {
        description: error.message,
      });
      console.error(error);
    },
  });
};

export const useSubmitUserDetails = () => {
  const router = useRouter();
  const { login } = useKESYAuth();
  return useMutation({
    mutationFn: submitUserDetails,
    onSuccess: (data) => {
      toast.success("User details submitted successfully. Welcome to KESY!");
      login(data);
      router.push("/kesy/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to submit user details. Try again later.", {
        description: error.message,
      });
      console.error(error);
    },
  });
};
