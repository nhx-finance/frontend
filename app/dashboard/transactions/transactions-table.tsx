"use client";
import React, { useState } from "react";
import { useAccountActivity } from "@/hooks/use-account-activity";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import CustomConnectButton from "@/components/ui/connect-button";
import {
  BadgeCheck,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTokenImage, getTokenTicker } from "@/mocks/stocks";
import { Button } from "@/components/ui/button";

function formatValue(value: string) {
  const numberValue = Number(value) / 1000000;

  return numberValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatHbarValue(value: string) {
  const numberValue = Number(value) / 100000000;
  return numberValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function convertHbarToUsd(value: string): number {
  const numberValue = Number(value) / 100000000;
  return numberValue * 0.1936;
}

function TransactionTable() {
  const walletStatus = useActiveWalletConnectionStatus();
  const [limit, setLimit] = useState(10);
  const { data: txns, isLoading, error } = useAccountActivity(limit);

  if (walletStatus !== "connected") {
    return (
      <div className="px-4 mt-4 flex flex-col justify-center items-center h-full">
        <p className="font-funnel-display text-center text-sm text-muted-foreground">
          Please connect your wallet to view transactions
        </p>
        <CustomConnectButton />
      </div>
    );
  }

  if (!txns || txns?.length === 0) {
    return (
      <div className="px-4 mt-4">
        <h1 className="">No transactions found</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 mt-4">
        <h1 className="">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 mt-4">
        <h1 className="">Error: {error.message}</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="px-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {txns.map((txn) => (
          <div key={txn.transaction_hash} className="p-4 border rounded-3xl">
            <div className="flex items-center justify-between my-2">
              <div className="">
                <h2 className="text-sm font-funnel-display font-semibold">
                  {txn.name}
                </h2>
                <Link
                  href={`https://hashscan.io/testnet/transaction/${txn.transaction_id}`}
                  target="_blank"
                  className="text-sm hover:text-orange-500 transition-all duration-300 font-funnel-display flex items-center text-muted-foreground"
                >
                  {txn.transaction_id.slice(0, 6)}...
                  {txn.transaction_id.slice(-4)}
                  <ExternalLink className="w-3 h-3 ml-1 text-muted-foreground" />
                </Link>
              </div>
              <div className="">
                <p className="text-sm text-muted-foreground">
                  {txn.result === "SUCCESS" ? (
                    <BadgeCheck className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </p>
              </div>
            </div>
            {txn.name === "CRYPTOTRANSFER" && (
              <div className="mt-2">
                <Link
                  href={`https://hashscan.io/testnet/token/${txn.token_transfers[0].token_id}`}
                  target="_blank"
                  className="flex items-center justify-between my-2"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={getTokenImage(txn.token_transfers[0].token_id)}
                      alt={txn.token_transfers[0].token_id}
                      width={24}
                      height={24}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-funnel-display font-semibold">
                      {getTokenTicker(txn.token_transfers[0].token_id)}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-funnel-display font-bold ${
                      txn.token_transfers[0].amount > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {txn.token_transfers[0].amount > 0 ? "+" : ""}
                    {formatValue(txn.token_transfers[0].amount.toString())}
                  </p>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm font-funnel-display">
                    {txn.token_transfers[0].account}
                  </p>
                  <div>
                    {txn.token_transfers[0].amount > 0 ? (
                      <ChevronsLeft className="w-4 h-4 text-green-500" />
                    ) : (
                      <ChevronsRight className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm font-funnel-display">
                    {txn.token_transfers[1].account}
                  </p>
                </div>
              </div>
            )}
            {txn.name !== "CRYPTOTRANSFER" && (
              <div className="mt-2">
                <div className="flex items-center justify-between w-full  border-b border-dashed border-foreground/10 pb-2">
                  <p className="text-sm font-funnel-display">Fee</p>
                  <p className="text-sm font-funnel-display">
                    {formatHbarValue(txn.charged_tx_fee.toString())}ℏ
                    <span className="text-xs text-muted-foreground">
                      (
                      {convertHbarToUsd(txn.charged_tx_fee.toString()).toFixed(
                        2
                      )}{" "}
                      USD)
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between w-full mt-1 border-b border-dashed border-foreground/10 pb-2">
                  <p className="text-sm font-funnel-display">Consensus At</p>
                  <p className="text-sm font-funnel-display">
                    {new Date(
                      Number(txn.consensus_timestamp) * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 my-8">
        <Button onClick={() => setLimit(limit + 10)} className="">
          Load More
        </Button>
      </div>
    </div>
  );
}

export default TransactionTable;
