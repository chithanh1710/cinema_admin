import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Get3Month } from "@/services/api.tsx";
import { formatMoney } from "@/utils/MoneyFormat.ts";
import Loading from "@/components/Shared/Loading";

const chartConfig = {} satisfies ChartConfig;

export function ChartSaleDate() {
	const { isFetching, isError, data } = useQuery({
		queryKey: ["chart/transaction_date"],
		queryFn: Get3Month
	});
	if (isFetching) return <Loading/>;
	if (isError) return <p>Error...</p>;
	const chartData = data?.data.map((tmp: any) => ({
		transaction_date: tmp.transaction_date,
		total_revenue: tmp.total_revenue || 0,
		total_revenue_format: formatMoney(tmp.total_revenue || 0),
	})) || [];
	return (
		<Card>
			<CardHeader>
				<CardTitle>Doanh thu mỗi ngày trong 3 tháng gần đây</CardTitle>
			</CardHeader>
			<CardContent className="px-2">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[160px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false}/>
						<XAxis
							dataKey="transaction_date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const transaction_date = new Date(value);
								return transaction_date.toLocaleDateString("vi-vn", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									formatter={(value) => `Tổng tiền: ${formatMoney(Number(value) || 0)}`}
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("vi-vn", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Bar dataKey="total_revenue" fill="rgb(69,184,254)"/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
