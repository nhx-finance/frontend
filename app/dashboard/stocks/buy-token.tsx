"use client";
import { Stock } from "@/mocks/stocks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React, { useState } from "react";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import "./styles.css";
import { ChevronDown } from "lucide-react";
import { KES_USDC_EXCHANGE_RATE } from "./swap-tokens";
import { usdcLogo } from "@/assets";
import { toast } from "sonner";

function BuyToken({ stock }: { stock: Stock }) {
  const [buyValue, setBuyValue] = useState("0");
  const [payWith, setPayWith] = useState("USDC");

  const { fontSize, textRef } = useDynamicFontSize({
    value: buyValue,
    maxFontSize: 48,
    minFontSize: 24,
  });

  const handleBuyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyValue(e.target.value);
  };

  return (
    <>
      <div className="rounded-3xl border border-foreground/20 p-4 h-[250px] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            You are Buying
          </p>
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger className="cursor-pointe border border-foreground/20 rounded-3xl px-2 py-1 flex items-center gap-1">
                <p className="text-xs font-funnel-display flex items-center gap-1 py-1 font-light text-muted-foreground">
                  {payWith === "USDC" ? (
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
                  {payWith}
                </p>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-[200px] shadow-none">
                <h1 className="text-xs font-funnel-display font-light text-muted-foreground">
                  Pay With
                </h1>
                <div
                  onClick={() => setPayWith("USDC")}
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
                  onClick={() => {
                    toast.error("Coming soon", {
                      description: "Purchases with KES aren't available yet.",
                    });
                  }}
                  className="flex opacity-50 items-center gap-1 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all p-2 rounded-xl"
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
        <div className="flex items-center justify-center">
          <input
            ref={textRef}
            type="number"
            value={buyValue}
            onChange={handleBuyInput}
            className="w-full h-full text-center bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
            style={{ fontSize: `${fontSize}px` }}
            placeholder="KES 0.00"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div
            onClick={() => setBuyValue("100")}
            className="flex items-center justify-center px-1 py-2 rounded-3xl w-1/3 border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-[10px] font-funnel-display font-light text-muted-foreground">
              10 {payWith === "KES" ? "KES" : "USDC"}
            </p>
          </div>
          <div
            onClick={() => setBuyValue("500")}
            className="flex items-center justify-center px-1 py-2 rounded-3xl w-1/3 border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-[10px] font-funnel-display font-light text-muted-foreground">
              500 {payWith === "KES" ? "KES" : "USDC"}
            </p>
          </div>
          <div
            onClick={() => setBuyValue("1000")}
            className="flex items-center justify-center px-1 py-2 rounded-3xl w-1/3 border border-foreground/20 cursor-pointer hover:bg-foreground/5 ease-in duration-300 transition-all"
          >
            <p className="text-[10px] font-funnel-display flex items-center gap-1 font-light text-muted-foreground">
              1,000 {payWith === "KES" ? "KES" : "USDC"}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-foreground/5 border border-foreground/10 rounded-3xl h-[80px] hover:bg-foreground/10 ease-in duration-300 transition-all my-2 flex items-center justify-between p-4 cursor-pointer">
        <div className="flex items-center gap-1">
          <p className="text-sm font-funnel-display font-semibold">
            {payWith === "KES"
              ? (Number(buyValue) / stock.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : (
                  (Number(buyValue) * KES_USDC_EXCHANGE_RATE) /
                  stock.price
                ).toLocaleString(undefined, {
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
            <p className="text-lg font-semibold font-funnel-display">
              {stock.ticker}
            </p>
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              {stock.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyToken;
