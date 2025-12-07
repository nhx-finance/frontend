import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { getMirrorNodeUrl } from "./network-config";

// URLS
export const API_URL = "https://nhx-server.orcus-finance.space/api/v1";
export const MULTI_SIG_API_URL =
  "https://multisig.definetlynotlocalhost.space/api";
export const KESY_URL =
  "https://nhxkesy-agdnfmf3cnb4abff.northeurope-01.azurewebsites.net/api";
export const HEDERA_URL = getMirrorNodeUrl();
export const HEDERA_KESY_BALANCES_URL = getMirrorNodeUrl(
  "/tokens/0.0.7228867/balances?account.publickey=3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be&order=asc"
);
export const SDK_URL = "https://sdk.definetlynotlocalhost.space/api";
export const COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags";

// ACCOUNT IDS & ADDRESSES
export const KESY_TOKEN_ID = "0.0.7228867";
export const KESY_LOG_TOPIC_ID = "0.0.7340379";
export const KESY_CONTRACT_ADDR = "0x00000000000000000000000000000000006e4dc3";
export const HEDERA_HTS_ADDR = "0x0000000000000000000000000000000000000167";
export const MULTSIG_ADDR = "0x00000000000000000000000000000000006e39e4";
export const MULTSIG_ACCOUNT_ID = "0.0.7223780";
export const TREASURY_ACCOUNT_ID = "0.0.7228866";
export const TREASURY_ADDRESS = "0xb9d7ecba43b7c72fb5c921b063b8f141fe42e43e";
export const FACTORY_ADDRESS = "0.0.6431833";
export const RESOLVER_ADDRESS = "0.0.6431794";

export const DECIMALS = 6;
export const USD_KESY_RATIO = 129;

export function formatNumberValue(value: string): string {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return value;
  }

  if (num >= 1_000_000_000) {
    // Billions
    const formatted = (num / 1_000_000_000).toFixed(2);
    return `${formatted} B`;
  } else if (num >= 1_000_000) {
    // Millions
    const formatted = (num / 1_000_000).toFixed(2);
    return `${formatted} M`;
  } else if (num >= 1_000) {
    // Thousands
    const formatted = (num / 1_000).toFixed(2);
    return `${formatted}K`;
  } else {
    // Less than 1000
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
