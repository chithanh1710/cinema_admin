/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

interface MainContentGridProps {
  dataTitle: string[];
  children: (item: any) => ReactNode;
  data: any[];
  gridCols: string;
}

export default function MainContentGrid({
  dataTitle,
  children,
  data,
  gridCols,
}: MainContentGridProps) {
  return (
    <section className="bg-white mt-2 rounded-md">
      <div
        className={`grid ${gridCols} py-2 border-b px-4 text-gray-400 font-medium`}
      >
        {dataTitle.map((item) => (
          <p key={item}>{item}</p>
        ))}
        <p></p>
      </div>
      {data.map((item) => (
        <div
          key={item.id}
          className={`grid ${gridCols} py-2 border-b px-4 relative`}
        >
          {children(item)}
        </div>
      ))}
    </section>
  );
}
