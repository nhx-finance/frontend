import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
        <div className="px-4 mt-2 flex flex-col gap-2 md:flex-row justify-center"></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
