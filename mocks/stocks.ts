import { eqty, hafr, kcb, kegn, scom } from "@/assets";

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
  volume: number;
  marketCap: number;
  sector: string;
  country: string;
  currency: string;
  exchange: string;
  type: string;
  logo: string;
  description: string;
  website: string;
  founded: string;
  industry: string;
}

export const stocks: Stock[] = [
  {
    id: 1,
    ticker: "KCB",
    name: "KCB Group",
    price: 145.85,
    change: 1.64,
    changePercentage: 1.6,
    volume: 1000000,
    marketCap: 1000000,
    sector: "Banking",
    country: "Kenya",
    currency: "KES",
    exchange: "NSE",
    type: "Stock",
    logo: kcb,
    description: "KCB Group is a Kenyan bank.",
    website: "https://www.kcb.co.ke",
    founded: "1906",
    industry: "Banking",
  },
  {
    id: 2,
    ticker: "SCOM",
    name: "Safaricom PLC",
    price: 24.56,
    change: 0.85,
    changePercentage: -7.5,
    volume: 1000000,
    marketCap: 1000000,
    sector: "Telecommunications",
    country: "Kenya",
    currency: "KES",
    exchange: "NSE",
    type: "Stock",
    logo: scom,
    description: "SCOM is a Kenyan telecommunications company.",
    website: "https://www.scom.co.ke",
    founded: "1906",
    industry: "Telecommunications",
  },
  {
    id: 3,
    ticker: "EQTY",
    name: "Equity Group Holdings",
    price: 79.76,
    change: 11.23,
    changePercentage: 12.8,
    volume: 1000000,
    marketCap: 1000000,
    sector: "Insurance",
    country: "Kenya",
    currency: "KES",
    exchange: "NSE",
    type: "Stock",
    logo: eqty,
    description: "Equity Group Holdings is a Kenyan insurance company.",
    website: "https://www.equity.co.ke",
    founded: "1906",
    industry: "Insurance",
  },
  {
    id: 4,
    ticker: "KEGN",
    name: "Kenya Electricity Company",
    price: 126.32,
    change: 20.87,
    changePercentage: -0.96,
    volume: 1000000,
    marketCap: 1000000,
    sector: "Energy",
    country: "Kenya",
    currency: "KES",
    exchange: "NSE",
    type: "Stock",
    logo: kegn,
    description:
      "Kenya Electricity Generating Company is a Kenyan energy company.",
    website: "https://www.kegn.co.ke",
    founded: "1906",
    industry: "Energy",
  },
  {
    id: 5,
    ticker: "HAFR",
    name: "Home Afrika",
    price: 11.23,
    change: -0.56,
    changePercentage: 15.44,
    volume: 1000000,
    marketCap: 1000000,
    sector: "Real Estate",
    country: "Kenya",
    currency: "KES",
    exchange: "NSE",
    type: "Stock",
    logo: hafr,
    description: "Home Afrika is a Kenyan real estate company.",
    website: "https://www.homeafrika.co.ke",
    founded: "1906",
    industry: "Real Estate",
  },
];
