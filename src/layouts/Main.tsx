import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="grid grid-cols-[260px,1fr] h-full overflow-y-hidden bg-gray-100 relative">
      {children}
    </main>
  );
}
