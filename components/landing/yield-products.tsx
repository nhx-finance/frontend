import React from "react";
import { kesy, nhxmmf } from "@/assets";
import Image from "next/image";

const yieldProducts = [
  {
    id: 1,
    name: "KESY",
    description: "Kenyan Shilling Stablecoin Yield",
    designation: "Stablecoin",
    image: kesy,
    image2: nhxmmf,
  },
  {
    id: 2,
    name: "NHX-MMF",
    description: "NHX Money Market Fund Yield",
    designation: "Money Market Fund",
    image: nhxmmf,
    image2: kesy,
  },
];

export function YieldProducts() {
  return (
    <div className="flex flex-col items-start justify-between mt-4 w-full gap-2">
      {yieldProducts.map((product) => (
        <div
          key={product.id}
          className="border border-white/20 rounded-3xl px-4 py-2 w-full flex gap-1"
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-white text-sm font-funnel-display font-semibold">
              {product.name}
            </h1>
            <p className="text-white/50 text-xs font-funnel-display font-normal">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
