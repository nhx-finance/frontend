"use client";
import React from "react";
import { institutionsUseCase, investorsUseCase } from "@/assets";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";

function Footer() {
  return (
    <div className="flex flex-col items-center lg:flex-row mt-10 gap-4">
      <div className="flex flex-col-reverse lg:flex-row gap-2 border border-foreground/20 rounded-3xl p-4 w-full lg:w-1/2">
        <Image
          src={institutionsUseCase}
          alt="Institutions Use Case"
          width={300}
          height={300}
          className=" w-full lg:w-48 mt-4 lg:mt-0 h-48 object-cover rounded-3xl"
        />
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-xl font-bold font-funnel-display">
              Sandbox API
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-funnel-display">
              Use the sandbox API to test your integration on our sample app
              before going live.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => toast.info("Stay tuned, Sandbox coming soon")}
            className="rounded-3xl mt-2 lg:mt-0 bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
          >
            Get API Key
          </Button>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-2 border border-foreground/20 rounded-3xl p-4 w-full lg:w-1/2">
        <Image
          src={investorsUseCase}
          alt="Institutions Use Case"
          width={300}
          height={300}
          className="w-full lg:w-48 mt-4 lg:mt-0 h-48 object-cover rounded-3xl"
        />
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-xl font-bold font-funnel-display">
              Documentation
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-funnel-display">
              Get to understand KESY product by following our documentation
              guides
            </p>
          </div>
          <a
            href="https://nhx-finance.gitbook.io/nhx-finance-docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-3xl mt-2 lg:mt-0 bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
            >
              Read Docs
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
