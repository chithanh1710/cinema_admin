import { CirclePlus, Edit, Trash2 } from "lucide-react";
import ButtonUtils from "../../components/Button/ButtonUtils.tsx";
import Search from "../../components/Shared/Search.tsx";
import Filter from "../../components/Shared/Filter.tsx";
import { useState } from "react";
import Show from "../../components/Show/Show.tsx";
import ShowAddOrEditProduct from "../../components/Show/ShowAddOrEditProduct.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFoodsAndDrinks } from "../../services/api.tsx";
import { formatMoney } from "../../utils/MoneyFormat.ts";
import { Button, Image } from "antd";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteFoodAndDrink } from "../../services/actions.tsx";

export default function FoodsAndDrinks() {
	const queryClient = useQueryClient();
	const [params] = useSearchParams();
	const [isClickAdd, setIsClickAdd] = useState(false);
	const [isClickEdit, setIsClickEdit] = useState(false);
	const [id, setId] = useState("");

	const { data, isFetching, isError } = useQuery({
		queryKey: ["foodsAndDrinks"],
		queryFn: getAllFoodsAndDrinks
	});

	if (isError) return <p>Error fetching data</p>;
	if (isFetching) return <p>Loading...</p>;

	const filter = params.get("filter") || "";
	const q = params.get("q") || "";
	const listFoodsAndDrinks = data?.data.filter((d) => (q
	                                                     ? d.name.toLowerCase()
	                                                        .includes(q.toLowerCase())
	                                                     : true) && (filter
	                                                                 ? filter === "Tất cả"
	                                                                   ? true
	                                                                   : d.category === filter
	                                                                 : true)) || [];
	return (
		<>
			<section className="flex gap-6 mb-6">
				<Filter name="Loại">
					<option>Tất cả</option>
					<option>Đồ ăn</option>
					<option>Thức uống</option>
				</Filter>
				<Search placeholder="Nhập tên để tìm kiếm"/>
				<ButtonUtils onClick={() => setIsClickAdd(true)}>
					<CirclePlus className="size-5"/>
					<span className="font-semibold">Thêm sản phẩm</span>
				</ButtonUtils>
			</section>
			<section className="grid grid-cols-4 gap-6">
				{listFoodsAndDrinks.map((fAr) => (
					<div
						key={fAr?.id}
						className="flex flex-col gap-2 p-4 rounded-lg bg-white w-full"
					>
						<Image width={200} height={200} src={fAr?.image_url} alt={fAr?.name}
						       className="w-[80%] aspect-square bg-black mx-auto"/>
						<p className="text-center font-bold text-xl">{fAr.name}</p>
						<p>
							SL: <span className="font-bold">{fAr.stock_quantity}</span>
						</p>
						<p>
							Giá: <span className="font-bold">{formatMoney(fAr.price)}</span>
						</p>
						<div className="flex justify-center gap-6 mt-3">
							<button
								onClick={() => {
									setIsClickEdit(true);
									setId(fAr.id.toString());
								}}
								className="p-2 bg-blue-400 text-white rounded"
							>
								<Edit/>
							</button>
							<button onClick={() => {
								toast((t) => (
									<div>
										<p>

											Bạn có chắc xoá sản phẩm này
										</p>

										<div
											className="flex items-center justify-center gap-5 w-full">
											<Button
												variant="solid" color="primary"
												onClick={() => toast.dismiss(t.id)}>
												Huỷ
											</Button>
											<Button variant="solid" color="danger"
											        onClick={async () => {
												        toast.dismiss(t.id);
												        await toast.promise(deleteFoodAndDrink(Number(fAr.id)), {
													        error: "Xoá sản phẩm thất bại",
													        success: "Xoá sản phẩm thành công",
													        loading: "Đang xoá...",
												        });
												        await queryClient.invalidateQueries({
													        queryKey: ["foodsAndDrinks"]
												        });
											        }}>
												Xoá
											</Button>
										</div>
									</div>
								));
							}} className="p-2 bg-blue-400 text-white rounded">
								<Trash2/>
							</button>
						</div>
					</div>
				))}
			</section>
			{isClickAdd && (
				<Show setIsClick={setIsClickAdd} title="Thêm sản phẩm">
					<ShowAddOrEditProduct setIsClick={setIsClickAdd}/>
				</Show>
			)}
			{isClickEdit && (
				<Show setIsClick={setIsClickEdit} title="Chỉnh sửa sản phẩm">
					<ShowAddOrEditProduct id={id} setIsClick={setIsClickEdit}/>
				</Show>
			)}
		</>
	);
}
