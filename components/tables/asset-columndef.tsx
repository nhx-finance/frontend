import { cn } from "@/lib/utils";
import { Stock } from "@/mocks/stocks";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import Image from "next/image";
import AssetTableChart from "../home/asset-table-chart";

const columnHelper = createColumnHelper<Stock>();

export const defaultColumns = [
  columnHelper.display({
    id: "index",
    header: () => (
      <div className="text-center font-funnel-display font-bold">#</div>
    ),
    cell: (props) => (
      <div className="text-center font-medieval-sharp font-semibold text-sm">
        {props.row.index + 1}
      </div>
    ),
  }),
  columnHelper.accessor("ticker", {
    id: "ticker",
    header: () => (
      <div className="font-funnel-display font-semibold">Asset</div>
    ),
    cell: (props) => (
      <div className="flex items-start gap-2 min-w-[200px]">
        <div className="w-12 h-12 p-1 border-2 border-foreground/20 rounded-lg">
          <Image
            src={props.row.original.logo}
            alt={props.row.original.name}
            width={40}
            height={40}
            className="rounded object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text font-funnel-display font-semibold">
            {props.row.original.ticker}
          </p>
          <p className="text-xs font-funnel-display text-muted-foreground">
            {props.row.original.name}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: () => (
      <div className="font-funnel-display font-semibold">Price</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm min-w-[100px]">
        {props.row.original.price} KES
      </div>
    ),
  }),
  columnHelper.accessor("change", {
    id: "change",
    header: () => <div className="font-funnel-display font-semibold">24h</div>,
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm flex items-center gap-1 min-w-[100px]">
        {props.row.original.change > 0 ? (
          <ChevronsUp className="w-4 h-4 text-green-500" />
        ) : (
          <ChevronsDown className="w-4 h-4 text-red-500" />
        )}
        <p
          className={cn(
            props.row.original.change > 0 ? "text-green-500" : "text-red-500",
            "text-sm"
          )}
        >
          {props.row.original.change} KES
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("changePercentage", {
    id: "changePercentage",
    header: () => (
      <div className="font-funnel-display font-semibold">24h %</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm flex items-center gap-1 min-w-[100px]">
        {props.row.original.changePercentage} %
      </div>
    ),
  }),
  columnHelper.accessor("volume", {
    id: "volume",
    header: () => (
      <div className="font-funnel-display font-semibold">Volume</div>
    ),
    cell: (props) => (
      <div className="text-left font-funnel-display text-sm">
        {props.row.original.volume.toLocaleString()}
      </div>
    ),
  }),
  columnHelper.accessor("historicalData", {
    id: "historicalData",
    header: () => (
      <div className="font-funnel-display font-semibold">Historical Data</div>
    ),
    cell: () => (
      <div className="text-left font-funnel-display text-sm overflow-hidden">
        <AssetTableChart />
      </div>
    ),
  }),
];
