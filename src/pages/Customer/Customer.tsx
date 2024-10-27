import { Button, Table, TableColumnsType } from "antd";
import Search from "../../components/Shared/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomer } from "../../services/api.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { PAGE_DEFAULT } from "../../constants/page.ts";
import { useState } from "react";
import { FilterValue, TablePaginationConfig } from "antd/es/table/interface";

export default function Customer() {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") || null;
	const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
	const [pageSize, setPageSize] = useState(10);
	const [filterRank, setFilterRank] = useState<string[]>([]);

	const { data, isFetching, isError } = useQuery({
		queryKey: ["customer", filterRank, search],
		queryFn: () => getAllCustomer(),
	});

	if (isError) return <div>Error loading customer data</div>;

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string | number, FilterValue | null>
	) => {
		if (pagination.current && pagination.pageSize) {
			setCurrentPage(pagination.current);
			setPageSize(pagination.pageSize);
		}

		if (filters.rank && Array.isArray(filters.rank)) {
			setFilterRank(filters.rank.map((value) => value.toString()));
		} else {
			setFilterRank([]);
		}
	};

	const { data: listCustomer } = data || {};

	const uniqueRanks = listCustomer
		?.map((item) => item.rank)
		.filter((value, index, self) => self.indexOf(value) === index)
		.map((rank) => ({ text: rank, value: rank }));

	const listCustomerFilter = listCustomer?.filter((customer) =>
		(filterRank.length === 0 || filterRank.includes(customer.rank)) &&
		(search ? customer.id.toString()
		                  .includes(search) : true)
	);

	const columns: TableColumnsType = [
		{
			title: "Mã",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "SĐT",
			dataIndex: "phone",
			key: "phone",
			render: (phone) => phone || "N/A",
		},
		{
			title: "Hạng",
			dataIndex: "rank",
			key: "rank",
			filters: uniqueRanks,
		},
		{
			key: "id",
			title: "",
			dataIndex: "id",
			render: (id) => (
				<div className="flex gap-4">
					<Link to={`/dashboard/customer/detail/${id}`}>
						<Button variant="solid" color="primary">
							Chi tiết
						</Button>
					</Link>
					<Link to={`/dashboard/customer/edit/${id}`}>
						<Button variant="solid" color="primary">
							Sửa
						</Button>
					</Link>
				</div>
			)
		}
	];

	return (
		<main>
			<div className="flex justify-between items-center mb-2 px-4">
				<div className="w-52">
					<Search placeholder="Search by ID"/>
				</div>
				<p className="font-light">
					Total Customers:{" "}
					<span className="font-bold">
                        {!isFetching ? listCustomerFilter?.length : 0}
                    </span>
				</p>
			</div>

			<Table
				loading={isFetching}
				className="px-4"
				dataSource={listCustomerFilter}
				columns={columns}
				rowKey="id"
				pagination={{
					pageSize: pageSize,
					current: currentPage,
					total: listCustomerFilter?.length,
					showSizeChanger: false,
				}}
				onChange={handleTableChange}
			/>
		</main>
	);
}
