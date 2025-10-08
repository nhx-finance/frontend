import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TransactionTable from "./transactions-table";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="font-funnel-display text-2xl font-semibold px-4">
          Transaction History
        </h1>
        <TransactionTable />
      </SidebarInset>
    </SidebarProvider>
  );
}
