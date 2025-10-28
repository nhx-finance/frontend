"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePortfolioAllocation } from "@/hooks/use-portfolio-allocation";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "Asset allocation donut chart";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ChartPieDonut() {
  const { data: portfolioData, isLoading, error } = usePortfolioAllocation(4);

  const chartData =
    portfolioData?.topHoldings.map((holding, index) => ({
      asset: holding.ticker.toLowerCase(),
      percentage: Math.round(holding.percentage * 100) / 100,
      value: holding.value,
      fill: chartColors[index % chartColors.length],
    })) || [];

  const chartConfig = portfolioData?.topHoldings.reduce(
    (config, holding, index) => {
      const assetKey = holding.ticker.toLowerCase();
      config[assetKey] = {
        label: holding.ticker,
        color: chartColors[index % chartColors.length],
      };
      return config;
    },
    {
      percentage: { label: "Percentage" },
      value: { label: "Value (USDC)" },
    } as ChartConfig
  ) || { percentage: { label: "Percentage" } };

  if (isLoading) {
    return (
      <Card className="flex flex-col bg-transparent shadow-none border-none mt-0">
        <CardContent className="flex-1 pb-0 flex-col gap-4 xl:flex-row xl:justify-between">
          <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
            <Skeleton className="w-[200px] h-[200px] rounded-full" />
          </div>
          <div className="mt-2">
            <div className="flex items-center flex-wrap flex-row justify-between gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-1">
                  <Skeleton className="w-3 h-3 rounded" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !portfolioData || chartData.length === 0) {
    return (
      <Card className="flex flex-col bg-transparent shadow-none border-none mt-0">
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {error
              ? "Failed to load portfolio data"
              : "No token holdings found"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col bg-transparent shadow-none border-none mt-0">
      <CardContent className="flex-1 pb-0 flex-col gap-4 xl:flex-row xl:justify-between">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.asset.toUpperCase(),
                  ]}
                />
              }
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
          <div className="flex items-center flex-wrap flex-row justify-between mt-2 gap-2">
            {portfolioData.topHoldings.map((holding, index) => (
              <div key={holding.tokenId} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
                <p className="text-xs font-funnel-display text-muted-foreground">
                  {holding.ticker}({Math.round(holding.percentage)}%)
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-xs font-funnel-display text-muted-foreground">
              Total Value:{" "}
              {portfolioData.totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USDC
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
