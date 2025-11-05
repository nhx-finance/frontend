export interface MintRequest {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  toWallet: string;
}

export const mintRequests: MintRequest[] = [
  {
    id: "1",
    amount: 1000000,
    status: "pending",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    toWallet: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "2",
    amount: 2000000,
    status: "approved",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-02",
    toWallet: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "3",
    amount: 3000000,
    status: "rejected",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-03",
    toWallet: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "4",
    amount: 4000000,
    status: "pending",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-04",
    toWallet: "0x1234567890123456789012345678901234567890",
  },
];
