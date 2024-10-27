/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { getAllActors, getAllDirectors, getAllGenres, getMovieById, } from "../../services/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Form, Image, Input, InputNumber, Radio, Rate, Select, TimePicker, Upload, } from "antd";
import toast from "react-hot-toast";
import { editMovie, handleImageUpload } from "../../services/actions";
import { useState } from "react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { IMG_CONFIG } from "../../constants/img";

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

export default function FormEditMovie() {
	const navigate = useNavigate();
	const [imageUrl, setImageUrl] = useState("");
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	const results = useQueries({
		queries: [
			{
				queryKey: ["genres"],
				queryFn: getAllGenres,
			},
			{
				queryKey: ["actors"],
				queryFn: getAllActors,
			},
			{
				queryKey: ["directors"],
				queryFn: getAllDirectors,
			},
		],
	});

	const { mutate } = useMutation({
		mutationFn: ({ movie, movieId }: { movie: any; movieId: any }) =>
			editMovie(movie, movieId),
		onSettled: () => {
			toast.remove("editMovie");
		},
		onMutate: () => {
			toast.loading("Đang thực hiện cập nhật phim mới", { id: "editMovie" });
		},
		onSuccess: () => {
			toast.success("Cập nhật phim thành công");
			form.resetFields();
			setImageUrl("");
			setThumbnailUrl("");
			navigate(`/dashboard/movie/detail/${movieData?.id}`);
		},
		onError: (error) => {
			toast.error(`Cập nhật phim thất bại: ${error.message}`);
			console.error(error);
		},
	});

	const [genresAPI, actorsAPI, directorsAPI] = results;
	const {
		data: genresData,
		isError: genresIsError,
		isFetching: genresIsFetching,
	} = genresAPI;
	const {
		data: actorsData,
		isError: actorsIsError,
		isFetching: actorsIsFetching,
	} = actorsAPI;
	const {
		data: directorsData,
		isError: directorsIsError,
		isFetching: directorsIsFetching,
	} = directorsAPI;

	const params = useParams();
	const id = Number(params.id);
	const [form] = Form.useForm();

	const { data, isFetching, isError } = useQuery({
		queryKey: ["movie", id],
		queryFn: () => getMovieById(id),
	});

	const movieData = data?.data[0];

	if (!id) return Navigate({ to: "/dashboard/movie", replace: true });
	if (isFetching) return <p>Loading...</p>;
	if (genresIsError || actorsIsError || directorsIsError || isError)
		return <p>Error</p>;

	const onFinish = (values: any) => {
		const data = {
			id: movieData?.id,
			name: values.name,
			description: values.description,
			trailer: values.trailer,
			type: values.type,
			duration: values.duration.format("HH:mm:ss"),
			old: values.old,
			star: values.star,
			id_director: Number(values.id_director),
			actors: values.actors,
			genres: values.genres,
			image: imageUrl || movieData?.image,
			thumbnail: thumbnailUrl || movieData?.thumbnail,
			release_date: values.release_date.format("YYYY-MM-DD"),
		};
		const transformedData = {
			...data,
			genres: data.genres.map((genre: string) => ({ id: Number(genre) })),
			actors: data.actors.map((actor: string) => ({ id: Number(actor) })),
		};

		mutate({ movie: transformedData, movieId: movieData?.id });
	};

	return (
		<Form
			className="px-4"
			form={form}
			layout="vertical"
			onFinish={onFinish}
			initialValues={{
				name: movieData?.name,
				duration: movieData?.duration
				          ? moment(movieData?.duration, "HH:mm:ss")
				          : null,
				star: movieData?.star,
				old: movieData?.old,
				type: movieData?.type,
				trailer: movieData?.trailer,
				thumbnail: movieData?.thumbnail,
				description: movieData?.description,
				image: movieData?.image,
				id_director: movieData?.director?.id,
				release_date: movieData?.release_date
				              ? moment(movieData?.release_date)
				              : null,
				genres: movieData?.genres.map((genre) => genre.id),
				actors: movieData?.actors.map((actor) => actor.id),
			}}
		>
			<Form.Item
				name="name"
				label="Tên phim"
				rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
			>
				<Input/>
			</Form.Item>
			<Form.Item
				name="description"
				label="Nội dung"
				rules={[{ required: true, message: "Vui lòng nhập nội dung phim!" }]}
			>
				<TextArea rows={4}/>
			</Form.Item>
			<Form.Item
				name="type"
				label="Trạng thái"
				rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
			>
				<Radio.Group>
					<Radio value="ĐANG CHIẾU"> Đang chiếu </Radio>
					<Radio value="SẮP CHIẾU"> Sắp chiếu </Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="release_date"
				label="Ngày xuất bản"
				rules={[{ required: true, message: "Vui lòng nhập ngày xuất bản!" }]}
			>
				<DatePicker/>
			</Form.Item>
			<Form.Item
				name="trailer"
				label="Video trailer URL"
				rules={[{ required: true, message: "Vui lòng nhập video trailer!" }]}
			>
				<Input placeholder="https://www.youtube.com/watch?v=LWLMHHwSObY"/>
			</Form.Item>
			<Form.Item
				name="duration"
				label="Thời gian"
				rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
			>
				<TimePicker/>
			</Form.Item>
			<Form.Item
				name="old"
				label="Tuổi"
				rules={[
					{
						required: true,
						type: "number",
						min: 0,
						max: 99,
						message: "Vui lòng nhập tuổi hợp lệ!",
					},
				]}
			>
				<InputNumber/>
			</Form.Item>
			<Form.Item
				name="star"
				label="Đánh giá"
				rules={[{ required: true, message: "Vui lòng đánh giá!" }]}
			>
				<Rate count={10}/>
			</Form.Item>
			<Form.Item
				name="id_director"
				labelCol={{ span: 24 }}
				label="Chọn đạo diễn"
				rules={[{ required: true, message: "Vui lòng chọn một đạo diễn!" }]}
			>
				<Select
					filterOption={(input, option) =>
						option && option.children
						? option.children
						        .toString()
						        .toLowerCase()
						        .includes(input.toLowerCase())
						: false
					}
					placeholder={directorsIsFetching ? "Loading..." : "Select options"}
				>
					{!directorsIsFetching ? (
						directorsData?.data.map((d) => (
							<Select.Option key={d.id} value={d.id}>
								{d.name}
							</Select.Option>
						))
					) : (
						 <>
							 <Select.Option value="1">Option 1</Select.Option>
							 <Select.Option value="2">Option 2</Select.Option>
							 <Select.Option value="3">Option 3</Select.Option>
						 </>
					 )}
				</Select>
			</Form.Item>
			<Form.Item
				name="actors"
				labelCol={{ span: 24 }}
				label="Chọn diễn viên (Có thể chọn nhiều)"
				rules={[
					{ required: true, message: "Vui lòng chọn ít nhất một diễn viên!" },
				]}
			>
				<Select
					filterOption={(input, option) =>
						option && option.children
						? option.children
						        .toString()
						        .toLowerCase()
						        .includes(input.toLowerCase())
						: false
					}
					mode="multiple"
					placeholder={actorsIsFetching ? "Loading..." : "Select options"}
				>
					{!actorsIsFetching ? (
						actorsData?.data.map((a) => (
							<Select.Option key={a.id} value={a.id}>
								{a.name}
							</Select.Option>
						))
					) : (
						 <>
							 <Select.Option value="1">Option 1</Select.Option>
							 <Select.Option value="2">Option 2</Select.Option>
							 <Select.Option value="3">Option 3</Select.Option>
						 </>
					 )}
				</Select>
			</Form.Item>
			<Form.Item
				name="genres" // Đặt tên cho trường thể loại
				labelCol={{ span: 24 }}
				label="Chọn thể loại (Có thể chọn nhiều)"
				rules={[
					{ required: true, message: "Vui lòng chọn ít nhất một thể loại!" },
				]}
			>
				<Select
					filterOption={(input, option) =>
						option && option.children
						? option.children
						        .toString()
						        .toLowerCase()
						        .includes(input.toLowerCase())
						: false
					}
					mode="multiple"
					placeholder={genresIsFetching ? "Loading..." : "Select options"}
				>
					{!genresIsFetching ? (
						genresData?.data.map((g) => (
							<Select.Option key={g.id} value={g.id}>
								{g.name}
							</Select.Option>
						))
					) : (
						 <>
							 <Select.Option value="1">Option 1</Select.Option>
							 <Select.Option value="2">Option 2</Select.Option>
							 <Select.Option value="3">Option 3</Select.Option>
						 </>
					 )}
				</Select>
			</Form.Item>
			<div className="flex gap-12">
				<Form.Item
					className="max-w-36"
					name="imageEdit"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					label="Ảnh lớn ngang"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload
						beforeUpload={async (file) => {
							if (file) {
								const largeImageUrl = await toast.promise(
									handleImageUpload(file),
									{
										error: "Thêm ảnh thất bại",
										loading: "Đang thêm ảnh",
										success: "Thêm ảnh thành công",
									}
								);
								setImageUrl(largeImageUrl);
							}
							return false;
						}}
						maxCount={1}
						accept="image/*"
						listType="picture-card"
					>
						<button style={{ border: 0, background: "none" }} type="button">
							<PlusOutlined/>
							<div style={{ marginTop: 8 }}>Upload</div>
						</button>
					</Upload>
				</Form.Item>
				<Form.Item
					name="thumbnailEdit"
					className="max-w-36"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					label="Ảnh nhỏ dọc"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload
						beforeUpload={async (file) => {
							if (file) {
								const thumbnailUrl = await toast.promise(
									handleImageUpload(file),
									{
										error: "Thêm ảnh thất bại",
										loading: "Đang thêm ảnh",
										success: "Thêm ảnh thành công",
									}
								);
								setThumbnailUrl(thumbnailUrl);
							}
							return false;
						}}
						className="w-full"
						maxCount={1}
						accept="image/*"
						listType="picture-card"
					>
						<button style={{ border: 0, background: "none" }} type="button">
							<PlusOutlined/>
							<div style={{ marginTop: 8 }}>Upload</div>
						</button>
					</Upload>
				</Form.Item>
				<div className="flex ml-20 gap-6">
					<div className="flex items-center flex-col justify-center gap-2">
						<p className="font-medium text-red-500">Ảnh lớn ngang cũ</p>
						<Image
							{...IMG_CONFIG}
							width={200}
							height={200}
							src={movieData?.image}
							className="object-contain"
						/>
					</div>
					<div className="flex items-center flex-col justify-center gap-2">
						<p className="font-medium text-red-500">Ảnh nhỏ dọc cũ</p>
						<Image
							{...IMG_CONFIG}
							width={200}
							height={200}
							src={movieData?.thumbnail}
							className="object-contain"
						/>
					</div>
				</div>
			</div>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Cập nhật phim
				</Button>
			</Form.Item>
		</Form>
	);
}
