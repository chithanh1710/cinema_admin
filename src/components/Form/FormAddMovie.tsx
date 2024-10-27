/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, TimePicker, Typography, Upload, } from "antd";
import { useWatch } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { addMovie, handleImageUpload } from "../../services/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAllActors, getAllDirectors, getAllGenres, } from "../../services/api";
import { useNavigate } from "react-router-dom";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const config = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Vui lòng chọn thời gian!",
    },
  ],
};

export const FormAddMovie = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const results = useQueries({
    queries: [
      {
        queryKey: ["genres"],
        queryFn: getAllGenres,
      },
      {
        queryKey: ["actors"],
        queryFn: getAllActors,
      },
      {
        queryKey: ["directors"],
        queryFn: getAllDirectors,
      },
    ],
  });

  const [genresAPI, actorsAPI, directorsAPI] = results;
  const {
    data: genresData,
    isError: genresIsError,
    isFetching: genresIsFetching,
  } = genresAPI;
  const {
    data: actorsData,
    isError: actorsIsError,
    isFetching: actorsIsFetching,
  } = actorsAPI;
  const {
    data: directorsData,
    isError: directorsIsError,
    isFetching: directorsIsFetching,
  } = directorsAPI;

  const [form] = Form.useForm();
  const nameValue = useWatch("name", form);
  const descriptionValue = useWatch("description", form);
  const typeValue = useWatch("type", form);
  const release_dateValue = useWatch("release_date", form);
  const trailerValue = useWatch("trailer", form);
  const durationValue = useWatch("duration", form);
  const ageValue = useWatch("old", form);
  const rateValue = useWatch("rate", form);
  const id_directorValue = useWatch("id_director", form);
  const actorsValue = useWatch("actors", form);
  const genresValue = useWatch("genres", form);

  const { mutate } = useMutation({
    mutationFn: addMovie,
    onSettled: () => {
      toast.remove("addMovie");
    },
    onMutate: () => {
      toast.loading("Đang thực hiện thêm phim mới", { id: "addMovie" });
    },
    onSuccess: (movie) => {
      toast.success("Thêm phim thành công");
      form.resetFields();
      setImageUrl("");
      setThumbnailUrl("");
      navigate(`/dashboard/movie/detail/${movie.movieId}`);
    },
    onError: (error) => {
      toast.error(`Thêm phim thất bại: ${error.message}`);
      console.error(error);
    },
  });

  const onFinish = async (values: any) => {
    const data = {
      name: values.name,
      description: values.description,
      trailer: values.trailer,
      type: values.type,
      duration: values.duration.format("HH:mm:ss"),
      old: values.old,
      star: values.star,
      id_director: Number(values.id_director),
      actors: values.actors,
      genres: values.genres,
      image: imageUrl,
      thumbnail: thumbnailUrl,
      release_date: values.release_date.format("YYYY-MM-DD"),
    };
    const transformedData = {
      ...data,
      genres: data.genres.map((genre: string) => ({ id: Number(genre) })),
      actors: data.actors.map((actor: string) => ({ id: Number(actor) })),
    };
    mutate(transformedData);
  };

  if (genresIsError || actorsIsError || directorsIsError) return <p>Error</p>;

  return (
    <div className="flex gap-10 pr-6">
      <Form
        className="w-full"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 22 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Tên phim"
          rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung phim!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Radio.Group>
            <Radio value="ĐANG CHIẾU"> Đang chiếu </Radio>
            <Radio value="SẮP CHIẾU"> Sắp chiếu </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="release_date"
          label="Ngày xuất bản"
          rules={[{ required: true, message: "Vui lòng nhập ngày xuất bản!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="trailer"
          label="Video trailer URL"
          rules={[{ required: true, message: "Vui lòng nhập video trailer!" }]}
        >
          <Input placeholder="https://www.youtube.com/watch?v=LWLMHHwSObY" />
        </Form.Item>
        <Form.Item name="duration" label="Thời gian" {...config}>
          <TimePicker />
        </Form.Item>
        <Form.Item
          name="old"
          label="Tuổi"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 99,
              message: "Vui lòng nhập tuổi hợp lệ!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="star"
          label="Đánh giá"
          rules={[{ required: true, message: "Vui lòng đánh giá!" }]}
        >
          <Rate count={10} />
        </Form.Item>
        <Form.Item
          name="id_director"
          labelCol={{ span: 24 }}
          label="Chọn đạo diễn"
          rules={[{ required: true, message: "Vui lòng chọn một đạo diễn!" }]}
        >
          <Select
            filterOption={(input, option) =>
              option && option.children
                ? option.children
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                : false
            }
            placeholder={directorsIsFetching ? "Loading..." : "Select options"}
          >
            {!directorsIsFetching ? (
              directorsData?.data.map((d) => (
                <Select.Option key={d.id} value={d.id}>
                  {d.name}
                </Select.Option>
              ))
            ) : (
              <>
                <Select.Option value="1">Option 1</Select.Option>
                <Select.Option value="2">Option 2</Select.Option>
                <Select.Option value="3">Option 3</Select.Option>
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="actors"
          labelCol={{ span: 24 }}
          label="Chọn diễn viên (Có thể chọn nhiều)"
          rules={[
            { required: true, message: "Vui lòng chọn ít nhất một diễn viên!" },
          ]}
        >
          <Select
            filterOption={(input, option) =>
              option && option.children
                ? option.children
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                : false
            }
            mode="multiple"
            placeholder={actorsIsFetching ? "Loading..." : "Select options"}
          >
            {!actorsIsFetching ? (
              actorsData?.data.map((a) => (
                <Select.Option key={a.id} value={a.id}>
                  {a.name}
                </Select.Option>
              ))
            ) : (
              <>
                <Select.Option value="1">Option 1</Select.Option>
                <Select.Option value="2">Option 2</Select.Option>
                <Select.Option value="3">Option 3</Select.Option>
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="genres" // Đặt tên cho trường thể loại
          labelCol={{ span: 24 }}
          label="Chọn thể loại (Có thể chọn nhiều)"
          rules={[
            { required: true, message: "Vui lòng chọn ít nhất một thể loại!" },
          ]}
        >
          <Select
            filterOption={(input, option) =>
              option && option.children
                ? option.children
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                : false
            }
            mode="multiple"
            placeholder={genresIsFetching ? "Loading..." : "Select options"}
          >
            {!genresIsFetching ? (
              genresData?.data.map((g) => (
                <Select.Option key={g.id} value={g.id}>
                  {g.name}
                </Select.Option>
              ))
            ) : (
              <>
                <Select.Option value="1">Option 1</Select.Option>
                <Select.Option value="2">Option 2</Select.Option>
                <Select.Option value="3">Option 3</Select.Option>
              </>
            )}
          </Select>
        </Form.Item>
        <div className="flex gap-12">
          <Form.Item
            className="max-w-36"
            name="image"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Ảnh lớn ngang"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh lớn!" }]}
          >
            <Upload
              beforeUpload={async (file) => {
                if (file) {
                  const largeImageUrl = await toast.promise(
                    handleImageUpload(file),
                    {
                      error: "Thêm ảnh thất bại",
                      loading: "Đang thêm ảnh",
                      success: "Thêm ảnh thành công",
                    }
                  );
                  setImageUrl(largeImageUrl);
                }
                return false;
              }}
              maxCount={1}
              accept="image/*"
              listType="picture-card"
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="thumbnail"
            className="max-w-36"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Ảnh nhỏ dọc"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh nhỏ!" }]}
          >
            <Upload
              beforeUpload={async (file) => {
                if (file) {
                  const thumbnailUrl = await toast.promise(
                    handleImageUpload(file),
                    {
                      error: "Thêm ảnh thất bại",
                      loading: "Đang thêm ảnh",
                      success: "Thêm ảnh thành công",
                    }
                  );
                  setThumbnailUrl(thumbnailUrl);
                }
                return false;
              }}
              className="w-full"
              maxCount={1}
              accept="image/*"
              listType="picture-card"
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="float-end w-full py-4 font-bold"
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>

      <Typography className="w-full">
        <pre>Tên phim: {nameValue}</pre>
        <pre>Nội dung: {descriptionValue}</pre>
        <pre>Trạng thái: {typeValue}</pre>
        <pre>Video trailer URL: {trailerValue}</pre>
        <pre>Ngày xuất bản: {release_dateValue?.format("DD-MM-YYYY")} </pre>
        <pre>Thời gian: {durationValue?.format("HH:mm")} </pre>
        <pre>Tuổi: {ageValue}</pre>
        <pre>Đánh giá: {rateValue}</pre>
        <pre>Đạo diễn: {id_directorValue}</pre>
        <pre>Các diễn viên: {actorsValue?.join(", ")}</pre>
        <pre>Các thể loại: {genresValue?.join(", ")}</pre>
        <pre>Ảnh lớn URL: {imageUrl}</pre>
        <pre>Ảnh nhỏ URL: {thumbnailUrl}</pre>
      </Typography>
    </div>
  );
};
