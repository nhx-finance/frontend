import { useQuery } from "@tanstack/react-query";
import { useAccountId } from "./use-account-id";

const availableTokens = ["0.0.7135370", "0.0.7135358"];

interface TokenBalance {
  automatic_association: boolean;
  balance: number;
  created_timestamp: string;
  decimals: number;
  token_id: string;
  freeze_status: string;
  kyc_status: string;
}

export const useTokenBalance = (tokenId: string) => {
  const { data: accountId } = useAccountId();
  const { data, isLoading, error } = useQuery({
    queryKey: ["token-balance", tokenId, accountId],
    queryFn: async () => {
      return await fetchAllUserBalances(accountId);
    },
    enabled: !!tokenId && !!accountId,
    select: (data) => {
      const tokenIdSet = new Set(availableTokens);
      // check if incoming tokenId is in the set
      if (tokenIdSet.has(tokenId)) {
        const balance =
          data.find((token: TokenBalance) => token.token_id === tokenId)
            ?.balance ?? 0;
        return balance / 10 ** 6;
      }
      return 0;
    },
  });

  return { data, isLoading, error };
};

interface TokensResponse {
  tokens: TokenBalance[];
  links?: {
    next?: string;
  };
}

async function fetchAllUserBalances(
  accountId: string | undefined
): Promise<TokenBalance[]> {
  if (!accountId) {
    throw new Error("Account ID is required");
    return [];
  }
  const url = `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`;
  const response = await fetch(url);
  const data = (await response.json()) as TokensResponse;
  return data.tokens || [];
}
