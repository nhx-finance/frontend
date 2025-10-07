"use client";

import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function Products() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} disableModal={true} />
  ));

  return (
    <div className="w-full h-full py-20 p-2">
      <h2 className="font-funnel-display mx-auto text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
        Get to know our products.
      </h2>
      <p className="text-muted-foreground text-base font-funnel-display text-balance mx-auto ">
        Your Gateway to Inclusive Financial Growth
      </p>
      <Carousel items={cards} />
    </div>
  );
}

const Content = () => {
  return (
    <>
      {content.map((_, index) => {
        return (
          <div
            key={"content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {content[index].title}
              </span>{" "}
              {content[index].description}
            </p>
            <Image
              src={content[index].src}
              alt={content[index].title}
              height={500}
              width={500}
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "KESY",
    title: "Kenyan Shilling Stablecoin Yield",
    active: false,
    src: "https://images.unsplash.com/photo-1665986127581-f82c5d326521?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <Content />,
  },
  {
    category: "NHX-MMF",
    title: "NHX Money Market Fund Yield",
    active: false,
    src: "https://plus.unsplash.com/premium_photo-1697730213640-7c518bd42713?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <Content />,
  },
  {
    category: "t-STOCKS",
    title: "Tokenized Securities on NSE",
    active: true,
    src: "https://images.unsplash.com/photo-1690831195945-31fd13dda712?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <Content />,
  },

  {
    category: "NHX Wallet",
    title: "Onramp & Offramp for Stablecoins",
    active: false,
    src: "https://images.unsplash.com/photo-1665986132478-32e60ca34296?q=80&w=641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <Content />,
  },
];

const content = [
  {
    id: 1,
    title: "Kenyan Shilling Stablecoin Yield",
    description: "Kenyan Shilling Stablecoin Yield",
    src: "https://images.unsplash.com/photo-1665986127581-f82c5d326521?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "NHX Money Market Fund Yield",
    description: "NHX Money Market Fund Yield",
    src: "https://plus.unsplash.com/premium_photo-1697730213640-7c518bd42713?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Tokenized Securities on NSE",
    description: "Tokenized Securities on NSE",
    src: "https://images.unsplash.com/photo-1690831195945-31fd13dda712?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Onramp & Offramp for Stablecoins",
    description: "Onramp & Offramp for Stablecoins",
    src: "https://images.unsplash.com/photo-1665986132478-32e60ca34296?q=80&w=641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
