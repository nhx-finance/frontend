import { useQuery } from "@tanstack/react-query";
import * as ethers from "ethers";

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
