"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { eqty, kcb, kegn, scom, hafr } from "@/assets";
const stocks = [
  {
    id: 1,
    name: "KCB",
    designation: "Banking",
    image: kcb,
  },
  {
    id: 2,
    name: "SCOM",
    designation: "Telecommunications",
    image: scom,
  },
  {
    id: 4,
    name: "Equity Group Holdings",
    designation: "Insurance",
    image: eqty,
  },
  {
    id: 5,
    name: "Kenya Electricity Generating Company",
    designation: "Energy",
    image: kegn,
  },
  {
    id: 6,
    name: "Home Afrika",
    designation: "Real Estate",
    image: hafr,
  },
];

export function Stocks() {
  return (
    <div className="flex flex-row items-start justify-center w-full my-8">
      <AnimatedTooltip items={stocks} />
    </div>
  );
}
