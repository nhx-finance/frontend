import React from "react";
import { MovingStocks } from "./moving-stocks";
import { stocks } from "@/mocks/stocks";

function QuickMarketInfo() {
  return (
    <div>
      <MovingStocks items={stocks} />
    </div>
  );
}

export default QuickMarketInfo;
