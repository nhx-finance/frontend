import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "@/mocks/transactions";
import Image from "next/image";

const columnHelper = createColumnHelper<Transaction>();

export const defaultColumns = [
  columnHelper.accessor("asset", {
    id: "asset",
    header: () => (
      <div className="font-funnel-display font-semibold">Asset</div>
    ),
    cell: (props) => (
      <div className="flex items-center gap-2 w-[250px]">
        <div className="w-12 h-12 p-1 border-2 border-foreground/20 rounded-lg">
          <Image
            src={props.row.original.asset.logo}
            alt={props.row.original.asset.name}
            width={40}
            height={40}
            className="rounded object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-funnel-display font-semibold">
            {props.row.original.asset.ticker}
          </p>
          <p className="text-xs font-funnel-display text-muted-foreground">
            {props.row.original.asset.name}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: () => (
      <div className="font-funnel-display font-semibold">Amount</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {props.row.original.amount} {props.row.original.asset.currency}
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => (
      <div className="font-funnel-display font-semibold">Quantity</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {(props.row.original.asset.price / props.row.original.amount).toFixed(
          2
        )}
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: () => <div className="font-funnel-display font-semibold">Type</div>,
    cell: (props) => (
      <div className="text-left uppercase font-funnel-display text-sm">
        {props.row.original.type}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: () => <div className="font-funnel-display font-semibold">Date</div>,
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {new Date(props.row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  }),
];
