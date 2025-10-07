import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import QuickMarketInfo from "@/components/home/quick-market-info";
import AccountInfo from "@/components/home/account-info";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="max-w-5xl mx-auto my-0">
          <QuickMarketInfo />
        </div>
        <div className="mt-4 px-4">
          <AccountInfo />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
