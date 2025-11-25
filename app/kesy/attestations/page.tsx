import React from "react";
import Navbar from "@/components/kesy/navbar";
import Link from "next/link";

function Attestations() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <h1 className="text-2xl font-semibold font-funnel-display mt-10">
        Attestations
      </h1>
      <p className="text-sm font-funnel-display text-center mt-4 text-muted-foreground">
        No attestations available yet
      </p>
      <div className="w-full flex items-center justify-center">
        <Link
          href="/kesy"
          className="text-sm font-funnel-display font-bold text-center mt-10 underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Attestations;
