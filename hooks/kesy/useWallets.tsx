import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authAxios } from "./useAuthentication";
import { KESY_URL } from "@/lib/utils";
import { toast } from "sonner";

interface Wallet {
  network: string;
  walletAddress: string;
}

interface WalletResponse {
  walletId: string;
  address: string;
}

interface WalletListResponse {
  wallets: WalletResponse[];
}

async function getWallets(): Promise<WalletListResponse> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.get(`${KESY_URL}/wallet/list`);
  return response.data;
}

export const useWallets = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });
  return { data, isLoading, error };
};

async function addWallet(wallet: Wallet): Promise<WalletResponse> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.post(
    `${KESY_URL}/wallet/add`,
    wallet
  );
  return response.data.wallets;
}

export const useAddWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      toast.success("Wallet added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
