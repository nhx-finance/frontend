"use client";

import * as React from "react";
import {
  BadgeCheck,
  SendIcon,
  Frame,
  Wallet,
  Home,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dummy, kesy } from "@/assets";
import Image from "next/image";
import { useUserDetails } from "@/hooks/kesy/useUserDetails";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const data = {
  user: {
    name: "sylusabel",
    email: "sylusabel@gmail.com",
    avatar: dummy,
  },
  navMain: [
    {
      title: "Overview",
      url: "/kesy/dashboard",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Transactions",
      url: "/kesy/dashboard/transactions",
      icon: SendIcon,
      items: [],
    },
    {
      title: "Wallets",
      url: "/kesy/dashboard/wallets",
      icon: Wallet,
      items: [],
    },
    {
      title: "Verification",
      url: "/kesy/dashboard/verification",
      icon: BadgeCheck,
      items: [],
    },
    {
      title: "Settings",
      url: "/kesy/dashboard/settings",
      icon: Settings2,
      items: [],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "mailto:nhxfinance@gmail.com",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "mailto:nhxfinance@gmail.com",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function KESYSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: userDetails, error } = useUserDetails();

  if (!userDetails || error) {
    return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="w-full flex items-center justify-between px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={kesy}
                        alt="KESY"
                        width={35}
                        height={35}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <h1 className="text-base font-medieval-sharp font-bold text-foreground">
                          KESY
                        </h1>
                        <p className="text-xs font-funnel-display text-muted-foreground">
                          Finance
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="font-funnel-display">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-10 my-2 rounded-xl" />
          ))}
          {error && (
            <p className="text-sm font-funnel-display text-red-500 flex flex-col gap-2">
              {error?.message || "An error occurred. Please try again later."}
              <Link href="/kesy/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          )}
        </SidebarContent>
        <SidebarFooter className="font-funnel-display">
          <Skeleton className="w-full h-10 rounded-xl" />
        </SidebarFooter>
      </Sidebar>
    );
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="w-full flex items-center justify-between px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={kesy}
                      alt="KESY"
                      width={35}
                      height={35}
                      className="rounded-full w-10 h-10"
                    />
                    <div>
                      <h1 className="text-base font-medieval-sharp font-bold text-foreground">
                        KESY
                      </h1>
                      <p className="text-xs font-funnel-display text-muted-foreground">
                        Finance
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="font-funnel-display">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="font-funnel-display">
        <NavUser userDetails={userDetails} />
      </SidebarFooter>
    </Sidebar>
  );
}
