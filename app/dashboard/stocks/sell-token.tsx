"use client";
import { getTokenAddress, Stock } from "@/mocks/stocks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import "./styles.css";
import { ChevronDown, InfoIcon, Loader2 } from "lucide-react";
import { KES_USDC_EXCHANGE_RATE } from "./swap-tokens";
import { toast } from "sonner";
import { usdcLogo } from "@/assets";
import Link from "next/link";
import { useTokenBalance } from "@/hooks/use-stocks-balances";
import { useSellTokens } from "@/hooks/use-sell-tokens";
import { useApproveToken } from "@/hooks/use-swap";

function formatValue(value: string) {
  const numberValue = Number(value);
  return (numberValue * 1000000).toString();
}

function SellToken({ stock }: { stock: Stock }) {
  const [sellValue, setSellValue] = useState("0");
  const [sellTo, setSellTo] = useState("USDC");
  const [isApproved, setIsApproved] = useState(false);
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(stock.hederaId);
  const { sellTokensMutation, isError, isPending, isSuccess, error } =
    useSellTokens();
  const { approveTokenMutation, isApproveTokenPending, isApproveTokenSuccess } =
    useApproveToken(getTokenAddress(stock.ticker));

  const { fontSize, textRef } = useDynamicFontSize({
    value: sellValue,
    maxFontSize: 48,
    minFontSize: 24,
  });

  const handleBuyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellValue(e.target.value);
  };

  useEffect(() => {
    if (isApproveTokenSuccess) {
      setIsApproved(true);
      toast.success(
        "Token approved! Now click Continue to complete the transaction."
      );
    } else if (error) {
      toast.error(error.message);
    }
  }, [isApproveTokenSuccess, error, sellValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Transaction completed!");
    } else if (isError) {
      toast.error(error?.message);
    } else if (isPending) {
      toast.loading("Transaction pending...");
    }
  }, [isSuccess, isError, isPending, error]);

  const handleContinue = async () => {
    if (!isApproved) {
      approveTokenMutation(BigInt(formatValue(sellValue)));
      setIsApproved(true);
    } else {
      sellTokensMutation(
        BigInt(formatValue(sellValue)),
        getTokenAddress(stock.ticker)
      );
      toast.success(
        "Transaction initiated! Please wait for the transaction to complete."
      );
      setIsApproved(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-foreground/20 p-4 h-[250px] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            You are Selling
          </p>
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger className="cursor-pointe border border-foreground/20 rounded-3xl px-2 py-1 flex items-center gap-1">
                <p className="text-xs font-funnel-display flex items-center gap-1 py-1 font-light text-muted-foreground">
                  {sellTo === "USDC" ? (
                    <Image
                      src={usdcLogo}
                      alt="USDC"
                      width={18}
                      height={18}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    "🇰🇪"
                  )}
                  {sellTo}
                </p>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-[200px] shadow-none">
                <h1 className="text-xs font-funnel-display font-light text-muted-foreground">
                  Receive
                </h1>
                <div
                  onClick={() => setSellTo("USDC")}
                  className="flex items-center gap-1 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all p-2 rounded-xl"
                >
                  <span>
                    <Image
                      src={usdcLogo}
                      alt="USDC"
                      width={16}
                      height={16}
                      className="rounded-full object-cover"
                    />
                  </span>
                  <p className="text-xs font-funnel-display font-light text-muted-foreground">
                    USDC
                  </p>
                </div>
                <div
                  onClick={() => setSellTo("KES")}
                  className="flex items-center gap-1 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all p-2 rounded-xl"
                >
                  <span>🇰🇪</span>
                  <p className="text-xs font-funnel-display font-light text-muted-foreground">
                    KES
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <input
            ref={textRef}
            type="number"
            value={sellValue}
            onChange={handleBuyInput}
            className="w-full h-full text-center bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
            style={{ fontSize: `${fontSize}px` }}
            placeholder={`0.00 ${stock.ticker}`}
          />
          <p className="text-sm mt-4 font-funnel-display font-semibold text-muted-foreground">
            {sellTo === "KES"
              ? (Number(sellValue) * stock.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : (
                  (Number(sellValue) / KES_USDC_EXCHANGE_RATE) *
                  stock.price
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
            {sellTo === "KES" ? "KES" : "USDC"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div
            onClick={() =>
              setSellValue(((tokenBalance ?? 0) * 0.25).toFixed(2))
            }
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              25%
            </p>
          </div>
          <div
            onClick={() => setSellValue(((tokenBalance ?? 0) * 0.5).toFixed(2))}
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              50%
            </p>
          </div>
          <div
            onClick={() =>
              setSellValue(((tokenBalance ?? 0) * 0.75).toFixed(2))
            }
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              75%
            </p>
          </div>
          <div
            onClick={() => setSellValue((tokenBalance ?? 0).toFixed(2))}
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              Max
            </p>
          </div>
        </div>
      </div>
      <div className="bg-foreground/5 border border-foreground/10 rounded-3xl h-[80px] hover:bg-foreground/10 ease-in duration-300 transition-all my-2 flex items-center justify-between p-4 cursor-pointer">
        <div className="flex items-start gap-1 flex-col ">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            {(tokenBalance ?? 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {stock.ticker}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={stock.logo}
            alt={stock.name}
            width={44}
            height={44}
            className="rounded-xl object-cover"
          />
          <div className="">
            <p className="text-lg font-semibold font-funnel-display text-muted-foreground">
              {stock.ticker}
            </p>
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              {stock.name}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-foreground/20 w-full mt-1 rounded-3xl p-4 flex flex-col gap-2">
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
            {(stock.price / KES_USDC_EXCHANGE_RATE).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
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
                  Rather than distributing cash or additional units, these gains
                  are automatically rolled back into acquiring more underlying
                  shares, building value over time—which may gradually increase
                  the effective share exposure per token.
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
      <button
        onClick={handleContinue}
        disabled={isPending || isApproveTokenPending}
        className=" bg-foreground/5 hover:bg-foreground/10 items-center justify-center ease-in duration-300 transition-all font-funnel-display w-full mt-1 rounded-3xl p-4 flex flex-col gap-2 font-semibold"
      >
        {isPending || isApproveTokenPending ? (
          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
        ) : isApproved ? (
          "Continue"
        ) : (
          "Approve"
        )}
      </button>
    </>
  );
}

export default SellToken;
