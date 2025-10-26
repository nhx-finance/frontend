import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";

export const useAccountId = () => {
  const activeAccount = useActiveAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ["account-id", activeAccount?.address],
    queryFn: async () => {
      return await fetchAccountId(activeAccount?.address);
    },
    enabled: !!activeAccount?.address,
  });

  return { data, isLoading, error };
};

async function fetchAccountId(evmAddress: string | undefined): Promise<string> {
  if (!evmAddress) {
    throw new Error("EVM address is required");
    return "";
  }
  const url = `https://testnet.mirrornode.hedera.com/api/v1/accounts/${evmAddress}?limit=2&order=asc&transactiontype=cryptotransfer&transactions=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data.account;
}
