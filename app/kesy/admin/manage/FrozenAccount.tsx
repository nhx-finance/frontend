'use client";';
import { Skeleton } from "@/components/ui/skeleton";
import { Account, useFrozenWalletBalance } from "@/hooks/kesy/useCompliance";
import { ShieldMinus, Snowflake } from "lucide-react";
import React from "react";

function FrozenAccount(props: Account) {
  const { data: balance, isLoading } = useFrozenWalletBalance(props.accountId);
  return (
    <div className="border-b border-foreground/10 border-dashed pb-2 flex items-center justify-between w-full">
      <div className="flex gap-1 items-center">
        {props.status === "frozen" ? (
          <Snowflake className="text-blue-500" />
        ) : (
          <ShieldMinus className="text-red-500" />
        )}
        <div className="">
          <p className="text-sm font-funnel-display">{props.accountId}</p>
          <p className="text-xs font-funnel-display text-foreground/70">
            {new Date(props.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="w-16 h-6" />
      ) : (
        <div className="flex flex-col items-end">
          <p className="text-sm font-funnel-display text-foreground/70">
            {balance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0.00"}{" "}
            KESY
          </p>
          <p className="text-xs font-funnel-display text-muted-foreground">
            Balance
          </p>
        </div>
      )}
    </div>
  );
}

export default FrozenAccount;
