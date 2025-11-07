import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = "https://nhx-server.orcus-finance.space/api/v1";
export const KESY_URL =
  "https://nhxkesy-agdnfmf3cnb4abff.northeurope-01.azurewebsites.net/api";
