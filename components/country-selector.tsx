"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountries, type Country } from "@/hooks/kesy/useCountries";
import { Loader2, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CountrySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function CountrySelector({
  value,
  onValueChange,
  placeholder = "Select country",
  disabled = false,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: countries, isLoading } = useCountries();

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

    const sorted = [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    if (!searchQuery.trim()) {
      return sorted;
    }

    const query = searchQuery.toLowerCase().trim();
    return sorted.filter(
      (country) =>
        country.name.common.toLowerCase().includes(query) ||
        country.name.official.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

  const selectedCountry = useMemo(() => {
    if (!value || !countries) return null;
    return countries.find((c) => c.name.common === value);
  }, [value, countries]);

  const handleSelect = (country: Country) => {
    onValueChange(country.name.common);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !selectedCountry && "text-muted-foreground"
          )}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading countries...</span>
            </>
          ) : selectedCountry ? (
            <div className="flex items-center gap-2">
              <Image
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                width={24}
                height={24}
                className="rounded-full object-cover w-6 h-6"
              />
              <span className="font-funnel-display">
                {selectedCountry.name.common}
              </span>
            </div>
          ) : (
            <span className="font-funnel-display">{placeholder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col">
          <div className="border-b p-2">
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9"
              autoFocus
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No countries found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCountries.map((country) => {
                  const isSelected = value === country.name.common;
                  return (
                    <button
                      key={country.name.common}
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={cn(
                        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:bg-accent focus:text-accent-foreground",
                        isSelected && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Image
                        src={country.flags.png}
                        alt={country.name.common}
                        width={24}
                        height={24}
                        className="rounded-full object-cover w-6 h-6"
                      />
                      <span className="flex-1 text-left font-funnel-display">
                        {country.name.common}
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
