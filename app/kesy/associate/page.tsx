import React from "react";
import Link from "next/link";
import Image from "next/image";
import { nhxmmf } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import CustomConnectButton from "@/components/ui/connect-button";
import Associate from "@/components/kesy/associate";

function page() {
  return (
    <div className="w-full flex flex-col items-center justify-between max-w-7xl mx-auto px-4 h-screen ">
      <div className="w-full flex items-center justify-between mt-2">
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
      <div className="w-full mt-10 flex flex-col items-center justify-center md:max-w-xl">
        <h1 className="text-4xl font-funnel-display text-foreground">
          KESY Token Association
        </h1>
        <p className="text-base text-muted-foreground font-funnel-display md:text-center text-left mt-2">
          Associating your wallet with the KESY Stablecoin will allow you to
          receive KESY directly to your wallet.
        </p>
        <Associate />
      </div>
      <div className="w-full mt-10 flex flex-col md:flex-row items-center justify-between md:max-w-xl mb-4 gap-4">
        <div className="flex md:flex-col flex-row-reverse justify-between items-start w-full">
          <h2 className="flex flex-col font-semibold font-funnel-display text-foreground">
            100,000,000 KESY
            <span className="text-xs text-muted-foreground font-funnel-display">
              ($1,000,000)
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-funnel-display text-center mt-2">
            Total Supply
          </p>
        </div>
        <div className="flex md:flex-col flex-row-reverse justify-between items-start w-full">
          <h2 className="flex flex-col font-semibold font-funnel-display text-foreground">
            100,000,000 KES{" "}
            <span className="text-xs text-muted-foreground font-funnel-display">
              ($1,000,000)
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-funnel-display text-center mt-2">
            Reserve Amount
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
