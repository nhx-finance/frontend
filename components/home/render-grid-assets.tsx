import React from "react";
import GridAsset from "./grid-asset";
import { stocks } from "@/mocks/stocks";

function GridView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <GridAsset key={stock.id} stock={stock} />
      ))}
    </div>
  );
}

export default GridView;
