import { hederaLogo } from "@/assets";
import { stocks } from "@/mocks/stocks";
import { IconSearch } from "@tabler/icons-react";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

function TokenSelectModal({
  setShowTokenSelectModal,
  stockId,
}: {
  setShowTokenSelectModal: (show: boolean) => void;
  stockId: number;
}) {
  const filteredStocks = stocks.filter((stock) => stock.id !== stockId);
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-foreground/5 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-[400px] p-4 rounded-3xl bg-background">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-funnel-display font-semibold">
            Select Token
          </h1>
          <X
            className="w-4 cursor-pointer h-4 text-foreground"
            onClick={() => setShowTokenSelectModal(false)}
          />
        </div>
        <div className="flex items-center justify-between mt-4 bg-foreground/5 rounded-3xl">
          <div className="flex items-center gap-1 w-3/4 mx-2">
            <IconSearch className="w-4 h-4 text-foreground " />
            <input
              placeholder="Search"
              className="shadow-none h-10 border-none focus:ring-0 font-funnel-display text-sm focus:outline-none rounded-3xl focus:border-0 focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-1 mx-2">
            <Image
              src={hederaLogo}
              alt="Hedera"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          {stocks.slice(0, 4).map((stock) => (
            <div
              key={stock.id}
              className="flex items-center gap-2 flex-col w-1/4 hover:bg-foreground/5 rounded-xl ease-in duration-300 transition-all border border-foreground/20 p-2 cursor-pointer"
            >
              <Image
                src={stock.logo}
                alt={stock.name}
                width={34}
                height={34}
                className="rounded-md object-cover"
              />
              <p className="text-xs font-funnel-display font-light text-muted-foreground">
                nh{stock.ticker}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h1 className="text- font-funnel-display font-light text-muted-foreground">
            Trending Tokens
          </h1>
          <div className="mt-2 flex flex-col">
            {filteredStocks.map((stock) => (
              <div
                key={stock.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-foreground/5 rounded-xl py-2 ease-in duration-300 transition-all"
              >
                <Image
                  src={stock.logo}
                  alt={stock.name}
                  width={44}
                  height={44}
                  className="rounded-xl object-cover border border-foreground/20"
                />
                <div className="">
                  <p className="text-base font-funnel-display font-light text-muted-foreground">
                    nh{stock.ticker}
                  </p>
                  <p className="text-xs font-funnel-display font-light text-muted-foreground">
                    {stock.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenSelectModal;
