import React from "react";
import Navbar from "@/components/home/navbar";
import AccountInfo from "@/components/home/account-info";
import QuickMarketInfo from "@/components/home/quick-market-info";
import Summaries from "@/components/home/summaries";
import Markets from "@/components/home/markets";

function page() {
  return (
    <div className="max-w-7xl mx-auto my-0">
      <Navbar />
      <QuickMarketInfo />
      <AccountInfo />
      <Summaries />
      <Markets />
    </div>
  );
}

export default page;
