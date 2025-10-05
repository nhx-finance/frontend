"use client";
import React from "react";
import { logo } from "@/assets";
import Image from "next/image";
import { Input } from "../ui/input";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BookOpenIcon,
  ChartBarIcon,
  Newspaper,
  PhoneIcon,
  Wallet2Icon,
} from "lucide-react";

function CustomUserAuthButton() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Button
          variant="ghost"
          className="text-sm font-funnel-display font-semibold"
        >
          Sign In
        </Button>
      )}
    </>
  );
}

function DesktopNavbar() {
  const { theme } = useTheme();
  return (
    <div className="w-full mt-2 hidden md:flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-full flex items-center justify-between px-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={logo} alt="logo" width={55} height={55} />
          </div>
          <Input
            placeholder="Find an asset"
            className="border-foreground/30 text-sm bg-foreground/5 font-funnel-display rounded-3xl"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/home"
          className="text-sm font-funnel-display font-semibold"
        >
          Markets
        </Link>
        <Popover>
          <PopoverTrigger className="text-sm font-funnel-display font-semibold">
            Ecosystem
          </PopoverTrigger>
          <PopoverContent className="border-foreground/20 shadow-none w-[400px]">
            <div className="flex flex-col gap-2">
              <Link
                href="/home"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <Wallet2Icon className="w-6 h-6" />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    NHX Wallet
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    Dedicated onramp and off-ramp RWA solution on Hedera
                  </p>
                </div>
              </Link>
              <Link
                href="/home"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <ChartBarIcon className="w-6 h-6" />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    Nairobi Securities Exchange
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    The leading stock exchange in East Africa
                  </p>
                </div>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="text-sm font-funnel-display font-semibold">
            Resources
          </PopoverTrigger>
          <PopoverContent className="border-foreground/20 shadow-none w-[400px]">
            <div className="flex flex-col gap-2">
              <Link
                href="/home"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <BookOpenIcon className="w-6 h-6" />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    Documentation
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    Learn how to use the NHX platform and our products
                  </p>
                </div>
              </Link>
              <Link
                href="/home"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <Newspaper className="w-6 h-6" />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    Blogs & Articles
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    Read our latest blogs and articles influencing the Kenyan
                    financial markets
                  </p>
                </div>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between gap-2">
        <ThemeToggle />
        <ConnectButton
          client={client}
          connectButton={{
            label: "Connect",
            className: "rounded-full",
            style: {
              backgroundColor:
                theme === "dark" ? "var(--background)" : "var(--foreground)",
              color:
                theme === "dark" ? "var(--foreground)" : "var(--background)",
              borderRadius: "9999px",
              fontSize: "14px",
              height: "38px",
              fontWeight: "bold",
              fontFamily: "var(--font-funnel-display)",
            },
          }}
          connectModal={{
            title: "Connect your wallet",
            titleIcon: logo,
            size: "compact",
          }}
        />
        <CustomUserAuthButton />
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="w-full mt-2 md:hidden">
      <h1>Mobile Navbar</h1>
    </div>
  );
}

function Navbar() {
  return (
    <div className="w-full mt-2">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
}

export default Navbar;
