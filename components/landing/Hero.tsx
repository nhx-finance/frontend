import React from "react";
import { fin1, logo } from "@/assets";
import Image from "next/image";
import ColourfulText from "../ui/colourful-text";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Partners } from "./partners";
import { Stocks } from "./stocks";
import { YieldProducts } from "./yield-products";
import CustomConnectButton from "../ui/connect-button";
import Link from "next/link";

function Hero() {
  return (
    <div className="w-full md:h-[95vh] flex flex-col md:flex-row items-center justify-between p-2">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
        <div className="w-full flex items-center justify-between px-4 md:mt-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="text-3xl font-medieval-sharp font-bold text-foreground">
              NHX
            </h1>
          </div>
          <ThemeToggle />
        </div>
        <div className="w-full xl:w-[70%] mt-12 md:mt-0">
          <h1 className="text-4xl text-center xl:text-left xl:text-6xl font-funnel-display font-bold text-foreground">
            Welcome to Africa{"'"}s Inclusive Finance{" "}
            <ColourfulText text="Bridge" />
          </h1>
          <p className="text-muted-foreground text-lg font-funnel-display text-balance mt-4 text-center xl:text-left">
            At NHX our mission is lowering entry barriers for retail investors,
            enabling 24/5 with global tradability, compounded returns, and
            diversification.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 gap-4">
            <Button className="bg-foreground hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 h-12 w-full md:w-1/2">
              <span className="text-lg font-funnel-display font-semibold text-background">
                Learn More
              </span>
            </Button>
            <Button
              variant="ghost"
              className="bg-transparent ease-in transition-all duration-300 h-12 w-full md:w-1/2"
            >
              <span className="text-lg font-funnel-display font-semibold text-foreground">
                Read Whitepaper
              </span>
            </Button>
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <Partners />
        </div>
      </div>
      <div className="w-full md:w-1/2 md:h-full mt-8 md:mt-0">
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{
            backgroundImage: `url(${fin1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "30px",
          }}
        >
          <div className="hidden md:flex items-center justify-between w-full p-4 gap-2 ">
            <div className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground py-4 p-2 rounded-full">
              <h1 className="text-sm font-funnel-display font-bold text-background">
                Products
              </h1>
            </div>
            <div className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground py-4 p-2 rounded-full">
              <h1 className="text-sm font-funnel-display font-bold text-background">
                Resources
              </h1>
            </div>
            <CustomConnectButton />
            <Link
              href="/login"
              className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground py-4 p-2 rounded-full"
            >
              <h1 className="text-sm font-funnel-display font-bold text-background">
                Launch
              </h1>
            </Link>
          </div>
          <div className="w-full flex items-center justify-between p-4 gap-2 flex-col xl:flex-row">
            <div className="backdrop-blur-lg flex flex-col justify-between bg-foreground/10 border border-white/20 rounded-3xl p-4 w-full xl:w-1/2">
              <div className="">
                <h1 className="text-2xl text-white font-funnel-display font-semibold">
                  Tokenized Securities
                </h1>
                <h1 className="text-7xl font-medieval-sharp mt-4 font-bold text-white">
                  5
                </h1>
                <p className="text-base font-funnel-display font-normal text-white">
                  Exposure to five of the best performing NSE listed stocks
                </p>
              </div>
              <Stocks />
            </div>
            <div className="backdrop-blur-lg flex flex-col justify-between bg-foreground/10 border border-white/20 rounded-3xl p-4 w-full xl:w-1/2">
              <div className="mb-1">
                <h1 className="text-2xl text-white font-funnel-display font-semibold">
                  Yield Bearing Products
                </h1>
                <h1 className="text-7xl font-medieval-sharp mt-4 font-bold text-white">
                  4 - 8%
                </h1>
                <p className="text-base font-funnel-display font-normal text-white">
                  Offers yield from short term Treasury bills and money market
                  funds.
                </p>
              </div>
              <YieldProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
