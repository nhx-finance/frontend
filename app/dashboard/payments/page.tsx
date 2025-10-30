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
import { useGetKYCStatus } from "@/hooks/use-verification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetPaymentMethods } from "@/hooks/use-payments";
import { format } from "date-fns";
import { IconCopy } from "@tabler/icons-react";

export default function Page() {
  const router = useRouter();
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: kycStatus } = useGetKYCStatus();
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } =
    useGetPaymentMethods();

  const handleAddPayment = () => {
    setLoading(true);
    if (kycStatus?.kycStatus === "COMPLETED") {
      setShowAddPaymentModal(true);
      setLoading(false);
    } else {
      toast.error(
        "Please complete your KYC verification to add a payment method"
      );
      setLoading(false);
      router.push("/dashboard/verification");
    }
  };

  if (isLoadingPaymentMethods) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  if (!paymentMethods) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm font-funnel-display text-muted-foreground">
          No payment methods found
        </p>
      </div>
    );
  }
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
        {paymentMethods.length === 0 && (
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
        )}
        {paymentMethods.length >= 1 && (
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((paymentMethod) => (
              <div
                key={paymentMethod.id}
                className="border border-foreground/20 rounded-3xl p-4"
              >
                <p className="text-base font-semibold uppercase font-funnel-display">
                  {paymentMethod.name}
                </p>
                <div className="flex items-center justify-between w-full my-4">
                  <p className="text-sm font-funnel-display text-muted-foreground">
                    Mobile Number:
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-2">
                    {paymentMethod.mobileNumber.slice(0, 4)}...
                    {paymentMethod.mobileNumber.slice(-4)}
                    <IconCopy className="w-4 h-4" />
                  </p>
                </div>
                <div className="flex items-center justify-between w-full mt-4">
                  <p className="text-sm font-funnel-display text-muted-foreground">
                    Date Added:
                  </p>
                  <p className="text-sm font-funnel-display text-muted-foreground">
                    {format(new Date(paymentMethod.dateAdded), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
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
