import { useMutation, useQuery } from "@tanstack/react-query";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Card,
  Tooltip,
  Input,
  Button,
  Form,
  FormProps,
  Typography,
  Select,
  Spin,
} from "antd";
import toast from "react-hot-toast";
import { getAllFileBackup } from "@/services/api";
import { restoreBackup } from "@/services/actions";

type FieldType = {
  fileName?: string;
  CreationTime?: string;
};

export default function CardRestore() {
  const { Title, Text } = Typography;

  const {
    data: backupFiles,
    isFetching,
    isError,
  } = useQuery({
    queryFn: getAllFileBackup,
    queryKey: ["backupFiles"],
  });

  const { mutate } = useMutation({
    mutationFn: restoreBackup,
    onMutate: () => {
      toast.loading("Đang thực hiện", { id: "loading" });
    },
    onError: () => {
      toast.dismiss("loading");
      toast.error("Khôi phục file thất bại");
    },
    onSuccess: () => {
      toast.dismiss("loading");
      toast.success("Khôi phục file thành công");
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values.fileName || "");
  };

  return (
    <Card className="w-full h-full">
      <Title level={4}>Khôi phục dữ liệu</Title>
      <Text type="secondary">
        Bạn có thể chọn file sao lưu từ danh sách hoặc nhập tên file cần khôi
        phục.
      </Text>
      <Form
        name="restoreForm"
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
              <Tooltip title="Chọn hoặc nhập tên file sao lưu">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          }
          name="fileName"
          rules={[
            { required: true, message: "Vui lòng chọn hoặc nhập tên file!" },
          ]}
        >
          {isFetching ? (
            <Spin tip="Đang tải danh sách file..." />
          ) : isError ? (
            <Text type="danger">Không thể tải danh sách file sao lưu</Text>
          ) : (
            <Select
              placeholder="Chọn file sao lưu"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {backupFiles.Files.map(
                (file: { FileName: string; CreationTime: string }) => (
                  <Select.Option key={file.FileName} value={file.FileName}>
                    {file.FileName} | {file.CreationTime}
                  </Select.Option>
                )
              )}
            </Select>
          )}
        </Form.Item>

        {/* Or input field to manually type the backup file name */}
        <Form.Item
          label="Hoặc nhập tên file sao lưu"
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
            Khôi phục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
