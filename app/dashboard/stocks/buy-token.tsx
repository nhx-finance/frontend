"use client";
import { Stock } from "@/mocks/stocks";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import "./styles.css";

function BuyToken({ stock }: { stock: Stock }) {
  const [buyValue, setBuyValue] = useState("0");

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
            <Image
              src={stock.logo}
              alt={stock.name}
              width={24}
              height={24}
              className="rounded-lg object-cover"
            />
            <p className="text-sm font-funnel-display font-light text-muted-foreground">
              {stock.ticker}
            </p>
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
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/10 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              KES 100
            </p>
          </div>
          <div
            onClick={() => setBuyValue("500")}
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/10 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              KES 500
            </p>
          </div>
          <div
            onClick={() => setBuyValue("1000")}
            className="flex items-center justify-center px-4 py-2 rounded-3xl border border-foreground/20 cursor-pointer hover:bg-foreground/10 ease-in duration-300 transition-all"
          >
            <p className="text-xs font-funnel-display font-light text-muted-foreground">
              KES 1,000
            </p>
          </div>
        </div>
      </div>
      <div className="bg-foreground/5 rounded-3xl h-[80px] hover:bg-foreground/10 ease-in duration-300 transition-all my-2 flex items-center justify-between p-4 cursor-pointer">
        <div className="flex items-center gap-1">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            {(Number(buyValue) / stock.price).toLocaleString(undefined, {
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
    </>
  );
}

export default BuyToken;
