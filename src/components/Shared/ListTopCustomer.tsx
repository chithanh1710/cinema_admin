import { useQuery } from "@tanstack/react-query";
import { GetTop5CustomersBySpending } from "@/services/api.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { formatMoney } from "@/utils/MoneyFormat.ts";
import Loading from "@/components/Shared/Loading";


export default function ListTopCustomer() {
	const { isError, data, isFetching } = useQuery({
		queryKey: ["top5Customers"],
		queryFn: GetTop5CustomersBySpending,
	});
	if (isError) return <p>Error fetching data</p>;
	if (isFetching) return <Loading/>;
	const listTop5Customers = data?.data || [];
	return (
		<Table>
			<TableCaption>Danh sách top 5 khách hàng chi tiêu nhiều nhất</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Hạng</TableHead>
					<TableHead>Cấp</TableHead>
					<TableHead>Tên</TableHead>
					<TableHead className="text-right">Tổng chi tiêu</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{listTop5Customers.map((customer, index) => (
					<TableRow key={customer.customer_id}>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{customer.customer_rank.replace("CẤP", "")}</TableCell>
						<TableCell>{customer.customer_name}</TableCell>
						<TableCell
							className="text-right">{formatMoney(customer.total_spent)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>

	);
}