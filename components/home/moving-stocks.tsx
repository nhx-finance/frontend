"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Stock } from "@/mocks/stocks";
import Image from "next/image";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export const MovingStocks = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: Stock[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-300 dark:border-zinc-700 flex items-center justify-center"
            key={item.ticker}
          >
            <blockquote className="flex items-center justify-between w-full">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="flex items-center justify-center gap-2 px-4">
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={30}
                  height={30}
                  className="rounded-full object-contain"
                />
                <p className="text-sm font-funnel-display font-bold">
                  {item.ticker}{" "}
                  <span className="text-xs text-muted-foreground">
                    ( {item.price} {item.currency})
                  </span>
                </p>
              </div>
              <p
                className={cn(
                  "py-2 font-funnel-display font-bold px-4 flex items-center gap-1",
                  item.changePercentage > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {item.changePercentage > 0 ? (
                  <ChevronsUp className="w-4 h-4" />
                ) : (
                  <ChevronsDown className="w-4 h-4" />
                )}
                {item.changePercentage > 0 ? "+" : ""}
                {item.changePercentage}%
              </p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
