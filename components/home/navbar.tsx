"use client";
import React from "react";
import { logo } from "@/assets";
import Image from "next/image";
import { Input } from "../ui/input";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  BookOpenIcon,
  ChartBarIcon,
  ChevronsRight,
  LayoutPanelLeft,
  MenuIcon,
  Newspaper,
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
          className="text-sm font-funnel-display font-semibold border border-foreground/20 rounded-full px-12 py-2"
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
        {/* <ConnectButton
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
        /> */}
        <CustomUserAuthButton />
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="w-full mt-2 md:hidden flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center justify-center">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="text-xl font-medieval-sharp font-bold text-foreground">
              NHX
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4">
        <ThemeToggle />
        <Drawer>
          <DrawerTrigger>
            <MenuIcon className="w-8 h-8" />
          </DrawerTrigger>
          <DrawerContent className="md:hidden">
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex items-center justify-center gap-2">
                  <Image src={logo} alt="logo" width={35} height={35} />
                  <h1 className="text-3xl font-medieval-sharp font-bold text-foreground">
                    NHX Finance
                  </h1>
                </div>
              </DrawerTitle>
              <DrawerDescription>
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href="/home"
                    className="text-base text-start text-foreground font-funnel-display font-semibold"
                  >
                    <div className="flex items-center gap-1">
                      <ChevronsRight className="w-6 h-6" />
                      <h1 className="text-base text-foreground font-funnel-display font-semibold">
                        Markets
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col gap-2 mt-4 items-start">
                  <div className="flex items-center gap-1">
                    <ChevronsRight className="w-6 h-6" />
                    <h1 className="text-base text-foreground font-funnel-display font-semibold">
                      Ecosystem
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/home"
                      className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
                    >
                      <Wallet2Icon className="w-6 h-6" />
                      <div className="">
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          NHX Wallet
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
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
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          Nairobi Securities Exchange
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
                          The leading stock exchange in East Africa
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 items-start">
                  <div className="flex items-center gap-1">
                    <ChevronsRight className="w-6 h-6" />
                    <h1 className="text-base text-foreground font-funnel-display font-semibold">
                      Resources
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/home"
                      className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
                    >
                      <BookOpenIcon className="w-6 h-6" />
                      <div className="">
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          Documentation
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
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
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          Blogs & Articles
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
                          Read our latest blogs and articles influencing the
                          Kenyan financial markets
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <CustomUserAuthButton />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
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
