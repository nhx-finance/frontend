"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldDescription } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useComplianceAction } from "@/hooks/kesy/useCompliance";
import { validateComplianceActionInput } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type ComplianceAction = "freeze" | "wipe" | "unfreeze";

export function ActionTabs() {
  const [formState, setFormState] = React.useState<
    Record<ComplianceAction, { accountId: string; reason: string }>
  >({
    freeze: { accountId: "", reason: "" },
    wipe: { accountId: "", reason: "" },
    unfreeze: { accountId: "", reason: "" },
  });
  const {
    mutate: performComplianceAction,
    isPending,
    error,
  } = useComplianceAction();

  const updateField = (
    action: ComplianceAction,
    field: "accountId" | "reason",
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [action]: {
        ...prev[action],
        [field]: value,
      },
    }));
  };

  const validateAction = (action: ComplianceAction) => {
    const { accountId, reason } = formState[action];
    return validateComplianceActionInput(accountId, reason);
  };

  const handleSubmit = (action: ComplianceAction) => {
    const validation = validateAction(action);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    performComplianceAction(
      {
        accountId: formState[action].accountId.trim(),
        reason: formState[action].reason.trim(),
        action,
      },
      {
        onSuccess: () => {
          setFormState((prev) => ({
            ...prev,
            [action]: { accountId: "", reason: "" },
          }));
        },
      },
    );
  };
  return (
    <Tabs defaultValue="freeze" className="h-full">
      <TabsList
        variant="line"
        className="flex items-center justify-center w-full"
      >
        <TabsTrigger value="freeze">Freeze</TabsTrigger>
        <TabsTrigger value="wipe">Wipe</TabsTrigger>
        <TabsTrigger value="unfreeze">Unfreeze</TabsTrigger>
      </TabsList>
      <TabsContent value="freeze">
        <div className="mt-4">
          <p className="text-sm font-funnel-display text-muted-foreground">
            A freeze operation restricts an account from performing any
            transactions or actions, effectively locking the account while
            preserving its data and balance.
          </p>
        </div>
        <div className="mt-6 mb-2">
          <FieldGroup className="max-w-sm">
            <Field>
              <InputGroup className="h-auto">
                <InputGroupInput
                  id="block-start-input"
                  placeholder="Enter Account ID"
                  value={formState.freeze.accountId}
                  onChange={(event) =>
                    updateField("freeze", "accountId", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText>Account ID</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Account ID of the user you wish to freeze. You can find this in
                the KYC tab.
              </FieldDescription>
            </Field>
            <Field>
              <InputGroup>
                <InputGroupTextarea
                  id="block-start-textarea"
                  placeholder="Enter reason for freezing the account"
                  className="text-sm"
                  value={formState.freeze.reason}
                  onChange={(event) =>
                    updateField("freeze", "reason", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText className="">Reason</InputGroupText>
                  <InputGroupButton size="icon-xs" className="ml-auto">
                    <CopyIcon />
                    <span className="sr-only">Copy</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Why is this account being frozen? Reasons are logged as HCS
                messages and are important for audit and compliance purposes.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <Button
            disabled={isPending || !validateAction("freeze").isValid}
            onClick={() => handleSubmit("freeze")}
            className="mt-4 bg-foreground hover:bg-foreground/80 ease-in w-full transition-all rounded-2xl duration-300"
          >
            <span className="font-funnel-display font-semibold text-background">
              {isPending ? "Processing..." : "Freeze Account"}
            </span>
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="wipe">
        <div className="mt-4">
          <p className="text-sm font-funnel-display text-muted-foreground">
            A wipe operation permanently clears an account&rsquo;s KESY balance,
            ensuring tokens can no longer be used while preserving an auditable
            record of the action.
          </p>
        </div>
        <div className="my-6">
          <FieldGroup className="max-w-sm">
            <Field>
              <InputGroup className="h-auto">
                <InputGroupInput
                  id="wipe-account-id-input"
                  placeholder="Enter Account ID"
                  value={formState.wipe.accountId}
                  onChange={(event) =>
                    updateField("wipe", "accountId", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText>Account ID</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Account ID of the user you wish to wipe. You can find this in
                the KYC tab.
              </FieldDescription>
            </Field>
            <Field>
              <InputGroup>
                <InputGroupTextarea
                  id="wipe-reason-textarea"
                  placeholder="Enter reason for wiping the account"
                  className="text-sm"
                  value={formState.wipe.reason}
                  onChange={(event) =>
                    updateField("wipe", "reason", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText className="">Reason</InputGroupText>
                  <InputGroupButton size="icon-xs" className="ml-auto">
                    <CopyIcon />
                    <span className="sr-only">Copy</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Why is this account being wiped? Reasons are logged as HCS
                messages and are important for audit and compliance purposes.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <Button
            disabled={isPending || !validateAction("wipe").isValid}
            onClick={() => handleSubmit("wipe")}
            className="mt-4 bg-foreground hover:bg-foreground/80 ease-in w-full transition-all rounded-2xl duration-300"
          >
            <span className="font-funnel-display font-semibold text-background">
              {isPending ? "Processing..." : "Wipe Account"}
            </span>
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="unfreeze">
        <div className="mt-4">
          <p className="text-sm font-funnel-display text-muted-foreground">
            An unfreeze operation restores account activity, allowing the user
            to resume normal transactions and actions once compliance checks are
            complete.
          </p>
        </div>
        <div className="my-6">
          <FieldGroup className="max-w-sm">
            <Field>
              <InputGroup className="h-auto">
                <InputGroupInput
                  id="unfreeze-account-id-input"
                  placeholder="Enter Account ID"
                  value={formState.unfreeze.accountId}
                  onChange={(event) =>
                    updateField("unfreeze", "accountId", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText>Account ID</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Account ID of the user you wish to unfreeze. You can find this
                in the KYC tab.
              </FieldDescription>
            </Field>
            <Field>
              <InputGroup>
                <InputGroupTextarea
                  id="unfreeze-reason-textarea"
                  placeholder="Enter reason for unfreezing the account"
                  className="text-sm"
                  value={formState.unfreeze.reason}
                  onChange={(event) =>
                    updateField("unfreeze", "reason", event.target.value)
                  }
                />
                <InputGroupAddon align="block-start">
                  <InputGroupText className="">Reason</InputGroupText>
                  <InputGroupButton size="icon-xs" className="ml-auto">
                    <CopyIcon />
                    <span className="sr-only">Copy</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Why is this account being unfrozen? Reasons are logged as HCS
                messages and are important for audit and compliance purposes.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <Button
            disabled={isPending || !validateAction("unfreeze").isValid}
            onClick={() => handleSubmit("unfreeze")}
            className="mt-4 bg-foreground hover:bg-foreground/80 ease-in w-full transition-all rounded-2xl duration-300"
          >
            <span className="font-funnel-display font-semibold text-background">
              {isPending ? "Processing..." : "Unfreeze Account"}
            </span>
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
