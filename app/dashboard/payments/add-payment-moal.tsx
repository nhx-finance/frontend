"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddPaymentMethod } from "@/hooks/use-payments";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddPaymentModal({
  setShowAddPaymentModal,
}: {
  setShowAddPaymentModal: (show: boolean) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [accountNumber, setAccountNumber] = useState("");
  const { addPaymentMethodMutation, isPending } = useAddPaymentMethod();

  const handleSubmit = () => {
    if (accountNumber === "" || paymentMethod === "") {
      toast.error("Please fill in all fields");
      return;
    }
    addPaymentMethodMutation({ paymentMethod, accountNumber });
  };
  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
        <div className="fex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-funnel-display font-bold">
              Add Payment Method
            </h1>
            <Button
              variant="outline"
              className="shadow-none"
              size="sm"
              onClick={() => setShowAddPaymentModal(false)}
            >
              <X className="w-2 h-2" />
            </Button>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <h1 className="text-sm font-funnel-display font-bold text-muted-foreground">
              Payment Provider
            </h1>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                <SelectValue placeholder="Select payment provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpesa">Mpesa</SelectItem>
                <SelectItem value="kcb">KCB Bank</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <h1 className="text-sm font-funnel-display font-bold text-muted-foreground">
              Account/Phone Number
            </h1>
            <Input
              placeholder="254712345678"
              className="rounded-3xl font-funnel-display shadow-none"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full mt-4 shadow-none"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Add Payment Method"
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddPaymentModal;
