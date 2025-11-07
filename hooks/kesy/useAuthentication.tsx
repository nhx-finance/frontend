"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
import { KESY_URL } from "@/lib/utils";
import {
  AuthResponse,
  RegistrationResponse,
  useKESYAuth,
} from "@/contexts/KESYContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DetailsFormData } from "@/components/details-form";

export interface AuthParams {
  email: string;
  password: string;
}

export interface OTPParams {
  email: string;
  otp: string;
}

export function authAxios(): AxiosInstance {
  let user;
  if (typeof window !== "undefined") {
    const rawUser = localStorage.getItem("kesy-user");
    if (!rawUser) {
      toast.error("Please login to continue", {
        description: "You are not logged in. Please login first.",
      });
      return axios.create({
        baseURL: KESY_URL,
      });
    }
    user = JSON.parse(rawUser) as AuthResponse;
  }
  return axios.create({
    baseURL: KESY_URL,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
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
      toast.success("Login successful. Welcome back to KESY!");
      router.push("/kesy/dashboard");
      login(data);
    },
    onError: (error) => {
      toast.error("Login failed.", {
        description: error.message,
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
