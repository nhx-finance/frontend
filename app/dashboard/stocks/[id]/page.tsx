"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Navbar from "@/components/home/navbar";
import { stocks } from "@/mocks/stocks";
import {
  Building2Icon,
  CheckCircle2,
  ChevronRight,
  CopyIcon,
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
import SwapTokens from "../swap-tokens";
import BuyToken from "../buy-token";
import SellToken from "../sell-token";
import { hederaLogo } from "@/assets";
import { toast } from "sonner";

function Stock() {
  const { id } = useParams();
  const [tradeAction, setTradeAction] = useState<"buy" | "sell" | "swap">(
    "buy"
  );
  const [cutOff, setCutOff] = useState(200);
  const stock = stocks.find((stock) => stock.id === parseInt(id as string));

  if (!stock) {
    return <div>Stock not found</div>;
  }

  const handleCopy = (item: string) => {
    navigator.clipboard.writeText(item);
    toast.success("Copied to clipboard");
  };


  return (
    <div className="max-w-[1240px] mx-auto my-0 ">
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
        <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-0 md:mb-4">
          <div className="w-full md:w-[60%] mb-18 md:mb-0">
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
            <div className="mt-6 flex items-center justify-between flex-wrap">
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  Market Cap
                </p>
                <h1 className="text-lg font-funnel-display font-semibold">
                  KES 78B
                </h1>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  24h Volume
                </p>
                <h1 className="text-lg font-funnel-display font-semibold">
                  KES 100M
                </h1>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  Avg Volume
                </p>
                <h1 className="text-lg font-funnel-display font-semibold">
                  KES 77M
                </h1>
              </div>
            </div>
            <div className="mt-4 block md:hidden ">
              <h1 className="font-semibold text-xl font-funnel-display">
                About
              </h1>
              <p className="leading-relaxed text-sm font-funnel-display text-muted-foreground">
                {stock.description.slice(0, cutOff)}
                {stock.description.length > cutOff ? "..." : ""}

                {cutOff >= stock.description.length ? (
                  <button
                    className="text-blue-500 ml-1"
                    onClick={() => setCutOff(300)}
                  >
                    Read Less
                  </button>
                ) : (
                  <button
                    className="text-blue-500 ml-1"
                    onClick={() => setCutOff(stock.description.length)}
                  >
                    Read More
                  </button>
                )}
              </p>
            </div>
            <div className="mt-4 ">
              <h1 className="font-semibold text-xl font-funnel-display mb-2">
                Info
              </h1>
              <div className="flex flex-col md:flex-row gap-3 md:justify-between ">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Underlying Asset
                    </p>
                    <p className="text-xs font-funnel-display">{stock.name}</p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Underlying Ticker
                    </p>
                    <p className="text-xs font-funnel-display">
                      {stock.ticker}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Shares per token
                    </p>
                    <p className="text-xs font-funnel-display">
                      1 nh{stock.ticker} = 1 {stock.ticker}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Network
                    </p>
                    <div className="flex items-center gap-1">
                      <Image
                        src={hederaLogo}
                        alt="Hedera"
                        width={16}
                        height={16}
                        className="object-contain rounded-full"
                      />
                      <p className="text-xs font-funnel-display">
                        Hedera Testnet
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Category
                    </p>
                    <p className="text-xs font-funnel-display">
                      {stock.sector}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Token Address
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-funnel-display">
                        {stock.hederaId}
                      </p>
                      <CopyIcon
                        className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all"
                        onClick={() => handleCopy(stock.hederaId)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 ">
              <h1 className="font-semibold text-xl font-funnel-display mb-2">
                Stats
              </h1>
              <div className="flex flex-col md:flex-row gap-3 md:justify-between ">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <h1 className="text-base font-funnel-display font-semibold">
                    Onchain Token
                  </h1>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Open
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 0.8).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      High
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 1.2).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Low
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 0.6).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <h1 className="text-base font-funnel-display font-semibold">
                    Underlying Asset
                  </h1>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Open
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 0.85).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      High
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 1.25).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Low
                    </p>
                    <p className="text-xs font-funnel-display">
                      KES{" "}
                      {(stock.price * 0.65).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 ">
              <h1 className="font-semibold text-xl font-funnel-display mb-2">
                Compliance Reports
              </h1>
              <div className="flex flex-col md:flex-row gap-3 md:justify-between ">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-funnel-display font-light text-muted-foreground">
                        Security in Collateral
                      </p>
                      <Popover>
                        <PopoverTrigger>
                          <span className="cursor-pointer">
                            <InfoIcon className="w-3 h-3 text-muted-foreground" />
                          </span>
                        </PopoverTrigger>
                        <PopoverContent className="text-[10px] font-funnel-display leading-relaxed shadow-none">
                          <p>
                            The security {stock.ticker} is held by an
                            independent third-party collateral agent who can
                            seize and liquidate the collateral to pay token
                            holders of nh{stock.ticker} should the need arise.
                          </p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs font-funnel-display">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </p>
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-funnel-display font-light text-muted-foreground">
                        Segregated Accounts
                      </p>
                      <Popover>
                        <PopoverTrigger>
                          <span className="cursor-pointer">
                            <InfoIcon className="w-3 h-3 text-muted-foreground" />
                          </span>
                        </PopoverTrigger>
                        <PopoverContent className="text-[10px] font-funnel-display leading-relaxed shadow-none">
                          <p>
                            The assets backing nh{stock.ticker} tokens are held
                            in a bankruptcy-remote entity with distinct assets,
                            liabilities and governance from all other entities,
                            including NHX Finance Ltd
                          </p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs font-funnel-display">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Daily Reports
                    </p>
                    <ExternalLink className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="border-b border-foreground/20 pb-2 flex items-center justify-between">
                    <p className="text-xs font-funnel-display font-light text-muted-foreground">
                      Monthly Reports
                    </p>
                    <ExternalLink className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>
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
              {tradeAction === "swap" && (
                <SwapTokens stock={stock} tradeAction={tradeAction} />
              )}
              {tradeAction === "buy" && <BuyToken stock={stock} />}
              {tradeAction === "sell" && <SellToken stock={stock} />}
            </div>
            <div className="mt-4">
              <h1 className="font-semibold text-xl font-funnel-display">
                About
              </h1>
              <p className="leading-relaxed text-sm font-funnel-display text-muted-foreground">
                {stock.description.slice(0, cutOff)}
                {stock.description.length > cutOff ? "..." : ""}

                {cutOff >= stock.description.length ? (
                  <button
                    className="text-blue-500 ml-1"
                    onClick={() => setCutOff(300)}
                  >
                    Read Less
                  </button>
                ) : (
                  <button
                    className="text-blue-500 ml-1"
                    onClick={() => setCutOff(stock.description.length)}
                  >
                    Read More
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-2 left-0 right-0 md:hidden flex items-center justify-between gap-4 mx-2">
          <Link
            href={{
              pathname: `/dashboard/trade/${id}`,
              query: {
                tradeAction: "buy",
              },
            }}
            className="w-1/2 h-full grow border border-foreground/20 rounded-3xl bg-foreground"
          >
            <h1 className="text-xl text-center py-2 font-funnel-display font-semibold text-background">
              Buy
            </h1>
          </Link>
          <Link
            href={{
              pathname: `/dashboard/trade/${id}`,
              query: {
                tradeAction: "sell",
              },
            }}
            className="w-1/2 h-full grow border border-foreground/20 rounded-3xl backdrop-blur-xl bg-foreground/5"
          >
            <h1 className="text-xl text-center py-2 font-funnel-display font-semibold text-foreground ">
              Sell
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stock;
