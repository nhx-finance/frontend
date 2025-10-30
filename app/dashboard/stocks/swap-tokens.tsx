"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { usdcLogo } from "@/assets";
import Image from "next/image";
import "./styles.css";
import { ChevronDown, ChevronsDown, InfoIcon, Loader2 } from "lucide-react";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import {
  getTokenAddress,
  mockUSDCAddress,
  mockUSDCId,
  Stock,
} from "@/mocks/stocks";
import TokenSelectModal from "./token-select-modal";
import {
  useApproveToken,
  useSwapExactTokensForTokens,
  useSwapQuote,
} from "@/hooks/use-swap";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTokenBalance } from "@/hooks/use-stocks-balances";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { useRouter } from "next/navigation";

export const KES_USDC_EXCHANGE_RATE = 129.15;

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

function formatValue(value: string) {
  const numberValue = Number(value);
  return (numberValue * 1000000).toString();
}

function SwapTokens({
  stock,
  tradeAction,
}: {
  stock: Stock;
  tradeAction: "buy" | "sell" | "swap";
}) {
  const [activeInput, setActiveInput] = useState<"sell" | "buy">("sell");
  const [sellValue, setSellValue] = useState("1");
  const [buyValue, setBuyValue] = useState("1");
  const [isApproved, setIsApproved] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTokenSelectModal, setShowTokenSelectModal] = useState(false);
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const status = useActiveWalletConnectionStatus();

  const inputTokenAddress = isFlipped
    ? getTokenAddress(stock.ticker)
    : mockUSDCAddress;
  const outputTokenAddress = isFlipped
    ? mockUSDCAddress
    : getTokenAddress(stock.ticker);

  const {
    data: swapQuoteData,
    isLoading: isSwapQuoteLoading,
  } = useSwapQuote(
    inputTokenAddress,
    outputTokenAddress,
    activeInput === "sell" && sellValue !== "0" && sellValue !== ""
      ? formatValue(sellValue)
      : "0"
  );
  const {
    data: reverseSwapQuoteData,
    isLoading: isReverseSwapQuoteLoading,
  } = useSwapQuote(
    outputTokenAddress,
    inputTokenAddress,
    activeInput === "buy" && buyValue !== "0" && buyValue !== ""
      ? formatValue(buyValue)
      : "0"
  );
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(stock.hederaId);
  const { data: usdcBalance, isLoading: isUsdcBalanceLoading } =
    useTokenBalance(mockUSDCId);
  const { fontSize: sellFontSize, textRef: sellTextRef } = useDynamicFontSize({
    value: sellValue,
    maxFontSize: 48,
    minFontSize: 24,
  });
  const {
    swapExactTokensForTokensMutation,
    isSwapExactTokensForTokensPending,
    isSwapExactTokensForTokensSuccess,
  } = useSwapExactTokensForTokens();

  const { approveTokenMutation, isApproveTokenPending, isApproveTokenSuccess } =
    useApproveToken(inputTokenAddress);

  const { fontSize: buyFontSize, textRef: buyTextRef } = useDynamicFontSize({
    value: buyValue,
    maxFontSize: 48,
    minFontSize: 24,
  });

  const handleSellInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usdcAmount = e.target.value;
    setSellValue(usdcAmount);

    if (swapQuoteData && usdcAmount !== "0" && usdcAmount !== "") {
      setBuyValue(swapQuoteData.toFixed(6));
    } else {
      setBuyValue("0");
    }
  };

  useEffect(() => {
    if (
      swapQuoteData &&
      sellValue !== "0" &&
      sellValue !== "" &&
      activeInput === "sell"
    ) {
      setBuyValue(swapQuoteData.toFixed(6));
    }
  }, [swapQuoteData, sellValue, activeInput]);

  const handleBuyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stockAmount = e.target.value;
    setBuyValue(stockAmount);

    if (reverseSwapQuoteData && stockAmount !== "0" && stockAmount !== "") {
      setSellValue(reverseSwapQuoteData.toFixed(2));
    } else {
      setSellValue("0");
    }
  };

  useEffect(() => {
    if (
      reverseSwapQuoteData &&
      buyValue !== "0" &&
      buyValue !== "" &&
      activeInput === "buy"
    ) {
      setSellValue(reverseSwapQuoteData.toFixed(2));
    }
  }, [reverseSwapQuoteData, buyValue, activeInput]);

  useEffect(() => {
    if (isApproveTokenSuccess) {
      setIsApproved(true);
      toast.success(
        `${
          isFlipped ? stock.ticker : "USDC"
        } approved! Now click Swap to complete the transaction.`
      );
    }
  }, [isApproveTokenSuccess, isFlipped, stock.ticker]);

  useEffect(() => {
    setIsApproved(false);
  }, [sellValue, buyValue, isFlipped]);

  useEffect(() => {
    if (isSwapExactTokensForTokensSuccess) {
      toast.success(
        "Swap initiated! Please wait for the transaction to complete."
      );
    }
  }, [isSwapExactTokensForTokensSuccess]);

  const handleContinue = () => {
    if (!isApproved) {
      approveTokenMutation(BigInt(formatValue(sellValue)));
    } else {
      swapExactTokensForTokensMutation(
        BigInt(formatValue(sellValue)),
        BigInt(formatValue(buyValue)),
        [inputTokenAddress, outputTokenAddress]
      );
      setIsApproved(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <div className="relative">
        <div
          className={cn(
            "w-full h-[170px]  rounded-3xl p-4 cursor-pointer group flex flex-col justify-between",
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
                src={isFlipped ? stock.logo : usdcLogo}
                alt={isFlipped ? stock.name : "USDC"}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <div className="flex items-center">
                <p className="text-sm font-funnel-display font-light text-muted-foreground px-1">
                  {isFlipped ? stock.ticker : "USDC"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {isFlipped ? (
              isTokenBalanceLoading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  {(tokenBalance ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {stock.ticker}
                </p>
              )
            ) : isUsdcBalanceLoading ? (
              <Skeleton className="w-16 h-6" />
            ) : (
              <p className="text-sm font-funnel-display font-light text-muted-foreground">
                {(usdcBalance ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USDC
              </p>
            )}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="rounded-lg p-[3px] bg-background flex items-center justify-center">
            <div
              className="bg-foreground/5 rounded-lg h-12 w-12 flex items-center justify-center cursor-pointer transition-colors duration-200"
              onClick={() => {
                setIsFlipped(!isFlipped);
                // Swap the values when flipping
                const tempValue = sellValue;
                setSellValue(buyValue);
                setBuyValue(tempValue);
                setIsApproved(false);
              }}
            >
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
              onClick={() => !isFlipped && setShowTokenSelectModal(true)}
            >
              <Image
                src={isFlipped ? usdcLogo : stock.logo}
                alt={isFlipped ? "USDC" : stock.name}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <div className="flex items-center">
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  {isFlipped ? "USDC" : stock.ticker}
                </p>
                {!isFlipped && (
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-funnel-display font-light text-muted-foreground">
              KES{" "}
              {isFlipped
                ? (Number(buyValue) * stock.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : (Number(sellValue) * KES_USDC_EXCHANGE_RATE).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
            </p>
            {!isFlipped ? (
              isTokenBalanceLoading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  {(tokenBalance ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {stock.ticker}
                </p>
              )
            ) : isUsdcBalanceLoading ? (
              <Skeleton className="w-16 h-6" />
            ) : (
              <p className="text-sm font-funnel-display font-light text-muted-foreground">
                {(usdcBalance ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USDC
              </p>
            )}
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
            1 nh{stock.ticker} = 0.2 USDC
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
      {!isAuthenticated && (
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="border disabled:cursor-not-allowed flex items-center justify-center border-foreground/10 bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all font-funnel-display w-full mt-1 rounded-3xl p-4 gap-2 font-semibold"
        >
          Sign In
        </button>
      )}
      {isAuthenticated && status === "connected" && (
        <button
          onClick={handleContinue}
          className="border disabled:cursor-not-allowed flex items-center justify-center border-foreground/10 bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all font-funnel-display w-full mt-1 rounded-3xl p-4 gap-2 font-semibold"
          disabled={
            tradeAction === "buy" ||
            isSwapQuoteLoading ||
            isReverseSwapQuoteLoading ||
            isApproveTokenPending ||
            isSwapExactTokensForTokensPending
          }
        >
          {isSwapQuoteLoading ||
          isReverseSwapQuoteLoading ||
          isApproveTokenPending ||
          isSwapExactTokensForTokensPending ? (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          ) : isApproved ? (
            "Swap"
          ) : (
            `Approve ${isFlipped ? "nh" + stock.ticker : "USDC"}`
          )}
        </button>
      )}
      {status !== "connected" && (
        <div className="w-full mt-4 flex items-center justify-center">
          <p className="text-sm font-funnel-display text-muted-foreground">
            Please connect your wallet to continue.
          </p>
        </div>
      )}
      {showTokenSelectModal && (
        <TokenSelectModal
          setShowTokenSelectModal={setShowTokenSelectModal}
          stockId={stock.id}
        />
      )}
    </div>
  );
}

export default SwapTokens;
