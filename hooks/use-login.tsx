"use client";

import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export interface AuthData {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  email: string;
  jwtToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  roles: string[];
}

export interface LoginErrorResponse {
  error: {
    code: string;
    message: string;
    details: {
      path: string;
    };
  };
}

export const isLoginError = (
  response: LoginResponse | LoginErrorResponse
): response is LoginErrorResponse => {
  return "error" in response;
};

export const loginUser = async (
  data: AuthData
): Promise<LoginResponse | LoginErrorResponse> => {
  const loginData = {
    email: data.username,
    password: data.password,
  };
  const response = await axios.post<LoginResponse | LoginErrorResponse>(
    `${API_URL}/auth/login`,
    loginData
  );
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!isLoginError(data)) {
        login(data);
        toast.success(data.message);
        router.push("/login");
      }
    },
    onError: (error: AxiosError) => {
      toast.error((error.response?.data as LoginErrorResponse).error.message);
      console.error(error);
    },
  });
};
