import { Sheet } from "lucide-react";
import * as XLSX from "xlsx";

export default function ButtonPrintFileExcel({
  data,
  title,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  title: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, title);

        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }}
      className="bg-blue-200 px-3 py-1 rounded-md shadow items-center flex flex-shrink-0 gap-2"
    >
      <Sheet className="size-5" />
      <span className="font-semibold">Xuất file excel</span>
    </button>
  );
}
