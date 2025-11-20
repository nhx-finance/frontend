import { SDK_URL } from "@/lib/utils";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface TokenReserveResponse {
  message: string;
  reserveAmount: string;
}

async function getTokenReserve(): Promise<TokenReserveResponse> {
  try {
    const response = await axios.get(`${SDK_URL}/reserve`);
    if (response.status !== 200) {
      throw new Error("Failed to get token reserve");
    }
    return response.data as TokenReserveResponse;
  } catch (error) {
    console.error("error getting token reserve", error);
    throw error;
  }
}

export const useTokenReserve = () => {
  return useQuery({
    queryKey: ["token-reserve"],
    queryFn: getTokenReserve,
  });
};
