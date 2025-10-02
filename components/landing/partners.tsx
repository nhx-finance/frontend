"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { nse, hashgraph, hedera } from "@/assets";

export function Partners() {
  return (
    <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={partners} direction="left" speed="slow" />
    </div>
  );
}

const partners = [
  {
    image: nse,
    title: "Nairobi Securities Exchange",
  },
  {
    image: hashgraph,
    title: "Hashgraph Association",
  },
  {
    image: hedera,
    title: "Hedera",
  },
];
