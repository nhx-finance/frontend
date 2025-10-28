"use client";

import * as React from "react";
import {
  BadgeCheck,
  SendIcon,
  Frame,
  CreditCard,
  Wallet,
  Home,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Unlock,
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
import { dummy, logo } from "@/assets";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

const data = {
  user: {
    name: "sylusabel",
    email: "sylusabel@gmail.com",
    avatar: dummy,
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: SendIcon,
      items: [],
    },
    {
      title: "Product Access",
      url: "/dashboard/access",
      icon: Unlock,
      items: [],
    },
    {
      title: "Wallets",
      url: "/dashboard/wallets",
      icon: Wallet,
      items: [],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: CreditCard,
      items: [],
    },
    {
      title: "Verification",
      url: "/dashboard/verification",
      icon: BadgeCheck,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="w-full flex items-center justify-between px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Image src={logo} alt="logo" width={35} height={35} />
                    <div>
                      <h1 className="text-base font-medieval-sharp font-bold text-foreground">
                        NHX
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
