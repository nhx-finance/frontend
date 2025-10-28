"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NoMethod from "./no-method";
import { useState } from "react";
import AddPaymentModal from "./add-payment-moal";
import { Loader2 } from "lucide-react";
export default function Page() {
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAddPaymentModal(true);
    }, 1000);
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">
          Payments
        </h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Manage your payment methods
        </p>
        <div className="px-4">
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center">
            <NoMethod />
            <p className="text-sm font-funnel-display text-muted-foreground">
              No payment methods found
            </p>
            <button
              onClick={handleAddPayment}
              className="rounded-3xl bg-background flex items-center justify-center gap-2 text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add Payment Method"
              )}
            </button>
          </div>
        </div>
        <h1 className="text-xl font-funnel-display font-bold px-4 mt-8">
          Payment History
        </h1>
        <p className="text-sm text-center font-funnel-display mt-4 text-muted-foreground px-4">
          No transactions found
        </p>
      </SidebarInset>
      {showAddPaymentModal && (
        <AddPaymentModal setShowAddPaymentModal={setShowAddPaymentModal} />
      )}
    </SidebarProvider>
  );
}
