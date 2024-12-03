import { Button, Table, TableColumnsType } from "antd";
import Search from "../../components/Shared/Search.tsx";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { PAGE_DEFAULT } from "../../constants/page.ts";
import { useState } from "react";
import { FilterValue, TablePaginationConfig } from "antd/es/table/interface";
import { getAllStaffs } from "../../services/api.tsx";

export default function Employee() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || null;
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const [pageSize, setPageSize] = useState(10);
  const [filterOffice, setFilterOffice] = useState<string[]>([]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["employee", filterOffice, search],
    queryFn: () => getAllStaffs(),
  });

  if (isError) return <div>Error loading employee data</div>;

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string | number, FilterValue | null>
  ) => {
    if (pagination.current && pagination.pageSize) {
      setCurrentPage(pagination.current);
      setPageSize(pagination.pageSize);
    }

    if (filters.office && Array.isArray(filters.office)) {
      setFilterOffice(filters.office.map((value) => value.toString()));
    } else {
      setFilterOffice([]);
    }
  };

  const { data: listEmployee } = data || {};

  const uniqueOffices = listEmployee
    ?.map((item) => item.office)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((office) => ({ text: office, value: office }));

  const listEmployeeFilter = listEmployee?.filter(
    (employee) =>
      (filterOffice.length === 0 || filterOffice.includes(employee.office)) &&
      (search ? employee.id.toString().includes(search) : true)
  );

  const columns: TableColumnsType = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "N/A",
    },
    {
      title: "Chức vụ",
      dataIndex: "office",
      key: "office",
      filters: uniqueOffices,
    },
    {
      key: "id",
      title: "",
      dataIndex: "id",
      render: (id) => (
        <div className="flex gap-4">
          <Link to={`/dashboard/employee/detail/${id}`}>
            <Button variant="solid" color="primary">
              Chi tiết
            </Button>
          </Link>
          <Link to={`/dashboard/employee/edit/${id}`}>
            <Button variant="solid" color="primary">
              Sửa
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="flex justify-between items-center mb-2 px-4">
        <div className="w-52">
          <Search placeholder="Search by ID" />
        </div>
        <p className="font-light">
          Tổng khách hàng:{" "}
          <span className="font-bold">
            {!isFetching ? listEmployeeFilter?.length : 0}
          </span>
        </p>
      </div>

      <Table
        loading={isFetching}
        className="px-4"
        dataSource={listEmployeeFilter}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: listEmployeeFilter?.length,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </main>
  );
}
