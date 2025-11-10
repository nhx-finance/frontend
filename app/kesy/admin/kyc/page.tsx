"use client";
import React, { useState } from "react";
import AdminNavbar from "../dashboard/navbar";
import {
  KYCItem,
  useApproveKYC,
  useGetAllKYCStatuses,
} from "@/hooks/kesy/useKYC";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ApproveModal({
  kyc,
  closeModal,
}: {
  kyc: KYCItem | null;
  closeModal: () => void;
}) {
  const { mutate: approveKYC, isPending } = useApproveKYC();

  if (!kyc) {
    return (
      <div className="fixed inset-0 px-2 w-screen z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
          <div className="flex items-center justify-between">
            No KYC request selected
          </div>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    if (!kyc) {
      toast.error("No KYC request selected");
      return;
    }
    approveKYC({
      kycId: kyc.kycId,
      status: "VERIFIED",
      rejectedReason: "",
      reviewerNotes: "KYC approved by admin",
    });
  };

  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-xl font-funnel-display font-bold">
              Approve KYC
            </h1>
            <p className="text-sm font-funnel-display text-muted-foreground">
              Approve or reject a KYC request.
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
            <div className="">
              <div className="flex gap-4 md:items-center justify-between flex-col md:flex-row">
                <div className="flex flex-col">
                  <p className="text-xs font-funnel-display text-muted-foreground">
                    Full Name
                  </p>
                  <p className="text-sm font-funnel-display font-semibold">
                    {kyc.fullName}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="md:text-xs font-funnel-display text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm font-funnel-display font-semibold">
                    {kyc.userEmail}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="md:text-xs font-funnel-display text-muted-foreground">
                    DOB
                  </p>
                  <p className="text-sm font-funnel-display font-semibold">
                    {kyc.dob}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="md:text-xs font-funnel-display text-muted-foreground">
                    Document Number
                  </p>
                  <p className="text-sm font-funnel-display font-semibold">
                    {kyc.documentNumber}
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full">
                <h1 className="text-lg font-funnel-display font-semibold">
                  Documents
                </h1>
                <div className="flex items-center gap-2 md:flex-row flex-col mt-2">
                  <div className="flex w-full md:w-1/2 items-center gap-2 rounded-3xl border border-foreground/20 p-2">
                    <Image
                      src={kyc.documentFrontPath}
                      alt="Document Front"
                      width={100}
                      height={100}
                      className="h-48 w-full object-contain rounded-2xl"
                    />
                  </div>
                  <div className="flex w-full md:w-1/2 items-center gap-2 rounded-3xl border border-foreground/20 p-2">
                    <Image
                      src={kyc.documentBackPath}
                      alt="Document Back"
                      width={100}
                      height={100}
                      className="h-48 w-full object-contain rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="w-1/2 mt-4 rounded-3xl border border-foreground/20 shadow-none"
            onClick={handleApprove}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Approve"
            )}
            {isPending ? null : <CheckIcon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function KYCPage() {
  const { data, isLoading, error } = useGetAllKYCStatuses();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [kyc, setKyc] = useState<KYCItem | null>(null);
  const router = useRouter();
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

  console.log(data);
  return (
    <div className="max-w-7xl mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl font-funnel-display font-semibold mt-4 px-4">
        Review KYC Statuses
      </h1>
      <Table>
        <TableCaption>Submitted KYC Requests</TableCaption>
        <TableHeader>
          <TableRow className="font-funnel-display">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((kyc) => (
            <TableRow key={kyc.kycId}>
              <TableCell className="font-medium font-funnel-display">
                {kyc.kycId.slice(0, 6)}...{kyc.kycId.slice(-4)}
              </TableCell>
              <TableCell>{kyc.status}</TableCell>
              <TableCell>{kyc.fullName}</TableCell>
              <TableCell>{kyc.userEmail}</TableCell>
              <TableCell>{kyc.documentType.toUpperCase()}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  className="rounded-3xl border border-foreground/20 shadow-none text-xs w-24"
                  disabled={
                    kyc.status === "verified" || kyc.status === "rejected"
                  }
                  onClick={() => {
                    setKyc(kyc);
                    setApproveModalOpen(true);
                  }}
                >
                  {kyc.status.toLowerCase() === "submitted" && "Verify"}
                  {kyc.status.toLowerCase() === "verified" && "Verified"}
                  {kyc.status.toLowerCase() === "rejected" && "Rejected"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {approveModalOpen && (
        <ApproveModal kyc={kyc} closeModal={() => setApproveModalOpen(false)} />
      )}
    </div>
  );
}

export default KYCPage;
