import { createColumnHelper } from "@tanstack/react-table";
import { WalletWithBalanceResponse } from "@/hooks/kesy/useWallets";
import Image from "next/image";
import { kesy } from "@/assets";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

const columnHelper = createColumnHelper<WalletWithBalanceResponse>();

const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const formatBalance = (balance: number, currency: string) => {
  if (balance >= 1000000) {
    const millions = Math.floor(balance / 1000000);
    return `${millions}M`;
  }
  if (balance >= 1000) {
    const thousands = Math.floor(balance / 1000);
    return `${thousands}K`;
  }
  return `${balance} ${currency}`;
};

export const defaultColumns = [
  columnHelper.accessor("walletId", {
    id: "walletId",
    header: () => (
      <div className="font-funnel-display font-semibold">Wallet ID</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm flex items-center gap-1 min-w-[200px]">
        <Image
          src={kesy}
          alt="KESY"
          width={20}
          height={20}
          className="rounded-full border border-foreground/20 h-8 w-8"
        />
        <p
          className="text-sm font-funnel-display flex items-center gap-1 text-foreground/80 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(props.row.original.walletId);
            toast.success("Wallet ID copied to clipboard");
          }}
        >
          {props.row.original.walletId.slice(0, 10)}...
          <CopyIcon className="w-4 h-4" />
        </p>
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
        {formatBalance(props.row.original.balance, "KESY")}
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
];
