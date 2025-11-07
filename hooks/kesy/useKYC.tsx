import { useQuery } from "@tanstack/react-query";
import { KESY_URL } from "@/lib/utils";
import { authAxios } from "./useAuthentication";

interface KYCStatus {
  status: string;
  documents: string[];
}

async function getKYCStatus(): Promise<KYCStatus> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.get(`${KESY_URL}/kyc/kyc`);
  return response.data;
}

export const useKYCStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKYCStatus,
  });
  return { data, isLoading, error };
};
