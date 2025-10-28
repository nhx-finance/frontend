import { useQuery } from "@tanstack/react-query";
import { useAccountId } from "./use-account-id";
import { fetchAllUserBalances, availableTokens } from "./use-stocks-balances";
import { tokenIdToPriceMap, tokenIdToTickerMap } from "@/mocks/stocks";

interface TokenHolding {
  tokenId: string;
  ticker: string;
  balance: number;
  price: number;
  value: number;
  percentage: number;
}

interface PortfolioAllocation {
  holdings: TokenHolding[];
  totalValue: number;
  topHoldings: TokenHolding[];
}

export const usePortfolioAllocation = (topCount: number = 4) => {
  const { data: accountId } = useAccountId();

  const { data, isLoading, error } = useQuery({
    queryKey: ["portfolio-allocation", accountId, topCount],
    queryFn: async () => {
      const balances = await fetchAllUserBalances(accountId);
      return calculatePortfolioAllocation(balances, topCount);
    },
    enabled: !!accountId,
  });

  return { data, isLoading, error };
};

function calculatePortfolioAllocation(
  balances: Array<{ token_id: string; balance: number }>,
  topCount: number
): PortfolioAllocation {
  const availableTokensSet = new Set(availableTokens);

  const holdings: TokenHolding[] = balances
    .filter((token) => availableTokensSet.has(token.token_id))
    .map((token) => {
      const adjustedBalance = token.balance / 10 ** 6;
      const price = tokenIdToPriceMap.get(token.token_id) || 0;
      const ticker = tokenIdToTickerMap.get(token.token_id) || "UNKNOWN";
      const value = adjustedBalance * price;

      return {
        tokenId: token.token_id,
        ticker,
        balance: adjustedBalance,
        price,
        value,
        percentage: 0,
      };
    })
    .filter((holding) => holding.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  const holdingsWithPercentages = holdings.map((holding) => ({
    ...holding,
    percentage: totalValue > 0 ? (holding.value / totalValue) * 100 : 0,
  }));

  const topHoldings = holdingsWithPercentages.slice(0, topCount);

  if (holdingsWithPercentages.length > topCount) {
    const othersValue = holdingsWithPercentages
      .slice(topCount)
      .reduce((sum, holding) => sum + holding.value, 0);

    const othersPercentage =
      totalValue > 0 ? (othersValue / totalValue) * 100 : 0;

    if (othersValue > 0) {
      topHoldings.push({
        tokenId: "others",
        ticker: "Others",
        balance: 0,
        price: 0,
        value: othersValue,
        percentage: othersPercentage,
      });
    }
  }

  return {
    holdings: holdingsWithPercentages,
    totalValue,
    topHoldings,
  };
}
