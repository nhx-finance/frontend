import { useQuery } from "@tanstack/react-query";
import * as ethers from "ethers";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { client, hederaTestnet } from "@/lib/client";
import { mockNHSCOMAddress, mockUSDCAddress } from "@/mocks/stocks";

const hederaJsonRelayUrl = "https://testnet.hashio.io/api";
const provider = new ethers.JsonRpcProvider(hederaJsonRelayUrl, "", {
  batchMaxCount: 1,
});
const routerEvmAddress = "0x0000000000000000000000000000000000004b40";
const DECIMALS = 1000000;

export const useSwapQuote = (
  inputToken: string,
  outputToken: string,
  inputAmountInSmallestUnit: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "swap-quote",
      inputToken,
      outputToken,
      inputAmountInSmallestUnit,
    ],
    queryFn: async () => {
      return await fetchSwapQuote(
        inputToken,
        outputToken,
        inputAmountInSmallestUnit
      );
    },
    enabled: !!inputToken && !!outputToken && !!inputAmountInSmallestUnit,
  });

  return { data, isLoading, error };
};

async function fetchSwapQuote(
  inputToken: string,
  outputToken: string,
  inputAmountInSmallestUnit: string
): Promise<number> {
  const abi = [
    "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
  ];

  const abiInterfaces = new ethers.Interface(abi);

  const tokenIn = inputToken;
  const tokenOut = outputToken;
  const route = [tokenIn, tokenOut];

  const routerContract = new ethers.Contract(
    routerEvmAddress,
    abiInterfaces.fragments,
    provider
  );
  const result = await routerContract.getAmountsOut(
    inputAmountInSmallestUnit,
    route
  );
  const amounts = result;
  const finalOutputAmount = amounts[amounts.length - 1];
  return Number(finalOutputAmount) / DECIMALS;
}

export const useApproveUSDC = () => {
  const tokenContract = getContract({
    address: mockUSDCAddress,
    chain: hederaTestnet,
    client,
  });

  const {
    mutate: sendTx,
    isPending: isApproveUSDCPending,
    isSuccess: isApproveUSDCSuccess,
    isError: isApproveUSDCError,
  } = useSendTransaction();

  const approveUSDCMutation = (amount: bigint) => {
    const transaction = prepareContractCall({
      contract: tokenContract,
      method:
        "function approve(address spender, uint256 amount) public returns (bool)",
      params: [routerEvmAddress, amount],
    });
    sendTx(transaction);
  };

  return {
    approveUSDCMutation,
    isApproveUSDCPending,
    isApproveUSDCSuccess,
    isApproveUSDCError,
  };
};

export const useAssociateMutation = (address: string) => {
  const {
    mutate: sendTx,
    isPending: isAssociatePending,
    isSuccess: isAssociateSuccess,
    isError: isAssociateError,
    error: associateError,
  } = useSendTransaction();
  const activeAccount = useActiveAccount();
  if (!activeAccount) {
    throw new Error("No active account found");
  }

  const systemContract = getContract({
    address: "0x0000000000000000000000000000000000000167",
    chain: hederaTestnet,
    client,
  });

  const associateTokenMutation = () => {
    const transaction = prepareContractCall({
      contract: systemContract,
      method:
        "function associateToken(address account, address token) external returns (int64 responseCode)",
      params: [activeAccount.address, address],
    });
    sendTx(transaction);
  };
  return {
    associateTokenMutation,
    isAssociatePending,
    isAssociateSuccess,
    isAssociateError,
    associateError,
  };
};

export const useSwapExactTokensForTokens = () => {
  const activeAccount = useActiveAccount();
  if (!activeAccount) {
    throw new Error("No active account found");
  }
  const {
    mutate: sendTx,
    isPending: isSwapExactTokensForTokensPending,
    isSuccess: isSwapExactTokensForTokensSuccess,
    isError: isSwapExactTokensForTokensError,
    error: swapExactTokensForTokensError,
  } = useSendTransaction();

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

  const swapRouterContract = getContract({
    address: routerEvmAddress,
    chain: hederaTestnet,
    client,
  });

  const swapExactTokensForTokensMutation = (
    amountIn: bigint,
    amountOutMin: bigint,
    path: string[]
  ) => {
    const transaction = prepareContractCall({
      contract: swapRouterContract,
      method:
        "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      params: [amountIn, amountOutMin, path, activeAccount.address, deadline],
    });
    sendTx(transaction);
  };
  return {
    swapExactTokensForTokensMutation,
    isSwapExactTokensForTokensPending,
    isSwapExactTokensForTokensSuccess,
    isSwapExactTokensForTokensError,
    swapExactTokensForTokensError,
  };
};
