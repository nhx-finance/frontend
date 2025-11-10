"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScanFace, ClockIcon, BanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoVerification from "./no-verification";
import { KESYSidebar } from "@/components/kesy-sidebar";
import { useKYCStatus } from "@/hooks/kesy/useKYC";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import VerificationModal from "./verification-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, isLoading, error } = useKYCStatus();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const isKYCComplete = useMemo(() => {
    return data?.status?.toLocaleLowerCase() === "verified";
  }, [data]);

  const isKYCPending = useMemo(() => {
    return data?.status?.toLocaleLowerCase() === "submitted";
  }, [data]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm font-funnel-display text-muted-foreground">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <KESYSidebar />
        <SidebarInset>
          <SidebarTrigger className="px-2" />
          <Skeleton className="w-md h-6 mx-2 rounded-3xl mt-1" />
          <Skeleton className="w-md h-4 mx-2 rounded-3xl mt-1" />
          <Skeleton className="w-md h-6 mx-2 rounded-3xl mt-12" />

          <Skeleton className="w-[90%] h-48 rounded-3xl mt-2 mx-2" />

          <Skeleton className="w-md h-6 mx-2 rounded-3xl mt-12" />
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <Skeleton className="w-[90%] h-48 rounded-3xl mt-2 mx-2" />
            <Skeleton className="w-[90%] h-48 rounded-3xl mt-2 mx-2" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">
          Verification
        </h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Verify your identity to access NHX tokenized products
        </p>
        <h1 className="text-lg mt-4 px-4 mb-2 font-funnel-display font-semibold">
          Completed Verification
        </h1>

        {!isKYCComplete && (
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center mx-4">
            <NoVerification />
            <p className="text-sm font-funnel-display text-muted-foreground">
              No verification completed
            </p>
            <button className="rounded-3xl bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1">
              Start Verification
            </button>
          </div>
        )}

        {isKYCComplete && (
          <div className="px-4 flex flex-col gap-2 md:flex-row mb-4 md:mb-0">
            <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
                <div className="flex items-center gap-2">
                  <ScanFace className="w-6 h-6" />
                  <div>
                    <p className="text-base font-funnel-display font-semibold">
                      KYC Verification
                    </p>
                    <p className="text-xs font-funnel-display text-muted-foreground">
                      Customer verification
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-3xl bg-[#000] text-white font-funnel-display shadow-none"
                  onClick={() => setShowVerificationModal(true)}
                >
                  Start Verification
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Time
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    15 minutes
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Documents Upload
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    Required
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Provider
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-0">
                    Custom
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
                <div className="flex items-center gap-2">
                  <BanIcon className="w-6 h-6" />
                  <div>
                    <p className="text-base font-funnel-display font-semibold">
                      AML Verification
                    </p>
                    <p className="text-xs font-funnel-display text-muted-foreground">
                      Anti-Money Laundering
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-3xl bg-[#000] text-white font-funnel-display shadow-none"
                >
                  Start Verification
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Time
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />5 minutes
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Documents Upload
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    Required
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Provider
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-0">
                    Custom
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-lg mt-12 px-4 mb-2 font-funnel-display font-semibold">
          Pending Verification
        </h1>

        {isKYCComplete && (
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center mx-4">
            <NoVerification />
            <p className="text-sm font-funnel-display text-muted-foreground">
              No pending completed
            </p>
            <button
              disabled
              className="rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1"
            >
              No pending verification
            </button>
          </div>
        )}

        {!isKYCComplete && (
          <div className="px-4 flex flex-col gap-2 md:flex-row mb-4 md:mb-0">
            <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
                <div className="flex items-center gap-2">
                  <ScanFace className="w-6 h-6" />
                  <div>
                    <p className="text-base font-funnel-display font-semibold">
                      KYC Verification
                    </p>
                    <p className="text-xs font-funnel-display text-muted-foreground">
                      Customer verification
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  disabled={isKYCPending}
                  className="rounded-3xl bg-[#000] text-white font-funnel-display shadow-none"
                  onClick={() => setShowVerificationModal(true)}
                >
                  {isKYCPending ? "Pending Verification" : "Start Verification"}
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Time
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    15 minutes
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Documents Upload
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    Required
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Provider
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-0">
                    Custom
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
                <div className="flex items-center gap-2">
                  <BanIcon className="w-6 h-6" />
                  <div>
                    <p className="text-base font-funnel-display font-semibold">
                      AML Verification
                    </p>
                    <p className="text-xs font-funnel-display text-muted-foreground">
                      Anti-Money Laundering
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  disabled={isKYCPending}
                  className="rounded-3xl bg-[#000] text-white font-funnel-display shadow-none"
                  onClick={() => setShowVerificationModal(true)}
                >
                  {isKYCPending ? "Pending Verification" : "Start Verification"}
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Time
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />5 minutes
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Documents Upload
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-1">
                    Required
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                    Provider
                  </p>
                  <p className="text-sm font-funnel-display flex items-center gap-0">
                    Custom
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
      {showVerificationModal && (
        <VerificationModal
          setShowVerificationModal={setShowVerificationModal}
        />
      )}
    </SidebarProvider>
  );
}
