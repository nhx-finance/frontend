import {
  HEDERA_KESY_BALANCES_URL,
  HEDERA_URL,
  KESY_TOKEN_ID,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export interface ProtobufEncodedKey {
  _type: "ProtobufEncoded";
  key: string;
}

export interface CustomFees {
  created_timestamp: string;
  fixed_fees: unknown[];
  fractional_fees: unknown[];
}

export interface TokenBalance {
  balance: number;
  account: string;
  decimals: number;
}

export interface TokenBalancesResponse {
  timestamp: string;
  balances: TokenBalance[];
  links: {
    next: string | null;
  };
}

export interface TokenDetails {
  admin_key: ProtobufEncodedKey;
  auto_renew_account: string;
  auto_renew_period: number;
  created_timestamp: string;
  custom_fees: CustomFees;
  decimals: string;
  deleted: boolean;
  expiry_timestamp: number;
  fee_schedule_key: ProtobufEncodedKey | null;
  freeze_default: boolean;
  freeze_key: ProtobufEncodedKey | null;
  initial_supply: string;
  kyc_key: ProtobufEncodedKey | null;
  max_supply: string;
  memo: string;
  metadata: string;
  metadata_key: ProtobufEncodedKey | null;
  modified_timestamp: string;
  name: string;
  pause_key: ProtobufEncodedKey;
  pause_status: string;
  supply_key: ProtobufEncodedKey;
  supply_type: string;
  symbol: string;
  token_id: string;
  total_supply: string;
  treasury_account_id: string;
  type: string;
  wipe_key: ProtobufEncodedKey;
}

async function getTokenDetails(): Promise<TokenDetails> {
  try {
    const url = `${HEDERA_URL}/tokens/${KESY_TOKEN_ID}`;
    const response = await fetch(url);
    const data = (await response.json()) as TokenDetails;
    return data;
  } catch (error) {
    console.error("error getting token details", error);
    throw error;
  } finally {
  }
}

async function getTokenBalances(): Promise<TokenBalancesResponse> {
  try {
    const response = await fetch(HEDERA_KESY_BALANCES_URL);
    const data = (await response.json()) as TokenBalancesResponse;
    return data;
  } catch (error) {
    console.error("error getting token balances", error);
    throw error;
  }
}

export const useTokenBalances = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["token-balances"],
    queryFn: getTokenBalances,
  });
  return { data, isLoading, error };
};

export const useTokenDetails = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["token-details"],
    queryFn: getTokenDetails,
  });
  return { data, isLoading, error };
};
