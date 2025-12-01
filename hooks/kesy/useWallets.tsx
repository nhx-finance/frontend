import { useQuery, useMutation } from "@tanstack/react-query";
import { authAxios } from "./useAuthentication";
import { DECIMALS, HEDERA_URL, KESY_TOKEN_ID, KESY_URL } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { AuthResponse } from "@/contexts/KESYContext";

interface Wallet {
  network: string;
  walletAddress: string;
}

export interface WalletResponse {
  walletId: string;
  address: string;
}

export interface WalletWithBalanceResponse {
  walletId: string;
  address: string;
  balance: number;
}

interface WalletListResponse {
  wallets: WalletResponse[];
}

export interface TokenBalance {
  automatic_association: boolean;
  balance: number;
  created_timestamp: string;
  decimals: number;
  token_id: string;
  freeze_status: string;
  kyc_status: string;
}

export interface TokenBalanceResponse {
  tokens: TokenBalance[];
  links: {
    next: string | null;
  };
}

async function getWallets(): Promise<WalletListResponse> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.get(`${KESY_URL}/wallet/list`);
  return response.data;
}

async function addWallet(wallet: Wallet): Promise<WalletResponse> {
  try {
    console.log("Adding wallet:", wallet);
    const rawUser = localStorage.getItem("kesy-user");
    if (!rawUser) {
      toast.error("Session expired");
      throw new Error("User not found");
    }
    const user = JSON.parse(rawUser) as AuthResponse;
    if (!user.accessToken) {
      toast.error("User not authenticated");
      throw new Error("User not authenticated");
    }
    const response = await axios.post(
      `${KESY_URL}/wallet/add`,
      { wallet },
      { headers: { Authorization: `Bearer ${user.accessToken}` } }
    );
    if (response.status !== 200) {
      toast.error("Failed to add wallet");
      console.error(response.data);
      throw new Error("Failed to add wallet");
    }
    return response.data.wallets;
  } catch (error) {
    console.error(error);
    toast.error("Failed to add wallet");
    throw new Error("Failed to add wallet");
  }
}

async function getWalletsWithBalances({
  wallets,
}: {
  wallets: WalletResponse[];
}): Promise<WalletWithBalanceResponse[]> {
  let walletsWithBalances: WalletWithBalanceResponse[] = [];
  for (const wallet of wallets) {
    const url = `${HEDERA_URL}/accounts/${wallet.address}/tokens?limit=2&order=desc&token.id=${KESY_TOKEN_ID}`;
    const response = await fetch(url);
    if (response.status === 404) {
      walletsWithBalances.push({ ...wallet, balance: 0 });
      continue;
    }
    const data = (await response.json()) as TokenBalanceResponse;
    if (data.tokens.length === 0) {
      walletsWithBalances.push({ ...wallet, balance: 0 });
      continue;
    }
    walletsWithBalances.push({
      ...wallet,
      balance: data.tokens[0].balance / 10 ** DECIMALS,
    });
  }
  return walletsWithBalances;
}

function getTotalBalance({
  wallets,
}: {
  wallets: WalletWithBalanceResponse[];
}): number {
  return wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
}

export const useWallets = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });
  return { data, isLoading, error };
};

export const useAddWallet = () => {
  return useMutation({
    mutationFn: addWallet,
  });
};

export const useWalletsWithBalances = () => {
  const { data: walletsData } = useWallets();
  const {
    data: walletsWithBalances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["walletsWithBalances"],
    queryFn: () =>
      getWalletsWithBalances({ wallets: walletsData?.wallets ?? [] }),
    enabled: !!walletsData?.wallets,
  });
  return { data: walletsWithBalances, isLoading, error };
};

export const useTotalBalance = () => {
  const {
    data: walletsWithBalances,
    isLoading,
    error,
  } = useWalletsWithBalances();
  return {
    data: getTotalBalance({ wallets: walletsWithBalances ?? [] }),
    isLoading: isLoading,
    error: error,
  };
};
