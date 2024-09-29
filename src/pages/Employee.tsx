import {
  CirclePlus,
  Clipboard,
  ClipboardCheck,
  CreditCard,
  Edit,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import removeAccents from "../utils/removeAccents";
import Search from "../components/Search";
import { useSearchParams } from "react-router-dom";
import ButtonPrintFileExcel from "../components/Button/ButtonPrintFileExcel";
import ButtonUtils from "../components/Button/ButtonUtils";
import MainContentGrid from "../components/MainContentGrid";

export default function Employee() {
  const [searchParam] = useSearchParams();
  const [isClick, setIsClick] = useState(false);
  const dataTitle = ["ID", "Họ và tên", "Giới tính", "SĐT", "Email", "Chức vụ"];

  const data = useMemo(
    () => [
      {
        id: "NV001",
        ten: "Chí Thành aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        gioiTinh: "Nam",
        sdt: "01234567",
        email: "chithanh171004@gmail.com aaaaaaaaaaaa",
        chucVu: "Quản lý",
      },
      {
        id: "NV002",
        ten: "Khánh Vy",
        gioiTinh: "Nữ",
        sdt: "01234567",
        email: "khanhvy@gmail.com",
        chucVu: "Quản lý",
      },
    ],
    []
  );
  const [dataTmp, setDataTmp] = useState(data);

  useEffect(() => {
    const search = searchParam.get("q") || "";
    setDataTmp(
      data.filter(
        (item) =>
          removeAccents(item.email.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
          ) ||
          removeAccents(item.sdt.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
          ) ||
          removeAccents(item.ten.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
          ) ||
          removeAccents(item.id.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
          )
      )
    );
  }, [data, searchParam]);

  return (
    <>
      <section className="flex gap-6 mb-6">
        <Search />
        <ButtonUtils>
          <CirclePlus className="size-5" />
          <span className="font-semibold">Thêm NV</span>
        </ButtonUtils>
        <ButtonUtils>
          <CreditCard className="size-5" />
          <span className="font-semibold">Phát lương</span>
        </ButtonUtils>
        <ButtonPrintFileExcel data={data} title="Danh sách nhân viên" />
      </section>
      <MainContentGrid
        dataTitle={dataTitle}
        data={dataTmp}
        gridCols="grid-cols-[80px_256px_100px_100px_256px_100px_100px]"
        children={(item) => (
          <>
            <p>{item.id}</p>
            <div className="relative group max-w-[256px]">
              <p className="truncate pr-4 w-full">{item.ten}</p>
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(item.ten);
                  setIsClick(true);
                  toast.success("Đã sao chép thành công");
                  await new Promise((res) => setTimeout(() => res(""), 1000));
                  setIsClick(false);
                }}
                className={`group-hover:!flex gap-2 items-center hidden z-50 absolute text-nowrap -top-2 -left-2 bg-gray-100 shadow py-1 px-2 rounded`}
              >
                {item.ten}
                <button className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                  {!isClick ? <Clipboard /> : <ClipboardCheck stroke="green" />}
                </button>
              </div>
            </div>
            <p>{item.gioiTinh}</p>
            <div className="relative group max-w-[256px]">
              <p className="truncate pr-4 w-full">{item.sdt}</p>
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(item.sdt);
                  setIsClick(true);
                  toast.success("Đã sao chép thành công");
                  await new Promise((res) => setTimeout(() => res(""), 1000));
                  setIsClick(false);
                }}
                className={`group-hover:!flex gap-2 items-center hidden z-50 absolute text-nowrap -top-2 -left-2 bg-gray-100 shadow py-1 px-2 rounded`}
              >
                {item.sdt}
                <button className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                  {!isClick ? <Clipboard /> : <ClipboardCheck stroke="green" />}
                </button>
              </div>
            </div>
            <div className="relative group max-w-[256px]">
              <p className="truncate pr-4 w-full">{item.email}</p>
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(item.email);
                  setIsClick(true);
                  toast.success("Đã sao chép thành công");
                  await new Promise((res) => setTimeout(() => res(""), 1000));
                  setIsClick(false);
                }}
                className={`group-hover:!flex gap-2 items-center hidden z-50 absolute text-nowrap -top-2 -left-2 bg-gray-100 shadow py-1 px-2 rounded`}
              >
                {item.email}
                <button className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                  {!isClick ? <Clipboard /> : <ClipboardCheck stroke="green" />}
                </button>
              </div>
            </div>
            <p>{item.chucVu}</p>
            <button>
              <Edit />
            </button>
          </>
        )}
      />
    </>
  );
}
