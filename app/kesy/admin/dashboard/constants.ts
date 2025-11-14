export enum MintStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  MINTED = "minted",
  TRANSFERRED = "transferred",
  FAILED = "failed",
}

export function normalizeStatus(status: string): MintStatus {
  const normalized = status.toLowerCase().trim();
  return normalized as MintStatus;
}

export function getActionButtonText(status: string): string {
  const normalized = normalizeStatus(status);

  switch (normalized) {
    case MintStatus.PENDING:
      return "Approve";
    case MintStatus.CONFIRMED:
      return "Mint";
    case MintStatus.MINTED:
      return "Transfer";
    case MintStatus.TRANSFERRED:
      return "Transferred";
    case MintStatus.FAILED:
      return "Retry";
    default:
      return "View";
  }
}
