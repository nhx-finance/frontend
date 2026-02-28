import { HEDERA_URL, KESY_TOKEN_ID } from "@/lib/utils";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TokenBalanceResponse } from "./useWallets";

const HUB_BRIDGE_ID = "0.0.8031380";

async function getHubBalance(): Promise<number> {
  try {
    const url = `${HEDERA_URL}/accounts/${HUB_BRIDGE_ID}/tokens?limit=2&order=desc&token.id=${KESY_TOKEN_ID}`;
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

export const useHubBalance = () => {
  return useQuery({
    queryKey: ["hub-balance"],
    queryFn: getHubBalance,
  });
};
