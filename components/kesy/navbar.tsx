"use client";
import React from "react";
import { logo, nhxmmf } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BookOpenIcon, ChevronsRight, MenuIcon, Newspaper } from "lucide-react";
import { kesy } from "@/assets";
import { useRouter } from "next/navigation";

const isAuthenticated = false;

function CustomUserAuthButton() {
  const router = useRouter();
  return (
    <>
      {isAuthenticated ? (
        <Avatar
          onClick={() => {
            router.push("/kesy/dashboard");
          }}
          className="cursor-pointer w-9 border border-foreground/20 rounded-full flex items-center justify-center h-9"
        >
          <AvatarFallback className="text-xl font-semibold font-medieval-sharp uppercase mt-1 bg-transparent">
            CN
          </AvatarFallback>
        </Avatar>
      ) : (
        <Button
          variant="ghost"
          className="text-sm font-funnel-display text-white font-semibold border border-white/20 rounded-full px-12 py-2"
          onClick={() => {
            router.push("/kesy/login");
          }}
        >
          Sign In
        </Button>
      )}
    </>
  );
}

function DesktopNavbar() {
  return (
    <div className="w-full mt-2 hidden md:flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-full flex items-center justify-between px-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={logo} alt="logo" width={55} height={55} />
            <h1 className="text-3xl font-medieval-sharp font-bold text-white">
              KESY
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/home"
          className="text-sm font-funnel-display text-white font-semibold"
        >
          Markets
        </Link>
        <Popover>
          <PopoverTrigger className="text-sm font-funnel-display font-semibold text-white">
            Ecosystem
          </PopoverTrigger>
          <PopoverContent className="border-foreground/20 shadow-none w-[400px]">
            <div className="flex flex-col gap-2">
              <Link
                href="/home"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <Image
                  src={nhxmmf}
                  alt="NHX Wallet"
                  width={36}
                  height={36}
                  className="rounded-lg object-cover border border-foreground/20"
                />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    Orion
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    Dedicated onramp and off-ramp stablecoin solution on Hedera
                  </p>
                </div>
              </Link>
              <Link
                href="/kesy"
                className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
              >
                <Image
                  src={kesy}
                  alt="KESY"
                  width={36}
                  height={36}
                  className="rounded-lg object-cover border border-foreground/20"
                />
                <div className="">
                  <p className="text-sm font-funnel-display font-semibold">
                    KESY
                  </p>
                  <p className="text-xs font-funnel-display font-normal text-muted-foreground">
                    Fully backed yield-bearing Kenyan Shilling Stablecoin backed
                    by Kenyan Treasury Securities
                  </p>
                </div>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="text-sm text-white font-funnel-display font-semibold">
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
      <div className="flex items-center justify-between gap-2 px-2">
        <CustomUserAuthButton />
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="w-full mt-2  md:hidden flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center justify-center">
            <Image src={logo} alt="logo" width={25} height={25} />
            <h1 className="text-xl text-white font-medieval-sharp font-bold">
              KESY
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 px-2">
        <Drawer>
          <DrawerTrigger>
            <MenuIcon className="w-8 h-8 text-white" />
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
                      <Image
                        src={nhxmmf}
                        alt="NHX Wallet"
                        width={36}
                        height={36}
                        className="rounded-lg object-cover border border-foreground/20"
                      />
                      <div className="">
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          NHX Wallet
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
                          Dedicated onramp and off-ramp stablecoin solution on
                          Hedera
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/kesy"
                      className="flex items-center gap-2 group hover:bg-foreground/5 rounded-md p-2"
                    >
                      <Image
                        src={kesy}
                        alt="KESY"
                        width={36}
                        height={36}
                        className="rounded-lg object-cover border border-foreground/20"
                      />
                      <div className="">
                        <p className="text-sm text-start text-foreground/80 font-funnel-display font-semibold">
                          KESY
                        </p>
                        <p className="text-xs text-start font-funnel-display font-normal text-muted-foreground">
                          Fully backed yield-bearing Kenyan Shilling Stablecoin
                          backed by Kenyan Treasury Securities
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
    <div className="w-full mt-2 md:mt-4">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
}

export default Navbar;
