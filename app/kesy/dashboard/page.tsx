import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AccountInfo from "@/components/home/account-info";
import { KESYSidebar } from "@/components/kesy-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <div className="px-4">
          <AccountInfo />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
