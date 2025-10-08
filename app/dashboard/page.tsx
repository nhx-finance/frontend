import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import QuickMarketInfo from "@/components/home/quick-market-info";
import AccountInfo from "@/components/home/account-info";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="md:max-w-5xl w-full mx-auto my-0 overflow-hidden">
          <QuickMarketInfo />
        </div>
        <SidebarTrigger className="px-2" />
        <div className="px-4">
          <AccountInfo />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
