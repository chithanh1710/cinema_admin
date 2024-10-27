import { useEffect, useState } from "react";

export default function ShowAddOrEditProduct({
  setIsClick,
  id,
}: {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}) {
  // TODO: FETCH DU LIEU TU ID DE CHINH SUA

    const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (category && img && price && amount && name) {
      setIsSuccess(true);
    } else setIsSuccess(false);
  }, [category, img, price, amount, name]);
  return (
    <div className="flex flex-col gap-10 p-8">
      <div>
        <label className="text-xl font-bold w-48 inline-block">
          Tên sản phẩm:
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="outline-none border-b w-40 ml-3 px-2"
          type="text"
        />
      </div>
      <div>
        <label className="text-xl font-bold w-48 inline-block">
          Giá sản phẩm:
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="outline-none border-b w-40 ml-3 px-2"
          type="number"
        />
      </div>
      <div>
        <label className="text-xl font-bold w-48 inline-block">
          Số lượng sản phẩm:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="outline-none border-b w-40 ml-3 px-2"
          type="number"
        />
      </div>
      <div>
        <label className="text-xl font-bold w-48 inline-block">Loại:</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="outline-none border-b w-40 ml-3 px-2"
          name="loai"
          id="loai"
        >
          <option value="">Chọn loại</option>
          <option value="thucAn">Thức ăn</option>
          <option value="doUong">Đồ uống</option>
        </select>
      </div>
      <div>
        <img
          alt="Image"
          src={img || "/img/image.png"}
          className="size-36 bg-black mb-4 object-cover"
        />
        <input
          onChange={(e) => {
            const file = e.target.files?.item(0);
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) {
                setImg(reader.result.toString());
              }
            };
            if (file) {
              reader.readAsDataURL(file);
            }
          }}
          type="file"
          accept="image/*"
        />
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => setIsClick(false)}
          className="px-6 py-3 rounded-md bg-red-600 text-white font-bold shadow-lg"
        >
          Huỷ
        </button>
        <button
          disabled={!isSuccess}
          className={`px-6 py-3 rounded-md ${
            isSuccess
              ? "bg-green-600 cursor-pointer"
              : "bg-gray-200 cursor-not-allowed"
          }  text-white font-bold shadow-lg`}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
