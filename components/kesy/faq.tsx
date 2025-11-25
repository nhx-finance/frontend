import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

const kesyFAQs: FAQ[] = [
  {
    question: "What is KESY, and how does it work?",
    answer:
      "KESY is a stablecoin pegged 1:1 to the Kenyan Shilling (KES), issued by NHX Finance and backed by high-quality short-term Treasury bills and CMA-approved money market funds. Institutions can mint KESY with a minimum of KES 10 million, while users can acquire it on secondary markets or stake it in NHX Vaults for yield. The peg is maintained through daily reserve attestations, ensuring stability and compliance with the VASP Bill, 2025.",
  },
  {
    question: "Who can use KESY?",
    answer:
      "KESY is primarily designed for institutions (e.g., banks, exchanges, fintechs) to mint for operational use, such as cross-border payments or liquidity provision. Additionally, institutional and individual investors holding ≥10,000 KESY can stake in NHX Vaults for yield. Secondary market traders can purchase KESY on platforms like SaucerSwap, subject to exchange policies.",
  },
  {
    question: "How is KESY different from USDT or USDC?",
    answer:
      "Unlike USDT or USDC, which are pegged to the U.S. Dollar, KESY is pegged to the Kenyan Shilling, addressing local currency needs. It also offers a 30% yield distribution to stakers in NHX Vaults, unlike Tether and Circle, which retain all profits. KESY’s reserves are invested in Kenyan Treasury bills, regulated by the CMA and CBK.",
  },
  {
    question: "How long does it take to mint KESY after depositing funds?",
    answer:
      "After depositing funds, there is a few verification days to verify funds and allocate reserves to Treasury bills, per VASP requirements. Once settled, KESY tokens are minted and transferred to your whitelisted wallet within 24 hours.",
  },
];

function FAQ() {
  return (
    <div className="space-y-4 mt-20">
      <h1 className="text-2xl font-semibold text-center font-funnel-display">
        FAQs
      </h1>
      {kesyFAQs.map((faq, index) => (
        <details
          key={index}
          className="group [&_summary::-webkit-details-marker]:hidden border-b border-foreground/20"
          open={index === 0}
        >
          <summary className="flex items-center justify-between gap-1.5 cursor-pointer p-4">
            <h2 className="text-base font-medium font-funnel-display">
              {faq.question}
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-sm font-funnel-display leading-relaxed text-foreground/80 pb-4">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export default FAQ;
