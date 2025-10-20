"use client";

import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthData, LoginErrorResponse } from "./use-login";

const registerUser = async (data: AuthData) => {
  const registerData = {
    email: data.username,
    password: data.password,
  };
  const response = await axios.post(`${API_URL}/auth/register`, registerData);
  return response.data;
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Account created successfully", {
        description: "Please check your email for the verification link",
      });
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      toast.error((error.response?.data as LoginErrorResponse).error.message, {
        description: "Please log in to your account",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      console.error(error);
    },
  });
};
