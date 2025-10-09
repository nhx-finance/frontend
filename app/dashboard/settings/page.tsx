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
        <h1 className="text-2xl font-funnel-display font-bold px-4">
          Settings
        </h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Manage your account settings
        </p>
        <div className="px-4 flex flex-col gap-2 mb-4 md:mb-0">
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4">
            <h1 className="font-funnel-display font-semibold">
              Personal Details
            </h1>

            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Account Type
              </p>
              <p className="font-funnel-display text-sm">Individual</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Resident Country
              </p>
              <p className="font-funnel-display text-sm">Kenya</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Official Name
              </p>
              <p className="font-funnel-display text-sm">John Doe</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Email
              </p>
              <p className="font-funnel-display text-sm">jo*****@gmail.com</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Mobile Number
              </p>
              <p className="font-funnel-display text-sm">+2547*****678</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4">
            <h1 className="font-funnel-display font-semibold">
              Payment Details
            </h1>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Payment Method
              </p>
              <p className="font-funnel-display text-sm">M-Pesa</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Billing Address
              </p>
              <p className="font-funnel-display text-sm">Nairobi, Kenya</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Phone Number
              </p>
              <p className="font-funnel-display text-sm">+2547*****678</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
