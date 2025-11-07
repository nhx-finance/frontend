"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { KESYSidebar } from "@/components/kesy-sidebar";
import { useUserDetails } from "@/hooks/kesy/useUserDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { IconCopy } from "@tabler/icons-react";

export default function Page() {
  const { data: userDetails, isLoading, error } = useUserDetails();

  if (error) {
    return (
      <div className="text-red-500 font-funnel-display text-sm w-full text-center h-screen items-center justify-center flex flex-col">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">
          Settings
        </h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Manage your account settings
        </p>
        <div className="px-4 flex flex-col gap-2 mb-4 md:mb-0">
          <Skeleton className="w-full h-48 rounded-3xl mt-1" />
          <Skeleton className="w-full h-48 rounded-3xl mt-1" />
        </div>
      </SidebarInset>
    </SidebarProvider>;
  }

  return (
    <SidebarProvider>
      <KESYSidebar />
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
              <p className="font-funnel-display text-sm">
                {userDetails?.country?.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Official Name
              </p>
              <p className="font-funnel-display text-sm">
                {userDetails?.firstName} {userDetails?.lastName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Email
              </p>
              <p className="font-funnel-display text-sm">
                {userDetails?.email.slice(0, 2)}****
                {userDetails?.email.slice(-10)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Timezone
              </p>
              <p className="font-funnel-display text-sm">
                {userDetails?.timezone?.toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4">
            <h1 className="font-funnel-display font-semibold">API Settings</h1>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                API Key
              </p>
              <p className="font-funnel-display text-sm flex items-center gap-2">
                ********
                <IconCopy
                  size={16}
                  className="cursor-pointer"
                  onClick={() => {
                    toast.info("API Feature coming soon.");
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                API Secret
              </p>
              <p className="font-funnel-display text-sm flex items-center gap-2">
                ********
                <IconCopy
                  size={16}
                  className="cursor-pointer"
                  onClick={() => {
                    toast.info("API Feature coming soon.");
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-funnel-display text-muted-foreground text-sm font-semibold">
                Environment
              </p>
              <p className="font-funnel-display text-sm">Sandbox</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
