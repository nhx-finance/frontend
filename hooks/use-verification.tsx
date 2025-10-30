import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/utils";

/**
 * Creates an axios instance with Authorization header configured
 */
export function authAxios(jwtToken: string): AxiosInstance {
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  return instance;
}

export const useCompleteKYC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    mutate: completeKYCMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      if (!user.jwtToken) {
        throw new Error("JWT token is missing");
      }
      await completeKYC(user.userId, user.jwtToken);
    },
    onSuccess: () => {
      toast.success("KYC completed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      if (error.message === "User not authenticated") {
        router.push("/login");
      }
    },
  });

  return {
    completeKYCMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

async function completeKYC(userId: number, jwtToken: string) {
  if (!jwtToken) {
    throw new Error("JWT token is required");
  }

  const url = `/users/${userId}/kyc/complete`;
  const fullUrl = API_URL + url;

  const instance = authAxios(jwtToken);

  try {
    const response = await instance.request({
      method: "PATCH",
      url: fullUrl,
      data: {},
      validateStatus: (status) => status < 500,
    });

    if (response.status === 403) {
      const errorMessage =
        response.data?.message || response.statusText || "Forbidden";
      throw new Error(`Authorization failed: ${errorMessage}`);
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Forbidden";
      throw new Error(`Authorization failed: ${errorMessage}`);
    }
    throw error;
  }
}

export const useGetKYCStatus = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["kyc-status", user?.userId],
    queryFn: async () => {
      return await getKYCStatus(user?.userId, user?.jwtToken);
    },
    enabled: !!user?.userId && !!user?.jwtToken,
  });
  return { data, isLoading, error };
};

async function getKYCStatus(
  userId: number | undefined,
  jwtToken: string | undefined
) {
  if (!jwtToken || !userId) {
    throw new Error("JWT token is required");
  }

  const url = `/users/${userId}/kyc/status`;
  const fullUrl = API_URL + url;
  const instance = authAxios(jwtToken);

  const response = await instance.get(fullUrl);
  return response.data;
}
