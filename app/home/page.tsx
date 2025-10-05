import React from "react";
import Navbar from "@/components/home/navbar";
import AccountInfo from "@/components/home/account-info";
import QuickMarketInfo from "@/components/home/quick-market-info";

function page() {
  return (
    <div className="max-w-7xl mx-auto my-0">
      <Navbar />
      <QuickMarketInfo />
      <AccountInfo />
    </div>
  );
}

export default page;
