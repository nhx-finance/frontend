import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setUpClient(): Client {
  let client: Client;
  const ACCOUNT_ID = AccountId.fromString("");
  const KEY = PrivateKey.fromStringECDSA("");

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

export const DECIMALS = 6;
