import { CirclePlus, Clipboard, ClipboardCheck, Edit } from "lucide-react";
import ButtonUtils from "../components/Button/ButtonUtils";
import Search from "../components/Shared/Search.tsx";
import ButtonPrintFileExcel from "../components/Button/ButtonPrintFileExcel";
import toast from "react-hot-toast";
import MainContentGrid from "../components/Shared/MainContentGrid.tsx";
import { useMemo, useState } from "react";
import formatDate from "../utils/formatDate";

export default function Event() {
  const dataTitle = [
    "ID",
    "Mã voucher",
    "Tên voucher",
    "Loại",
    "Ngày bắt đầu",
    "Ngày kết thúc",
  ];
  const data = useMemo(
    () => [
      {
        id: "VC001",
        ma: "DASFBDXCHJ",
        ten: "Happy new year",
        loai: "Vip 1",
        ngayBatDau: new Date(),
        ngayKetThuc: new Date(),
      },
      {
        id: "VC002",
        ma: "DSAVXZVDTV",
        ten: "Khai trương",
        loai: "Vip 2",
        ngayBatDau: new Date(),
        ngayKetThuc: new Date(),
      },
    ],
    []
  );
  const [dataTmp, setDataTmp] = useState(data);

  return (
    <>
      <section className="flex gap-6 mb-6">
        <Search />
        <ButtonUtils>
          <CirclePlus className="size-5" />
          <span className="font-semibold">Thêm Voucher</span>
        </ButtonUtils>
        <ButtonPrintFileExcel data={{ a: "hello" }} title="Danh sách voucher" />
      </section>
      <MainContentGrid
        dataTitle={dataTitle}
        data={dataTmp}
        gridCols="grid-cols-[80px_190px_282px_100px_120px_120px_100px]"
        children={(item) => (
          <>
            <p>{item.id}</p>
            <p>{item.ma}</p>
            <p>{item.ten}</p>
            <p>{item.loai}</p>
            <p>{formatDate(item.ngayBatDau, false)}</p>
            <p>{formatDate(item.ngayKetThuc, false)}</p>
            <button>
              <Edit />
            </button>
          </>
        )}
      />
    </>
  );
}
