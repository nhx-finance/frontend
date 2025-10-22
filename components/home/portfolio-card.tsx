import { ChevronsUp, ExternalLink, Wallet2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function PortfolioCard() {
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
        <h1 className="text-3xl font-funnel-display font-bold">KES 10,000</h1>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-funnel-display text-muted-foreground flex items-center gap-1 justify-center">
            <ChevronsUp className="w-4 h-4 text-green-500" />
            KES 1,000
          </p>
          <p className="text-sm font-funnel-display text-green-500">+10%</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-2 flex-col md:flex-row mt-8">
        <Button className="bg-foreground font-funnel-display hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 w-full md:w-1/2 md:py-1 backdrop-blur-sm hover:backdrop-blur-none cursor-pointer">
          Withdraw
        </Button>
        <Button className="bg-background text-foreground font-funnel-display border border-foreground/20 hover:bg-background/80 ease-in transition-all rounded-3xl duration-300 w-full md:w-1/2 md:py-1 backdrop-blur-sm hover:backdrop-blur-none cursor-pointer">
          Deposit
        </Button>
      </div>
    </div>
  );
}

export default PortfolioCard;
