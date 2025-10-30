import { Wallet2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { usePortfolioBalance } from "@/hooks/use-portfolio-balance";
import { Skeleton } from "../ui/skeleton";

function PortfolioCard() {
  const { data: portfolioBalance, isPending } = usePortfolioBalance();
  return (
    <div className="border border-foreground/20 rounded-3xl p-4 w-full max-h-[250px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Wallet2Icon className="w-4 h-4 text-muted-foreground" />
          <h1 className="text-sm font-funnel-display text-muted-foreground font-bold">
            Portfolio Balance
          </h1>
        </div>
      </div>
      <div className="mt-4">
        {isPending ? (
          <Skeleton className="h-12 w-full md:w-1/2 mx-2" />
        ) : (
          <h1 className="text-3xl font-funnel-display font-bold">
            KES{" "}
            {portfolioBalance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-funnel-display text-muted-foreground flex items-center gap-1 justify-center">
            Updated At
          </p>
          <p className="text-sm font-funnel-display text-green-500">
            Oct. 28th
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-2 flex-col md:flex-row mt-8">
        <Button className="bg-foreground font-funnel-display hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 w-full md:w-1/2 md:py-1 backdrop-blur-sm hover:backdrop-blur-none cursor-pointer">
          Swap
        </Button>
        <Button className="bg-background text-foreground font-funnel-display border border-foreground/20 hover:bg-background/80 ease-in transition-all rounded-3xl duration-300 w-full md:w-1/2 md:py-1 backdrop-blur-sm hover:backdrop-blur-none cursor-pointer">
          Sell
        </Button>
      </div>
    </div>
  );
}

export default PortfolioCard;
