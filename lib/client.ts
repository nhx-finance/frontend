import { createThirdwebClient, defineChain } from "thirdweb";

const clientId =
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ||
  "922f14460b91bd9ddba96df550dbc861";
const secretKey =
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_SECRET ||
  "tv3Hiv53ar5DZE-2X0cdbL5RTCqelOOg5LI964FcOEkSOksJwXXsul6tnBwbvshQ3boB9jh8BERkxDoxYRZeLw";

if (!secretKey) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_SECRET must be set");
}

if (!clientId) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID must be set");
}

export const client = createThirdwebClient({
  clientId,
  secretKey,
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
