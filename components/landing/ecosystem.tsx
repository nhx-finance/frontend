"use client";
import { color } from "motion";
import { PinContainer } from "../ui/3d-pin";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function Ecosystem() {
  return (
    <div className="py-20 lg:py-40 px-2">
      <h2 className="font-funnel-display mx-auto text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
        Ecosystem
      </h2>
      <p className="text-muted-foreground text-base font-funnel-display text-balance mx-auto ">
        Proud to be working with the following ecosystem partners to bridge the
        gap in financial inclusion using tokenized assets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto my-8">
        {ecosystem.map((item) => (
          <PinContainer title={item.title} href={item.href}>
            <div className="flex basis-full flex-col p-4 tracking-tight bg-transparent text-slate-100/50 sm:basis-1/2 w-[23rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-foreground font-funnel-display">
                {item.title}
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 font-funnel-display ">
                  {item.description}
                </span>
              </div>
              <div
                className={cn(
                  "flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br",
                  item.classname
                )}
              />
            </div>
          </PinContainer>
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="bg-foreground hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 h-12 mt-8 w-full md:w-1/4">
          <span className="text-sm font-funnel-display font-semibold text-background">
            Explore Ecosystem
          </span>
        </Button>
      </div>
    </div>
  );
}

const ecosystem = [
  {
    title: "Nairobi Securities Exchange",
    description:
      "The largest stock exchange in East Africa and the second largest in Africa.",
    href: "https://www.nse.co.ke/",
    classname: "from-violet-500 via-purple-500 to-blue-500",
  },
  {
    title: "Hashgraph Association",
    description: "The organization that governs the Hashgraph protocol.",
    href: "https://www.hashgraph.swiss/",
    classname: "from-pink-500 via-rose-500 to-pink-600",
  },

  {
    title: "Hedera",
    description:
      "A DLT used to create a secure and scalable network for the transfer of value.",
    href: "https://hashscan.io/",
    classname: "from-amber-100 via-orange-50 to-yellow-100",
  },
];
