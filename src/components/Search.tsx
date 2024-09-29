import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search == "") {
        searchParam.delete("q");
      } else {
        searchParam.set("q", search);
      }
      setSearchParam(searchParam);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="border-b border-black w-full">
      <input
        id="search"
        type="text"
        className="bg-transparent outline-none px-2 w-full"
        placeholder="Tìm kiếm"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
    </div>
  );
}
