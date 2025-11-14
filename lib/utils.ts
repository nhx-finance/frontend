import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setUpClient(): Client {
  let client: Client;
  if (!process.env.NEXT_PUBLIC_ACCOUNT_ID) {
    throw new Error("NEXT_PUBLIC_ACCOUNT_ID is not set");
  }
  if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
    throw new Error("NEXT_PUBLIC_PRIVATE_KEY is not set");
  }
  const ACCOUNT_ID = AccountId.fromString(process.env.NEXT_PUBLIC_ACCOUNT_ID);
  const KEY = PrivateKey.fromStringECDSA(process.env.NEXT_PUBLIC_PRIVATE_KEY);

  client = Client.forTestnet();

  client.setOperator(ACCOUNT_ID, KEY);
  return client;
}

export function getSupplyPrivateKey(): PrivateKey {
  return PrivateKey.fromStringECDSA("");
}

export function getAccountId(): AccountId {
  return AccountId.fromString("");
}

export const API_URL = "https://nhx-server.orcus-finance.space/api/v1";
export const KESY_URL =
  "https://nhxkesy-agdnfmf3cnb4abff.northeurope-01.azurewebsites.net/api";
export const HEDERA_URL = "https://testnet.mirrornode.hedera.com/api/v1";
export const HEDERA_KESY_BALANCES_URL =
  "https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.7228867/balances?account.publickey=3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be&order=asc";
export const KESY_TOKEN_ID = "0.0.7228867";
export const MULTSIG_ADDR = "0x00000000000000000000000000000000006e39e4";
export const TREASURY_ACCOUNT_ID = "0.0.7228866";

export const DECIMALS = 6;
