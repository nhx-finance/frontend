import { useQuery } from "@tanstack/react-query";
import { fetchAllUserBalances } from "./use-stocks-balances";
import { tokenIdToPriceMap } from "@/mocks/stocks";
import { useAccountId } from "./use-account-id";

export const usePortfolioBalance = () => {
  const { data: accountId } = useAccountId();
  const { data, isPending } = useQuery({
    queryKey: ["portfolio-balance"],
    queryFn: async () => {
      return await getPortfolioBalance(accountId!);
    },
    enabled: !!accountId,
  });
  return { data, isPending };
};

async function getPortfolioBalance(accountID: string): Promise<number> {
  const allUserTokens = await fetchAllUserBalances(accountID);
  let totalBalance = 0;
  for (const token of allUserTokens) {
    const price = tokenIdToPriceMap.get(token.token_id) || 0;
    const balanceInUnits = token.balance / 10 ** token.decimals;
    totalBalance += balanceInUnits * price;
  }
  return totalBalance;
}
