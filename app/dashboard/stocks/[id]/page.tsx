"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Navbar from "@/components/home/navbar";
import { stocks } from "@/mocks/stocks";
import {
  Building2Icon,
  ChevronRight,
  ExternalLink,
  Globe2Icon,
  GripHorizontal,
  InfoIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { IconBrandTwitter } from "@tabler/icons-react";
import { HistoricalChart } from "../historical-chart";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import SwapTokens, { KES_USDC_EXCHANGE_RATE } from "../swap-tokens";

function Stock() {
  const { id } = useParams();
  const [tradeAction, setTradeAction] = useState<"buy" | "sell" | "swap">(
    "buy"
  );
  const stock = stocks.find((stock) => stock.id === parseInt(id as string));

  if (!stock) {
    return <div>Stock not found</div>;
  }

  return (
    <div className="max-w-[1140px] mx-auto my-0 ">
      <Navbar />
      <div className="px-4 md:px-8">
        <div className="flex items-center my-8">
          <Link
            href="/home"
            className="text-base font-funnel-display font-semibold text-muted-foreground"
          >
            Markets
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground mt-[2px]" />
          <p className="text-base font-funnel-display font-semibold text-muted-foreground">
            Stocks
          </p>
          <ChevronRight className="w-4 h-4 text-muted-foreground mt-[2px]" />
          <p className="text-base font-funnel-display font-semibold">
            <span className="text-muted-foreground font-medieval-sharp">
              nh
            </span>
            {stock.ticker}
          </p>
        </div>
        <div className="flex items-start justify-between flex-col md:flex-row gap-4">
          <div className="w-full md:w-[60%]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col md:flex-row items-start justify-baseline gap-2">
                <div className="w-14 h-14 md:w-10 md:h-10 p-1 border-2 border-foreground/20 rounded-lg group-hover:border-blue-500 transition-all duration-300">
                  <Image
                    src={stock.logo}
                    alt={stock.name}
                    width={36}
                    height={36}
                    className="object-contain rounded-md w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2 md:mt-2">
                  <p className="text-lg md:text-2xl font-funnel-display font-semibold">
                    {stock.name}
                  </p>
                  <p className="text-lg md:text-2xl hidden md:block font-funnel-display text-muted-foreground">
                    {stock.ticker}
                  </p>
                </div>
              </div>
              <div className="">
                <div className="md:hidden block">
                  <Drawer>
                    <DrawerTrigger>
                      <GripHorizontal className="w-4 h-4 text-muted-foreground" />
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="flex items-start flex-col justify-start gap-6">
                        <Link
                          href="/"
                          className="flex items-center mx-4 gap-2 my-2"
                        >
                          <Globe2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">Website</p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 my-2"
                        >
                          <Building2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">
                            Location
                          </p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 my-2"
                        >
                          <IconBrandTwitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">Twitter</p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 mb-8  my-2"
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">
                            External Link
                          </p>
                        </Link>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
                <div className="hidden md:flex items-center justify-between gap-4">
                  <Link href="/">
                    <Globe2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <Building2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <IconBrandTwitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <ExternalLink className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-1 md:mt-3">
              <HistoricalChart data={stock.historicalData} stock={stock} />
            </div>
          </div>
          <div className="hidden md:block w-full md:w-[40%] h-full grow p-2">
            <div className="w-full flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
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
            </div>
            <div className="">
              {tradeAction === "swap" && <SwapTokens stock={stock} />}

              <div className="border border-foreground/20 w-full mt-2 rounded-3xl p-4 flex flex-col gap-2">
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
                    KES
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
                      <PopoverContent className="text-[10px] font-funnel-display leading-relaxed shadow-none">
                        <p>
                          Each NHX token captures the full economic performance
                          of the linked NSE stock, incorporating price changes,
                          reinvested dividends (after applicable taxes), and
                          events like splits.
                        </p>
                        <p>
                          Rather than distributing cash or additional units,
                          these gains are automatically rolled back into
                          acquiring more underlying shares, building value over
                          time—which may gradually increase the effective share
                          exposure per token.
                        </p>
                        <p>
                          This Shares Per Token figure illustrates your
                          compounded position.
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
              <button className="border border-foreground/20 w-full mt-2 rounded-3xl p-4 flex flex-col gap-2 font-semibold">
                Continue
              </button>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-between gap-4 mx-2">
          <div className="w-full h-full grow border border-foreground/20 rounded-3xl bg-foreground">
            <h1 className="text-xl text-center py-2 font-funnel-display font-semibold text-background">
              Buy
            </h1>
          </div>
          <div className="w-full h-full grow border border-foreground/20 rounded-3xl backdrop-blur-xl bg-foreground/5">
            <h1 className="text-xl text-center py-2 font-funnel-display font-semibold">
              Sell
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;
