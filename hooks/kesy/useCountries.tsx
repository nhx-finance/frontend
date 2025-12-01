import { COUNTRIES_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CountryFlags {
  png: string;
  svg: string;
  alt: string;
}

export interface NativeNameEntry {
  official: string;
  common: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName: Record<string, NativeNameEntry>;
}

export interface Country {
  flags: CountryFlags;
  name: CountryName;
}

export type Countries = Country[];

async function getCountries(): Promise<Countries> {
  try {
    const response = await axios.get(COUNTRIES_URL);
    if (response.status !== 200) {
      throw new Error("Failed to get countries");
    }
    return response.data;
  } catch (error) {
    console.error("error getting countries", error);
    throw error;
  }
}

export const useCountries = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, isLoading, error };
};
