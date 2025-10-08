import React from "react";
import Navbar from "@/components/home/navbar";
import QuickMarketInfo from "@/components/home/quick-market-info";
import Summaries from "@/components/home/summaries";
import Markets from "@/components/home/markets";

function page() {
  return (
    <div className="max-w-7xl mx-auto my-0">
      <Navbar />
      <QuickMarketInfo />
      <Summaries />
      <Markets />
    </div>
  );
}

export default page;
