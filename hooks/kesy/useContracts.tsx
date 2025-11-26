import { useMemo } from "react";
import { getContract } from "thirdweb";
import { client, hederaTestnet } from "@/lib/client";
import { HEDERA_HTS_ADDR } from "@/lib/utils";

export const useContracts = () => {
  const contract = useMemo(() => {
    return getContract({
      client,
      chain: hederaTestnet,
      address: HEDERA_HTS_ADDR,
    });
  }, []);

  return {
    data: { success: true, contract },
    isLoading: false,
    error: null,
  };
};
