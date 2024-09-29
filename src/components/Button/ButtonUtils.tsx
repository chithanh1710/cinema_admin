import { ReactNode } from "react";

export default function ButtonUtils({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-200 px-3 py-1 rounded-md shadow items-center flex flex-shrink-0 gap-2"
    >
      {children}
    </button>
  );
}
