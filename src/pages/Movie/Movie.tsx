import { useQuery } from "@tanstack/react-query";
import { getAllMovie } from "../../services/api";
import { Button, Image, Table, TableColumnsType, TablePaginationConfig, } from "antd";
import { Star } from "lucide-react";
import { useState } from "react";
import { PAGE_DEFAULT, PAGE_SIZE } from "../../constants/page";
import { DaumMovie } from "../../types/Movie";
import { Link, useSearchParams } from "react-router-dom";
import { IMG_CONFIG } from "../../constants/img";
import Search from "../../components/Shared/Search.tsx";

export default function Movie() {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") || "";
	const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
	const [pageSize, setPageSize] = useState(PAGE_SIZE);

	const { data, isFetching, isError } = useQuery({
		queryKey: ["movies", currentPage, pageSize, search],
		queryFn: () => getAllMovie(currentPage, pageSize, search),
	});

	const { data: listMovie, totalItem } = data || {};

	if (isError) return <p>Error</p>;

	const handleTableChange = (pagination: TablePaginationConfig) => {
		if (pagination.current && pagination.pageSize) {
			setCurrentPage(pagination.current);
			setPageSize(pagination.pageSize);
		}
	};
	const columns: TableColumnsType = [
		{
			title: "Mã",
			dataIndex: "id",
			key: "id",
			width: "60px",
		},
		{ title: "Tên", dataIndex: "name", key: "name", width: "180px" },
		{
			title: "Ảnh",
			dataIndex: "image",
			key: "image",
			width: "220px",
			render: (img: string) => (
				<Image
					{ ...IMG_CONFIG }
					alt="Movie poster"
					src={ img }
					className="w-full h-auto aspect-[3/2]"
				/>
			),
		},
		{
			title: "Thời gian",
			dataIndex: "duration",
			key: "duration",
			width: "100px",
		},
		{
			title: "Thể loại",
			dataIndex: "genres",
			key: "genres",
			width: "140px",
			render: (genres: string[]) => <p>{ genres.join(", ") }</p>,
		},
		{
			title: "Đánh giá",
			dataIndex: "star",
			key: "star",
			width: "140px",
			render: (star: number) => (
				<p className="flex gap-1 items-center justify-center text-yellow-500 font-semibold">
					{ star }
					<Star className="fill-yellow-500 stroke-none"/>
				</p>
			),
		},
		{
			title: (
				<Link to="/dashboard/movie/add">
					<Button
						variant="solid"
						className="bg-green-500 text-white font-bold w-full"
					>
						Thêm
					</Button>
				</Link>
			),
			key: "id",
			render: (item: DaumMovie) => {
				return (
					<div className="flex gap-4">
						<Link to={ `/dashboard/movie/detail/${ item.id }` }>
							<Button variant="solid" color="primary">
								Chi tiết
							</Button>
						</Link>
						<Link to={ `/dashboard/movie/edit/${ item.id }` }>
							<Button variant="solid" color="primary">
								Sửa
							</Button>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<main>
			<div className="flex justify-between items-center mb-2 px-4">
				<div className="w-52">
					<Search placeholder="Nhập tên để tìm kiếm"/>
				</div>
				<p className="font-light">
					Tổng số lượng sản phẩm:{ " " }
					<span className="font-bold">{ !isFetching ? totalItem : 0 }</span>{ " " }
				</p>
			</div>

			<Table
				loading={ isFetching }
				className="px-4"
				dataSource={ listMovie }
				columns={ columns }
				rowKey="id"
				pagination={ {
					pageSize: pageSize,
					current: currentPage,
					total: totalItem,
				} }
				onChange={ handleTableChange }
			/>
		</main>
	);
}
