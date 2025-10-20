import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL =
  "https://nhxwebserver-hzbrdehsdffqhugw.southafricanorth-01.azurewebsites.net/api/v1";
