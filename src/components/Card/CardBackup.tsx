import { createBackup } from "@/services/actions";
import { useMutation } from "@tanstack/react-query";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Card,
  Tooltip,
  Input,
  Button,
  Form,
  FormProps,
  Typography,
} from "antd";
import toast from "react-hot-toast";

type FieldType = {
  fileName?: string;
};

export default function CardBackup() {
  const { Title, Text } = Typography;

  const { mutate } = useMutation({
    mutationFn: createBackup,
    onMutate: () => {
      toast.loading("Đang thực hiện", { id: "loading" });
    },
    onError: () => {
      toast.dismiss("loading");
      toast.error("Tạo file backup thất bại");
    },
    onSuccess: () => {
      toast.dismiss("loading");
      toast.success("File backup đã tạo thành công");
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values.fileName || "");
  };
  return (
    <Card className="w-full h-full">
      <Title level={4}>Sao lưu dữ liệu</Title>
      <Text type="secondary">
        Nhập tên file sao lưu để bắt đầu quá trình sao lưu dữ liệu của bạn.
      </Text>
      <Form
        name="backupForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          label={
            <div className="flex gap-2">
              Tên file sao lưu
              <Tooltip title="Tên file sao lưu cần tạo">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          }
          name="fileName"
          rules={[{ required: true, message: "Vui lòng nhập tên file!" }]}
        >
          <Input placeholder="Nhập tên file (e.g., backup_lan1)" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ fontWeight: "bold" }}
          >
            Tạo sao lưu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
