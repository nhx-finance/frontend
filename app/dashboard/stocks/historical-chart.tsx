"use client";

import { ChevronsUp, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { HistoricalData } from "@/mocks/stocks";

export const description = "A simple area chart";

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function HistoricalChart({ data }: { data: HistoricalData[] }) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="px-0">
          <h1 className="text-3xl text-foreground/90 font-funnel-display font-semibold">
            KES 398.85
          </h1>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ChevronsUp className="w-4 h-4 text-green-500" />
          <p className="text-sm text-green-500 font-funnel-display font-semibold">
            6.78%
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              vertical={true}
              horizontal={true}
              strokeDasharray="2 2"
              x1={12}
              x2={12}
              y1={12}
              y2={12}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="price"
              type="natural"
              fill="var(--color-price)"
              fillOpacity={0.4}
              stroke="var(--color-price)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-0">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
