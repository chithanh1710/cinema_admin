import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"; // Import TooltipProps
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { GetMonthlyRevenue } from "@/services/api.tsx";
import { formatMoney } from "@/utils/MoneyFormat.ts";

const chartConfig = {
	month: {
		label: "Tháng",
	},
	total_amount: {
		label: "Tổng tiền",
	},
} satisfies ChartConfig;

// Định nghĩa kiểu cho CustomTooltip
const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const { month, total_amount } = payload[0].payload; // Lấy dữ liệu từ payload
		return (
			<div className="bg-white p-2 rounded">
				<strong className="text-lg">{`Tháng ${month}`}</strong>
				<p className="text-base">{`Tổng tiền: ${formatMoney(total_amount)}`}</p>
			</div>
		);
	}
	return null;
};

export function ChartSales() {
	const { data, isFetching, isError } = useQuery({
		queryKey: ["chartSales"],
		queryFn: GetMonthlyRevenue,
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	});

	if (isError) return <p>Error fetching data</p>;
	if (isFetching) return <p>Loading...</p>;

	const chartData = data?.data || [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Doanh thu mỗi tháng</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false}/>
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<CustomTooltip/>} // Sử dụng CustomTooltip
						/>
						<Area
							dataKey="total_amount"
							type="natural"
							fill="rgb(69,184,254)"
							fillOpacity={0.4}
							stroke="rgb(69,184,254)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
