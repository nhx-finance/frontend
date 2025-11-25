"use client";
import React, { useState } from "react";
import { fin1 } from "@/assets";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconBook2, IconX } from "@tabler/icons-react";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <footer className="bg-background lg:grid lg:grid-cols-5 border-t border-foreground/10 mb-4">
      <div className="relative block h-96 lg:col-span-2 lg:h-full">
        <Image
          src={fin1}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1548}
          height={1032}
        />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Input
              placeholder="Sign up for our newsletter"
              className="border-foreground/10 h-12 font-funnel-display rounded-3xl"
            />
            <Button className="bg-foreground hover:bg-foreground/80 ease-in transition-all rounded-3xl duration-300 h-12 mt-2 w-full md:w-1/2">
              <span className="text-sm font-funnel-display font-semibold text-background">
                Subscribe
              </span>
            </Button>

            <ul className="mt-8 flex gap-6 font-funnel-display">
              <li>
                <a
                  href="https://x.com/nhxfinance"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/nhx-finance"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://nhx-finance.gitbook.io/nhx-finance-docs/documentation/about/kesy/overview"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Documentation</span>

                  <IconBook2 />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium text-foreground font-funnel-display">
                Services
              </p>

              <ul className="mt-6 space-y-4 text-sm font-funnel-display">
                <li>
                  <a
                    href="/kesy/associate"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground transition hover:opacity-75"
                  >
                    Associate KESY
                  </a>
                </li>

                <li>
                  <a
                    href="/kesy/associate"
                    className="text-foreground transition hover:opacity-75"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Mint KESY
                  </a>
                </li>

                <li>
                  <a
                    href="https://nhx-finance.gitbook.io/nhx-finance-docs/documentation/about/kesy/overview"
                    className="text-foreground transition hover:opacity-75"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Learn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground font-funnel-display">
                Company
              </p>

              <ul className="mt-6 space-y-4 text-sm font-funnel-display">
                <li>
                  <a
                    href="https://nhx-finance.gitbook.io/nhx-finance-docs/api-reference"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Developer Resources{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="https://nhx-finance.gitbook.io/nhx-finance-docs/changelog"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Changelog{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="/kesy/blogs"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/10 pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs font-funnel-display">
              <li>
                <a
                  onClick={() => setIsOpen(true)}
                  className="text-muted-foreground transition hover:opacity-75 cursor-pointer"
                >
                  {" "}
                  Terms & Conditions{" "}
                </a>
              </li>

              <li>
                <a
                  onClick={() => setIsOpen(true)}
                  className="text-muted-foreground transition hover:opacity-75 cursor-pointer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
              </li>

              <li>
                <a
                  onClick={() => setIsOpen(true)}
                  className="text-muted-foreground transition hover:opacity-75 cursor-pointer"
                >
                  {" "}
                  Cookies{" "}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-xs text-muted-foreground sm:mt-0 font-funnel-display">
              &copy; 2025. NHX-Finance. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-lg bg-background/50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-between w-full">
            <div className="bg-background p-4 rounded-3xl w-full md:w-1/2 border border-foreground/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold font-funnel-display">
                  Terms & Conditions
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <IconX />
                </Button>
              </div>
              <p className="text-sm font-funnel-display text-muted-foreground leading-relaxed">
                By accessing or using the NHX Finance platform, app.nhx.finance,
                or any KESY-related services, you agree to be bound by these
                Terms & Conditions. These terms govern the minting, redemption,
                staking, and transfer of KESY tokens, and all interactions with
                our website and smart contracts. NHX Finance Ltd reserves the
                right to update these terms at any time; continued use
                constitutes acceptance of the revised terms. Users must be of
                legal age in Kenya (18+) and comply with all applicable laws,
                including the Virtual Asset Service Providers Act, 2025 and
                Capital Markets Authority regulations.
              </p>
              <h2 className="text-lg font-semibold font-funnel-display mt-4">
                Privacy Policy
              </h2>
              <p className="text-sm font-funnel-display text-muted-foreground leading-relaxed">
                NHX Finance is committed to protecting your personal information
                in full compliance with the Kenya Data Protection Act, 2019 and
                the General Data Protection Regulation (GDPR) where applicable.
                We collect only the data necessary for KYC/AML compliance,
                source-of-funds verification, minting, and yield
                distribution—including identity documents, wallet addresses,
                transaction records, and contact details—processed securely via
                encrypted channels and stored with restricted access. We do not
                sell your data and share it only with regulated partners as
                required for service delivery or legal obligations. You have the
                right to access, rectify, or delete your data by contacting
                nhxfinance@gmail.com.
              </p>
              <h2 className="text-lg font-semibold font-funnel-display mt-4">
                Cookies
              </h2>
              <p className="text-sm font-funnel-display text-muted-foreground leading-relaxed">
                Our website uses essential cookies to enable core functionality
                (session management, security, and login persistence), analytics
                cookies (via Plausible Analytics, privacy-first and anonymised)
                to understand usage patterns, and no third-party tracking or
                advertising cookies. By continuing to browse you consent to the
                placement of these cookies. You can manage or disable
                non-essential cookies at any time through your browser settings
                without affecting core platform access.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
