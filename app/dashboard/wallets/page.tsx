import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NoWallet from "./no-wallet";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">Wallets</h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Only whitelisted wallets can receive NHX tokenized products
        </p>
        <div className="px-4">
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center">
            <NoWallet />
            <p className="text-sm font-funnel-display text-muted-foreground">
              No wallets found
            </p>
            <button className="rounded-3xl bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1">
              Add Wallet
            </button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
