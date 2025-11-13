import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KESY_TOKEN_ID, KESY_URL, setUpClient } from "@/lib/utils";
import { authAxios } from "./useAuthentication";
import type { Sort, Pageable } from "./useKYC";
import { toast } from "sonner";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";

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

async function executeTransaction({
  mintId,
  payload,
  action,
  amount,
}: {
  mintId: string;
  payload: string;
  action: string;
  amount: number;
}): Promise<ExecuteTxnResponse> {
  try {
    const client = setUpClient();
    const data: ExecuteTxnResponse = {
      txnId: "",
      action: action,
      mintId: mintId,
    };
    console.log("executing transaction", mintId, payload, amount);
    const transaction = new ContractExecuteTransaction()
      .setContractId("0.0.7228865")
      .setGas(100_000)
      .setFunction(
        "mint(address account, int64 amount)",
        new ContractFunctionParameters().addString(payload).addInt64(amount)
      );
    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const transactionStatus = receipt.status;
    console.log("The transaction consensus status is " + transactionStatus);
    console.log("for action", action);
    data.txnId = txResponse.transactionId.toString();
    console.log("transaction id", data.txnId);
    return data;
  } catch (error) {
    console.error("error executing transaction", error);
    toast.error("Failed to execute transaction");
    throw error;
  }
}

export const useExecuteTransaction = () => {
  const { mutate: updateTxnStatus } = useUpdateTransactionStatus();

  return useMutation({
    mutationFn: executeTransaction,
    onSuccess: (data) => {
      toast.success("Transaction executed successfully");
      updateTxnStatus({
        mintId: data.mintId,
        status: data.action,
        payload: data.txnId,
      });
    },
    onError: (error) => {
      toast.error("Failed to execute transaction");
      console.error(error);
    },
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
