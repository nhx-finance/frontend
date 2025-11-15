import { toast } from "sonner";
import { authAxios } from "./useAuthentication";
import { KESY_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface MintRequestResponse {
  requestId: string;
  transactionId: string;
}

async function mint({
  amountKes,
  walletId,
  transaction_message,
}: {
  amountKes: number;
  walletId: string;
  transaction_message: string;
}): Promise<MintRequestResponse> {
  try {
    const authenticatedAxios = authAxios();
    const response = await authenticatedAxios.post(`${KESY_URL}/kesy/mint`, {
      amountKes,
      walletId,
      transaction_message,
    });
    console.log(response.data);
    if (response.status !== 201) {
      toast.error("Failed to mint tokens");
      console.error(response.data);
      throw new Error("Failed to mint tokens");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error((error as Error).message);
    throw error;
  }
}

export const useMint = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: mint,
    onSuccess: (data) => {
      toast.success("Request sent successfully!");
      router.push(`/kesy/deposit/${data.requestId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
