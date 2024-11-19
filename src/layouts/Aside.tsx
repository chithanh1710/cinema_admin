import {
  ArchiveRestore,
  ArrowLeftToLine,
  CalendarClock,
  Film,
  HomeIcon,
  Popcorn,
  UsersRound,
} from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function Aside() {
  const dataAside: { icon: ReactNode; to: string; name: string }[] = [
    {
      icon: <HomeIcon className="size-5" />,
      to: "analysis",
      name: "Trang chủ",
    },
    { icon: <Film className="size-5" />, to: "movie", name: "Quản lý phim" },
    {
      icon: <CalendarClock className="size-5" />,
      to: "showtime",
      name: "Quản lý suất chiếu",
    },
    // {
    //   icon: <UserRound className="size-5" />,
    //   to: "employee",
    //   name: "Quản lý nhân viên",
    // },
    {
      icon: <UsersRound className="size-5" />,
      to: "customer",
      name: "Quản lý khách hàng",
    },
    {
      icon: <Popcorn className="size-5" />,
      to: "foods-and-drinks",
      name: "Quản lý sản phẩm",
    },
    {
      icon: <ArchiveRestore />,
      to: "backup",
      name: "Sao lưu và phục hồi",
    },
    // {
    //   icon: <Ticket className="size-5" />,
    //   to: "event",
    //   name: "Sự kiện khuyến mãi",
    // },
    // {
    //   icon: <ServerCrash className="size-5" />,
    //   to: "problem",
    //   name: "Sự cố",
    // },
  ];
  return (
    <aside className="flex flex-col gap-2 px-4 py-4 bg-white rounded-tr-2xl rounded-br-2xl shadow">
      {dataAside.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            `py-3 px-2 rounded-lg font-medium text-sm transition-all ${
              isActive ? "bg-blue-200" : ""
            }`
          }
        >
          <p className="flex gap-3 items-center font-medium">
            {item.icon}
            <span>{item.name}</span>
          </p>
        </NavLink>
      ))}
      <div className="flex flex-col gap-2 mt-auto">
        {/*<Link*/}
        {/*  to="information"*/}
        {/*  className="hover:bg-blue-500 hover:text-white py-3 px-3 rounded-md transition-all bg-blue-400 text-blue-50"*/}
        {/*>*/}
        {/*  <p className="flex gap-3 items-center font-medium">*/}
        {/*    <CircleUserRound className="size-5" />*/}
        {/*    <span>Cá nhân</span>*/}
        {/*  </p>*/}
        {/*</Link>*/}
        <button
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.clear();
            location.reload();
          }}
          className="bg-blue-100 text-blue-300 py-3 px-3 rounded-md transition-all hover:bg-blue-200 hover:text-blue-400"
        >
          <p className="flex gap-3 items-center font-medium">
            <ArrowLeftToLine className="size-5" />
            <span>Đăng xuất</span>
          </p>
        </button>
      </div>
    </aside>
  );
}
