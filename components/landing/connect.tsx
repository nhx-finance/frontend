"use client";
import { motion } from "motion/react";
import WorldAnimation from "./world";

export function Connect() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold font-medieval-sharp text-3xl md:text-4xl dark:text-white text-black">
          <span className="text-blue-400">
            {"Cross-Border".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>{" "}
          Economic Connectivity
        </p>
        <p className="text-sm md:text-lg font-funnel-display text-neutral-500 max-w-2xl mx-auto py-4">
          Connecting Africa's Markets to Global Capital Flows through Tokenized
          NSE Assets for Global Accessibility
        </p>
      </div>
      <WorldAnimation />
    </div>
  );
}
