"use client";
import { Stock } from "@/mocks/stocks";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsUp, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SummaryProps {
  title: string;
  stocks: Stock[];
}

function Summary({ title, stocks }: SummaryProps) {
  const [showStocks, setShowStocks] = useState(title === "Newly Listed");

  return (
    <div className="w-full xl:w-1/3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-funnel-display font-semibold flex items-start gap-2">
          {title}
          <span className="text-xs  font-funnel-display text-muted-foreground font-normal">
            24h
          </span>
        </h1>
        <div className="xl:hidden">
          {showStocks ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowStocks(false)}
            >
              <ChevronsUp className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowStocks(true)}
            >
              <ChevronsDown className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          "xl:max-h-96 xl:opacity-100 xl:mt-4", // Always show on XL screens
          showStocks ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div className="flex flex-col gap-2">
          {stocks.slice(0, 3).map((stock, index) => (
            <Link
              href="/home"
              key={stock.id}
              className={cn(
                "flex items-center justify-between border-b border-foreground/20 py-2 group hover:bg-foreground/5 transition-all duration-300",
                "xl:translate-y-0 xl:opacity-100", // Always visible on XL screens
                showStocks
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              )}
              style={{
                transitionDelay: showStocks ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 p-1 border-2 border-foreground/20 rounded-lg group-hover:border-blue-500 transition-all duration-300">
                  <Image
                    src={stock.logo}
                    alt={stock.name}
                    width={56}
                    height={56}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="">
                  <h1 className="text-base font-funnel-display font-bold">
                    <span className="text-muted-foreground font-medieval-sharp">
                      nh
                    </span>
                    {stock.ticker}
                  </h1>
                  <p className="text-sm font-funnel-display text-muted-foreground">
                    {stock.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-base font-funnel-display">
                  {stock.currency} {stock.price}
                </p>
                <div className="flex items-center gap-">
                  {stock.changePercentage > 0 ? (
                    <ChevronsUp className="w-4 h-4" color="green" />
                  ) : (
                    <ChevronsDown className="w-4 h-4" color="red" />
                  )}

                  <p
                    className={cn(
                      stock.changePercentage > 0
                        ? "text-green-500"
                        : "text-red-500",
                      "text-xs font-funnel-display"
                    )}
                  >
                    {stock.changePercentage > 0 ? "+" : ""}
                    {stock.changePercentage}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;
