"use client";
import React from "react";
import PortfolioCard from "./portfolio-card";
import AssetAllocation from "./asset-allocation";
import { PortfolioChart } from "./portfolio-chart";
import { useAuth } from "@/hooks/use-auth";
import CustomConnectButton from "../ui/connect-button";

function AccountInfo() {
  const { walletConnected } = useAuth();

  if (!walletConnected) {
    return (
      <div className="mt-4 mx-2 px-2 flex flex-col items-center justify-center h-[200px] border border-foreground/20 rounded-3xl">
        <h1 className="text-base font-funnel-display mb-4">
          Connect your wallet to view your account
        </h1>
        <CustomConnectButton />
      </div>
    );
  }
  return (
    <div className="mt-4 px-2 flex flex-col gap-4 md:flex-row justify-between">
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <PortfolioCard />
        <AssetAllocation />
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <PortfolioChart />
      </div>
    </div>
  );
}

export default AccountInfo;
