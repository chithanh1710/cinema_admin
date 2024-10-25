import { CirclePlus, Edit, Trash2 } from "lucide-react";
import ButtonUtils from "../components/Button/ButtonUtils";
import Search from "../components/Shared/Search.tsx";
import Filter from "../components/Shared/Filter.tsx";
import { useState } from "react";
import Show from "../components/Show/Show";
import ShowAddOrEditProduct from "../components/Show/ShowAddOrEditProduct";

export default function ProductAndService() {
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      <section className="flex gap-6 mb-6">
        <Filter name="Loại">
          <option>Tát cả</option>
          <option>Thức ăn</option>
          <option>Đồ uống</option>
        </Filter>
        <Search />
        <ButtonUtils onClick={() => setIsClickAdd(true)}>
          <CirclePlus className="size-5" />
          <span className="font-semibold">Thêm sản phẩm</span>
        </ButtonUtils>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-4 rounded-lg bg-white w-full"
          >
            <div className="w-[80%] aspect-square bg-black mx-auto"></div>
            <p className="text-center font-bold text-xl">Coca</p>
            <p>
              SL: <span className="font-bold">12</span>
            </p>
            <p>
              Giá: <span className="font-bold">12000đ</span>
            </p>
            <div className="flex justify-center gap-6 mt-3">
              <button
                onClick={() => {
                  setIsClickEdit(true);
                  setId(i.toString());
                }}
                className="p-2 bg-blue-400 text-white rounded"
              >
                <Edit />
              </button>
              <button className="p-2 bg-blue-400 text-white rounded">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </section>
      {isClickAdd && (
        <Show setIsClick={setIsClickAdd} title="Thêm sản phẩm">
          <ShowAddOrEditProduct setIsClick={setIsClickAdd} />
        </Show>
      )}
      {isClickEdit && (
        <Show setIsClick={setIsClickEdit} title="Chỉnh sửa sản phẩm">
          <ShowAddOrEditProduct id={id} setIsClick={setIsClickEdit} />
        </Show>
      )}
    </>
  );
}
