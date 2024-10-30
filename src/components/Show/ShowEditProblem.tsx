import formatDate from "../../utils/formatDate";

export default function ShowEditProblem({ id }: { id: string }) {
  // TODO: LẤY ID DỮ FETCH DỮ LIỆU ĐỂ RENDER RA
  const valueEdit = {
    suCo: "123",
    ngay: new Date(),
  };
  console.log(id);
  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4 w-[620px]">
          <div className="w-80 h-56 mx-auto bg-black"></div>
          <p className="text-xl font-bold">
            Sự cố:
            <span className="text-base font-normal ml-2">{valueEdit.suCo}</span>
          </p>

          <p className="text-xl font-bold">
            Chi tiết:
            <br />
            <span className="text-base font-normal">{valueEdit.suCo}</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-xl font-bold">
            NV báo cáo:
            <span className="text-base font-normal ml-2">{valueEdit.suCo}</span>
          </p>
          <p className="text-xl font-bold">
            Mã NV:
            <span className="text-base font-normal ml-2">{valueEdit.suCo}</span>
          </p>
          <p className="text-xl font-bold">
            Ngày báo cáo:
            <span className="text-base font-normal ml-2">
              {formatDate(valueEdit.ngay)}
            </span>
          </p>
          <p className="text-xl font-bold">
            Tình trạng:
            <select
              className="font-normal ml-4 pl-1 pr-4 border-b border-black"
              name=""
              id=""
            >
              <option value="">Đã xử lý</option>
              <option value="">Đã huỷ</option>
              <option value="">Chờ tiếp nhận</option>
              <option value="">Đang xử lý</option>
            </select>
          </p>
          <p className="text-xl font-bold">
            Ngày báo cáo:
            <input
              className="font-normal ml-4 border-b border-black"
              type="date"
            />
          </p>
          <p className="text-xl font-bold">
            Phí sửa chữa:
            <input
              className="font-normal ml-4 border-b border-black"
              type="number"
            />
          </p>
        </div>
      </div>
      <button className="self-end py-3 px-6 text-xl bg-blue-200 text-white font-semibold rounded-lg">
        Xác nhận
      </button>
    </div>
  );
}
