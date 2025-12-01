"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSubmitUserDetails } from "@/hooks/kesy/useAuthentication";
import { useCountries } from "@/hooks/kesy/useCountries";
import { CountrySelector } from "@/components/country-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DetailsFormData {
  firstName: string;
  lastName: string;
  dob: Date | undefined;
  country: string;
  province: string;
  timezone: string;
  termsAgreed: boolean;
}

export function DetailsForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DetailsFormData>({
    firstName: "",
    lastName: "",
    dob: undefined,
    country: "",
    province: "",
    timezone: "",
    termsAgreed: false,
  });
  const { mutate: submitUserDetailsMutation, isPending } =
    useSubmitUserDetails();

  useCountries();

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.dob) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.country || !formData.province || !formData.timezone) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAgreed) {
      toast.error("Please agree to all terms");
      return;
    }

    submitUserDetailsMutation(formData);
  };

  const renderStep1 = () => (
    <>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Step 1 of 3
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
        <Input
          id="firstName"
          type="text"
          placeholder="John"
          required
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
        <Input
          id="lastName"
          type="text"
          placeholder="Doe"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dob && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dob ? (
                formData.dob.toLocaleDateString()
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dob}
              onSelect={(date) => setFormData({ ...formData, dob: date })}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <Button type="button" onClick={handleNext} className="w-full">
          Next
        </Button>
      </Field>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Location Information</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Step 2 of 3
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="country">Country of Residence</FieldLabel>
        <CountrySelector
          value={formData.country}
          onValueChange={(value) =>
            setFormData({ ...formData, country: value })
          }
          placeholder="Select country"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="province">Region</FieldLabel>
        <Select
          value={formData.province}
          onValueChange={(value) =>
            setFormData({ ...formData, province: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NORTH">North</SelectItem>
            <SelectItem value="EAST">East</SelectItem>
            <SelectItem value="SOUTH">South</SelectItem>
            <SelectItem value="WEST">West</SelectItem>
            <SelectItem value="CENTRAL">Central</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
        <Select
          value={formData.timezone}
          onValueChange={(value) =>
            setFormData({ ...formData, timezone: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UTC (UTC+0)">UTC (UTC+0)</SelectItem>
            <SelectItem value="EST (UTC-5)">EST (UTC-5)</SelectItem>
            <SelectItem value="PST (UTC-8)">PST (UTC-8)</SelectItem>
            <SelectItem value="CET (UTC+1)">CET (UTC+1)</SelectItem>
            <SelectItem value="EAT (UTC+3)">EAT (UTC+3)</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleNext} className="flex-1">
            Next
          </Button>
        </div>
      </Field>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Step 3 of 3
        </p>
      </div>
      <Field>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="termsAgreed"
            checked={formData.termsAgreed}
            onChange={(e) =>
              setFormData({ ...formData, termsAgreed: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <FieldLabel htmlFor="termsAgreed" className="cursor-pointer">
              I agree to the Terms and Conditions
            </FieldLabel>
            <FieldDescription>
              Please read and agree to our{" "}
              <a href="/terms" className="underline underline-offset-4">
                terms and conditions
              </a>{" "}
              to continue.
            </FieldDescription>
          </div>
        </div>
      </Field>
      <Field>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacyAgreed"
            checked={formData.termsAgreed}
            onChange={(e) =>
              setFormData({ ...formData, termsAgreed: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <FieldLabel htmlFor="privacyAgreed" className="cursor-pointer">
              I agree to the Privacy Policy
            </FieldLabel>
            <FieldDescription>
              Please read and agree to our{" "}
              <a href="/privacy" className="underline underline-offset-4">
                privacy policy
              </a>{" "}
              to continue.
            </FieldDescription>
          </div>
        </div>
      </Field>
      <Field>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            onClick={handleSubmit}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </Field>
    </>
  );

  return (
    <form
      className={cn("flex flex-col gap-6 font-funnel-display", className)}
      {...props}
    >
      <FieldGroup>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </FieldGroup>
    </form>
  );
}
