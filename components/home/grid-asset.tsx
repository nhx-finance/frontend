import { ChevronsDown, ChevronsUp } from "lucide-react";
import React from "react";
import AssetSmallChart from "./asset-chart-small";
import { Stock } from "@/mocks/stocks";
import Image from "next/image";

function GridAsset({ stock }: { stock: Stock }) {
  return (
    <div className="rounded-3xl border border-foreground/20 p-4 group cursor-pointer transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 p-1 border-2 border-foreground/20 rounded-lg group-hover:border-blue-500 transition-all duration-300">
            <Image
              src={stock.logo}
              alt={stock.name}
              width={56}
              height={56}
              className="object-contain rounded-lg"
            />
          </div>
          <div className="">
            <h1 className="text-base font-funnel-display font-bold">
              <span className="text-muted-foreground font-medieval-sharp">
                nh
              </span>
              {stock.ticker}
            </h1>
            <p className="text-xs font-funnel-display text-muted-foreground">
              {stock.name}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-funnel-display font-semibold">
            KES {stock.price}
          </h1>
          <div className="w-full mt-1 flex items-center justify-center gap-2">
            <div className="flex items-center justify-center">
              {stock.changePercentage > 0 ? (
                <ChevronsUp className="w-4 h-4 text-green-500" />
              ) : (
                <ChevronsDown className="w-4 h-4 text-red-500" />
              )}
              <h1 className="text-xs text-muted-foreground font-funnel-display font-semibold">
                KES{" "}
                {stock.changePercentage > 0
                  ? stock.change.toFixed(2)
                  : -stock.change.toFixed(2)}
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-xs text-muted-foreground font-funnel-display font-semibold">
                {stock.changePercentage > 0 ? "+" : ""}
                {stock.changePercentage}%
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 group-[&:hover]:bg-foreground/5 rounded-3xl cursor-pointer transition-all ease-in-out duration-300 group-[&:hover]:border-foreground/20 border border-transparent">
        <AssetSmallChart />
      </div>
    </div>
  );
}

export default GridAsset;
