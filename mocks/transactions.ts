import { Stock, stocks } from "./stocks";

type TransactionType = "buy" | "sell";

type TransactionAsset = Stock;

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  asset: TransactionAsset;
  status: "pending" | "completed" | "failed";
  fees: number;
  txnId: string;
  createdAt: string;
  updatedAt: string;
}

export const transactions: Transaction[] = [
  {
    id: "2",
    type: "buy",
    amount: 10,
    asset: stocks[0],
    status: "completed",
    fees: 25.5,
    txnId: "TXN-BUY-20241008-002",
    createdAt: "2024-10-02T10:15:00Z",
    updatedAt: "2024-10-02T10:15:30Z",
  },
  {
    id: "3",
    type: "sell",
    amount: 50,
    asset: stocks[1],
    status: "completed",
    fees: 18.75,
    txnId: "TXN-SEL-20241008-003",
    createdAt: "2024-10-03T14:45:00Z",
    updatedAt: "2024-10-03T14:45:45Z",
  },
  {
    id: "4",
    type: "buy",
    amount: 25,
    asset: stocks[2],
    status: "pending",
    fees: 30.25,
    txnId: "TXN-BUY-20241008-004",
    createdAt: "2024-10-07T16:20:00Z",
    updatedAt: "2024-10-07T16:20:10Z",
  },
  {
    id: "4",
    type: "buy",
    amount: 25,
    asset: stocks[3],
    status: "pending",
    fees: 30.25,
    txnId: "TXN-BUY-20241008-004",
    createdAt: "2024-10-07T16:20:00Z",
    updatedAt: "2024-10-07T16:20:10Z",
  },
];
