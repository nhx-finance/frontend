import {
  hederaNetwork,
  ethereumNetwork,
  polygonNetwork,
  opNetwork,
  avaxNetwork,
  bnbNetwork,
  solNetwork,
  wldNetwork,
} from "@/assets";

// ── Networks ──────────────────────────────────────────────

export interface Network {
  id: string;
  name: string;
  ticker: string;
  image: string;
}

export const BRIDGE_NETWORKS: Network[] = [
  {
    id: "hedera",
    name: "Hedera",
    ticker: "HBAR",
    image: hederaNetwork,
  },
  {
    id: "sepolia",
    name: "Sepolia (ETH)",
    ticker: "ETH",
    image: ethereumNetwork,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    image: ethereumNetwork,
  },
  {
    id: "polygon",
    name: "Polygon",
    ticker: "POL",
    image: polygonNetwork,
  },
  {
    id: "optimism",
    name: "Optimism",
    ticker: "OP",
    image: opNetwork,
  },
  {
    id: "avalanche",
    name: "Avalanche",
    ticker: "AVAX",
    image: avaxNetwork,
  },
  {
    id: "bnb",
    name: "BNB Chain",
    ticker: "BNB",
    image: bnbNetwork,
  },
  {
    id: "solana",
    name: "Solana",
    ticker: "SOL",
    image: solNetwork,
  },
  {
    id: "worldchain",
    name: "World Chain",
    ticker: "WLD",
    image: wldNetwork,
  },
];

// ── Supported bridge routes ───────────────────────────────

/** Only Hedera → Sepolia is supported for now */
export function isSupportedRoute(from?: Network, to?: Network): boolean {
  return from?.id === "hedera" && to?.id === "sepolia";
}

// ── Currencies ────────────────────────────────────────────

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  /** 1 KESY token = `multiplier` units of this currency */
  multiplier: number;
}

export const CURRENCIES: Currency[] = [
  { id: "kes", name: "Kenyan Shilling", symbol: "KES", multiplier: 1 },
  { id: "usd", name: "US Dollar", symbol: "USD", multiplier: 130 },
];

export const DEFAULT_CURRENCY = CURRENCIES[0]; // KES
