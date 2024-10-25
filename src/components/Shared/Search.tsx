import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export default function Search({placeholder = "Tìm kiếm"}: { placeholder?: string }) {
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
    }, [search, searchParam, setSearchParam]);

    return (
        <div className="border-b border-black w-full">
            <input
                id="search"
                type="text"
                className="bg-transparent outline-none px-2 w-full"
                placeholder={placeholder}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
        </div>
    );
}
