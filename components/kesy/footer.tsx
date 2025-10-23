import React from "react";
import { institutionsUseCase, investorsUseCase } from "@/assets";
import Image from "next/image";
import { Button } from "../ui/button";

function Footer() {
  return (
    <div className="flex flex-col items-center md:flex-row mt-10 gap-4">
      <div className="flex gap-2 border border-foreground/20 rounded-3xl p-4 w-full md:w-1/2">
        <Image
          src={institutionsUseCase}
          alt="Institutions Use Case"
          width={300}
          height={300}
          className="w-48 h-48 object-cover rounded-3xl"
        />
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Sandbox API</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Use the sandbox API to test your integration on our sample app
              before going live.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
          >
            Get API Key
          </Button>
        </div>
      </div>
      <div className="flex gap-2 border border-foreground/20 rounded-3xl p-4 w-full md:w-1/2">
        <Image
          src={investorsUseCase}
          alt="Institutions Use Case"
          width={300}
          height={300}
          className="w-48 h-48 object-cover rounded-3xl"
        />
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Documentation</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Understand how to KESY and other NHX Finance products by following
              our comprehensive documentation.
            </p>
          </div>
          <a
            href="https://docs.kesy.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm w-full font-funnel-display"
            >
              Read Documentation
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
