"use client";
import Navbar from "@/components/home/navbar";
import { stocks } from "@/mocks/stocks";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SwapTokens, { KES_USDC_EXCHANGE_RATE } from "../../stocks/swap-tokens";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { InfoIcon } from "lucide-react";
import BuyToken from "../../stocks/buy-token";
import SellToken from "../../stocks/sell-token";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

        {/* <div className="border border-foreground/20 w-full mt-1 rounded-3xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-funnel-display font-light text-muted-foreground">
              Rate
            </p>
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              1 nh{stock.ticker} = {stock.price} KES
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-funnel-display font-light text-muted-foreground">
              USDC Rate
            </p>
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              1 nh{stock.ticker} ={" "}
              {(stock.price / KES_USDC_EXCHANGE_RATE).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}{" "}
              USDC
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-funnel-display font-light text-muted-foreground flex items-center gap-1">
              Per token
              <Popover>
                <PopoverTrigger>
                  <span className="cursor-pointer">
                    <InfoIcon className="w-4 h-4 text-muted-foreground" />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="text-[10px] bg-background p-4 border border-foreground/20 max-w-[350px] rounded-3xl mx-2 font-funnel-display leading-relaxed shadow-none">
                  <p>
                    Each NHX token captures the full economic performance of the
                    linked NSE stock, incorporating price changes, reinvested
                    dividends (after applicable taxes), and events like splits.
                  </p>
                  <p>
                    Rather than distributing cash or additional units, these
                    gains are automatically rolled back into acquiring more
                    underlying shares, building value over time—which may
                    gradually increase the effective share exposure per token.
                  </p>
                  <p>
                    This Shares Per Token figure illustrates your compounded
                    position.
                    <Link href="/" className="text-blue-500 ml-1">
                      Learn More
                    </Link>
                  </p>
                </PopoverContent>
              </Popover>
            </p>
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              1 nh{stock.ticker} = 1 {stock.ticker}
            </p>
          </div>
        </div>
        <button className=" bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all font-funnel-display w-full mt-1 rounded-3xl p-4 flex flex-col gap-2 font-semibold">
          Continue
        </button> */}
      </div>
    </div>
  );
}

export default Trade;
