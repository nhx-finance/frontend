import { createColumnHelper } from "@tanstack/react-table";
import { UserTransactionItem } from "@/hooks/kesy/useTransactions";
import Image from "next/image";
import { kesy } from "@/assets";

const columnHelper = createColumnHelper<UserTransactionItem>();
const formatAmount = (balance: number) => {
  const stringBalance = balance.toString();
  const [whole] = stringBalance.split(".");
  if (whole.length > 6) {
    return `${whole.charAt(0)}.${whole.slice(1, 2)}M`;
  }
  if (whole.length > 3) {
    return `${whole.charAt(0)}.${whole.slice(1, 2)}K`;
  }
  return `${balance}`;
};

export const defaultColumns = [
  columnHelper.accessor("id", {
    id: "id",
    header: () => (
      <div className="font-funnel-display font-semibold text-sm">ID</div>
    ),
    cell: (props) => (
      <div className="flex items-center gap-2 w-[250px]">
        <div className="w-12 h-12 p-1 border-2 border-foreground/20 rounded-lg">
          <Image
            src={kesy}
            alt="KESY"
            width={40}
            height={40}
            className="rounded object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-funnel-display font-semibold">KESY</p>
          <p className="text-xs font-funnel-display text-muted-foreground">
            {props.row.original.id.slice(0, 6)}...
            {props.row.original.id.slice(-4)}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("amountKes", {
    id: "amountKes",
    header: () => (
      <div className="font-funnel-display font-semibold text-sm">Amount</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-xs">
        {formatAmount(props.row.original.amountKes)}
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => (
      <div className="font-funnel-display font-semibold text-sm">Status</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-xs">
        {props.row.original.status.toUpperCase()}
      </div>
    ),
  }),
  columnHelper.accessor("walletAddress", {
    id: "walletAddress",
    header: () => (
      <div className="font-funnel-display font-semibold text-sm">Address</div>
    ),
    cell: (props) => (
      <div className="text-left uppercase font-funnel-display text-xs">
        {props.row.original.walletAddress.slice(0, 6)}...
        {props.row.original.walletAddress.slice(-4)}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: () => (
      <div className="font-funnel-display font-semibold text-sm">Date</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-xs">
        {new Date(props.row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  }),
];
