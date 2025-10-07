"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "Jan", price: 186 },
  { month: "Feb", price: 305 },
  { month: "Mar", price: 237 },
  { month: "Apr", price: 273 },
  { month: "May", price: 209 },
  { month: "Jun", price: 214 },
  { month: "Jul", price: 298 },
  { month: "Aug", price: 342 },
  { month: "Sep", price: 267 },
  { month: "Oct", price: 189 },
  { month: "Nov", price: 225 },
  { month: "Dec", price: 198 },
  { month: "Jan", price: 256 },
  { month: "Feb", price: 223 },
  { month: "Mar", price: 287 },
  { month: "Apr", price: 312 },
  { month: "May", price: 298 },
  { month: "Jun", price: 334 },
  { month: "Jul", price: 367 },
  { month: "Aug", price: 343 },
  { month: "Sep", price: 289 },
  { month: "Oct", price: 312 },
  { month: "Nov", price: 298 },
  { month: "Dec", price: 334 },
  { month: "Jan", price: 367 },
  { month: "Feb", price: 389 },
  { month: "Mar", price: 312 },
  { month: "Apr", price: 398 },
  { month: "May", price: 434 },
  { month: "Jun", price: 467 },
  { month: "Jul", price: 443 },
  { month: "Aug", price: 389 },
  { month: "Sep", price: 412 },
  { month: "Oct", price: 398 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export function AssetTableChart() {
  return (
    <div className="w-32 h-12">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={chartData}
          margin={{
            left: 0,
            right: 0,
            top: 2,
            bottom: 2,
          }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-price)"
                stopOpacity={0.4}
              />
              <stop
                offset="75%"
                stopColor="var(--color-price)"
                stopOpacity={0.1}
              />
              <stop
                offset="100%"
                stopColor="var(--color-price)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="price"
            type="natural"
            fill="url(#priceGradient)"
            stroke="var(--color-price)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export default AssetTableChart;
