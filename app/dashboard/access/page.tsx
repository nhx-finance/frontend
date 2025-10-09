import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CandlestickChart,
  LockIcon,
  PercentIcon,
  Building2Icon,
} from "lucide-react";
import Image from "next/image";
import kesy from "@/public/kes.jpg";
import { nhxmmf } from "@/assets";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">Access</h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          NHX Products you have access to
        </p>
        <h1 className="text-lg mt-4 px-4 mb-2 font-funnel-display font-semibold">
          Featured Product
        </h1>
        <div className="px-4 flex flex-col gap-2 md:flex-row">
          <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
              <div className="flex items-center gap-2">
                <CandlestickChart className="w-6 h-6" />
                <div>
                  <p className="text-base font-funnel-display font-semibold">
                    NHX Stocks
                  </p>
                  <p className="text-xs font-funnel-display text-muted-foreground">
                    Access to all NHX Stocks
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-3xl bg-[#000] text-white font-funnel-display"
              >
                Get Access
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Access
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <LockIcon className="w-4 h-4" />
                  Locked
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Minimum Deposit
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  1.00 KES
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Fees
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-0">
                  0.03
                  <PercentIcon className="w-3 h-3" />
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Custodian
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <Building2Icon className="w-4 h-4" />
                  HF Group
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-lg mt-12 px-4 mb-2 font-funnel-display font-semibold">
          Yield Products
        </h1>
        <div className="px-4 flex flex-col gap-2 md:flex-row mb-4 md:mb-0">
          <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
              <div className="flex items-center gap-2">
                <Image
                  src={kesy}
                  alt="KESY"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <p className="text-base font-funnel-display font-semibold">
                    KESY
                  </p>
                  <p className="text-xs font-funnel-display text-muted-foreground">
                    Kenyan Shilling Stablecoin Yield
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-3xl bg-[#000] text-white font-funnel-display"
                disabled
              >
                Coming Soon
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Access
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <LockIcon className="w-4 h-4" />
                  Locked
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Minimum Deposit
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  30,000 KES
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Fees
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-0">
                  0.03
                  <PercentIcon className="w-3 h-3" />
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Custodian
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <Building2Icon className="w-4 h-4" />
                  HF Group
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 rounded-3xl border border-foreground/20 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-foreground/20">
              <div className="flex items-center gap-2">
                <Image
                  src={nhxmmf}
                  alt="KESY"
                  width={36}
                  height={36}
                  className="rounded-full border border-foreground/20"
                />
                <div>
                  <p className="text-base font-funnel-display font-semibold">
                    NHX-MMF
                  </p>
                  <p className="text-xs font-funnel-display text-muted-foreground">
                    Short term Kenyan Treasury Bills
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-3xl bg-[#000] text-white font-funnel-display"
                disabled
              >
                Coming Soon
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Access
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <LockIcon className="w-4 h-4" />
                  Locked
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Minimum Deposit
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  250,000 KES
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Fees
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-0">
                  0.03
                  <PercentIcon className="w-3 h-3" />
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-funnel-display text-muted-foreground font-semibold">
                  Custodian
                </p>
                <p className="text-sm font-funnel-display flex items-center gap-1">
                  <Building2Icon className="w-4 h-4" />
                  CBK
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
