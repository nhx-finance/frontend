import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DECIMALS,
  KESY_URL,
  MULTI_SIG_API_URL,
  MULTSIG_ACCOUNT_ID,
  SDK_URL,
  setUpClient,
} from "@/lib/utils";
import { authAxios } from "./useAuthentication";
import type { Sort, Pageable } from "./useKYC";
import { toast } from "sonner";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
  PrivateKey,
  Transaction,
} from "@hashgraph/sdk";
import axios from "axios";

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
    console.log("updating transaction status in be", status, payload);
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
}: {
  amount: number;
}): Promise<MintTokensResponse> {
  try {
    console.log("minting tokens", amount);
    const response = await axios.post(`${SDK_URL}/mint`, {
      amount,
    });
    if (response.status !== 200) {
      throw new Error("Failed to mint tokens");
    }
    toast.success("Tokens minted successfully");
    return response.data;
  } catch (error) {
    console.error("error minting tokens", error);
    toast.error("Failed to mint tokens");
    throw error;
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
      .setContractId(MULTSIG_ACCOUNT_ID) // TODO: Confirm if we need to use the multisig account id or the treasury account id
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
  signingKey,
  multisigId,
  txnMessage,
  accountId,
}: {
  signingKey: string;
  multisigId: string;
  txnMessage: string;
  accountId: string;
}) {
  try {
    // Step 1: Deserialize the transaction from hex bytes
    const transactionBytes = Buffer.from(txnMessage, "hex");
    const transaction = Transaction.fromBytes(transactionBytes);

    // Step 2: Create private key and client
    const privateKey = PrivateKey.fromStringECDSA(signingKey);
    const client = setUpClient({
      accountId: accountId,
      privateKey: signingKey,
    });

    // Step 3: Freeze the transaction (async) - this ensures it has a transactionId
    // This is critical - the transaction must be frozen before signing
    // The frozen transaction has a stable hash that can be signed
    const frozenTransaction = await transaction.freezeWith(client);

    // Step 4: Extract the body bytes that the backend uses for verification
    // The backend extracts these exact bytes to verify the signature
    // We need to sign the same body bytes the server will use
    // @ts-ignore - accessing internal property to get body bytes
    const bodyBytes = frozenTransaction._signedTransactions.get(0)?.bodyBytes;

    if (!bodyBytes) {
      throw new Error("Failed to extract body bytes from frozen transaction");
    }

    // Step 5: Sign the body bytes directly with the private key
    // This gives us just the signature bytes (64/65 bytes for ECDSA)
    // This is what the multisig API expects - just the signature, not the full transaction
    const signatureBytes = privateKey.sign(bodyBytes);

    // Step 7: Convert signature bytes to hex string
    const signatureHex = Buffer.from(signatureBytes).toString("hex");

    console.log(
      "Signature length:",
      signatureHex.length,
      "characters (",
      signatureHex.length / 2,
      "bytes)"
    );
    console.log("Public key:", privateKey.publicKey.toStringRaw());
    console.log("Signature:", signatureHex);

    const response = await axios.put(
      `${MULTI_SIG_API_URL}/transactions/${multisigId}/signature`,
      {
        signature: signatureHex,
        public_key: privateKey.publicKey.toString(),
      }
    );

    if (response.status === 204) {
      toast.success("Transaction signed successfully");
      return response.data;
    }

    if (response.status === 409) {
      toast.error("Transaction already signed by this key");
      throw new Error("Transaction already signed");
    }

    if (response.status === 400) {
      toast.error("Invalid transaction id format");
      throw new Error("Invalid transaction id format");
    }

    if (response.status === 404) {
      toast.error("Transaction not found");
      throw new Error("Transaction not found");
    }

    if (response.status === 401) {
      toast.error("Unauthorized key");
      throw new Error("Unauthorized key");
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
    console.error("error signing multisig transaction", error);

    // Log server error details if available
    if (error?.response?.data) {
      console.error("Server error details:", error.response.data);
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        "Failed to sign multisig transaction";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    toast.error("Failed to sign multisig transaction");
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
        queryKey: ["multisigTransaction", variables.multisigId],
      });
      queryClient.invalidateQueries({ queryKey: ["transactions", "admin"] });
    },
  });
};
