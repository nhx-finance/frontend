"use client";
import React from "react";
import AdminNavbar from "./navbar";
import { IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import MintsTable from "./mints";
import {
  useSettledTransactions,
  useTransactions,
} from "@/hooks/kesy/useTransactions";
import {
  useTokenBalances,
  useTokenDetails,
} from "@/hooks/kesy/useTokenDetails";
import { Skeleton } from "@/components/ui/skeleton";

export function getDate() {
  const date = new Date();
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return {
    dayOfWeek,
    day,
    month,
    year,
  };
}

function AdminDashboardPage() {
  const { data: transactions } = useTransactions("admin");
  const { data: settledTransactions, isLoading: isSettledTransactionsLoading } =
    useSettledTransactions();
  const { dayOfWeek, day, month, year } = getDate();
  const { data: tokenDetails, isLoading: isTokenDetailsLoading } =
    useTokenDetails();
  const { data: tokenBalances, isLoading: isTokenBalancesLoading } =
    useTokenBalances();
  return (
    <div className="max-w-7xl mx-auto px-1 md:px-4">
      <AdminNavbar />
      <div className="flex flex-col md:flex-row justify-between mt-16 gap-4">
        <div className="flex items-center justify-between w-full md:w-1/2">
          <div className="">
            <h1 className="text-2xl font-semibold font-funnel-display">
              Hi Sylus, Need Help?
            </h1>
            <input
              placeholder="Ask me anything..."
              className="border-none font-funnel-display shadow-none font-semibold focus:outline-none text-2xl placeholder:text-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 mt-1"
              type="text"
            />
          </div>
          <div className="border border-foreground/20 rounded-full bg-background p-4 cursor-pointer">
            <IconSearch size={24} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="border border-foreground/20 rounded-full flex items-center justify-center w-16 h-16 bg-background p-4 cursor-pointer">
              <p className="font-funnel-display font-bold text-2xl">{day}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-funnel-display">{dayOfWeek},</p>
              <p className="text-sm font-funnel-display">
                {month} {year}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-3xl bg-[#000] text-white font-funnel-display shadow-none"
          >
            Get Review
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <div className="w-full flex flex-col xl:flex-row gap-4">
          <div className="w-full xl:w-1/2 bg-background rounded-3xl border border-foreground/20 p-4">
            {isTokenDetailsLoading ? (
              <div className="flex items-center justify-center">
                <Skeleton className="w-full h-48 rounded-3xl" />
              </div>
            ) : (
              <>
                <h1 className="text-sm text-muted-foreground font-funnel-display">
                  Circulating Supply
                </h1>
                <p className="text-2xl font-funnel-display font-semibold mt-4">
                  KESY {tokenDetails?.total_supply ?? 0}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-funnel-display text-muted-foreground">
                      Token ID
                    </p>
                    <p className="font-funnel-display font-semibold">
                      {tokenDetails?.token_id ?? 0}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-funnel-display text-muted-foreground">
                      Holders
                    </p>
                    <p className="font-funnel-display font-semibold">
                      {tokenBalances?.balances.length ?? 0}
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-sm font-funnel-display text-muted-foreground">
                      Total Mints
                    </p>
                    <div className="font-funnel-display font-semibold">
                      {isSettledTransactionsLoading ? (
                        <Skeleton className="w-10 h-4 rounded-full" />
                      ) : (
                        settledTransactions.length
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="w-full xl:w-1/2 bg-background rounded-3xl border border-foreground/20 p-4">
            <h1 className="text-sm text-muted-foreground font-funnel-display">
              Reserve Balance(T-Bills)
            </h1>
            <p className="text-2xl font-funnel-display font-semibold mt-4">
              KES 15,050,000.87
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display text-muted-foreground">
                  OV Ratio (%)
                </p>
                <p className="font-funnel-display font-semibold">105%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display text-muted-foreground">
                  Fees Collected
                </p>
                <p className="font-funnel-display font-semibold">KES 720K</p>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-sm font-funnel-display text-muted-foreground">
                  APY
                </p>
                <p className="font-funnel-display font-semibold">9.56%</p>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-1/2 bg-background rounded-3xl border border-foreground/20 p-4">
            <h1 className="text-sm text-muted-foreground font-funnel-display">
              Interest Earned
            </h1>
            <p className="text-2xl font-funnel-display font-semibold mt-4">
              KES 5,050,456.00
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display text-muted-foreground">
                  Upcoming Payouts
                </p>
                <p className="font-funnel-display font-semibold">KES 560K</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-funnel-display text-muted-foreground">
                  Unlock Date
                </p>
                <p className="font-funnel-display font-semibold">
                  Nov 5th 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MintsTable />
    </div>
  );
}

export default AdminDashboardPage;
