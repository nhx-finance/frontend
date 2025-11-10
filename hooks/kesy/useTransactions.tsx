import { useQuery } from "@tanstack/react-query";
import { KESY_URL } from "@/lib/utils";
import { authAxios } from "./useAuthentication";
import type { Sort, Pageable } from "./useKYC";

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

async function getTransactions(): Promise<PaginatedTransactionResponse> {
  try {
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(`${KESY_URL}/admin/mints`);

    if (response.status !== 200) {
      throw new Error("Failed to get transactions");
    }
    return response.data;
  } catch (error) {
    console.error("error getting transactions", error);
    throw error;
  }
}

export const useTransactions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  return { data, isLoading, error };
};
