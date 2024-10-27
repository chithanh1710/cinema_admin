import type { DescriptionsProps } from "antd";
import { Descriptions, List, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../services/api"; // Giả sử hàm này đã được định nghĩa
import { format } from "date-fns";

const { Title } = Typography;

export default function DetailCustomer() {
	const params = useParams();
	const id = Number(params.id);
	const { data, isFetching, isError } = useQuery({
		queryKey: ["customer", id],
		queryFn: () => getCustomerById(id),
	});

	const customerData = data?.data[0];

	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "Tên khách hàng",
			children: customerData?.name,
			span: 3,
		},
		{
			key: "2",
			label: "Email",
			children: customerData?.email,
			span: 3,
		},
		{
			key: "3",
			label: "Số điện thoại",
			children: customerData?.phone || "Không có thông tin",
		},
		{
			key: "4",
			label: "Cấp bậc",
			children: customerData?.rank,
		},
	];

	if (!id) return <Navigate to="/dashboard/customer" replace/>;
	if (isFetching) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;

	// Nhóm giao dịch theo ngày và tính tổng tiền cho mỗi ngày
	const transactionsByDate: { [key: string]: { totalAmount: number; code: string } } = {};

	customerData?.transaction.forEach((transaction) => {
		const date = new Date(transaction.time_transaction);
		const formattedDate = format(date, "dd-MM-yyyy");
		const code = `${customerData.id}${date.getTime()}`; // Mã vẽ theo định dạng

		if (!transactionsByDate[formattedDate]) {
			transactionsByDate[formattedDate] = { totalAmount: 0, code };
		}

		transactionsByDate[formattedDate].totalAmount += transaction.total_amount;
	});

	const groupedTransactions = Object.entries(transactionsByDate)
	                                  .map(([date, { totalAmount, code }]) => ({
		                                  date,
		                                  totalAmount,
		                                  code,
	                                  }));

	return (
		<div>
			<Descriptions
				className="px-2"
				labelStyle={{ width: 150 }}
				title="Thông tin chi tiết khách hàng"
				bordered
				items={items}
			/>
			<Title level={4} className="mt-4">Tổng tiền giao dịch theo ngày</Title>
			<List
				bordered
				dataSource={groupedTransactions}
				renderItem={({ date, totalAmount, code }) => (
					<List.Item>
						<div>
							<strong>Mã vẽ:</strong> {code} <br/>
							<strong>Ngày:</strong> {date} <br/>
							<strong>Tổng tiền:</strong> {totalAmount} VND <br/>
						</div>
					</List.Item>
				)}
			/>
		</div>
	);
}
