"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export function StatsCard() {
  return (
    <div className="h-[35rem] w-full bg-black border border-background/20 flex flex-col justify-between items-center overflow-hidden rounded-3xl">
      <div className="w-full flex flex-col items-center justify-center my-8">
        <h1 className="text-2xl font-funnel-display font-bold text-center text-white relative z-20">
          Empowering Businesses with Stability and Transparency
        </h1>
        <p className="text-sm text-center px-2 font-funnel-display text-muted-foreground leading-relaxed mt-2">
          Embark on a journey of financial freedom and transparency with KESY.
          Unleash stability and earnings with one click.
        </p>
      </div>
      <div>
        <div className="w-full flex flex-col items-center justify-between md:flex-row mb-1 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-medieval-sharp font-bold text-center text-white relative z-20">
              1,8M+
            </h1>
            <p className="text-sm text-center md:px-2 font-funnel-display text-muted-foreground leading-relaxed md:mt-2">
              KESY Minted
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-medieval-sharp font-bold text-center text-white relative z-20">
              KES 600M+
            </h1>
            <p className="text-sm text-center md:px-2 font-funnel-display text-muted-foreground leading-relaxed md:mt-2">
              Total Value Locked($600K+)
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-medieval-sharp font-bold text-center text-white relative z-20">
              121K+
            </h1>
            <p className="text-s text-center md:px-2 font-funnel-display text-muted-foreground leading-relaxed md:mt-2">
              Total Holders
            </p>
          </div>
        </div>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
}
