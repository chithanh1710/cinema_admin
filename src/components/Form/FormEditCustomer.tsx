/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import { editCustomer } from "../../services/actions";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "../../services/api.tsx";

export default function FormEditCustomer() {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const params = useParams();
	const id = Number(params.id);

	const { mutate } = useMutation({
		mutationFn: ({ customer, customerId }: { customer: any; customerId: any }) =>
			editCustomer(customer, customerId),
		onSettled: () => {
			toast.remove("editCustomer");
		},
		onMutate: () => {
			toast.loading("Đang cập nhật thông tin khách hàng", { id: "editCustomer" });
		},
		onSuccess: () => {
			toast.success("Cập nhật khách hàng thành công");
			form.resetFields();
			navigate(`/dashboard/customer/detail/${customerData?.id}`);
		},
		onError: (error) => {
			toast.error(`Cập nhật khách hàng thất bại: ${error.message}`);
			console.error(error);
		},
	});

	const { data, isError, isFetching } = useQuery({
		queryKey: ["customer", id],
		queryFn: () => getCustomerById(id),
	});

	const customerData = data?.data[0];

	if (isError) return <p>Error</p>;
	if (isFetching) return <p>Loading...</p>;
	if (!id) return <Navigate to="/dashboard/customer" replace/>;

	const onFinish = (values: any) => {
		const data = {
			id: customerData?.id,
			name: values.name,
			email: values.email,
			phone: values.phone,
			rank: values.rank,
		};
		mutate({ customer: data, customerId: customerData?.id });
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			initialValues={{
				name: customerData?.name,
				email: customerData?.email,
				phone: customerData?.phone,
				rank: customerData?.rank,
			}}
		>
			<Form.Item
				name="name"
				label="Tên khách hàng"
				rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
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
				name="rank"
				label="Xếp hạng"
				rules={[{ required: true, message: "Vui lòng chọn xếp hạng!" }]}
			>
				<Select>
					<Select.Option value="CẤP ĐỒNG">CẤP ĐỒNG</Select.Option>
					<Select.Option value="CẤP BẠC">CẤP BẠCr</Select.Option>
					<Select.Option value="CẤP VÀNG">CẤP VÀNG</Select.Option>
					<Select.Option value="CẤP BẠCH KIM">CẤP BẠCH KIM</Select.Option>
					<Select.Option value="CẤP KIM CƯƠNG">CẤP KIM CƯƠNG</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Cập nhật khách hàng
				</Button>
			</Form.Item>
		</Form>
	);
}
