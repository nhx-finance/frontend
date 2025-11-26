import { useQuery } from "@tanstack/react-query";
import { ContractOptions } from "thirdweb";

interface ContractResponse {
  success: boolean;
  contract: Readonly<ContractOptions<[], `0x${string}`>>;
}

async function getContract(): Promise<ContractResponse> {
  const response = await fetch("/api/contracts");
  const data = await response.json();
  return data;
}

export const useContracts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contract"],
    queryFn: getContract,
  });
  return { data, isLoading, error };
};
