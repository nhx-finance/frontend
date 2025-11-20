import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DECIMALS,
  HEDERA_URL,
  KESY_TOKEN_ID,
  KESY_URL,
  MULTI_SIG_API_URL,
  SDK_URL,
  setUpClient,
  TREASURY_ACCOUNT_ID,
  TREASURY_ADDRESS,
} from "@/lib/utils";
import { authAxios } from "./useAuthentication";
import type { Sort, Pageable } from "./useKYC";
import { toast } from "sonner";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import axios from "axios";

import { getContract } from "thirdweb";
import { client, hederaTestnet } from "@/lib/client";
import { useWallets } from "./useWallets";

export const treasuryContract = getContract({
  client,
  chain: hederaTestnet,
  address: TREASURY_ADDRESS,
});

export interface HederaAccountToken {
  token_id: string;
  balance: number;
}
export interface HederaAccountBalance {
  balance: number;
  timestamp: string;
  tokens: HederaAccountToken[];
}
export interface ProtobufEncodedKey {
  _type: "ProtobufEncoded";
  key: string;
}
export interface HederaAccountLinks {
  next?: string;
  prev?: string;
}
export interface HederaAccount {
  account: string;
  alias: string | null;
  auto_renew_period: number;
  balance: HederaAccountBalance;
  created_timestamp: string;
  decline_reward: boolean;
  deleted: boolean;
  ethereum_nonce: number;
  evm_address: string;
  expiry_timestamp: string;
  key: ProtobufEncodedKey;
  max_automatic_token_associations: number;
  memo: string;
  pending_reward: number;
  receiver_sig_required: boolean | null;
  staked_account_id: string | null;
  staked_node_id: number | null;
  stake_period_start: string | null;
  transactions: unknown[]; // Can be typed more specifically if needed
  links: HederaAccountLinks;
}

export interface TransactionItem {
  requestId: string;
  userId: string;
  userEmail: string;
  walletAddress: string;
  amountKes: number;
  status: string;
  dateInitiated: string;
  restrictionEndDate: string;
  paymentReference: string;
  treasuryTransactionId: string;
  createdAt: string;
}
export interface UserTransactionItem {
  id: string;
  userId: string;
  userEmail: string;
  walletAddress: string;
  amountKes: number;
  status: string;
  dateInitiated: string;
  restrictionEndDate: string;
  paymentReference: string;
  treasuryTransactionId: string;
  createdAt: string;
}
export interface ExecuteTxnResponse {
  txnId: string;
  action: string;
  mintId: string;
}
export interface PaginatedTransactionResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  content: TransactionItem[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
export interface MultisigTransactionItem {
  id: string;
  transaction_message: string;
  description: string;
  status: string;
  threshold: number;
  key_list: string[];
  signed_keys: string[];
  signatures: string[];
  network: string;
  hedera_account_id: string;
  start_date: string;
}
export interface MintTokensResponse {
  success: boolean;
  message: string;
  mintId: string;
}

async function getTransactions({
  role,
}: {
  role: string;
}): Promise<PaginatedTransactionResponse> {
  try {
    const url = `${KESY_URL}/admin/mints`;
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to get transactions");
    }
    return response.data;
  } catch (error) {
    console.error("error getting transactions", error);
    throw error;
  }
}

async function getMyTransactions({
  role,
}: {
  role: string;
}): Promise<UserTransactionItem[]> {
  try {
    const url = `${KESY_URL}/user/mints`;
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to get transactions");
    }
    return response.data;
  } catch (error) {
    console.error("error getting transactions", error);
    throw error;
  }
}

async function updateTransactionStatus({
  mintId,
  status,
  payload,
}: {
  mintId: string;
  status: string;
  payload: string;
}) {
  try {
    const url = `${KESY_URL}/admin/mints/${mintId}/status`;
    const authenticatedInstance = authAxios();
    console.log("updating transaction status in be", status, payload, mintId);
    const body = {
      status: status,
      notes: payload,
    };
    const response = await authenticatedInstance.patch(url, body);

    if (response.status !== 200) {
      toast.error("Failed to update transaction status");
      throw new Error("Failed to update transaction status");
    }
    return response.data;
  } catch (error) {
    console.error("error updating transaction status", error);
    toast.error("Failed to update transaction status");
    throw error;
  }
}

async function mintTokens({
  amount,
  mintId,
}: {
  amount: number;
  mintId: string;
}): Promise<MintTokensResponse> {
  try {
    const data: MintTokensResponse = {
      success: false,
      message: "",
      mintId: "",
    };
    console.log("minting tokens", amount);
    const response = await axios.post(`${SDK_URL}/mint`, {
      amount: "100", // TODO: Change to amount
    });
    if (response.status !== 200) {
      throw new Error("Failed to mint tokens");
    }
    toast.success("Tokens minted successfully");
    data.success = response.data.success;
    data.message = response.data.message;
    data.mintId = mintId;
    return data;
  } catch (error) {
    console.error("error minting tokens", error);
    toast.error("Failed to mint tokens");
    throw error;
  }
}

