import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TransactionTable from "./transactions-table";
import { KESYSidebar } from "@/components/kesy-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="font-funnel-display text-2xl font-semibold px-4">
          KESY Transactions
        </h1>
        <TransactionTable />
      </SidebarInset>
    </SidebarProvider>
  );
}
