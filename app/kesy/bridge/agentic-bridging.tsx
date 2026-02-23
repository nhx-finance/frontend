"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function AgenticBridging() {
  const [open, setOpen] = useState(false);

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
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Agentic Bridging</SheetTitle>
            <SheetDescription>
              Chat with an AI agent to simulate and execute your bridge
              transactions.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
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
        </SheetContent>
      </Sheet>
    </>
  );
}
