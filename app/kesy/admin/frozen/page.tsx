"use client";
import React from "react";
import AdminNavbar from "../dashboard/navbar";
import {
  useFrozenAccounts,
  useTotalFrozenBalance,
} from "@/hooks/kesy/useCompliance";
import { Loader2 } from "lucide-react";
import FrozenAccount from "../manage/FrozenAccount";
import Link from "next/link";

function FrozenAccountsPage() {
  const { data: frozenAccounts, isLoading: isFrozenAccountsLoading } =
    useFrozenAccounts();
  const { data: totalFrozenBalance, isLoading: isTotalFrozenBalanceLoading } =
    useTotalFrozenBalance();
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <AdminNavbar />
      <Link
        href="/kesy/admin/manage"
        className="text-sm font-funnel-display text-foreground/70 hover:underline mt-4 inline-block"
      >
        &larr; Back to Manage Dashboard
      </Link>
      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-lg font-semibold font-funnel-display">
          Frozen/Wiped Accounts
        </h1>
        {isFrozenAccountsLoading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          <div className="">
            {frozenAccounts && frozenAccounts.length === 0 && (
              <p className="text-sm mt-6 font-semibold font-funnel-display text-muted-foreground text-center">
                No frozen or wiped accounts.
              </p>
            )}
            {frozenAccounts && frozenAccounts.length !== 0 && (
              <div className="flex flex-col gap-2">
                {frozenAccounts.map((account) => (
                  <FrozenAccount key={account.accountId} {...account} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-center text-[11px] font-funnel-display text-muted-foreground font-semibold">
          {totalFrozenBalance &&
            totalFrozenBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
          KESY Frozen from {frozenAccounts?.length || 0} accounts
        </p>
      </div>
    </div>
  );
}

export default FrozenAccountsPage;
