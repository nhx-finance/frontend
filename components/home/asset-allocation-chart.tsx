"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Asset allocation donut chart";

const chartData = [
  { asset: "stocks", percentage: 60, fill: "var(--color-stocks)" },
  { asset: "etfs", percentage: 30, fill: "var(--color-etfs)" },
  { asset: "kes", percentage: 10, fill: "var(--color-kes)" },
];

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  stocks: {
    label: "Stocks",
    color: "var(--chart-1)",
  },
  etfs: {
    label: "ETFs",
    color: "var(--chart-2)",
  },
  kes: {
    label: "KES",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col bg-transparent border-none mt-0">
      <CardContent className="flex-1 pb-0 flex-col gap-4 xl:flex-row xl:justify-between">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="asset"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="">
          <div className="flex items-center flex-wrap flex-row justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[var(--chart-1)]" />
              <p className="text-xs font-funnel-display text-muted-foreground">
                Stocks(60%)
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[var(--chart-2)]" />
              <p className="text-xs font-funnel-display text-muted-foreground">
                ETFs(30%)
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[var(--chart-5)]" />
              <p className="text-xs font-funnel-display text-muted-foreground">
                KES(10%)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