async function getAccountByAddress({
  address,
}: {
  address: string;
}): Promise<HederaAccount> {
  try {
    const url = `${HEDERA_URL}/accounts/${address}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error getting account by address", error);
    toast.error("Failed to get account by address");
    throw error;
  }
}

async function isAssociated({
  address,
}: {
  address: string | undefined;
}): Promise<boolean> {
  try {
    if (!address) {
      return false;
    }
    const account = await getAccountByAddress({ address: address });
    const response = await axios.get(
      `${HEDERA_URL}/accounts/${account.account}/tokens?token.id=${KESY_TOKEN_ID}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to check if associated");
    }
    return response.data.tokens.length > 0;
  } catch (error) {
    console.error("error checking if associated", error);
    return false;
  }
}

export async function constructTransferTransaction({
  amount,
  address,
}: {
  amount: number;
  address: string;
}): Promise<ContractExecuteTransaction> {
  try {
    const client = setUpClient({
      accountId: process.env.NEXT_PUBLIC_ACCOUNT_ID,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    });
    const transaction = new ContractExecuteTransaction()
      .setContractId(TREASURY_ACCOUNT_ID) // TODO: Confirm if we need to use the multisig account id or the treasury account id
      .setGas(15_000_000)
      .setFunction(
        "transfer",
        new ContractFunctionParameters()
          .addAddress(address)
          .addInt64(amount * 10 ** DECIMALS)
      );
    const frozenTransaction = await transaction.freezeWith(client);
    return frozenTransaction;
  } catch (error) {
    console.error("error constructing transfer transaction", error);
    toast.error("Failed to construct transfer transaction");
    throw error;
  }
}
export async function getMultisigTransaction({
  multisigId,
}: {
  multisigId: string | undefined;
}): Promise<MultisigTransactionItem> {
  if (!multisigId) {
    throw new Error("Multisig ID is required");
  }
  try {
    const url = `${MULTI_SIG_API_URL}/transactions/${multisigId}`;
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to get multisig transaction");
    }
    return response.data;
  } catch (error) {
    console.error("error getting multisig transaction", error);
    toast.error("Failed to get multisig transaction");
    throw error;
  }
}
export async function signMultisigTransaction({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) {
  try {
    console.log("sending transfer transaction", address, amount);
    const account = await getAccountByAddress({ address });
    if (!account) {
      throw new Error("Account not found");
    }
    const response = await axios.post(`${SDK_URL}/token/transfer`, {
      amount: (amount * 10 ** DECIMALS).toString(),
      targetAccountId: account.account,
    });

    if (response.status !== 200) {
      throw new Error("Failed to send transfer transaction");
    }
  } catch (error: any) {
    console.error("error sending transfer transaction", error);
    toast.error("Failed to send transfer transaction");
    throw error;
  }
}
export const useExecuteTransaction = () => {
  return useMutation({
    mutationFn: mintTokens,
  });
};

export const useTransactions = (role: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", role],
    queryFn: () => getTransactions({ role }),
  });
  return { data, isLoading, error };
};

export const useMyTransactions = (role: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", role],
    queryFn: () => getMyTransactions({ role }),
  });
  return { data, isLoading, error };
};

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransactionStatus,
    onSuccess: () => {
      toast.success("Transaction status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions", "admin"] });
    },
    onError: (error) => {
      toast.error("Failed to update transaction status");
      console.error(error);
    },
  });
};

export const useSettledTransactions = () => {
  const { data: transactions, isLoading, error } = useTransactions("admin");
  const settledTransactions =
    transactions?.content.filter(
      (transaction) => transaction.status === "MINTED"
    ) ?? [];
  return { data: settledTransactions, isLoading, error };
};

export const useGetMultisigTransaction = (multisigId: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["multisigTransaction", multisigId],
    queryFn: () =>
      getMultisigTransaction({
        multisigId: multisigId,
      }),
    enabled: !!multisigId,
  });
  return { data, isLoading, error };
};

export const useSignMultisigTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signMultisigTransaction,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["multisigTransaction", variables.address],
      });
      queryClient.invalidateQueries({ queryKey: ["transactions", "admin"] });
    },
  });
};

export const useIsAssociated = (id: string) => {
  const { data: wallets } = useWallets();
  const address = wallets?.wallets.find(
    (wallet) => wallet.walletId === id
  )?.address;
  const { data, isLoading, error } = useQuery({
    queryKey: ["isAssociated", address],
    queryFn: () => isAssociated({ address: address }),
    enabled: !!address,
  });
  return { data, isLoading, error };
};
