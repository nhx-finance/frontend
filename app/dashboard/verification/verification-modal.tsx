"use client";
import React, { useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconUpload } from "@tabler/icons-react";
import { useCompleteKYC } from "@/hooks/use-verification";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  accountType: z.enum(["individual", "business"]),
  idNumber: z.string().min(1, { message: "ID number is required" }),
  documentFront: z.any().optional(),
  documentBack: z.any().optional(),
  documentType: z.enum(["id", "passport", "driver's license"]),
});

const Step1 = ({
  form,
  onNext,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onNext: () => void;
}) => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-funnel-display font-bold">
          Personal Information
        </h1>
        <p className="text-muted-foreground text-sm text-balance font-medieval-sharp">
          Step 1 of 3
        </p>
      </div>
      <div className="w-full max-w-md">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="John Doe"
                  className="rounded-3xl font-funnel-display shadow-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Account Type
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                ID Number
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="1234567890"
                  className="rounded-3xl font-funnel-display shadow-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button onClick={onNext} className="w-full mt-2">
        Next
      </Button>
    </div>
  );
};

const Step2 = ({
  form,
  onNext,
  onBack,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-funnel-display font-bold">
          Residential Information
        </h1>
        <p className="text-muted-foreground text-sm text-balance font-medieval-sharp">
          Step 2 of 3
        </p>
      </div>
      <div className="w-full max-w-md">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="123 Main St"
                  className="rounded-3xl font-funnel-display shadow-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Residence Country
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                    <SelectValue placeholder="Select residence country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="ke">Kenya</SelectItem>
                    <SelectItem value="za">South Africa</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                City/Province
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                    <SelectValue placeholder="Select city/province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="province1">Province 1</SelectItem>
                    <SelectItem value="province2">Province 2</SelectItem>
                    <SelectItem value="province3">Province 3</SelectItem>
                    <SelectItem value="province4">Province 4</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="+254712345678"
                  className="rounded-3xl font-funnel-display shadow-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <Button
          onClick={onBack}
          className="w-1/2 mt-2 shadow-none"
          variant="outline"
        >
          Back
        </Button>
        <Button onClick={onNext} className="w-1/2 mt-2 shadow-none">
          Next
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({
  form,
  onBack,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onBack: () => void;
}) => {
  const frontFileRef = React.useRef<HTMLInputElement>(null);
  const backFileRef = React.useRef<HTMLInputElement>(null);
  const mutation = useCompleteKYC();

  const documentFront = form.watch("documentFront");
  const documentBack = form.watch("documentBack");

  const handleSubmit = async () => {
    const formData = form.getValues();
    console.log(formData);
    mutation?.completeKYCMutation();
  };

  const handleDocumentFrontUpload = () => {
    frontFileRef.current?.click();
  };

  const handleDocumentBackUpload = () => {
    backFileRef.current?.click();
  };

  const handleFrontFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("documentFront", file);
    }
  };

  const handleBackFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("documentBack", file);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-funnel-display font-bold">
          Document Information
        </h1>
        <p className="text-muted-foreground text-sm text-balance font-medieval-sharp">
          Step 3 of 3
        </p>
      </div>
      <div className="w-full max-w-md">
        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="text-sm font-medium font-funnel-display">
                Document Type
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-3xl font-funnel-display shadow-none w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driver's license">
                      Driver's License
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-between md:flex-row gap-2">
          <FormField
            control={form.control}
            name="documentFront"
            render={({ field }) => (
              <FormItem className="my-4 w-full md:w-1/2">
                <FormLabel className="text-sm font-medium font-funnel-display">
                  Document Front
                </FormLabel>
                <FormControl>
                  <div
                    className="cursor-pointer border border-foreground/20 rounded-3xl p-2 h-44 flex items-center justify-center flex-col overflow-hidden"
                    onClick={handleDocumentFrontUpload}
                  >
                    {documentFront ? (
                      <img
                        src={URL.createObjectURL(documentFront)}
                        alt="Document Front"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <>
                        <IconUpload className="w-6 h-6 text-foreground" />
                        <p className="text-sm text-muted-foreground font-funnel-display">
                          Upload document Frontside
                        </p>
                      </>
                    )}
                  </div>
                </FormControl>
                <input
                  type="file"
                  ref={frontFileRef}
                  onChange={handleFrontFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentBack"
            render={({ field }) => (
              <FormItem className="my-4 w-full md:w-1/2">
                <FormLabel className="text-sm font-medium font-funnel-display">
                  Document Backside
                </FormLabel>
                <FormControl>
                  <div
                    className="cursor-pointer border border-foreground/20 rounded-3xl p-2 h-44 flex items-center justify-center flex-col overflow-hidden"
                    onClick={handleDocumentBackUpload}
                  >
                    {documentBack ? (
                      <img
                        src={URL.createObjectURL(documentBack)}
                        alt="Document Back"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <>
                        <IconUpload className="w-6 h-6 text-foreground" />
                        <p className="text-sm text-muted-foreground font-funnel-display">
                          Upload document Backside
                        </p>
                      </>
                    )}
                  </div>
                </FormControl>
                <input
                  type="file"
                  ref={backFileRef}
                  onChange={handleBackFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <Button
          onClick={onBack}
          className="w-1/2 mt-2 shadow-none"
          variant="outline"
          disabled={mutation?.isPending}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-1/2 mt-2 shadow-none"
          disabled={mutation?.isPending}
        >
          {mutation?.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

function VerificationModal({
  setShowVerificationModal,
}: {
  setShowVerificationModal: (show: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      accountType: "individual",
      idNumber: "",
      documentFront: undefined,
      documentBack: undefined,
      documentType: "id",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return <Step1 form={form} onNext={handleNext} />;
    }
    if (currentStep === 2) {
      return <Step2 form={form} onNext={handleNext} onBack={handleBack} />;
    }
    if (currentStep === 3) {
      return <Step3 form={form} onBack={handleBack} />;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-funnel-display font-bold text-muted-foreground">
            Verification
          </h1>
          <Button
            variant="outline"
            className="shadow-none"
            size="sm"
            onClick={() => setShowVerificationModal(false)}
          >
            <X className="w-2 h-2" />
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            {renderStep()}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VerificationModal;
