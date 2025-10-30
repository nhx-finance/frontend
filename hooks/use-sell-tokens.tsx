import { client, hederaTestnet } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useAccountId } from "./use-account-id";
import { toast } from "sonner";
import { API_URL } from "@/lib/utils";
import { authAxios } from "./use-verification";
import { useAuth } from "@/contexts/AuthContext";

const treasuryAddress = "0x0bd7dd9a885d9526ff82813829ef5c7d8afdb8c4";

export const useSellTokens = () => {
  const {
    mutate: sendTx,
    isError,
    isPending,
    isSuccess,
    error,
  } = useSendTransaction();

  const sellTokensMutation = (amount: bigint, tokenAddress: string) => {
    const tokenContract = getContract({
      address: tokenAddress,
      chain: hederaTestnet,
      client,
    });
    const transaction = prepareContractCall({
      contract: tokenContract,
      method:
        "function transfer(address to, uint256 amount) public returns (bool)",
      params: [treasuryAddress, amount],
      value: BigInt(0),
    });
    sendTx(transaction);
  };

  return {
    sellTokensMutation,
    isError,
    isPending,
    isSuccess,
    error,
  };
};

export const useBurnTokens = () => {
  const { data: userAccountId } = useAccountId();
  const { user } = useAuth();
  console.log(user);
  const queryClient = useQueryClient();
  const {
    mutate: sendBurnRequestMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      usdcAmount,
      nhTokenAmount,
      nhTokenName,
    }: {
      usdcAmount: number;
      nhTokenAmount: number;
      nhTokenName: string;
    }) => {
      if (!user?.jwtToken) {
        throw new Error("JWT token is missing");
      }
      await sendBurnRequest(
        Math.floor(usdcAmount),
        nhTokenAmount,
        nhTokenName,
        userAccountId,
        user?.jwtToken
      );
    },
    onSuccess: () => {
      toast.success("Burn request sent successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["account-id"] });
    },
  });

  return {
    sendBurnRequestMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

async function sendBurnRequest(
  usdcAmount: number,
  nhTokenAmount: number,
  nhTokenName: string,
  userAccountId: string | undefined,
  jwtToken: string
) {
  if (!userAccountId) {
    toast.error("User account ID is required");
    return;
  }
  const url = `/hedera/sell`;
  const fullUrl = API_URL + url;
  const instance = authAxios(jwtToken);

  // Convert to strings to avoid JavaScript number precision issues with large amounts
  const amountToBurn = String(nhTokenAmount);
  const amountUsdcToSend = String(Math.floor(usdcAmount));

  const requestBody = {
    tokenSymbol: nhTokenName,
    amountToBurn,
    amountUsdcToSend,
    recipientAccountIdStr: userAccountId,
  };

  console.log("Request values (original):", {
    usdcAmount,
    nhTokenAmount,
    nhTokenName,
    userAccountId,
  });
  console.log(
    "Request body (being sent as strings):",
    JSON.stringify(requestBody, null, 2)
  );

  try {
    const response = await instance.post(fullUrl, requestBody);
    console.log("Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("Request failed:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      requestBody: requestBody,
    });
    throw error;
  }
}
