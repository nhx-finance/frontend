import { PieChartIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ChartPieDonut } from "./asset-allocation-chart";

function AssetAllocation() {
  return (
    <div className="border border-foreground/20 rounded-3xl p-4 w-full">
      <div className="flex items-center gap-1">
        <PieChartIcon className="w-4 h-4 text-muted-foreground" />
        <h1 className="text-sm font-funnel-display text-muted-foreground font-bold">
          Asset Allocation
        </h1>
      </div>
      <div className="">
        <ChartPieDonut />
      </div>
      <div className="mt-4">
        <Button className="bg-foreground font-funnel-display hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 w-full md:py-1 backdrop-blur-sm hover:backdrop-blur-none cursor-pointer">
          View Portfolio
        </Button>
      </div>
    </div>
  );
}

export default AssetAllocation;
