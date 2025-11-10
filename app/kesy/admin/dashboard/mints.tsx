"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MintRequest, mintRequests } from "@/mocks/mints";
import React from "react";
import { CheckIcon, X } from "lucide-react";
import { hederaLogo, kesy } from "@/assets";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransactions } from "@/hooks/kesy/useTransactions";
import AdminNavbar from "./navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "KES",
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ApproveModal({
  request,
  closeModal,
}: {
  request: MintRequest;
  closeModal: () => void;
}) {
  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-xl font-funnel-display font-bold">
              Approve Mint
            </h1>
            <p className="text-sm font-funnel-display text-muted-foreground">
              Approve or reject a mint request.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border border-foreground/20 shadow-none text-sm"
            onClick={closeModal}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-4 md:gap-0 flex-col md:flex-row justify-between">
          <div className="w-full">
            <p className="text-sm font-funnel-display text-muted-foreground">
              Mint Request
            </p>
            <div className="flex items-center gap-1">
              <Image
                src={kesy}
                alt="KESY"
                width={24}
                height={24}
                className="rounded-full border border-foreground/20"
              />
              <h1 className="text-lg font-funnel-display font-semibold">
                {formatAmount(request.amount)}
              </h1>
            </div>
          </div>
          <div className="w-full">
            <p className="text-sm font-funnel-display text-muted-foreground">
              Destination Wallet
            </p>
            <div className="flex items-center gap-1">
              <Image
                src={hederaLogo}
                alt="KESY"
                width={24}
                height={24}
                className="rounded-full border border-foreground/20"
              />
              <h1 className="text-lg font-funnel-display font-semibold">
                {request.toWallet.slice(0, 6)}...{request.toWallet.slice(-4)}
              </h1>
            </div>
          </div>
          <div className="w-full">
            <p className="text-sm font-funnel-display text-muted-foreground">
              Date
            </p>
            <h1 className="text-lg font-funnel-display font-semibold">
              {formatDate(request.createdAt)}
            </h1>
          </div>
        </div>
        <div className="mt-4 ">
          <Input
            placeholder="Enter signatures"
            className="w-full rounded-3xl font-funnel-display shadow-none h-[2.8rem] border border-foreground/20"
          />
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="w-1/2 mt-4 rounded-3xl border border-foreground/20 shadow-none"
            onClick={closeModal}
          >
            Approve
            <CheckIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MintsTable() {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const { data: transactions, isLoading, error } = useTransactions();
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <AdminNavbar />
        <h1 className="text-2xl font-funnel-display font-semibold mt-4 mb-12 px-4">
          Review KYC Statuses
        </h1>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-[90%] h-10 rounded-xl my-2 mx-4" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center flex-col justify-center h-screen w-full">
        <p className="text-sm text-red-500 font-funnel-display">
          Error: {error.message}
        </p>
        <p className="text-muted-foreground font-funnel-display text-sm">
          Seems like your session has expired. Please login again.
        </p>
        <Button
          variant="outline"
          className="mt-4 min-w-md shadow-none font-funnel-display"
          onClick={() => router.push("/kesy/admin")}
        >
          Login Again
        </Button>
      </div>
    );
  }
  return (
    <div className="px-4 mt-12">
      <h1 className="text-2xl font-funnel-display font-bold">Mints</h1>
      <p className="text-sm font-funnel-display text-muted-foreground">
        Recent Mints Requests
      </p>
      <Table>
        <TableCaption className="">Recent mint requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Request ID</TableHead>
            <TableHead className="font-funnel-display">Status</TableHead>
            <TableHead className="font-funnel-display">Amount</TableHead>
            <TableHead className="font-funnel-display">Date</TableHead>
            <TableHead className="font-funnel-display">Destination</TableHead>
            <TableHead className="font-funnel-display text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-funnel-display">
          {transactions?.content.map((transaction) => (
            <TableRow key={transaction.requestId}>
              <TableCell className="font-medium">
                {transaction.requestId.slice(0, 6)}...
                {transaction.requestId.slice(-4)}
              </TableCell>
              <TableCell>{transaction.status.toUpperCase()}</TableCell>
              <TableCell>{formatAmount(transaction.amountKes)}</TableCell>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>
                {transaction.walletAddress.slice(0, 6)}...
                {transaction.walletAddress.slice(-4)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  className="rounded-3xl border border-foreground/20 shadow-none text-xs w-24"
                  disabled={transaction.status === "transferred"}
                  onClick={() => setApproveModalOpen(true)}
                >
                  {transaction.status.toLocaleLowerCase() === "pending" &&
                    "Approve"}
                  {transaction.status.toLocaleLowerCase() === "confirmed" &&
                    "Mint"}
                  {transaction.status.toLocaleLowerCase() === "minted" &&
                    "Transfer"}
                  {transaction.status.toLocaleLowerCase() === "transferred" &&
                    "Transferred"}
                  {transaction.status.toLocaleLowerCase() === "failed" &&
                    "Retry"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <Link
          href="/kesy/admin/mints"
          className="text-blue-500 underline text-sm font-funnel-display"
        >
          View All
        </Link>
      </div>
      {approveModalOpen && (
        <ApproveModal
          request={mintRequests[0]}
          closeModal={() => setApproveModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MintsTable;
