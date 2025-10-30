"use client";
import Navbar from "@/components/home/navbar";
import { stocks } from "@/mocks/stocks";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SwapTokens from "../../stocks/swap-tokens";
import BuyToken from "../../stocks/buy-token";
import SellToken from "../../stocks/sell-token";
import { cn } from "@/lib/utils";

function Trade() {
  const { id } = useParams();
  const router = useRouter();
  const tradeParams = useSearchParams();
  const initialTradeAction = tradeParams.get("tradeAction") || "swap";
  const [tradeAction, setTradeAction] = useState(initialTradeAction);
  const stock = stocks.find((stock) => stock.id === parseInt(id as string));

  useEffect(() => {
    router.push(`/dashboard/trade/${id}?tradeAction=${tradeAction}`, {
      scroll: false,
    });
  }, [tradeAction, id, router]);

  if (!stock) {
    return <div>Stock not found</div>;
  }

  return (
    <div className="">
      <Navbar />
      <div className="px-2 max-w-md mx-auto my-0">
        <div className="flex mt-6 mb-2 items-center gap-2">
          <p
            className={cn(
              "text-sm text-muted-foreground font-funnel-display font-semibold py-[2px] rounded-xl px-6 cursor-pointer ease-in duration-300 transition-all",
              tradeAction === "swap" &&
                "bg-foreground/10 border border-foreground/20"
            )}
            onClick={() => setTradeAction("swap")}
          >
            Swap
          </p>
          <p
            className={cn(
              "text-sm text-muted-foreground font-funnel-display font-semibold py-[2px] rounded-xl px-6 cursor-pointer ease-in duration-300 transition-all",
              tradeAction === "buy" &&
                "bg-foreground/10 border border-foreground/20"
            )}
            onClick={() => setTradeAction("buy")}
          >
            Buy
          </p>
          <p
            className={cn(
              "text-sm text-muted-foreground font-funnel-display font-semibold py-[2px] rounded-xl px-6 cursor-pointer ease-in duration-300 transition-all",
              tradeAction === "sell" &&
                "bg-foreground/10 border border-foreground/20"
            )}
            onClick={() => setTradeAction("sell")}
          >
            Sell
          </p>
        </div>
        {tradeAction === "swap" && (
          <SwapTokens stock={stock} tradeAction={tradeAction} />
        )}
        {tradeAction === "buy" && <BuyToken stock={stock} />}
        {tradeAction === "sell" && <SellToken stock={stock} />}
      </div>
    </div>
  );
}

export default Trade;
