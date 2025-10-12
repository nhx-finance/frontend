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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HistoricalData, Stock } from "@/mocks/stocks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChartCandle, IconTimeline } from "@tabler/icons-react";

export const description = "A simple area chart";

const timePeriods: { label: string; value: number }[] = [
  {
    label: "1H",
    value: 24,
  },
  {
    label: "1D",
    value: 7 * 24,
  },
  {
    label: "1W",
    value: 7 * 7 * 24,
  },
  {
    label: "1M",
    value: 30 * 24,
  },
  {
    label: "All",
    value: 12 * 30 * 24,
  },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "#4970d5",
  },
} satisfies ChartConfig;

export function HistoricalChart({
  data,
  stock,
}: {
  data: HistoricalData[];
  stock: Stock;
}) {
  const [timePeriod, setTimePeriod] = useState<{
    label: string;
    value: number;
  }>(timePeriods[0]);
  const [chartType, setChartType] = useState<"line" | "candle">("line");
  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="px-0 mt-0 ">
        <CardTitle className="px-0">
          <h1 className="text-2xl md:text-3xl text-foreground font-funnel-display font-semibold">
            KES {stock.price.toLocaleString()}
          </h1>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ChevronsUp className="w-4 h-4 text-green-500" />
          <p className="text-sm text-green-500 font-funnel-display font-semibold">
            {stock.changePercentage.toFixed(2)}%
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-full px-0">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="6 6"
              syncWithTicks
            />
            {/* <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={13}
              tickFormatter={(value: number) => `${value.toFixed(2)}`}
            /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              interval={2}
            />

            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="price"
              type="natural"
              fill="#4971D58F"
              fillOpacity={0.4}
              stroke="var(--color-price)"
              strokeWidth={1.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-0 w-full">
        <div className="flex w-full justify-between flex-col-reverse md:flex-row gap-4 md:gap-2">
          <div className="border border-foreground/30 rounded-3xl p-1 w-full md:w-1/2 flex items-center justify-between">
            {timePeriods.map((period) => (
              <div
                key={period.label}
                className={cn(
                  "flex items-center gap-2",
                  timePeriod.label === period.label && "bg-foreground/20 ",
                  "cursor-pointer w-1/4 rounded-3xl h-full flex items-center justify-center py-[5px] ease-in-out duration-300 transition-all"
                )}
                onClick={() => setTimePeriod(period)}
              >
                <p className="text-xs font-funnel-display">{period.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3 flex items-center justify-between gap-2">
            <div className="border border-foreground/30 rounded-3xl p-1 w-1/2 flex items-center justify-between">
              <div
                className={cn(
                  "w-1/2 md:w-1/2 flex items-center justify-center py-[5px] h-full rounded-3xl ease-in-out duration-300 transition-all",
                  chartType === "line" && "bg-foreground/20"
                )}
                onClick={() => setChartType("line")}
              >
                <IconTimeline className="w-4 h-4 text-foreground" />
              </div>
              <div
                className={cn(
                  "w-1/2 md:w-1/2 flex items-center justify-center py-[5px] h-full rounded-3xl ease-in-out duration-300 transition-all",
                  chartType === "candle" && "bg-foreground/20"
                )}
                onClick={() => setChartType("candle")}
              >
                <IconChartCandle className="w-4 h-4 text-foreground" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-1/2 rounded-3xl bg-transparent border-foreground/30 ">
                <SelectValue
                  placeholder="Price"
                  className="text-sm font-funnel-display"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="price"
                  className="text-sm font-funnel-display"
                >
                  Price
                </SelectItem>
                <SelectItem
                  value="volume"
                  className="text-sm font-funnel-display"
                >
                  Volume
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
