import { avaxNetwork, ethereumNetwork, polNetwwork } from "@/assets";
import React from "react";
import Image from "next/image";
import { bg } from "date-fns/locale";

const chains = [
  {
    name: "Ethereum Sepolia",
    logo: ethereumNetwork,
    bg: "bg-black",
  },
  {
    name: "Polygon Mumbai",
    logo: polNetwwork,
    bg: "bg-white",
  },
  {
    name: "Avalanche Fuji",
    logo: avaxNetwork,
    bg: "bg-white",
  },
];

function BridgedChains() {
  return (
    <div className="flex items-center">
      {chains.map((chain) => (
        <Image
          key={chain.name}
          src={chain.logo}
          alt={chain.name}
          width={25}
          height={25}
          className={`${chain.bg} border -mr-2 rounded-full border-foreground/10 p-1`}
        />
      ))}
    </div>
  );
}

export default BridgedChains;
