"use client";

import React from "react";
import { motion } from "motion/react";
import bgImage from "@/public/bg.png";
import CustomConnectButton from "@/components/ui/connect-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { nhxmmf } from "@/assets";
import Link from "next/link";
import Image from "next/image";
import BridgeCard from "./bridge-card";
import Stats from "./stats";

function BridgePage() {
  return (
    <div>
      <div className="relative font-funnel-display min-h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(20px) brightness(0.6)",
          }}
          animate={{
            scale: [1.1, 1.2, 1.15, 1.1],
            x: [0, 15, -10, 0],
            y: [0, -10, 12, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-background/40" />

        <div className="relative z-10 flex flex-col items-center w-full min-h-screen">
          <div className="w-full flex items-center justify-between px-4 mt-4 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-1">
              <Image src={nhxmmf} alt="logo" width={40} height={40} />
              <h1 className="text-2xl font-medieval-sharp font-semibold text-foreground">
                KESY
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <CustomConnectButton />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pb-12">
            <div className="">
              <h1 className="text-3xl mb-2 font-funnel-display md:text-5xl font-bold text-center">
                Bridge anytime, anywhere.
              </h1>
              <p className="text-sm text-muted-foreground">
                Seamlessly transfer your KESY tokens across multiple blockchains
                and unlock a world of DeFi opportunities.
              </p>
            </div>
            <BridgeCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BridgePage;
