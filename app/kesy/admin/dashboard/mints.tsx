"use client";
import { useState, useEffect } from "react";
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
import React from "react";
import Link from "next/link";
import { TransactionItem, useTransactions } from "@/hooks/kesy/useTransactions";
import AdminNavbar from "./navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { MintStatus, normalizeStatus, getActionButtonText } from "./constants";
import {
  formatWalletAddress,
  formatAmount,
  formatDate,
} from "./modal-components";
import ApproveModal from "./approve-modal";

function MintsTable() {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [mintRequest, setMintRequest] = useState<TransactionItem | null>(null);
  console.log("mintRequest", mintRequest);
  const { data: transactions, isLoading, error } = useTransactions("admin");
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
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
                {formatWalletAddress(transaction.walletAddress)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  className="rounded-3xl border border-foreground/20 shadow-none text-xs w-24"
                  disabled={
                    normalizeStatus(transaction.status) ===
                    MintStatus.TRANSFERRED
                  }
                  onClick={() => {
                    setMintRequest(transaction);
                    setApproveModalOpen(true);
                  }}
                >
                  {getActionButtonText(transaction.status)}
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
          request={mintRequest}
          closeModal={() => setApproveModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MintsTable;
