import { SDK_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  swiftCode: string;
}

async function getBankDetails(): Promise<BankDetails> {
  try {
    const response = await axios.get(`${SDK_URL}/bank`);
    return response.data;
  } catch (error) {
    console.error("error getting bank details", error);
    throw error;
  }
}

export function useBankDetails() {
  return useQuery({
    queryKey: ["bank-details"],
    queryFn: getBankDetails,
  });
}
