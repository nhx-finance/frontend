"use client";

import { TrendingUp } from "lucide-react";
import { Bar, LineChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

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

export const description = "Portfolio balance chart";

const chartData = [
  { month: "Jan 2023", balance: 125000 },
  { month: "Feb 2023", balance: 132000 },
  { month: "Mar 2023", balance: 128500 },
  { month: "Apr 2023", balance: 141200 },
  { month: "May 2023", balance: 138700 },
  { month: "Jun 2023", balance: 145300 },
  { month: "Jul 2023", balance: 152800 },
  { month: "Aug 2023", balance: 149200 },
  { month: "Sep 2023", balance: 156700 },
  { month: "Oct 2023", balance: 163400 },
  { month: "Nov 2023", balance: 171200 },
  { month: "Dec 2023", balance: 168900 },
  { month: "Jan 2024", balance: 175600 },
  { month: "Feb 2024", balance: 182300 },
  { month: "Mar 2024", balance: 189700 },
  { month: "Apr 2024", balance: 196400 },
  { month: "May 2024", balance: 203100 },
  { month: "Jun 2024", balance: 210800 },
];

const chartConfig = {
  balance: {
    label: "Portfolio Balance",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function PortfolioChart() {
  return (
    <Card className="flex flex-col bg-transparent border border-foreground/20 rounded-3xl">
      <CardHeader>
        <CardTitle className="font-funnel-display">Portfolio Balance</CardTitle>
        <CardDescription className="font-funnel-display">
          Historical performance from January 2023 - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-muted-foreground font-funnel-display"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground font-funnel-display"
              tickFormatter={(value) => `Ks.${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="balance"
              type="natural"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium font-funnel-display">
          Portfolio up 68.6% over 18 months <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none font-funnel-display">
          Showing portfolio balance from $125k to $210.8k
        </div>
      </CardFooter>
    </Card>
  );
}
