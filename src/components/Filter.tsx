import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="border-b border-black w-36 flex flex-col">
      <label
        htmlFor="tinhTrang"
        className="font-medium text-gray-400 ml-3 text-xs -mb-1"
      >
        {name}
      </label>
      <select
        onChange={(e) => {
          searchParams.set("filter", e.currentTarget.value);
          setSearchParams(searchParams);
        }}
        name={name}
        id={name}
        className="px-2 py-1 bg-transparent outline-none font-medium"
      >
        {children}
      </select>
    </div>
  );
}
