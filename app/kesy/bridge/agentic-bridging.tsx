"use client";

import React, { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const placeholders = [
  "Where do you have KESY?",
  "What chain is your KESY on?",
  "How many KESY do you want to bridge?",
  "When do you want to bridge your KESY?",
];

export default function AgenticBridging() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState(
    placeholders[Math.floor(Math.random() * placeholders.length)],
  );

  useEffect(() => {
    if (input.length === 0) {
      const interval = setInterval(() => {
        setPlaceholder(
          placeholders[Math.floor(Math.random() * placeholders.length)],
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [input]);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="w-full text-muted-foreground text-sm rounded-xl font-semibold cursor-pointer"
      >
        <Bot className="size-4 mr-1.5" />
        Try Agentic Bridging
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="font-funnel-display flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>Agentic Bridging</SheetTitle>
            <SheetDescription>
              Let our agent to simulate and execute your bridge transactions
              with Tenderly and CRE.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 flex flex-col relative gap-4 px-4 text-center">
            <div className="rounded-full bg-muted p-4">
              <Bot className="size-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Coming soon</p>
              <p className="text-sm text-muted-foreground mt-1">
                You&apos;ll be able to describe your bridge intent in plain
                language and have the agent handle the rest.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 mb-4 w-full px-2">
            <Textarea
              placeholder={
                placeholders[Math.floor(Math.random() * placeholders.length)]
              }
              className={`rounded-2xl border border-foreground/10 w-full focus:right-0 
              ${input.length !== 0 ? "animate-none" : "shadow-md shadow-purple-500/50 animate-pulse"}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length !== 0 && (
              <Button
                variant="default"
                className="w-full mt-2 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                onClick={() => {
                  // Handle the bridging logic here
                  alert(`Bridging intent: ${input}`);
                  setInput("");
                }}
              >
                Send Request
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
