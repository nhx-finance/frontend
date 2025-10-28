import { client, hederaTestnet } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

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
