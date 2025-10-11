"use client";
import { useParams } from "next/navigation";
import React from "react";
import Navbar from "@/components/home/navbar";
import { stocks } from "@/mocks/stocks";
import {
  Building2Icon,
  ChevronRight,
  ExternalLink,
  Globe2Icon,
  GripHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandTwitter } from "@tabler/icons-react";
import { HistoricalChart } from "../historical-chart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

function Stock() {
  const { id } = useParams();
  const stock = stocks.find((stock) => stock.id === parseInt(id as string));

  if (!stock) {
    return <div>Stock not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-0 ">
      <Navbar />
      <div className="px-4 md:px-8">
        <div className="flex items-center my-8">
          <Link
            href="/home"
            className="text-base font-funnel-display font-semibold text-muted-foreground"
          >
            Markets
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground mt-[2px]" />
          <p className="text-base font-funnel-display font-semibold text-muted-foreground">
            Stocks
          </p>
          <ChevronRight className="w-4 h-4 text-muted-foreground mt-[2px]" />
          <p className="text-base font-funnel-display font-semibold">
            <span className="text-muted-foreground font-medieval-sharp">
              nh
            </span>
            {stock.ticker}
          </p>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="w-full md:w-[60%]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col md:flex-row items-start justify-baseline gap-2">
                <div className="w-14 h-14 md:w-10 md:h-10 p-1 border-2 border-foreground/20 rounded-lg group-hover:border-blue-500 transition-all duration-300">
                  <Image
                    src={stock.logo}
                    alt={stock.name}
                    width={36}
                    height={36}
                    className="object-contain rounded-md w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2 md:mt-2">
                  <p className="text-lg md:text-2xl font-funnel-display font-semibold">
                    {stock.name}
                  </p>
                  <p className="text-lg md:text-2xl hidden md:block font-funnel-display text-muted-foreground">
                    {stock.ticker}
                  </p>
                </div>
              </div>
              <div className="">
                <div className="md:hidden block">
                  <Drawer>
                    <DrawerTrigger>
                      <GripHorizontal className="w-4 h-4 text-muted-foreground" />
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="flex items-start flex-col justify-start gap-6">
                        <Link
                          href="/"
                          className="flex items-center mx-4 gap-2 my-2"
                        >
                          <Globe2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">Website</p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 my-2"
                        >
                          <Building2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">
                            Location
                          </p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 my-2"
                        >
                          <IconBrandTwitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">Twitter</p>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2 mx-4 mb-8  my-2"
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                          <p className="text-lg font-funnel-display">
                            External Link
                          </p>
                        </Link>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
                <div className="hidden md:flex items-center justify-between gap-4">
                  <Link href="/">
                    <Globe2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <Building2Icon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <IconBrandTwitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                  <Link href="/">
                    <ExternalLink className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-blue-500 ease-in duration-300 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-1 md:mt-3">
              <HistoricalChart data={stock.historicalData} stock={stock} />
            </div>
          </div>
          <div className="bg-blue-200 w-full md:w-[40%]">
            <h1 className="text-2xl font-funnel-display font-semibold">Swap</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;
