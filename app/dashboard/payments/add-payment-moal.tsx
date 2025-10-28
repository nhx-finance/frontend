import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import React from "react";

function AddPaymentModal({
  setShowAddPaymentModal,
}: {
  setShowAddPaymentModal: (show: boolean) => void;
}) {
  const handleSubmit = () => {
    console.log("Submit");
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
            <Select>
              <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                <SelectValue placeholder="Select payment provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Mpesa</SelectItem>
                <SelectItem value="paypal">KCB Bank</SelectItem>
                <SelectItem value="razorpay">Stripe</SelectItem>
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
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full mt-4 shadow-none">
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}

export default AddPaymentModal;
