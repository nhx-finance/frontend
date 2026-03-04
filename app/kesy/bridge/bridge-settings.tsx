"use client";

import React, { useState } from "react";
import { Settings2, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CURRENCIES, type Currency } from "./constants";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

function CurrencyOption({
  currency,
  isSelected,
  onSelect,
}: {
  currency: Currency;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/80 cursor-pointer ${
        isSelected ? "bg-muted" : ""
      }`}
    >
      <span className="text-sm">{currency.name}</span>
      <span className="text-sm font-semibold">{currency.symbol}</span>
    </button>
  );
}

function SettingsContent({
  currency,
  onCurrencyChange,
}: {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}) {
  const [showCurrencyList, setShowCurrencyList] = useState(false);

  if (showCurrencyList) {
    return (
      <div className="flex font-funnel-display flex-col gap-1">
        <button
          onClick={() => setShowCurrencyList(false)}
          className="text-xs text-muted-foreground hover:text-foreground mb-1 cursor-pointer text-left"
        >
          ← Back
        </button>
        {CURRENCIES.map((c) => (
          <CurrencyOption
            key={c.id}
            currency={c}
            isSelected={currency.id === c.id}
            onSelect={() => {
              onCurrencyChange(c);
              setShowCurrencyList(false);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 font-funnel-display">
      <h3 className="font-semibold text-sm">Preferences</h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Currency</span>
        <button
          onClick={() => setShowCurrencyList(true)}
          className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors cursor-pointer"
        >
          {currency.symbol}
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function BridgeSettings({
  currency,
  onCurrencyChange,
}: {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="size-8 rounded-full cursor-pointer"
        >
          <Settings2 className="size-4" />
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Preferences</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6">
              <SettingsContent
                currency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full cursor-pointer"
        >
          <Settings2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 rounded-xl">
        <SettingsContent
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
      </PopoverContent>
    </Popover>
  );
}
