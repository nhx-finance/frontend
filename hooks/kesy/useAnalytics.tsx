import { API_URL, SDK_URL } from "@/lib/utils";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface TokenReserveResponse {
  message: string;
  reserveAmount: string;
}
export interface ValueWrapper {
  value: string;
}

export interface TokenDetails {
  tokenId: ValueWrapper;
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: Record<string, never> | ValueWrapper;
  totalSupply: string;
  maxSupply: Record<string, never> | ValueWrapper;
  proxyAddress: ValueWrapper;
  evmProxyAddress: ValueWrapper;
  treasury: ValueWrapper;
  paused: boolean;
  deleted: boolean;
  freezeDefault: boolean;
  autoRenewAccount: ValueWrapper;
  autoRenewPeriod: number;
  expirationTimestamp: number;
  adminKey: ValueWrapper;
  freezeKey: ValueWrapper;
  wipeKey: ValueWrapper;
  supplyKey: ValueWrapper;
  pauseKey: ValueWrapper;
  customFees: unknown[];
  metadata: string;
  reserveAddress: ValueWrapper;
  reserveAmount: string;
}

async function getTokenReserve(): Promise<TokenReserveResponse> {
  try {
    const response = await axios.get(`${SDK_URL}/token`);
    if (response.status !== 200) {
      throw new Error("Failed to get token reserve");
    }
    return response.data as TokenReserveResponse;
  } catch (error) {
    console.error("error getting token reserve", error);
    throw error;
  }
}

async function logAdminAction({ message }: { message: string }) {
  try {
    const response = await axios.post(`/api/logs`, { message });
    if (response.status !== 200) {
      throw new Error("Failed to log admin action");
    }
    return response.data;
  } catch (error) {
    console.error("error logging admin action", error);
    throw error;
  }
}

export const useTokenReserve = () => {
  return useQuery({
    queryKey: ["token-reserve"],
    queryFn: getTokenReserve,
  });
};

async function getTokenDetails(): Promise<TokenDetails> {
  try {
    const response = await axios.get(`${SDK_URL}/token`);
    if (response.status !== 200) {
      throw new Error("Failed to get token details");
    }
    const tokenDetails = response.data as TokenDetails;
    return tokenDetails;
  } catch (error) {
    console.error("error getting token details", error);
    throw error;
  }
}

export const useTokenDetails = () => {
  return useQuery({
    queryKey: ["token-details"],
    queryFn: getTokenDetails,
  });
};

export const useLogAdminAction = () => {
  return useMutation({
    mutationFn: logAdminAction,
  });
};
