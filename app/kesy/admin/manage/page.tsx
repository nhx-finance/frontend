"use client";

import React from "react";
import AdminNavbar from "../dashboard/navbar";
import Image from "next/image";
import Link from "next/link";
import { ActionTabs } from "./ActionTabs";
import {
  useFrozenAccounts,
  useTotalFrozenBalance,
} from "@/hooks/kesy/useCompliance";
import { Loader2 } from "lucide-react";
import FrozenAccount from "./FrozenAccount";

function ManageDashboard() {
  const { data: frozenAccounts, isLoading: isFrozenAccountsLoading } =
    useFrozenAccounts();
  const { data: totalFrozenBalance, isLoading: isTotalFrozenBalanceLoading } =
    useTotalFrozenBalance();
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <AdminNavbar />
      <div className="mt-4">
        <h1 className="text-2xl font-semibold font-funnel-display">
          Manage Stablecoin
        </h1>
        <p className="text-sm font-funnel-display text-foreground/70 mt-1">
          Configure KESY compliance settings
        </p>
      </div>
      <div className="flex items-center md:items-stretch justify-between mt-6 md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="border flex flex-col justify-between border-foreground/10 rounded-3xl h-60 p-4 w-full md:w-1/2">
              <div className="flex items-center justify-between">
                <p className="font-semibold font-funnel-display">
                  Frozen Accounts
                </p>
                <Link
                  href="/kesy/admin/frozen"
                  className="text-sm font-funnel-display text-foreground/70 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/frozen.png"
                  alt="Frozen Accounts"
                  width={200}
                  height={100}
                  className=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src="/nhx-logo.png"
                    alt="Frozen Accounts"
                    width={35}
                    height={35}
                    className="border rounded-full border-foreground/30"
                  />
                  <div className="">
                    <p className="text-sm font-funnel-display">
                      {isTotalFrozenBalanceLoading ? (
                        <Loader2 className="animate-spin w-4 h-4 inline" />
                      ) : (
                        `${
                          totalFrozenBalance?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "0.00"
                        } KESY`
                      )}
                    </p>
                    <p className="text-xs font-funnel-display text-foreground/70">
                      $
                      {((totalFrozenBalance || 0) * 0.0875).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-funnel-display text-foreground/70">
                  {frozenAccounts?.length || "No frozen"} Account
                  {frozenAccounts && frozenAccounts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="border flex flex-col justify-between border-foreground/10 rounded-3xl h-60 p-4 w-full md:w-1/2">
              <div className="flex items-center justify-between">
                <p className="font-semibold font-funnel-display">
                  Bridged KESY
                </p>
                <Link
                  href="/kesy/admin/bridge"
                  className="text-sm font-funnel-display text-foreground/70 hover:underline"
                >
                  Manage
                </Link>
              </div>
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/bridge.png"
                  alt="Bridged KESY"
                  width={200}
                  height={100}
                  className=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src="/nhx-logo.png"
                    alt="Bridged KESY"
                    width={35}
                    height={35}
                    className="border rounded-full border-foreground/30"
                  />
                  <div className="">
                    <p className="text-sm font-funnel-display">
                      40,905.89 KESY
                    </p>
                    <p className="text-xs font-funnel-display text-foreground/70">
                      $3,568.92
                    </p>
                  </div>
                </div>
                <p className="text-sm font-funnel-display text-foreground/70">
                  2 Chains
                </p>
              </div>
            </div>
          </div>
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
                    {frozenAccounts.slice(0, 5).map((account) => (
                      <FrozenAccount key={account.accountId} {...account} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className=" grow md:self-stretch font-funnel-display mt-6 md:mt-0 rounded-3xl w-full md:w-1/2">
          <ActionTabs />
        </div>
      </div>
    </div>
  );
}

export default ManageDashboard;
