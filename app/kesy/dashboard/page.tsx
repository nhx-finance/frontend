"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { KESYSidebar } from "@/components/kesy-sidebar";
import { IconBell } from "@tabler/icons-react";
import TokenBalance from "@/components/kesy/token-balance";
import Wallets from "@/components/kesy/wallets";
import Footer from "@/components/kesy/footer";
import { useUserDetails } from "@/hooks/kesy/useUserDetails";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, isLoading, error } = useUserDetails();
  console.log(data);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <div className="px-4">
          <div className="flex mt-4 mb-8 flex-row items-start justify-between">
            <div>
              <p className="text-sm font-funnel-display text-muted-foreground px-4">
                Welcome back,
              </p>
              {isLoading ? (
                <Skeleton className="w-full h-8 ml-4 mt-1 px-4" />
              ) : (
                <h1 className="text-2xl font-funnel-display font-bold px-4">
                  {data?.firstName} {data?.lastName}
                </h1>
              )}
            </div>
            <div className="flex items-center justify-center w-12 cursor-pointer h-12 rounded-full border border-foreground/10">
              <IconBell size={24} />
            </div>
          </div>
          <TokenBalance />
          <Wallets />
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
