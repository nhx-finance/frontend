import React from "react";
import AdminNavbar from "../dashboard/navbar";
import MintsTable from "../dashboard/mints";

function MintsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl MT-4 px-4 font-funnel-display font-bold">
        Transaction History
      </h1>
      <p className="text-sm px-4 font-funnel-display text-muted-foreground">
        Recent Mints Transactions
      </p>
      <MintsTable />
    </div>
  );
}

export default MintsPage;
