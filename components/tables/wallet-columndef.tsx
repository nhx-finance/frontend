import { createColumnHelper } from "@tanstack/react-table";
import { Wallet } from "@/mocks/wallets";
import Image from "next/image";
import { kesy } from "@/assets";

const columnHelper = createColumnHelper<Wallet>();

const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const formatBalance = (balance: number, currency: string) => {
  const stringBalance = balance.toString();
  const [whole] = stringBalance.split(".");
  if (whole.length > 6) {
    return `${whole.charAt(0)}.${whole.slice(1, 2)}M`;
  }
  if (whole.length > 3) {
    return `${whole.charAt(0)}.${whole.slice(1, 2)}K`;
  }
  return `${balance} ${currency}`;
};

export const defaultColumns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => <div className="font-funnel-display font-semibold">Name</div>,
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm flex items-center gap-1 min-w-[200px]">
        <Image
          src={kesy}
          alt="KESY"
          width={20}
          height={20}
          className="rounded-full border border-foreground/20 h-8 w-8"
        />
        {props.row.original.name.slice(0, 10)}...
      </div>
    ),
  }),
  columnHelper.accessor("balance", {
    id: "balance",
    header: () => (
      <div className="font-funnel-display font-semibold">Balance</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {formatBalance(props.row.original.balance, props.row.original.currency)}
      </div>
    ),
  }),
  columnHelper.accessor("currency", {
    id: "currency",
    header: () => (
      <div className="font-funnel-display font-semibold">Currency</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {props.row.original.currency}
      </div>
    ),
  }),
  columnHelper.accessor("address", {
    id: "address",
    header: () => (
      <div className="font-funnel-display font-semibold">Address</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {formatAddress(props.row.original.address)}
      </div>
    ),
  }),
  columnHelper.accessor("isWhitelisted", {
    id: "isWhitelisted",
    header: () => (
      <div className="font-funnel-display font-semibold">Whitelisted</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {props.row.original.isWhitelisted ? "Yes" : "No"}
      </div>
    ),
  }),
];
