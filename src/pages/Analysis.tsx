import { ChartSales } from "@/components/Chart/ChartSales.tsx";
import { useQueries } from "@tanstack/react-query";
import { GetCurrentAndPreviousDayFoodDrinkSales, GetCurrentAndPreviousDayRevenue, GetCurrentAndPreviousDayTicketsSold, GetCurrentMonthRevenueAndGrowth } from "@/services/api.tsx";
import { formatMoney } from "@/utils/MoneyFormat.ts";
import { Suspense } from "react";
import ListTop5Customer from "@/components/Shared/ListTopCustomer.tsx";
import { ChartSaleDate } from "@/components/Chart/ChartSaleDate.tsx";


export default function Analysis() {
	const results = useQueries({
		queries: [
			{
				queryKey: ["dashboard/revenue/month"],
				queryFn: GetCurrentMonthRevenueAndGrowth
			}, {
				queryKey: ["dashboard/revenue/day"],
				queryFn: GetCurrentAndPreviousDayRevenue
			}, {
				queryKey: ["dashboard/ticket/day"],
				queryFn: GetCurrentAndPreviousDayTicketsSold
			}, {
				queryKey: ["dashboard/food/day"],
				queryFn: GetCurrentAndPreviousDayFoodDrinkSales
			},
		],
	});
	const [MonthRevenueAndGrowthAPI, DayRevenueAndGrowthAPI, DayTicketsAPI, DayFoodApi] = results;
	const {
		data: DataMonth,
		isFetching: isFetchingMonth,
		isError: isErrorMonth
	} = MonthRevenueAndGrowthAPI;
	const {
		data: DataDay,
		isFetching: isFetchingDay,
		isError: isErrorDay
	} = DayRevenueAndGrowthAPI;
	const {
		data: DataDayTickets,
		isFetching: isFetchingDayTickets,
		isError: isErrorDayTickets
	} = DayTicketsAPI;
	const {
		data: DataDayFood,
		isFetching: isFetchingDayFood,
		isError: isErrorDayFood
	} = DayFoodApi;

	if (isFetchingMonth || isFetchingDay || isFetchingDayTickets || isFetchingDayFood) return <p>Loading...</p>;
	if (isErrorMonth || isErrorDay || isErrorDayTickets || isErrorDayFood) return <p>Error fetching data</p>;
	if (!DataMonth || !DataDay || !DataDayTickets || !DataDayFood) return <p>No data available</p>;
	const { total_revenue: prevMonth } = DataMonth.data[0];
	const { total_revenue: curMonth } = DataMonth.data[1];
	const { total_revenue: prevDay } = DataDay.data[0];
	const { total_revenue: curDay } = DataDay.data[1];
	const { total_tickets_sold: prevDayTickets } = DataDayTickets.data[0];
	const { total_tickets_sold: curDayTickets } = DataDayTickets.data[1];
	const { total_food_drink_sold: prevDayFood } = DataDayFood.data[0];
	const { total_food_drink_sold: curDayFood } = DataDayFood.data[1];
	const percentMonth = (((curMonth - prevMonth) / curMonth) * 100).toFixed(2) + "%";
	const percentDay = (((curDay - prevDay) / curDay) * 100).toFixed(2) + "%";
	const percentDayTickets = (((curDayTickets - prevDayTickets) / curDayTickets) * 100).toFixed(2) + "%";
	const percentDayFood = (((curDayFood - prevDayFood) / curDayFood) * 100).toFixed(2) + "%";
	return (<main className="px-4">
			<div className="flex justify-between gap-5 mb-5">
				<div className="aspect-[3/2] w-full  bg-blue-400 text-white rounded-xl p-4">
					<div className="flex justify-between text-xl font-bold">
						<p>Doanh thu
							tháng
						</p>
						<p>₫</p>
					</div>
					<p className="text-2xl font-bold mt-3 mb-2">{formatMoney(curMonth)}</p>
					<p>
						<strong>{percentMonth}</strong>
						{" "}
						so với tháng trước
					</p>
				</div>
				<div className="aspect-[3/2] w-full  bg-blue-400 text-white rounded-xl p-4">
					<div className="flex justify-between text-xl font-bold">
						<p>Thu nhập</p>
						<p>₫</p>
					</div>
					<p className="text-2xl font-bold mt-3 mb-2">{curDay === 0
					                                             ? "Đang cập nhật"
					                                             : formatMoney(curDay)}</p>
					<p>{curDay === 0 ? "Đang cập nhật" : <span><strong>{percentDay}</strong> so với hôm qua</span>}</p>
				</div>
				<div className="aspect-[3/2] w-full  bg-blue-400 text-white rounded-xl p-4">
					<div className="flex justify-between text-xl font-bold">
						<p>
							Tổng vé
						</p>
						<p>₫</p>
					</div>
					<p className="text-2xl font-bold mt-3 mb-2">{curDayTickets === 0
					                                             ? "Đang cập nhật"
					                                             : curDayTickets}</p>
					<p>{curDayTickets === 0 ? "Đang cập nhật" : <span><strong>{percentDayTickets}</strong> so với hôm qua</span>}</p>
				</div>
				<div className="aspect-[3/2] w-full  bg-blue-400 text-white rounded-xl p-4">
					<div className="flex justify-between text-xl font-bold">
						<p>
							Tổng thực phẩm
						</p>
						<p>₫</p>
					</div>
					<p className="text-2xl font-bold mt-3 mb-2">{curDayFood === 0
					                                             ? "Đang cập nhật"
					                                             : curDayFood}</p>
					<p>{curDayFood === 0 ? "Đang cập nhật" : <span><strong>{percentDayFood}</strong> so với hôm qua</span>}</p>
				</div>
			</div>
			<div className="flex gap-5 mb-4">
				<div className="aspect-[3/2] w-[55%] rounded-xl">
					<Suspense>
						<ChartSales/>
					</Suspense>
				</div>
				<div className="w-[45%] border rounded-xl p-4 bg-white">
					<Suspense>
						<ListTop5Customer/>
					</Suspense>
				</div>
			</div>
			<ChartSaleDate/>
		</main>
	);
}
