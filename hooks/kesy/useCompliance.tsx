import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HEDERA_URL, KESY_TOKEN_ID } from "@/lib/utils";
import { TokenBalanceResponse } from "./useWallets";

export interface Account {
  accountId: string;
  evmAddress: string;
  frozenDate: string;
  freezeReason: string;
  status: string;
  isWiped: boolean;
  createdAt: string;
  updatedAt: string;
}

async function getFrozenAccounts(): Promise<Account[]> {
  try {
    const frozenAccounts = await axios.get("/api/compliance/frozen");
    if (frozenAccounts.status !== 200) {
      throw new Error("Failed to get frozen accounts");
    }
    return frozenAccounts.data as Account[];
  } catch (error) {
    console.error("error getting frozen accounts", error);
    throw error;
  }
}

async function complianceAction({
  accountId,
  reason,
  action,
}: {
  accountId: string;
  reason: string;
  action: "freeze" | "unfreeze" | "wipe";
}) {
  try {
    const response = await axios.post(`/api/compliance/frozen`, {
      accountId,
      reason,
      action,
    });
    if (response.status !== 200) {
      throw new Error("Failed to perform compliance action");
    }
    return response.data;
  } catch (error) {
    console.error("error freezing account", error);
    throw error;
  }
}

async function getFrozenWalletBalance(accountId: string): Promise<number> {
  try {
    const url = `${HEDERA_URL}/accounts/${accountId}/tokens?limit=2&order=desc&token.id=${KESY_TOKEN_ID}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to get frozen wallet balance");
    }
    const balanceObject = response.data as TokenBalanceResponse;
    if (balanceObject.tokens.length === 0) {
      return 0;
    }
    return balanceObject.tokens[0].balance / 10 ** 6;
  } catch (error) {
    console.error("error getting frozen wallet balance", error);
    throw error;
  }
}

async function getTotalFrozenBalance(): Promise<number> {
  try {
    const frozenAccounts = await getFrozenAccounts();
    let totalBalance = 0;
    for (const account of frozenAccounts) {
      const balance = await getFrozenWalletBalance(account.accountId);
      totalBalance += balance;
    }
    return totalBalance;
  } catch (error) {
    console.error("error getting total frozen balance", error);
    throw error;
  }
}

export const useTotalFrozenBalance = () => {
  return useQuery({
    queryKey: ["total-frozen-balance"],
    queryFn: getTotalFrozenBalance,
  });
};

export const useFrozenWalletBalance = (accountId: string) => {
  return useQuery({
    queryKey: ["frozen-wallet-balance", accountId],
    queryFn: () => getFrozenWalletBalance(accountId),
  });
};

export const useComplianceAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: complianceAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["frozen-accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-frozen-balance"],
      });
      toast.success("Compliance action performed successfully!");
    },
  });
};

export const useFrozenAccounts = () => {
  return useQuery({
    queryKey: ["frozen-accounts"],
    queryFn: getFrozenAccounts,
  });
};
