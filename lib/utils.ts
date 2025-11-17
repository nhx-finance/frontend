import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setUpClient({
  accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID,
  privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY,
}): Client {
  let client: Client;
  if (!accountId) {
    throw new Error("NEXT_PUBLIC_ACCOUNT_ID is not set");
  }
  if (!privateKey) {
    throw new Error("NEXT_PUBLIC_PRIVATE_KEY is not set");
  }
  const ACCOUNT_ID = AccountId.fromString(accountId);
  const KEY = PrivateKey.fromStringECDSA(privateKey);

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

// URLS
export const API_URL = "https://nhx-server.orcus-finance.space/api/v1";
export const MULTI_SIG_API_URL =
  "https://multisig.definetlynotlocalhost.space/api";
export const KESY_URL =
  "https://nhx-asbthqdphecpa5c7.southafricanorth-01.azurewebsites.net/api";
export const HEDERA_URL = "https://testnet.mirrornode.hedera.com/api/v1";
export const HEDERA_KESY_BALANCES_URL =
  "https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.7228867/balances?account.publickey=3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be&order=asc";
export const SDK_URL = "https://sdk.definetlynotlocalhost.space/api";

// ACCOUNT IDS & ADDRESSES
export const KESY_TOKEN_ID = "0.0.7228867";
export const MULTSIG_ADDR = "0x00000000000000000000000000000000006e39e4";
export const MULTSIG_ACCOUNT_ID = "0.0.7223780";
export const TREASURY_ACCOUNT_ID = "0.0.7228866";
export const TREASURY_ADDRESS = "0xb9d7ecba43b7c72fb5c921b063b8f141fe42e43e";
export const FACTORY_ADDRESS = "0.0.6431833";
export const RESOLVER_ADDRESS = "0.0.6431794";

export const DECIMALS = 6;
