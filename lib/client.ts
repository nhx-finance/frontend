import { createThirdwebClient, defineChain } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID must be set");
}

export const client = createThirdwebClient({
  clientId,
});

export const hederaTestnet = defineChain({
  id: 296,
  name: "Hedera Testnet",
  rpc: `https://testnet.hashio.io/api`,
  nativeCurrency: {
    name: "hbar",
    symbol: "HBAR",
    decimals: 8,
  },
  rpcUrls: {
    default: { http: [`https://testnet.hashio.io/api`] },
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/testnet",
    },
  },
  testnet: true,
  chainId: 296,
  networkId: 296,
});
