import {
  institutionsUseCase,
  investorsUseCase,
  secondaryMarketUseCase,
} from "@/assets";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

function UseCase() {
  return (
    <div className="w-full mt-20 rounded-4xl bg-black text-white p-4">
      <h1 className="font-funnel-display font-bold text-2xl text-center mt-4">
        Use Cases
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
        <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-4 w-full md:w-1/3 h-[285px] flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={investorsUseCase}
              alt="Investors"
              width={72}
              height={72}
              className="rounded-full w-10 h-10"
            />
            <h1 className="font-funnel-display font-bold text-lg ">
              Investors
            </h1>
          </div>
          <p className="text-sm font-funnel-display text-gray-300 leading-relaxed">
            Institutions or high-net-worth individuals staking ≥10,000 KESY in
            NHX Vaults earn a stable yield from Kenyan Treasury Securities,
            tailored to those seeking passive income in a regulated environment.
          </p>
          <div className="w-full">
            <Button
              variant="outline"
              className="rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
            >
              Stake Now
            </Button>
          </div>
        </div>
        <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-4 w-full md:w-1/3 h-[285px] flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={institutionsUseCase}
              alt="Institutions"
              width={72}
              height={72}
              className="rounded-full w-10 h-10"
            />
            <h1 className="font-funnel-display font-bold text-lg text-gray-300">
              Institutions
            </h1>
          </div>
          <p className="text-sm font-funnel-display text-gray-300 leading-relaxed">
            KESY offers a locally pegged stablecoin for institutions to manage
            KES volatility, facilitate cross-border payments, and provide
            liquidity on exchanges or DeFi platforms like SaucerSwap
          </p>
          <div className="w-full">
            <button className="rounded-3xl py-1.5 bg-orange-500 hover:bg-orange-500/80 transition-all duration-300 ease-in border border-orange-500/20 text-black shadow-none text-sm w-full font-funnel-display">
              Acquire KESY
            </button>
          </div>
        </div>
        <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-4 w-full md:w-1/3 h-[285px] flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={secondaryMarketUseCase}
              alt="Secondary Markets"
              width={72}
              height={72}
              className="rounded-full w-10 h-10"
            />
            <h1 className="font-funnel-display font-bold text-lg text-gray-300">
              Markets
            </h1>
          </div>
          <p className="text-sm font-funnel-display text-gray-300 leading-relaxed">
            Individuals or smaller entities buying KESY on secondary markets
            (e.g., SaucerSwap) gain access to a liquid KES-pegged asset for
            trading or hedging, or arbitrage opportunities.
          </p>
          <div className="w-full">
            <Button
              variant="outline"
              className="rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
            >
              Buy KESY
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 ">
        <p className="text-sm font-funnel-display text-gray-300 leading-relaxed text-center mb-2">
          Don{`'`}t see your use case? Reach out to us.
        </p>
        <Button
          variant="outline"
          className="rounded-3xl bg-transparent hover:bg-transparent border border-white/20 text-white hover:text-white transition-all duration-300 ease-in shadow-none text-sm w-full font-funnel-display"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}

export default UseCase;
