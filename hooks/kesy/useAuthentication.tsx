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

function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt;
}

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

  if (!user) {
    toast.error("Session expired");
    if (typeof window !== "undefined") {
      window.location.href = "/kesy/login";
    }
    throw new Error("Session expired");
  }

  if (user.expiresAt && isTokenExpired(user.expiresAt)) {
    toast.error("Session expired. Please login again.");
    if (typeof window !== "undefined") {
      window.location.href = "/kesy/login";
    }
    throw new Error("Session expired. Please login again.");
  }

  const instance = axios.create({
    headers: {
      Authorization: user ? `Bearer ${user.accessToken}` : "",
      "Content-Type": "application/json",
    },
    baseURL: KESY_URL,
    withCredentials: true,
  });
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
      toast.success(
        "User details submitted successfully. Please login to continue."
      );
      login(data);
      router.push("/kesy/login");
    },
    onError: (error) => {
      toast.error("Failed to submit user details. Try again later.", {
        description: error.message,
      });
      console.error(error);
    },
  });
};
