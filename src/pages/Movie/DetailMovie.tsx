import { Badge, Descriptions, Image } from "antd";
import type { DescriptionsProps } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../../services/api";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { IMG_CONFIG } from "../../constants/img";

export default function DetailMovie() {
  const params = useParams();
  const id = Number(params.id);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  const movieData = data?.data[0];

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên phim",
      children: movieData?.name,
    },

    {
      key: "2",
      label: "Đạo diễn",
      children: movieData?.director.name,
    },
    {
      key: "3",
      label: "Ngày xuất bản",
      children: movieData?.release_date
        ? format(movieData?.release_date, "dd-MM-yyyy")
        : "",
    },
    {
      key: "4",
      label: "Thời lượng",
      children: `${movieData?.duration.split(":")[0].replace("0", "")} tiếng ${
        movieData?.duration.split(":")[1] == "00"
          ? ""
          : movieData?.duration.split(":")[1] + "phút"
      }`,
    },
    {
      key: "5",
      label: "Diễn viên",
      children: movieData?.actors.map((a) => a.name).join(", "),
      span: 2,
    },
    {
      key: "6",
      label: "Trạng thái",
      children: (
        <Badge
          status={movieData?.type === "ĐANG CHIẾU" ? "success" : "processing"}
          text={
            movieData?.type &&
            movieData?.type[0] + movieData?.type.slice(1).toLocaleLowerCase()
          }
        />
      ),
      span: 3,
    },
    {
      key: "7",
      label: "Thể loại",
      children: movieData?.genres.map((g) => g.name).join(", "),
    },
    {
      key: "8",
      label: "Đánh giá",
      children: (
        <div className="flex gap-1 items-center">
          {movieData?.star}{" "}
          <Star size={20} className="fill-yellow-400" stroke="none" />
        </div>
      ),
    },
    {
      key: "9",
      label: "Tuổi",
      children: movieData?.old,
    },
    {
      key: "10",
      label: "Nội dung",
      children: movieData?.description,
      span: 3,
    },
    {
      key: "11",
      label: "Ảnh ngang",
      children: (
        <Image
          {...IMG_CONFIG}
          className="rounded-md"
          width="80%"
          height="auto"
          src={movieData?.image}
        />
      ),
      span: 2,
    },
    {
      key: "12",
      label: "Ảnh dọc",
      children: (
        <Image
          {...IMG_CONFIG}
          className="rounded-md"
          width="80%"
          height="auto"
          src={movieData?.thumbnail}
        />
      ),
    },
  ];

  if (!id) return Navigate({ to: "/dashboard/movie", replace: true });
  if (isFetching) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div>
      <Descriptions
        className="px-2"
        labelStyle={{ width: 120 }}
        title="Thông tin chi tiết"
        bordered
        items={items}
      />
    </div>
  );
}
