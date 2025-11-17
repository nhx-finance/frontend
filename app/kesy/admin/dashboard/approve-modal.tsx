"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  CheckIcon,
  CopyIcon,
  RefreshCcwIcon,
  SignatureIcon,
} from "lucide-react";
import {
  TransactionItem,
  useExecuteTransaction,
  useGetMultisigTransaction,
  useSignMultisigTransaction,
  useUpdateTransactionStatus,
} from "@/hooks/kesy/useTransactions";
import { toast } from "sonner";
import { MULTSIG_ADDR } from "@/lib/utils";
import { MintStatus, normalizeStatus } from "./constants";
import {
  ModalWrapper,
  ModalHeader,
  TransactionDetails,
  PayloadInput,
  ErrorMessage,
} from "./modal-components";

export default function ApproveModal({
  request,
  closeModal,
}: {
  request: TransactionItem | null;
  closeModal: () => void;
}) {
  const { mutate: updateTransactionStatus, isPending } =
    useUpdateTransactionStatus();
  const { mutate: executeTransaction, isPending: isExecuting } =
    useExecuteTransaction();
  const { mutate: signMultisigTransaction, isPending: isSigning } =
    useSignMultisigTransaction();
  const {
    data: multisigTransaction,
    isLoading: isLoadingMultisigTransaction,
    error: errorMultisigTransaction,
  } = useGetMultisigTransaction(request?.treasuryTransactionId);
  const [payload, setPayload] = useState<string>("");
  const [adminAccountID, setAdminAccountID] = useState("");
  const [error, setError] = useState<string>("");

  const handleCloseModal = () => {
    closeModal();
    setPayload("");
    setError("");
  };

  if (!request) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-funnel-display text-muted-foreground">
            No mint request selected
          </p>
        </div>
      </ModalWrapper>
    );
  }

  const normalizedStatus = normalizeStatus(request.status);

  const handleUpdateTransactionStatus = (
    status: MintStatus,
    payload: string
  ) => {
    setError("");

    if (
      (status === MintStatus.CONFIRMED || status === MintStatus.TRANSFERRED) &&
      payload.trim().length === 0
    ) {
      setError("Please enter a valid payload");
      toast.error("Please enter a valid payload");
      return;
    }

    try {
      switch (status) {
        case MintStatus.CONFIRMED:
          updateTransactionStatus(
            {
              mintId: request.requestId,
              status: status.toUpperCase(),
              payload: payload,
            },
            {
              onSuccess: () => {
                setTimeout(() => {
                  handleCloseModal();
                }, 500);
              },
              onError: (err) => {
                const errorMessage =
                  err instanceof Error
                    ? err.message
                    : "Failed to update transaction status to confirmed";
                setError(errorMessage);
              },
            }
          );
          break;
        case MintStatus.MINTED:
          executeTransaction(
            {
              amount: request.amountKes,
              mintId: request.requestId,
            },
            {
              onSuccess: (data) => {
                toast.success("Transaction executed successfully");
                updateTransactionStatus(
                  {
                    mintId: data.message,
                    status: "MINTED",
                    payload: data.message,
                  },
                  {
                    onSuccess: () => {
                      setTimeout(() => {
                        handleCloseModal();
                      }, 500);
                    },
                  }
                );
              },
              onError: (err) => {
                const errorMessage =
                  err instanceof Error
                    ? err.message
                    : "Failed to execute transaction";
                toast.error("Failed to execute transaction");
                setError(errorMessage);
              },
            }
          );
          break;
        case MintStatus.TRANSFERRED:
          if (!payload || payload.trim().length === 0) {
            setError("Please enter your signing key");
            toast.error("Please enter your signing key");
            return;
          }
          if (!adminAccountID || adminAccountID.trim().length === 0) {
            setError("Please enter your Hedera account ID");
            toast.error("Please enter your Hedera account ID");
            return;
          }
          if (!multisigTransaction?.transaction_message) {
            setError("Transaction message not available");
            toast.error("Transaction message not available");
            return;
          }
          if (!request?.treasuryTransactionId) {
            setError("Multisig transaction ID not available");
            toast.error("Multisig transaction ID not available");
            return;
          }

          signMultisigTransaction(
            {
              signingKey: payload,
              multisigId: request.treasuryTransactionId,
              txnMessage: multisigTransaction.transaction_message,
              accountId: adminAccountID,
              amount: request.amountKes,
            },
            {
              onSuccess: (data) => {
                toast.success("Transaction sent successfully");
                updateTransactionStatus(
                  {
                    mintId: request.requestId,
                    status: "TRANSFERRED",
                    payload: request.requestId,
                  },
                  {
                    onSuccess: () => {
                      setTimeout(() => {
                        handleCloseModal();
                      }, 500);
                    },
                  }
                );
              },
              onError: (err) => {
                const errorMessage =
                  err instanceof Error
                    ? err.message
                    : "Failed to send transfer transaction";
                toast.error("Failed to send transfer transaction");
                setError(errorMessage);
              },
            }
          );
          break;
        case MintStatus.FAILED:
          toast.info("Retry functionality not yet implemented");
          break;
        default:
          setError("Invalid status");
          break;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (normalizedStatus === MintStatus.TRANSFERRED) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <ModalHeader
          title="Mint Transferred"
          description="The mint request has been transferred to the user's wallet."
        />
        <TransactionDetails transaction={request} />
      </ModalWrapper>
    );
  }

  if (normalizedStatus === MintStatus.FAILED) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <ModalHeader
          title="Failed to Mint"
          description="The mint request failed to be minted. Please inform the user and retry."
        />
        <TransactionDetails transaction={request} size="sm" />
        <div className="flex gap-2 items-center justify-between w-full mt-4">
          <Button
            className="rounded-full w-1/2 font-funnel-display flex items-center justify-center gap-2 border border-foreground/20 shadow-none text-sm"
            onClick={handleCloseModal}
          >
            Inform User
          </Button>
          <Button
            className="rounded-full w-1/2 bg-foreground/10 text-foreground font-funnel-display flex items-center justify-center gap-2 border border-foreground/20 shadow-none text-sm"
            onClick={handleCloseModal}
          >
            Retry <RefreshCcwIcon className="w-4 h-4" />
          </Button>
        </div>
      </ModalWrapper>
    );
  }

  if (normalizedStatus === MintStatus.PENDING) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <ModalHeader
          title="Mint Pending"
          description="The mint request is pending approval. Please approve or reject the request."
        >
          <div className="my-4">
            <div className="flex items-center justify-between border-b border-foreground/20 pb-2 border-dashed mt-2">
              <p className="text-sm font-funnel-display mt-2 text-muted-foreground">
                Mint ID:
              </p>
              <p className="text-sm flex items-center gap-2 font-funnel-display text-muted-foreground">
                {request.requestId.slice(0, 6)}...
                {request.requestId.slice(-4)}
                <CopyIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => {
                    toast.success("Mint ID copied to clipboard");
                    navigator.clipboard.writeText(request.requestId);
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between border-b border-foreground/20 pb-2 border-dashed">
              <p className="text-sm font-funnel-display mt-2 text-muted-foreground">
                Treasury Transaction ID:
              </p>
              <p className="text-sm flex items-center gap-2 font-funnel-display text-muted-foreground">
                {request.treasuryTransactionId || "Unavailable"}
                {request.treasuryTransactionId && (
                  <CopyIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      toast.success(
                        "Treasury Transaction ID copied to clipboard"
                      );
                      navigator.clipboard.writeText(
                        request.treasuryTransactionId
                      );
                    }}
                  />
                )}
              </p>
            </div>
          </div>
        </ModalHeader>
        <TransactionDetails transaction={request} />
        <PayloadInput
          placeholder="Enter Bank Transaction ID"
          value={payload}
          onChange={setPayload}
          error={error}
        />
        {error && <ErrorMessage message={error} />}
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="w-1/2 text-sm font-funnel-display mt-4 rounded-3xl border border-foreground/20 shadow-none"
            onClick={() =>
              handleUpdateTransactionStatus(MintStatus.CONFIRMED, payload)
            }
            disabled={isPending}
          >
            Confirm
            <CheckIcon className="w-4 h-4" />
          </Button>
        </div>
      </ModalWrapper>
    );
  }

  if (normalizedStatus === MintStatus.CONFIRMED) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <ModalHeader
          title="Execute Mint"
          description="Execute the mint request. Please enter the signatures of the mint request."
        />
        <TransactionDetails transaction={request} />
        <PayloadInput
          placeholder="Admin Minting this transaction"
          value={payload}
          onChange={setPayload}
          error={error}
        />
        {error && <ErrorMessage message={error} />}
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="w-1/2 mt-4 text-sm font-funnel-display rounded-3xl border border-foreground/20 shadow-none"
            onClick={() =>
              handleUpdateTransactionStatus(MintStatus.MINTED, payload)
            }
            disabled={isPending || isExecuting}
          >
            Mint To Treasury
            <CheckIcon className="w-4 h-4" />
          </Button>
        </div>
      </ModalWrapper>
    );
  }

  if (normalizedStatus === MintStatus.MINTED) {
    return (
      <ModalWrapper onClose={handleCloseModal}>
        <ModalHeader
          title="Sign Transaction"
          description="Sign the transfer transaction."
        />
        <TransactionDetails transaction={request} />
        <PayloadInput
          placeholder="Enter your signing key"
          value={payload}
          onChange={setPayload}
          error={error}
          isSecureEntry={true}
        />
        <PayloadInput
          placeholder="Enter your Account ID"
          value={adminAccountID}
          onChange={setAdminAccountID}
          error={error}
        />
        {error && <ErrorMessage message={error} />}
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="w-1/2 mt-4 rounded-3xl border border-foreground/20 shadow-none"
            onClick={() =>
              handleUpdateTransactionStatus(MintStatus.TRANSFERRED, payload)
            }
            disabled={
              isPending ||
              isExecuting ||
              isSigning ||
              isLoadingMultisigTransaction ||
              !multisigTransaction?.transaction_message ||
              !payload ||
              multisigTransaction?.status === "SIGNED"
            }
          >
            Sign Transaction
            <SignatureIcon className="w-4 h-4" />
          </Button>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <ModalHeader
        title="Mint Processed"
        description="The mint request has been processed."
      />
      <TransactionDetails transaction={request} />
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          className="w-1/2 mt-4 rounded-3xl border border-foreground/20 shadow-none"
          onClick={handleCloseModal}
          disabled
        >
          No Action
        </Button>
      </div>
    </ModalWrapper>
  );
}
