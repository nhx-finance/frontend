import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScanFace, ClockIcon, BanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoVerification from "./no-verification";
import { KESYSidebar } from "@/components/kesy-sidebar";

export default function Page() {
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

        <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center mx-4">
          <NoVerification />
          <p className="text-sm font-funnel-display text-muted-foreground">
            No verification completed
          </p>
          <button className="rounded-3xl bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1">
            Start Verification
          </button>
        </div>

        <h1 className="text-lg mt-12 px-4 mb-2 font-funnel-display font-semibold">
          Pending Verification
        </h1>
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
                  Smile ID
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
                  Smile ID
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
