"use client";
import { logo } from "@/assets";
import React from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  IconFileCertificate,
  IconLayoutDashboard,
  IconUserScan,
} from "@tabler/icons-react";
import Link from "next/link";

const isLoggedIn = true;

function checkActiveRoute(path: string, currentPath: string) {
  return currentPath.includes(path);
}

function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleAuth = () => {
    if (isLoggedIn) {
      console.log("Logout");
      router.push("/kesy/admin");
    } else {
      router.push("/kesy/admin");
    }
  };
  return (
    <div className="flex items-center justify-between mt-4 mx-2">
      <div className="flex items-center">
        <Image src={logo} alt="NHX Finance" width={35} height={35} />
        <h1 className="text-2xl font-bold font-medieval-sharp">KESY</h1>
      </div>
      <div className="hidden md:flex items-center justify-between border border-foreground/20 rounded-3xl gap-4">
        <Link
          href="/kesy/admin/dashboard"
          className={`flex items-center gap-1 py-2 cursor-pointer min-w-28 px-4 justify-center ${
            checkActiveRoute("dashboard", pathname)
              ? "bg-foreground rounded-full"
              : ""
          }`}
        >
          <IconLayoutDashboard
            className={`${
              checkActiveRoute("dashboard", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          />
          <p
            className={`text-sm font-funnel-display font-semibold ${
              checkActiveRoute("dashboard", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          >
            Dashboard
          </p>
        </Link>
        <Link
          href="/kesy/admin/kyc"
          className={`flex items-center gap-1 py-2 cursor-pointer min-w-28 justify-center ${
            checkActiveRoute("kyc", pathname)
              ? "bg-foreground rounded-full"
              : ""
          }`}
        >
          <IconUserScan
            className={`${
              checkActiveRoute("kyc", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          />
          <p
            className={`text-sm font-funnel-display font-semibold ${
              checkActiveRoute("kyc", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          >
            KYC
          </p>
        </Link>
        <Link
          href="/kesy/admin/revenue"
          className={`flex items-center gap-1 py-2 cursor-pointer min-w-28 justify-center ${
            checkActiveRoute("revenue", pathname)
              ? "bg-foreground rounded-full"
              : ""
          }`}
        >
          <IconFileCertificate
            className={`${
              checkActiveRoute("revenue", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          />
          <p
            className={`text-sm font-funnel-display font-semibold ${
              checkActiveRoute("revenue", pathname)
                ? "text-background"
                : "text-foreground"
            }`}
          >
            Revenue
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <ThemeToggle />
        <Button
          className="bg-foreground hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 md: w-42"
          onClick={handleAuth}
        >
          <span className="font-funnel-display font-semibold text-background">
            {isLoggedIn ? "Logout" : "Login"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default AdminNavbar;
