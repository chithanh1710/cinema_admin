import { Descriptions, DescriptionsProps, Table, Typography } from "antd";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../services/api"; // Giả sử hàm này đã được định nghĩa
import { formatMoney } from "../../utils/MoneyFormat.ts";
import Search from "../../components/Shared/Search.tsx";
import { ColumnType } from "antd/es/table";
import Loading from "@/components/Shared/Loading";

const { Title } = Typography;

interface Transaction {
	time_transaction: string;
	total_amount: number;
}

interface Customer {
	id: number;
	name: string;
	email: string;
	phone: string | null;
	rank: string;
	transaction: Transaction[];
}

interface GroupedTransaction {
	date: Date;
	totalAmount: number;
	code: string;
}

export default function DetailCustomer() {
	const [search] = useSearchParams();
	const params = useParams<{ id: string }>();
	const id = Number(params.id);
	const { data, isFetching, isError } = useQuery({
		queryKey: ["customer", id],
		queryFn: () => getCustomerById(id),
	});

	// Kiểm tra nếu data đã tồn tại và là mảng chứa Customer
	const customerData: Customer | undefined = data?.data[0];

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
			span: 2,
			children: customerData?.rank,
		},
		{
			key: "5",
			label: "Tổng tiền giao dịch",
			children: formatMoney(customerData?.transaction.reduce((
				acc, curr) => acc + curr.total_amount, 0) || 0) || "Không có thông tin",
		}
	];

	if (!id) return <Navigate to="/dashboard/customer" replace/>;
	if (isFetching) return <Loading/>;
	if (isError) return <p>Error</p>;

	// Nhóm giao dịch theo ngày và tính tổng tiền cho mỗi ngày
	const transactionsByDate: { [key: string]: { totalAmount: number; date: Date } } = {};

	customerData?.transaction.forEach((transaction) => {
		const date = new Date(transaction.time_transaction);
		const code = `${customerData.id}${date.getTime()}`; // Mã vẽ theo định dạng

		if (!transactionsByDate[code]) {
			transactionsByDate[code] = { totalAmount: 0, date };
		}

		transactionsByDate[code].totalAmount += transaction.total_amount;
	});

	const groupedTransactions: GroupedTransaction[] = Object.entries(transactionsByDate)
	                                                        .map(
		                                                        ([
			                                                         code, {
				                                                        totalAmount,
				                                                        date
			                                                        }
		                                                         ]) => ({
			                                                        date,
			                                                        totalAmount,
			                                                        code,
		                                                        })
	                                                        );

	const columns: ColumnType<GroupedTransaction>[] = [
		{
			title: "Mã vé",
			dataIndex: "code",
			key: "code",
			render: (text: string) => <strong>{text}</strong>,
			onFilter: (value: React.Key | boolean, record) => {
				return typeof value === "string" && record.code.toLowerCase()
				                                          .includes(value.toLowerCase());
			},
			filteredValue: [search.get("q") || ""],
		},
		{
			title: "Ngày",
			dataIndex: "date",
			key: "date",
			render: (date: Date) => <p><strong
				className="w-12 inline-block">Ngày:</strong> {date.toLocaleDateString("vi-VN", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})} <br/><strong className="w-12 inline-block">Giờ:</strong> {date.toLocaleTimeString()}
			</p>,
			sorter: (a: GroupedTransaction, b: GroupedTransaction) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
		},
		{
			title: "Tổng tiền",
			dataIndex: "totalAmount",
			key: "totalAmount",
			sorter: (a: GroupedTransaction, b: GroupedTransaction) =>
				a.totalAmount - b.totalAmount,
			render: (totalAmount: number) => formatMoney(totalAmount),
		},
	];

	return (
		<div className="px-4">
			<Descriptions
				labelStyle={{ width: 180 }}
				title="Thông tin chi tiết khách hàng"
				bordered
				items={items}
			/>
			<Title level={4} className="mt-4">Danh sách các hoá đơn</Title>
			<Title level={5}>Tổng số lượng giao dịch: {groupedTransactions.length}</Title>
			<div className="my-2 w-44">
				<Search placeholder="Tìm kiếm theo mã vé"/>
			</div>
			<Table
				bordered
				dataSource={groupedTransactions}
				columns={columns}
				rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
				rowKey="code"
				pagination={{
					total: groupedTransactions.length,
					defaultPageSize: 3,
					showSizeChanger: {
						options: [
							{ value: 3, label: "Trang / 3" },
							{ value: 6, label: "Trang / 6" },
							{ value: 9, label: "Trang / 9" },
						],
					},
				}}
			/>
		</div>
	);
}
