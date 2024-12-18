/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Select, Typography } from "antd";
import { useWatch } from "antd/es/form/Form";
import moment from "moment";
import { useMutation, useQueries } from "@tanstack/react-query";
import { editShowtime } from "../../services/actions.tsx";
import { getAllCinemas, getAllMovie, getAllShowTimes } from "../../services/api.tsx";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Shared/Loading";

const config = {
	rules: [{ type: "object" as const, required: true, message: "Please select time!" }],
};

export default function EditShowtime() {
	const params = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const screenRoomValue = useWatch("id_screen_room", form);

	const { mutate } = useMutation({
		mutationFn: ({ values, showtimeId }: {
			values: any;
			showtimeId: number
		}) => editShowtime(values, showtimeId),
		onError: (error) => {
			toast.error(`Cập nhật thất bại! ${error.message}`);
		},
		onSuccess: () => {
			form.resetFields();
			navigate("/dashboard/showtime");
			toast.success("Cập nhật thành công");
		},
		onMutate: () => {
			toast.loading("Đang thực hiện", {
				id: "editShowTime"
			});
		},
		onSettled: () => {
			toast.remove("editShowTime");
		}
	});

	const result = useQueries({
		queries: [
			{
				queryKey: ["movie"],
				queryFn: () => getAllMovie(1, 100, "")
			},
			{
				queryKey: ["srceenRoom"],
				queryFn: getAllCinemas
			},
			{
				queryKey: ["showtime"],
				queryFn: getAllShowTimes
			}
		]
	});

	const [moviesAPI, screenRoomAPI, showTimeAPI] = result;
	const { data: dataMovie, isError: isErrorMovie, isFetching: isFetchingMovie } = moviesAPI;
	const {
		data: dataScreenRoom,
		isError: isErrorScreenRoomAPI,
		isFetching: isFetchingScreenRoomAPI
	} = screenRoomAPI;
	const {
		data: dataShowTime,
		isError: isErrorShowTimeAPI,
		isFetching: isFetchingShowTimeAPI
	} = showTimeAPI;

	const { id } = params;
	if (!id) return Navigate({ to: "/dashboard/movie", replace: true });
	if (isErrorMovie && isErrorScreenRoomAPI && isErrorShowTimeAPI) return <p>Error</p>;

	const showTimeId = dataShowTime?.data.find(st => st.id === Number(id));

	const onFinish = async (values: any) => {
		const data =
			{
				id_movie: values.id_movie,
				id_screen_room: values.id_screen_room,
				time_start: values.time_start.format("YYYY-MM-DD HH:mm:ss")
			};
		mutate({ values: data, showtimeId: Number(id) });
	};

	const disabledTime = (current: any) => {
		const disabledHours: any[] = [];
		const disabledMinutes: any[] = [];

		const now = moment();
		if (current.isSame(now, "day")) {
			Array.from({ length: now.hour() }, (_, i) => disabledHours.push(i));
			Array.from({ length: now.minute() }, (_, i) => disabledMinutes.push(i));
		}

		dataShowTime?.data.filter((st) => (screenRoomValue
		                                   ? st.screen_room.id === Number(screenRoomValue)
		                                   : true))
		            .forEach(showtime => {
			            const start = moment(showtime.time_start);
			            const end = moment(showtime.time_end);
			            // Kiểm tra nếu ngày được chọn là ngày có showtime
			            if (current.isSame(start, "day")) {
				            // Disable hours within the time range
				            for (let hour = start.hour() ; hour < end.hour() ; hour++) {
					            disabledHours.push(hour);
				            }

				            if (current.isSame(end, "day") && current.isSame(end, "hour")) {
					            const totalTime = end.minute() + 30;
					            if (totalTime >= 60) {
						            disabledHours.push(end.hour());
						            Array.from({ length: 60 }, (_, i) => disabledMinutes.push(i));
					            } else {
						            Array.from({ length: totalTime }, (
							            _, i) => disabledMinutes.push(i));
					            }
				            }
			            }
		            });


		return {
			disabledHours: () => disabledHours,
			disabledMinutes: () => disabledMinutes,
		};
	};

	const listMovie = dataMovie?.data || [];
	const listScreenRoom = dataScreenRoom || [];

	if (isFetchingMovie || isFetchingScreenRoomAPI || isFetchingShowTimeAPI) return <Loading/>;

	return (
		<main>
			<h2 className="text-xl font-semibold text-center mb-2">Cập nhật phim</h2>
			<div className="flex gap-10">
				<Form
					className="w-full"
					form={form}
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					onFinish={onFinish}
				>
					<Form.Item label="Phim" name="id_movie"
					           rules={[{ required: true, message: "Vui lòng chọn phim!" }]}>
						<Select placeholder="Chọn phim">
							{listMovie.map(m =>
								<Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>
							)}
						</Select>
					</Form.Item>
					<Form.Item label="Phòng chiếu" name="id_screen_room" rules={[
						{
							required: true, message: "Vui lòng chọn phòng" +
								" chiếu!"
						}
					]}>
						<Select placeholder="Chọn phòng chiếu">
							{listScreenRoom.map(sr => sr.screenRooms.map(s =>
								<Select.Option key={s.id} value={s.id}>{sr.cinema}:
									Phòng {s.name}</Select.Option>))}
						</Select>
					</Form.Item>
					<Form.Item name="time_start" label="Chọn ngày giờ" {...config}>
						<DatePicker disabled={isFetchingShowTimeAPI} showTime
						            format="YYYY-MM-DD HH:mm:ss"
						            disabledDate={(current) => {
							            return current && current < moment()
								            .startOf("day");
						            }}
						            disabledTime={disabledTime}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 24 }}>
						<Button
							type="primary"
							htmlType="submit"
							className="float-end w-full py-4 font-bold"
						>
							Xác nhận
						</Button>
					</Form.Item>
				</Form>
				<Typography className="w-full">
					<h3 className="font-semibold text-center">Thông tin phim cũ</h3>
					<pre>Phim: {showTimeId?.movie.name}</pre>
					<pre>Phòng: {showTimeId?.screen_room.name}</pre>
					<pre>Giờ bắt đầu: {moment(showTimeId?.time_start)
						.format("DD-MM-YYYY" +
							" HH:mm:ss")}</pre>
				</Typography>
			</div>
		</main>
	);
}
