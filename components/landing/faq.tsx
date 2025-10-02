"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function Faq() {
  const placeholders = [
    "Who is NHX for?",
    "What KYC/AML documents do I need to provide?",
    "Are the tokens permissionless?",
    "How do I buy tokens?",
    "How long does it take to receive my tokens?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 font-funnel-display text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask NHX Anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
