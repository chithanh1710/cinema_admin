import { CirclePlus, Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/Shared/Filter.tsx";
import formatDate from "../utils/formatDate";
import ShowDetailProblem from "../components/Show/ShowDetailProblem";
import ShowEditProblem from "../components/Show/ShowEditProblem";
import ShowAddProblem from "../components/Show/ShowAddProblem";
import Show from "../components/Show/Show";

export default function Problem() {
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [isClickShow, setIsClickShow] = useState(false);
  const [isClickReport, setIsClickReport] = useState(false);
  const [searchParam] = useSearchParams();
  const [id, setId] = useState("");
  const data: {
    id: string;
    suCo: string;
    ngay: Date;
    tinhTrang: "Đã xử lý" | "Đã huỷ" | "Chờ tiếp nhận";
  }[] = useMemo(
    () => [
      {
        id: "1",
        suCo: "Hư ghế",
        ngay: new Date(),
        tinhTrang: "Đã xử lý",
      },
      {
        id: "2",
        suCo: "Sọc màn hình",
        ngay: new Date(),
        tinhTrang: "Đã huỷ",
      },
      {
        id: "3",
        suCo: "TV bị vỡ",
        ngay: new Date(),
        tinhTrang: "Chờ tiếp nhận",
      },
    ],
    []
  );

  return (
    <>
      <section className="flex gap-6 mb-6 justify-between">
        <Filter name="Tình trạng">
          <option className="font-medium" value="Toàn bộ">
            Toàn bộ
          </option>
          <option className="text-green-500 font-medium" value="Đã xử lý">
            Đã xử lý
          </option>
          <option className="text-gray-400 font-medium" value="Đã huỷ">
            Đã huỷ
          </option>
          <option className="text-red-500 font-medium" value="Chờ tiếp nhận">
            Chờ tiếp nhận
          </option>
        </Filter>
        <button
          onClick={() => {
            setIsClickReport(true);
          }}
          className="bg-red-600 px-3 py-1 text-white rounded-md shadow items-center flex flex-shrink-0 gap-2"
        >
          <CirclePlus className="size-5" />
          <span className="font-semibold">Báo cáo</span>
        </button>
      </section>
      <section className="bg-white mt-2 rounded-md">
        <div className="grid grid-cols-[1fr_260px_200px_60px] py-2 border-b px-4 text-gray-400 font-medium">
          <p>Sự cố</p>
          <p>Ngày tiếp nhận</p>
          <p>Tình trạng</p>
          <p></p>
        </div>
        {data
          .filter((item) =>
            searchParam.get("filter")
              ? item.tinhTrang == searchParam.get("filter") ||
                searchParam.get("filter") == "Toàn bộ"
              : true
          )
          .map((item) => (
            <div
              key={item.suCo}
              onClick={() => {
                setIsClickShow(true);
                setId(item.id);
              }}
              className="grid grid-cols-[1fr_260px_200px_60px] py-2 border-b px-4 relative cursor-pointer hover:bg-gray-200"
            >
              <p>{item.suCo}</p>
              <p>{formatDate(item.ngay)}</p>
              <p
                className={`font-semibold ${
                  item.tinhTrang == "Đã xử lý"
                    ? "text-green-500"
                    : item.tinhTrang == "Chờ tiếp nhận"
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {item.tinhTrang}
              </p>
              {(item.tinhTrang === "Chờ tiếp nhận" ||
                item.tinhTrang === "Đã xử lý") && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsClickEdit(true);
                  }}
                  className="border size-6 flex items-center justify-center"
                >
                  <Edit />
                </button>
              )}
            </div>
          ))}
      </section>
      {isClickShow && (
        <Show title="Chi tiết sự cố" setIsClick={setIsClickShow}>
          <ShowDetailProblem id={id} />
        </Show>
      )}
      {isClickEdit && (
        <Show title="Thay đổi thông tin" setIsClick={setIsClickEdit}>
          <ShowEditProblem id={id} />
        </Show>
      )}
      {isClickReport && (
        <Show title="Báo cáo mới" setIsClick={setIsClickReport}>
          <ShowAddProblem />
        </Show>
      )}
    </>
  );
}
