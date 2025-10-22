"use client";
import Navbar from "@/components/home/navbar";
import React from "react";
import { kesyHero, kesy, kesyReports, kesyYield } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ColourfulText from "@/components/ui/colourful-text";
import { useRouter } from "next/navigation";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandTwitter,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { StatsCard } from "@/components/kesy/stats";

function page() {
  const router = useRouter();
  return (
    <div className="">
      <div className="relative flex h-screen w-full">
        <Image
          src={kesyHero}
          alt="KESY Hero"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover blur-[2px] opacity-90"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4">
          <div className="w-full flex items-center justify-center h-full">
            <div className="w-full md:max-w-3xl flex items-center flex-col justify-center">
              <h1 className="text-4xl text-center xl:text-left xl:text-6xl font-funnel-display font-bold text-[#F5F5F5]">
                The Future of Business is default{" "}
                <ColourfulText text="Global" />
              </h1>
              <p className="text-gray-300 text-xl font-funnel-display text-balance mt-4 text-center xl:text-left">
                With our stablecoin infrastructure, your business doesn’t need
                to think locally — it’s global from the start
              </p>
              <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 gap-4">
                <Button
                  className="bg-foreground hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 h-12 w-full md:w-1/2"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <span className="text-lg font-funnel-display font-semibold text-background">
                    Get Started
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="bg-transparent ease-in transition-all group rounded-3xl cursor-pointer hover:bg-transparent duration-300 h-12 w-full md:w-1/2"
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  <span className="text-lg font-funnel-display group-hover:underline font-semibold text-white transition-all duration-300 ease-in">
                    Learn How It Works
                  </span>
                </Button>
              </div>
              <div className="w-full flex items-center justify-center gap-4 mt-12">
                <Link href="https://github.com/nhx-finance">
                  <IconBrandGithub
                    size={36}
                    className="cursor-pointer hover:text-orange-500 transition-all duration-300 ease-in text-gray-300"
                  />
                </Link>
                <Link href="https://twitter.com/nhx-finance">
                  <IconBrandTwitter
                    size={36}
                    className="cursor-pointer hover:text-orange-500 transition-all duration-300 ease-in text-gray-300"
                  />
                </Link>
                <Link href="https://discord.com/nhx-finance">
                  <IconBrandDiscord
                    size={36}
                    className="cursor-pointer hover:text-orange-500 transition-all duration-300 ease-in text-gray-300"
                  />
                </Link>
                <Link href="https://telegram.com/nhx-finance">
                  <IconBrandTelegram
                    size={36}
                    className="cursor-pointer hover:text-orange-500 transition-all duration-300 ease-in text-gray-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 mt-20 mb-10">
        <div className="w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-funnel-display font-bold text-center max-w-3xl">
              Unlock Stablecoin Yield and Seamless Interoperability with{" "}
              <span className="text-orange-500 font-medieval-sharp">KESY</span>
            </h2>
            <p className="text-muted-foreground text-sm font-funnel-display text-center max-w-3xl mt-4">
              Navigating the Future of Global Business with Stability and
              Transparency
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full">
            <div className="w-full flex flex-col justify-between bg-foreground/5 border border-foreground/20 rounded-3xl p-4 gap-2 h-[320px]">
              <h3 className="font-funnel-display font-bold">
                Stablecoin Earnings
              </h3>
              <div className="w-full flex items-center justify-center flex-col">
                <Image
                  src={kesy}
                  alt="KESY"
                  width={28}
                  height={28}
                  className="rounded-full h-18 w-18 object-cover border border-foreground/20"
                />
              </div>
              <p className="text-sm font-funnel-display text-muted-foreground leading-relaxed mt-2">
                KESY tokens are pioneering yield-bearing stablecoins in the
                Kenyan market, offering holders a unique investment opportunity.
              </p>
              <div className="w-full flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  className="rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm w-1/2 font-funnel-display"
                >
                  Buy KESY
                </Button>
                <Button
                  variant="outline"
                  className="rounded-3xl bg-foreground text-white border border-foreground/20 font-funnel-display w-1/2 shadow-none"
                >
                  Mint KESY
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-col justify-between bg-foreground/5 border border-foreground/20 rounded-3xl p-4 gap-2 h-[320px]">
              <h3 className="font-funnel-display font-bold">
                Backed & Transparent
              </h3>
              <div className="w-full flex items-center justify-center flex-col">
                <Image
                  src={kesyReports}
                  alt="KESY"
                  width={280}
                  height={280}
                  className="rounded-3xl w-full object-contain border border-foreground/20"
                />
              </div>
              <p className="text-sm font-funnel-display text-muted-foreground leading-relaxed mt-2">
                Fully backed by Kenyan Treasury Securities and are transparently
                audited by a third party.
              </p>
              <div className="w-full">
                <Button
                  variant="outline"
                  className="rounded-3xl bg-background w-full border border-foreground/20 text-foreground shadow-none text-sm font-funnel-display"
                >
                  View Reports
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-col justify-between bg-foreground border border-foreground/20 rounded-3xl p-4 gap-2 h-[320px]">
              <h3 className="font-funnel-display font-bold text-orange-500">
                Earn Yield on Your Stablecoin
              </h3>
              <div className="w-full flex items-center justify-center flex-col">
                <Image
                  src={kesyYield}
                  alt="KESY"
                  width={280}
                  height={280}
                  className="rounded-3xl w-full object-contain border border-orange-500/20"
                />
              </div>
              <p className="text-sm font-funnel-display text-gray-300 dark:text-gray-600 leading-relaxed mt-2">
                Holding KESY tokens gives you access to a risk free yield from
                Kenyan Treasury Securities.
              </p>
              <div className="w-full">
                <button className="rounded-3xl py-2 px-4 flex items-center justify-between bg-transparent text-orange-500 w-full border border-orange-500 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300 ease-in shadow-none text-sm font-funnel-display">
                  View Yield Reports
                  <IconArrowRight className="w-4 h-4" color="orange" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-12 mb-10">
          <StatsCard />
        </div>
      </div>
    </div>
  );
}

export default page;
