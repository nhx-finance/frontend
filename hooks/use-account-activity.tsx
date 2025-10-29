import { useQuery } from "@tanstack/react-query";
import { useAccountId } from "./use-account-id";

interface Transfer {
  account: string;
  amount: number;
  is_approval: boolean;
}

interface TokenTransfer {
  account: string;
  amount: number;
  token_id: string;
  is_approval?: boolean;
}

interface NftTransfer {
  receiver_account_id: string;
  sender_account_id: string;
  serial_number: number;
  token_id: string;
  is_approval?: boolean;
}

interface StakingRewardTransfer {
  account: string;
  amount: number;
}

interface CustomFee {
  amount: number;
  denominating_token_id?: string;
  collector_account_id: string;
}

export interface HederaTransaction {
  batch_key: string | null;
  bytes: string | null;
  charged_tx_fee: number;
  consensus_timestamp: string;
  entity_id: string;
  max_fee: string;
  max_custom_fees: CustomFee[];
  memo_base64: string;
  name: string;
  nft_transfers: NftTransfer[];
  node: string;
  nonce: number;
  parent_consensus_timestamp: string | null;
  result: string;
  scheduled: boolean;
  staking_reward_transfers: StakingRewardTransfer[];
  token_transfers: TokenTransfer[];
  transaction_hash: string;
  transaction_id: string;
  transfers: Transfer[];
  valid_duration_seconds: string;
  valid_start_timestamp: string;
}

const BASE_URL = "https://testnet.mirrornode.hedera.com/api/v1/";

export interface TransactionResponse {
  transactions: HederaTransaction[];
  links?: {
    next?: string;
    prev?: string;
  };
}

export const useAccountActivity = (limit: number) => {
  const { data: accountId, isLoading: isAccountIdLoading } = useAccountId();

  const { data, isLoading, error } = useQuery({
    queryKey: ["account-activity", accountId, limit],
    queryFn: async () => {
      if (!accountId) {
        throw new Error("Account ID is required");
      }
      return await fetchAccountActivity(accountId, limit);
    },
    enabled: !!accountId && !isAccountIdLoading,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};

async function fetchAccountActivity(
  accountId: string | undefined,
  limit: number
): Promise<HederaTransaction[]> {
  if (!accountId) {
    return [];
  }

  if (limit > 30) {
    limit = 30;
  }
  const query = `transactions?limit=${limit}&order=desc&account.id=${accountId}`;
  const url = `${BASE_URL}${query}`;
  const response = await fetch(url);
  const data = (await response.json()) as TransactionResponse;
  return data.transactions;
}
