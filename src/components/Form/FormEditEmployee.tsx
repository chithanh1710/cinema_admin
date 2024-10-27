/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import { editEmployee } from "../../services/actions"; // Assume you have this service
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getStaffById } from "../../services/api.tsx";

export default function FormEditEmployee() {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const params = useParams();
	const id = Number(params.id);

	const { mutate } = useMutation({
		mutationFn: ({ employee, employeeId }: { employee: any; employeeId: any }) =>
			editEmployee(employee, employeeId), // Assume you have this mutation
		onSettled: () => {
			toast.remove("editEmployee");
		},
		onMutate: () => {
			toast.loading("Đang cập nhật thông tin nhân viên", { id: "editEmployee" });
		},
		onSuccess: () => {
			toast.success("Cập nhật nhân viên thành công");
			form.resetFields();
			navigate(`/dashboard/employee`);
		},
		onError: (error) => {
			toast.error(`Cập nhật nhân viên thất bại: ${error.message}`);
			console.error(error);
		},
	});

	const { data, isError, isFetching } = useQuery({
		queryKey: ["employee", id],
		queryFn: () => getStaffById(id),
	});

	const employeeData = data?.data[0];

	if (isError) return <p>Error</p>;
	if (isFetching) return <p>Loading...</p>;
	if (!id) return <Navigate to="/dashboard/employee" replace/>;

	const onFinish = (values: any) => {
		const data = {
			id: employeeData?.id,
			name: values.name,
			email: values.email,
			phone: values.phone,
			office: values.office,
		};
		mutate({ employee: data, employeeId: employeeData?.id });
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			initialValues={{
				name: employeeData?.name,
				email: employeeData?.email,
				phone: employeeData?.phone,
				office: employeeData?.office,
			}}
		>
			<Form.Item
				name="name"
				label="Tên nhân viên"
				rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
			>
				<Input/>
			</Form.Item>

			<Form.Item
				name="email"
				label="Email"
				rules={[
					{ required: true, message: "Vui lòng nhập email!" },
					{ type: "email", message: "Email không hợp lệ!" }
				]}
			>
				<Input/>
			</Form.Item>

			<Form.Item
				name="phone"
				label="Số điện thoại"
				rules={[
					{ required: true, message: "Vui lòng nhập số điện thoại!" },
					{ pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }
				]}
			>
				<Input/>
			</Form.Item>

			<Form.Item
				name="office"
				label="Văn phòng"
				rules={[{ required: true, message: "Vui lòng chọn văn phòng!" }]}
			>
				<Select>
					<Select.Option value="VĂN PHÒNG 1">VĂN PHÒNG 1</Select.Option>
					<Select.Option value="VĂN PHÒNG 2">VĂN PHÒNG 2</Select.Option>
					<Select.Option value="VĂN PHÒNG 3">VĂN PHÒNG 3</Select.Option>
					<Select.Option value="VĂN PHÒNG 4">VĂN PHÒNG 4</Select.Option>
					<Select.Option value="VĂN PHÒNG 5">VĂN PHÒNG 5</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Cập nhật nhân viên
				</Button>
			</Form.Item>
		</Form>
	);
}
