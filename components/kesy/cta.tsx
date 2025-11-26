"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { AuroraBackground } from "../ui/aurora-background";
import { kesy, nhxmmf } from "@/assets";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronsRight, Loader2 } from "lucide-react";
import { useSubscribeToNewsLetter } from "@/hooks/kesy/useNewsLetterSubscription";
import { toast } from "sonner";

export function CTA() {
  const [email, setEmail] = useState("");
  const { mutate: subscribeToNewsLetter, isPending } =
    useSubscribeToNewsLetter();

  const handleSubscribe = (e: React.FormEvent<HTMLButtonElement>) => {
    if (email === "") {
      toast.error("Please enter your question");
      return;
    }
    e.preventDefault();
    subscribeToNewsLetter(
      {
        email,
      },
      {
        onSuccess: () => {
          toast.success("Question sent successfully");
          setEmail("");
        },
        onError: (error) => {
          toast.error("Failed to send question");
          console.error(error);
        },
      }
    );
  };
  return (
    <AuroraBackground className="h-[520px] mb-10 mt-20 rounded-3xl border border-foreground/20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 rounded-3xl items-center justify-center px-4"
      >
        <div className="flex items-center justify-center gap-0">
          <Image
            src={nhxmmf}
            alt="NHXMMF"
            width={100}
            height={100}
            className="rounded-full w-20 h-20 border border-foreground/20"
          />
          <Image
            src={kesy}
            alt="KESY"
            width={100}
            height={100}
            className="rounded-full w-20 h-20 border border-foreground/20 ml-[-30px]"
          />
        </div>
        <div className="text-3xl font-funnel-display font-bold dark:text-white text-center">
          Get Started with KESY
        </div>
        <p className="text-base font-funnel-display text-muted-foreground leading-relaxed">
          Do you have any questions about KESY? Send it to us and we will get
          back to you as soon as possible.
        </p>
        <div className="flex flex-col items-center w-full md:flex-row gap-4">
          <Input
            placeholder="What is your question?"
            className="w-full md:w-3/4 h-12 rounded-3xl border border-foreground/20 text-foreground font-funnel-display"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full md:w-1/4 h-12 rounded-3xl font-funnel-display font-semibold"
            onClick={handleSubscribe}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span className="text-sm font-funnel-display font-semibold text-background">
                Submit
              </span>
            )}
          </Button>
        </div>

        <div className="font-funnel-display font-semibold text-sm dark:text-neutral-200 py-4">
          Africa{`'`}s Inclusive Finance Bridge
        </div>
        <div
          onClick={() => {
            window.open("/kesy/login", "_blank");
          }}
          className="flex items-center justify-between w-full md:w-1/2 h-12 gap-2 bg-foreground cursor-pointer rounded-3xl p-4"
        >
          <p className="text-base font-semibold uppercase font-medieval-sharp text-background">
            Launch App
          </p>
          <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
            <ChevronsRight className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
