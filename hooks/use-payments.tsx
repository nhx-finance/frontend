import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/lib/utils";
import { authAxios } from "./use-verification";

export interface PaymentMethod {
  dateAdded: string;
  id: number;
  mobileNumber: string;
  name: string;
}

export const useAddPaymentMethod = () => {
  const { user } = useAuth();
  const {
    mutate: addPaymentMethodMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      paymentMethod,
      accountNumber,
    }: {
      paymentMethod: string;
      accountNumber: string;
    }) => {
      if (!user?.userId || !user?.jwtToken) {
        throw new Error("User not authenticated");
      }
      return await addPaymentMethod(
        user.userId,
        user.jwtToken,
        paymentMethod,
        accountNumber
      );
    },
    onSuccess: () => {
      toast.success("Payment method added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    addPaymentMethodMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

async function addPaymentMethod(
  userId: number,
  jwtToken: string,
  paymentMethod: string,
  accountNumber: string
) {
  const url = `/users/${userId}/payment-methods`;
  const fullUrl = API_URL + url;
  const instance = authAxios(jwtToken);
  const response = await instance.post(fullUrl, {
    name: paymentMethod,
    mobileNumber: accountNumber,
  });
  console.log(response.data);
  return response.data;
}

export const useGetPaymentMethods = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-methods", user?.userId],
    queryFn: async () => {
      if (!user?.userId || !user?.jwtToken) {
        throw new Error("User not authenticated");
      }
      return await getPaymentMethods(user?.userId, user?.jwtToken);
    },
    enabled: !!user?.userId && !!user?.jwtToken,
  });
  return { data, isLoading, error };
};

async function getPaymentMethods(
  userId: number,
  jwtToken: string
): Promise<PaymentMethod[]> {
  const url = `/users/${userId}/payment-methods`;
  const fullUrl = API_URL + url;
  const instance = authAxios(jwtToken);
  const response = await instance.get(fullUrl);
  return response.data as PaymentMethod[];
}
