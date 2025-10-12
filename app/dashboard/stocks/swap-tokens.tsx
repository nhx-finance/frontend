"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { usdcLogo } from "@/assets";
import Image from "next/image";
import "./styles.css";
import { ChevronDown, ChevronsDown } from "lucide-react";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import { Stock } from "@/mocks/stocks";
import TokenSelectModal from "./token-select-modal";

export const KES_USDC_EXCHANGE_RATE = 128.71;

const percentages = [
  {
    id: 1,
    percentage: 25,
  },
  {
    id: 2,
    percentage: 50,
  },
  {
    id: 3,
    percentage: 75,
  },
  {
    id: 4,
    percentage: 100,
  },
];

function SwapTokens({ stock }: { stock: Stock }) {
  const [activeInput, setActiveInput] = useState<"sell" | "buy">("sell");
  const [sellValue, setSellValue] = useState("0");
  const [buyValue, setBuyValue] = useState("0");
  const [showTokenSelectModal, setShowTokenSelectModal] = useState(false);

  const { fontSize: sellFontSize, textRef: sellTextRef } = useDynamicFontSize({
    value: sellValue,
    maxFontSize: 48,
    minFontSize: 24,
  });

  const { fontSize: buyFontSize, textRef: buyTextRef } = useDynamicFontSize({
    value: buyValue,
    maxFontSize: 48,
    minFontSize: 24,
  });

  const handleSellInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usdcAmount = e.target.value;
    setSellValue(usdcAmount);

    const stockAmount =
      Number(usdcAmount) / (stock.price / KES_USDC_EXCHANGE_RATE);
    setBuyValue(stockAmount.toFixed(6));
  };

  const handleBuyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stockAmount = e.target.value;
    setBuyValue(stockAmount);

    const usdcAmount =
      Number(stockAmount) * (stock.price / KES_USDC_EXCHANGE_RATE);
    setSellValue(usdcAmount.toFixed(2));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative">
      <div
        className={cn(
          "w-full h-[170px] rounded-3xl p-4 cursor-pointer group flex flex-col justify-between",
          activeInput === "sell"
            ? "bg-transparent border-foreground/30 border"
            : "bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all "
        )}
        onClick={() => setActiveInput("sell")}
      >
        <div className="w-full flex items-center justify-between relative">
          <h1 className="text-sm font-funnel-display font-light text-muted-foreground">
            You Sell
          </h1>
          <div className="hidden group-hover:flex items-center justify-between gap-2 absolute right-0 top-0">
            {percentages.map((percentage) => (
              <div
                key={percentage.id}
                className="flex items-center justify-center hover:animate-scroll cursor-pointer"
              >
                <h1 className="text-[10px] font-funnel-display font-light text-muted-foreground px-2 border border-foreground/20 py-1 rounded-2xl cursor-pointer ease-in duration-300 transition-all">
                  {percentage.percentage}%
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <input
            ref={sellTextRef}
            type="number"
            value={sellValue}
            onChange={handleSellInput}
            className="w-[60%] h-full bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
            style={{ fontSize: `${sellFontSize}px` }}
            placeholder="0"
          />
          <div className="rounded-3xl border border-foreground/20 p-1 flex items-center gap-2">
            <Image
              src={usdcLogo}
              alt="USDC"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <div className="flex items-center">
              <p className="text-sm font-funnel-display font-light text-muted-foreground px-1">
                USDC
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            KES{" "}
            {(Number(sellValue) * KES_USDC_EXCHANGE_RATE).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            0 USDC
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-lg p-[3px] bg-background flex items-center justify-center">
          <div className="bg-foreground/5 rounded-lg h-12 w-12 flex items-center justify-center cursor-pointer transition-colors duration-200">
            <ChevronsDown className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full h-[170px] mt-1 rounded-3xl p-4 cursor-pointer group flex flex-col justify-between",
          activeInput === "buy"
            ? "bg-transparent border-foreground/30 border"
            : "bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all"
        )}
        onClick={() => setActiveInput("buy")}
      >
        <h1 className="text-sm font-funnel-display font-light text-muted-foreground">
          You Buy
        </h1>

        <div className="flex items-center justify-between">
          <input
            ref={buyTextRef}
            type="number"
            value={buyValue}
            onChange={handleBuyInput}
            className="w-[60%] h-full bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
            style={{ fontSize: `${buyFontSize}px` }}
            placeholder="0"
          />
          <div
            className="rounded-3xl border border-foreground/20 p-1 flex items-center gap-2 cursor-pointer"
            onClick={() => setShowTokenSelectModal(true)}
          >
            <Image
              src={stock.logo}
              alt={stock.name}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <div className="flex items-center">
              <p className="text-sm font-funnel-display font-light text-muted-foreground">
                {stock.ticker}
              </p>
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            KES{" "}
            {(Number(buyValue) * stock.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            0 {stock.ticker}
          </p>
        </div>
      </div>
      {showTokenSelectModal && (
        <TokenSelectModal setShowTokenSelectModal={setShowTokenSelectModal} />
      )}
    </div>
  );
}

export default SwapTokens;
