import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addFoodAndDrink, editFoodAndDrink, handleImageUpload } from "../../services/actions.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFoodAndDrinkById } from "../../services/api.tsx";

export default function ShowAddOrEditProduct({
	                                             setIsClick,
	                                             id,
                                             }: {
	setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
	id?: string;
}) {
	const queryClient = useQueryClient();
	const [category, setCategory] = useState("");
	const [img, setImg] = useState("");
	const [price, setPrice] = useState(0);
	const [amount, setAmount] = useState(0);
	const [name, setName] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const isAdding = !id;

	const { data, isError } = useQuery({
		queryKey: ["foodsAndDrinks", id],
		queryFn: () => getFoodAndDrinkById(Number(id)),
		enabled: !isAdding,
	});

	const product = data?.data[0] || null;

	useEffect(() => {
		if (product) {
			setImg(product?.image_url);
			setCategory(product?.category);
			setPrice(product?.price);
			setAmount(product?.stock_quantity);
			setName(product?.name);
		}
	}, [product]);

	useEffect(() => {
		if (category && img && price && amount && name) {
			setIsSuccess(true);
		} else setIsSuccess(false);
	}, [category, img, price, amount, name]);

	if (isError) return <div>Error fetching data</div>;

	return (
		<div className="flex flex-col gap-4 p-8">
			<div>
				<label className="text-lg font-bold w-48 inline-block">
					Tên sản phẩm {isAdding && <span className="text-red-500">*</span>}:
				</label>
				<input
					onChange={(e) => setName(e.target.value)}
					value={name}
					className={`outline-none border-b w-40 ml-3 px-2 ${isAdding && !name
					                                                   ? "border-red-500"
					                                                   : ""}`}
					type="text"
				/>
			</div>
			<div>
				<label className="text-lg font-bold w-48 inline-block">
					Giá sản phẩm {isAdding && <span className="text-red-500">*</span>}:
				</label>
				<input
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
					className={`outline-none border-b w-40 ml-3 px-2 ${isAdding && !price
					                                                   ? "border-red-500"
					                                                   : ""}`}
					type="number"
				/>
			</div>
			<div>
				<label className="text-lg font-bold w-48 inline-block">
					Số lượng sản phẩm {isAdding && <span className="text-red-500">*</span>}:
				</label>
				<input
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					className={`outline-none border-b w-40 ml-3 px-2 ${isAdding && !amount
					                                                   ? "border-red-500"
					                                                   : ""}`}
					type="number"
				/>
			</div>
			<div>
				<label className="text-lg font-bold w-48 inline-block">
					Loại {isAdding && <span className="text-red-500">*</span>}:
				</label>
				<select
					onChange={(e) => setCategory(e.target.value)}
					value={category}
					className={`outline-none border-b w-40 ml-3 px-2 ${isAdding && !category
					                                                   ? "border-red-500"
					                                                   : ""}`}
					name="loai"
					id="loai"
				>
					<option value="">Chọn loại</option>
					<option value="Đồ ăn">Đồ ăn</option>
					<option value="Thức uống">Thức uống</option>
				</select>
			</div>
			<div>
				<img
					alt="Image"
					src={img || "/img/image.png"}
					className="size-36 bg-black mb-4"
				/>
				<input
					onChange={async (e) => {
						const file = e.target.files?.item(0);
						if (file) {
							const largeImageUrl = await toast.promise(
								handleImageUpload(file),
								{
									error: "Thêm ảnh thất bại",
									loading: "Đang thêm ảnh",
									success: "Thêm ảnh thành công",
								}
							);
							setImg(largeImageUrl);
						}
					}}
					type="file"
					accept="image/*"
				/>
			</div>
			<div className="flex justify-center gap-6">
				<button
					onClick={() => setIsClick(false)}
					className="px-6 py-3 rounded-md bg-red-600 text-white font-bold shadow-lg"
				>
					Huỷ
				</button>
				<button
					onClick={async () => {
						const value = {
							image_url: img,
							price,
							stock_quantity: amount,
							name,
							category
						};
						if (id) {
							await toast.promise(editFoodAndDrink(value, Number(id)), {
								error: "Cập nhật sản phẩm thất bại",
								loading: "Đang cập nhật sản phẩm",
								success: "Cập nhật sản phẩm thành công",
							});
						} else {
							await toast.promise(
								addFoodAndDrink(value),
								{
									error: "Thêm mới sản phẩm thất bại",
									loading: "Đang thêm mới sản phẩm",
									success: "Thêm mới sản phẩm thành công",
								}
							);
						}
						await queryClient.invalidateQueries({ queryKey: ["foodsAndDrinks"] });
						setIsClick(false);
					}}
					disabled={!isSuccess}
					className={`px-6 py-3 rounded-md ${
						isSuccess
						? "bg-green-600 cursor-pointer"
						: "bg-gray-200 cursor-not-allowed"
					} text-white font-bold shadow-lg`}
				>
					Xác nhận
				</button>
			</div>
		</div>
	);
}
