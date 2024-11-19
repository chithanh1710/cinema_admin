import { useQuery } from "@tanstack/react-query";
import { Table, Card, Typography, Spin, Alert } from "antd";
import { getHistoryBackup } from "@/services/api";
import CardBackup from "@/components/Card/CardBackup";
import CardRestore from "@/components/Card/CardRestore";

export default function Restore() {
  const { Title } = Typography;

  const {
    data: backupHistory,
    isFetching,
    isError,
  } = useQuery({
    queryFn: getHistoryBackup,
    queryKey: ["backupHistory"],
  });

  const columns = [
    {
      title: "Tên cơ sở dữ liệu",
      dataIndex: "DatabaseName",
      key: "databaseName",
    },
    {
      title: "Loại sao lưu",
      dataIndex: "BackupType",
      key: "backupType",
    },
    {
      title: "Ngày bắt đầu sao lưu",
      dataIndex: "BackupStartDate",
      key: "backupStartDate",
    },
    {
      title: "Ngày hoàn thành sao lưu",
      dataIndex: "BackupFinishDate",
      key: "backupFinishDate",
    },
    {
      title: "Đường dẫn sao lưu",
      dataIndex: "BackupPath",
      key: "backupPath",
    },
  ];
  let i = 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 h-[360px]">
        <CardBackup />
        <CardRestore />
      </div>

      <Card className="mt-6">
        <Title level={4}>Lịch sử sao lưu</Title>
        {isFetching ? (
          <Spin tip="Đang tải lịch sử sao lưu..." />
        ) : isError ? (
          <Alert message="Không thể tải lịch sử sao lưu" type="error" />
        ) : (
          <Table
            columns={columns}
            dataSource={backupHistory}
            rowKey={() => {
              i++;
              return `${i}`;
            }}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
        )}
      </Card>
    </div>
  );
}
