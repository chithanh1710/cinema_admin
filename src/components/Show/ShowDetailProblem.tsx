import formatDate from "../../utils/formatDate";

export default function ShowDetailProblem({ id }: { id: string }) {
  console.log(id);
  // TODO: LẤY ID DỮ FETCH DỮ LIỆU ĐỂ RENDER RA
  const valueShow = {
    suCo: "123",
    ngay: new Date(),
  };
  return (
    <div className="flex gap-8 p-4">
      <div className="flex flex-col gap-4 w-[620px]">
        <p className="text-xl font-bold">
          Sự cố:
          <span className="text-base font-normal ml-2">{valueShow.suCo}</span>
        </p>
        <p className="text-xl font-bold">
          NV báo cáo:
          <span className="text-base font-normal ml-2">{valueShow.suCo}</span>
        </p>
        <p className="text-xl font-bold">
          Mã NV:
          <span className="text-base font-normal ml-2">{valueShow.suCo}</span>
        </p>
        <p className="text-xl font-bold">
          Tình trạng:
          <span className="text-base font-normal ml-2">{valueShow.suCo}</span>
        </p>
        <p className="text-xl font-bold">
          Ngày báo cáo:
          <span className="text-base font-normal ml-2">
            {formatDate(valueShow.ngay)}
          </span>
        </p>
        <div className="mt-auto">
          <p className="text-xl font-bold">Chi tiết:</p>
          <div className="w-full border h-36 rounded p-2">{valueShow.suCo}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-center">Ảnh sự cố</p>
        <div className="size-96 bg-black"></div>
      </div>
    </div>
  );
}
