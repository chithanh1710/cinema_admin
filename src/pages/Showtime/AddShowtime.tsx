/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Select, Typography } from "antd";
import { useWatch } from "antd/es/form/Form";
import moment from "moment";

const config = {
	rules: [{ type: "object" as const, required: true, message: "Please select time!" }],
};

const showtimes = [
	{
		id: 1,
		time_start: "2024-10-26T06:15:00",
		time_end: "2024-10-26T08:15:00"
	},
	{
		id: 2,
		time_start: "2024-10-26T06:30:00",
		time_end: "2024-10-26T08:40:00"
	},
];

export default function AddShowtime() {
	// TODO: MAI LAM TIEP O DAY
	const onFinish = async (values: any) => {
		console.log(values);
	};

	const [form] = Form.useForm();
	const movieValue = useWatch("id_movie", form);
	const screenRoomValue = useWatch("id_screen_room", form);
	const timeStartValue = useWatch("time_start", form);

	const disabledTime = (current: any) => {
		const disabledHours: any[] = [];
		const disabledMinutes: any[] = [];

		const now = moment();
		if (current.isSame(now, "day")) {
			Array.from({ length: now.hour() }, (_, i) => disabledHours.push(i));
			Array.from({ length: now.minute() }, (_, i) => disabledMinutes.push(i));
		}

		showtimes.forEach(showtime => {
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
						Array.from({ length: totalTime }, (_, i) => disabledMinutes.push(i));
					}
				}
			}
		});


		return {
			disabledHours: () => disabledHours,
			disabledMinutes: () => disabledMinutes,
		};
	};

	return (
		<main>
			<h2 className="text-xl font-semibold text-center mb-2">Thêm phim mới</h2>
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
						<Select>
							<Select.Option value="demo">Demo</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Phòng chiếu" name="id_screen_room" rules={[{
						required: true, message: "Vui lòng chọn phòng" +
							" chiếu!"
					}]}>
						<Select>
							<Select.Option value="demo">Demo</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name="time_start" label="Chọn ngày giờ" {...config}>
						<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
						            disabledDate={(current) => {
							            // Disable dates before today
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
					<pre>Phim: {movieValue}</pre>
					<pre>Phòng: {screenRoomValue}</pre>
					<pre>Giờ bắt đầu: {timeStartValue?.format("HH:mm:ss")}</pre>
				</Typography>
			</div>
		</main>
	);
}
