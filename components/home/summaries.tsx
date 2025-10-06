import React from "react";
import Summary from "./summary";
import { stocks } from "@/mocks/stocks";

function Summaries() {
  return (
    <div className="mt-8 flex flex-col px-2 gap-8 xl:flex-row justify-between items-center">
      <Summary title="Newly Listed" stocks={stocks} />
      <Summary title="Trending" stocks={stocks} />
      <Summary title="Gainers" stocks={stocks} />
    </div>
  );
}

export default Summaries;
