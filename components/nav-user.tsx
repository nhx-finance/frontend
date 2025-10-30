"use client";

import {
  BookOpenIcon,
  ChevronsUpDown,
  LogOut,
  Wallet2Icon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { LoginResponse } from "@/hooks/use-login";
import { useRouter } from "next/navigation";

export function NavUser({ user }: { user: LoginResponse }) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <SidebarMenu className="font-funnel-display">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user.userEmail.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.userEmail}</span>
                <span className="truncate text-xs">
                  {user.userEmail.slice(0, 2)}****{user.userEmail.slice(-10)}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal font-funnel-display flex items-center justify-between">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user.userEmail.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.userEmail}</span>
                  <span className="truncate text-xs">
                    {" "}
                    {user.userEmail.slice(0, 2)}****{user.userEmail.slice(-10)}
                  </span>
                </div>
              </div>
              <ThemeToggle />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="font-funnel-display">
              <DropdownMenuItem>
                <BookOpenIcon />
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-funnel-display"
                onClick={() => {
                  router.push("/home");
                }}
              >
                <Wallet2Icon />
                Buy nhStocks
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-funnel-display"
              onClick={() => {
                logout();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
