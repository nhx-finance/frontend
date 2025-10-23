export interface Wallet {
  name: string;
  balance: number;
  currency: string;
  address: string;
  isWhitelisted: boolean;
  addedAt: string;
}

export const wallets: Wallet[] = [
  {
    name: "Main KESY Wallet",
    balance: 13872829.0,
    currency: "KESY",
    address: "0x1234567890123456789012345678901234567890",
    isWhitelisted: true,
    addedAt: "2025-09-23",
  },
  {
    name: "Secondary KESY Wallet",
    balance: 248340.98,
    currency: "KESY",
    address: "0x1234567890123456789012345678901234567890",
    isWhitelisted: true,
    addedAt: "2025-04-12",
  },
];
