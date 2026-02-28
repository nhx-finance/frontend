import React from "react";
import AdminNavbar from "../dashboard/navbar";
import Link from "next/link";

function BridgeDetailsPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <AdminNavbar />
      <div className="flex items-center flex-col h-screen justify-center">
        <p className="font-funnel-display text-center text-muted-foreground text-xs font-semibold">
          Page under construction. Please check back later.
        </p>
        <Link
          href="/kesy/admin/manage"
          className="text-sm font-funnel-display text-foreground/70 hover:underline mt-4 inline-block"
        >
          &larr; Back to Manage Dashboard
        </Link>
      </div>
    </div>
  );
}

export default BridgeDetailsPage;
