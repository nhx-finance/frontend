import { HEDERA_URL, KESY_TOKEN_ID } from "@/lib/utils";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TokenBalanceResponse } from "./useWallets";
import {
  getContract,
  prepareContractCall,
  sendTransaction,
  SendTransactionOptions,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/lib/client";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const CCIP_URL = "https://ccip.chain.link/msg/";

const KESY = getContract({
  client,
  chain: defineChain(296),
  address: "0x00000000000000000000000000000000006E4dc3",
});

const wKESY = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xa3CC176553fbCe4Bb1270752d9c75464d21F6ba1",
});

const hubBridge = getContract({
  client,
  chain: defineChain(296),
  address: "0xD27c613C9d8D52C7E0BAE118562fB6cae7cC3A38",
});

const spokeBridge = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x4B0D9839db5962022E17fa8d61F3b6Ac8BB82a48",
});

export type BridgeDirection = "hederaToSepolia" | "sepoliaToHedera";

export interface BridgeParams {
  direction: BridgeDirection;
  /** Human-readable amount, e.g. "10.5" */
  amount: string;
  recipient?: string;
}

export interface BridgeResult {
  txHash: string;
  messageId: string;
  amountRaw: bigint;
  ccipExplorerUrl: string;
  feesLink: string;
}

export interface ApprovalResult {
  txHash: string;
  amountRaw: bigint;
}

export interface Balances {
  wkesy: string;
  kesy: string;
}

export const ADDRESSES = {
  hedera: {
    hubBridge: "0xD27c613C9d8D52C7E0BAE118562fB6cae7cC3A38",
    kesyToken: "0x00000000000000000000000000000000006E4dc3",
    linkToken: "0x90a386d59b9A6a4795a011e8f032Fc21ED6FEFb6",
  },
  sepolia: {
    spokeBridge: "0x4B0D9839db5962022E17fa8d61F3b6Ac8BB82a48",
    wKesyToken: "0xa3CC176553fbCe4Bb1270752d9c75464d21F6ba1",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  },
} as const;

export const CHAIN_SELECTORS = {
  HEDERA_TESTNET: BigInt("222782988166878823"),
  ETHEREUM_SEPOLIA: BigInt("16015286601757825753"),
} as const;

const HUB_BRIDGE_ID = "0.0.8031380";

async function getHubBalance(): Promise<number> {
  try {
    const url = `${HEDERA_URL}/accounts/${HUB_BRIDGE_ID}/tokens?limit=2&order=desc&token.id=${KESY_TOKEN_ID}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to get frozen wallet balance");
    }
    const balanceObject = response.data as TokenBalanceResponse;
    if (balanceObject.tokens.length === 0) {
      return 0;
    }
    return balanceObject.tokens[0].balance / 10 ** 6;
  } catch (error) {
    console.error("error getting frozen wallet balance", error);
    throw error;
  }
}

export const useHubBalance = () => {
  return useQuery({
    queryKey: ["hub-balance"],
    queryFn: getHubBalance,
  });
};

async function approveToken(
  amount: string,
  bridgeDirection: BridgeDirection,
  account: SendTransactionOptions["account"],
): Promise<ApprovalResult> {
  console.log("Approving token transfer", { amount, bridgeDirection });
  const amountInWei = BigInt(Math.floor(parseFloat(amount) * 10 ** 6));
  const spender =
    bridgeDirection === "sepoliaToHedera"
      ? ADDRESSES.sepolia.spokeBridge
      : ADDRESSES.hedera.hubBridge;
  const contract = bridgeDirection === "sepoliaToHedera" ? wKESY : KESY;
  try {
    const transaction = prepareContractCall({
      contract,
      method:
        "function approve(address spender, uint256 amount) external returns (bool)",
      params: [spender, amountInWei],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      txHash: transactionHash,
      amountRaw: amountInWei,
    };
  } catch (error) {
    console.error("Error approving token transfer", error);
    throw new Error(
      "Failed to approve token transfer: " + (error as Error).message,
    );
  }
}

async function bridgeToken(
  params: BridgeParams,
  account: SendTransactionOptions["account"],
): Promise<BridgeResult> {
  const { direction, amount } = params;
  console.log("Bridging tokens", { amount, direction });
  const amountInWei = BigInt(Math.floor(parseFloat(amount) * 10 ** 6));
  const isHederaToSepolia = direction === "hederaToSepolia";
  const destinationChainSelector = isHederaToSepolia
    ? CHAIN_SELECTORS.ETHEREUM_SEPOLIA
    : CHAIN_SELECTORS.HEDERA_TESTNET;
  const receiverAddress = isHederaToSepolia
    ? ADDRESSES.sepolia.spokeBridge
    : ADDRESSES.hedera.hubBridge;
  console.log("Receiver address:", receiverAddress);
  const encodedReceiver = encodeAbiParameters(parseAbiParameters("address"), [
    receiverAddress,
  ]);

  try {
    const bridgeContract = isHederaToSepolia ? hubBridge : spokeBridge;
    const bridgeMethod =
      "function bridgeKESY(uint64 destinationChainSelector, bytes receiver, uint256 amount) external returns (bytes32 messageId)";
    const bridgeTransaction = prepareContractCall({
      contract: bridgeContract,
      method: bridgeMethod,
      params: [destinationChainSelector, encodedReceiver, amountInWei],
    });
    const { transactionHash } = await sendTransaction({
      transaction: bridgeTransaction,
      account,
    });
    console.log("Bridge transaction hash:", transactionHash);

    return {
      txHash: transactionHash,
      messageId: bridgeTransaction.data?.toString() || "",
      amountRaw: amountInWei,
      ccipExplorerUrl: `${CCIP_URL}${transactionHash}`,
      feesLink: `https://linkfee.link/${transactionHash}`,
    };
  } catch (error) {
    console.error("Error bridging tokens", error);
    throw new Error("Failed to bridge tokens: " + (error as Error).message);
  }
}

async function bridge(
  params: BridgeParams,
  account: SendTransactionOptions["account"],
): Promise<BridgeResult> {
  await approveToken(params.amount, params.direction, account);
  return bridgeToken(params, account);
}

export const useBridge = () => {
  return {
    approveAllowance: approveToken,
    bridgeToken,
    bridge,
  };
};

export const useBalances = () => {
  const activeAccount = useActiveAccount();

  const { data: wkesyBalance, isLoading } = useReadContract({
    contract: wKESY,
    method:
      "function balanceOf(address account) external view returns (uint256)",
    params: [
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
  });

  const { data: kesyBalance, isLoading: isLoadingKESY } = useReadContract({
    contract: KESY,
    method:
      "function balanceOf(address account) external view returns (uint256)",
    params: [
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
  });

  return {
    wkesy: wkesyBalance
      ? (Number(wkesyBalance) / 10 ** 6).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0",
    kesy: kesyBalance
      ? (Number(kesyBalance) / 10 ** 6).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0",
    isLoading: isLoading || isLoadingKESY,
  };
};
