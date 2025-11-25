"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { nse, hedera } from "@/assets";

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
    image: hedera,
    title: "Hedera DLT",
  },
];
