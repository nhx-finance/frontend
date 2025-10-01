import React from "react";
import { fin1, fin2, fin3, fin4, logo } from "@/assets";
import Image from "next/image";
import ColourfulText from "../ui/colourful-text";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Partners } from "./partners";

function Hero() {
  return (
    <div className="w-full md:h-[95vh] flex flex-col md:flex-row items-center justify-between p-2">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
        <div className="w-full flex items-center justify-between px-4 md:mt-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="text-3xl font-barlow font-bold text-foreground">
              NHX
            </h1>
          </div>
          <ThemeToggle />
        </div>
        <div className="w-full md:w-[70%] mt-12 md:mt-0">
          <h1 className="text-5xl text-center md:text-left md:text-6xl font-barlow font-bold text-foreground">
            Welcome to Africa{"'"}s Inclusive Finance{" "}
            <ColourfulText text="Bridge" />
          </h1>
          <p className="text-muted-foreground text-xl font-barlow text-balance mt-4 text-center md:text-left">
            At NHX our mission is lowering entry barriers for retail investors,
            enabling 24/7 tradability, compounded returns, and diversification.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 gap-4">
            <Button className="bg-foreground hover:bg-foreground/80 ease-in transition-all duration-300 h-12 w-full md:w-1/2">
              <span className="text-lg font-barlow font-semibold text-background">
                Learn More
              </span>
            </Button>
            <Button
              variant="ghost"
              className="bg-transparent ease-in transition-all duration-300 h-12 w-full md:w-1/2"
            >
              <span className="text-lg font-barlow font-semibold text-foreground">
                Read Whitepaper
              </span>
            </Button>
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <h1 className="text-lg md:text-2xl font-barlow font-bold text-foreground">
            Partners
          </h1>
          <Partners />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[500px] md:h-full mt-8 md:mt-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${fin4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "30px",
          }}
        >
          <div className="hidden md:flex items-center justify-between w-full p-4 gap-2 ">
            <div className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground p-2 rounded-full">
              <h1 className="text-sm font-barlow font-bold text-background">
                Products
              </h1>
            </div>
            <div className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground p-2 rounded-full">
              <h1 className="text-sm font-barlow font-bold text-background">
                Resources
              </h1>
            </div>
            <div className="flex cursor-pointer hover:bg-background/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-background p-2 rounded-full">
              <h1 className="text-sm font-barlow font-bold text-foreground">
                Connect
              </h1>
            </div>
            <div className="flex cursor-pointer hover:bg-foreground/80 ease-in transition-all duration-300 w-[25%] items-center justify-center bg-foreground p-2 rounded-full">
              <h1 className="text-sm font-barlow font-bold text-background">
                Launch
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
