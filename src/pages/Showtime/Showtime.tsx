import { Button, Table, TableColumnsType } from "antd";
import Search from "../../components/Shared/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import { getAllShowTimes } from "../../services/api.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { PAGE_DEFAULT } from "../../constants/page.ts";
import { useState } from "react";
import { format } from "date-fns";
import { FilterValue, TablePaginationConfig } from "antd/es/table/interface";

export default function Showtime() {
	const [searchParams] = useSearchParams();
	const [filterMovie, setFilterMovie] = useState<number[]>([]);
	const [filterScreenRoom, setFilterScreenRoom] = useState<string[]>([]);
	const search = searchParams.get("q") || null;
	const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
	const [pageSize, setPageSize] = useState(6);

	const { data, isFetching, isError } = useQuery({
		queryKey: ["showtime", filterMovie, filterScreenRoom, search],
		queryFn: () => getAllShowTimes(),
	});

	if (isError) return <div>error</div>;

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string | number, FilterValue | null>
	) => {
		if (pagination.current && pagination.pageSize) {
			setCurrentPage(pagination.current);
			setPageSize(pagination.pageSize);
		}

		if (filters.movie && Array.isArray(filters.movie)) {
			setFilterMovie(filters.movie.map(value => parseInt(value as string)));
		} else {
			setFilterMovie([]);
		}

		if (filters.screen_room && Array.isArray(filters.screen_room)) {
			setFilterScreenRoom(filters.screen_room.map(value => value.toString()));
		} else {
			setFilterScreenRoom([]);
		}
	};

	const { data: listShowtime } = data || {};

	const uniqueMovies = listShowtime
		?.map((item) => ({ name: item.movie.name, id: item.movie.id }))
		.filter((value, index, self) =>
			index === self.findIndex((movie) => movie.id === value.id)
		);

	const uniqueScreenRooms = [...new Set(listShowtime?.map((item) => item.screen_room.name))];

	const listShowtimeFilter = listShowtime?.filter((l) => (filterScreenRoom.length === 0
	                                                        ? true
	                                                        : filterScreenRoom.some(name => name === l.screen_room.name))
		&& (filterMovie.length === 0 ? true : filterMovie.some(id => id === l.movie.id))
		&& (search ? l.id.toString()
		              .includes(search) : true));


	const columns: TableColumnsType = [
		{
			title: "Mã",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Phòng",
			dataIndex: "screen_room",
			key: "screen_room",
			render: (screen_room) => <p>Phòng {screen_room.name}</p>,
			filters: uniqueScreenRooms?.map((name) => ({ text: "Phòng " + name, value: name })),
		},
		{
			title: "Phim",
			dataIndex: "movie",
			key: "movie",
			render: (movie) => <p>{movie.name}</p>,
			filters: uniqueMovies?.map(({ id, name }) => ({ text: name, value: id })),
		},
		{
			title: "Giờ bắt đầu",
			dataIndex: "time_start",
			key: "time_start",
			render: (time_start) => (
				<div className="flex flex-col text-start">
					{format(time_start, "HH 'giờ' mm 'phút' - 'Ngày' dd/MM/yyyy")
						.split("-")
						.map((s) => (
							<span key={s}>{s}</span>
						))}
				</div>
			),
			sorter: (a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime(),
			defaultSortOrder: "descend"
		},
		{
			title: "Giờ kết thúc",
			dataIndex: "time_end",
			key: "time_end",
			render: (time_end) => (
				<div className="flex flex-col text-start">
					{format(time_end, "HH 'giờ' mm 'phút' - 'Ngày' dd/MM/yyyy")
						.split("-")
						.map((s) => (
							<span key={s}>{s}</span>
						))}
				</div>
			),
		},
		{
			key: "id",
			title: (
				<Link to="/dashboard/showtime/add">
					<Button
						variant="solid"
						className="bg-green-500 text-white font-bold w-full"
					>
						Thêm
					</Button>
				</Link>
			),
			dataIndex: "id",
			render: (id) => (<Link to={`/dashboard/showtime/edit/${id}`}>
				<Button type="link" className="w-full">
					Sửa
				</Button>
			</Link>)
		}
	];

	return (
		<main>
			<div className="flex justify-between items-center mb-2 px-4">
				<div className="w-52">
					<Search placeholder="Nhập mã để tìm kiếm"/>
				</div>
				<p className="font-light">
					Tổng số lượng sản phẩm:{" "}
					<span className="font-bold">{!isFetching
					                             ? listShowtimeFilter?.length
					                             : 0}</span>
				</p>
			</div>

			<Table
				loading={isFetching}
				className="px-4"
				dataSource={listShowtimeFilter}
				columns={columns}
				rowKey="id"
				showSorterTooltip={{ target: "sorter-icon" }}
				pagination={{
					pageSize: pageSize,
					current: currentPage,
					total: listShowtimeFilter?.length,
					showSizeChanger: false
				}}
				onChange={handleTableChange}
			/>
		</main>
	);
}
