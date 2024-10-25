/* eslint-disable @typescript-eslint/no-explicit-any */

const URL_API = import.meta.env.VITE_API_URL;

export async function addMovie(movie: any) {
  console.log(movie);

  if (!movie.image && !movie.thumbnail) {
    throw new Error("Vui lòng thêm lại 2 ảnh");
  }
  if (!movie.image) {
    throw new Error("Vui lòng thêm lại ảnh lớn ngang");
  }
  if (!movie.thumbnail) {
    throw new Error("Vui lòng thêm lại ảnh nhỏ dọc");
  }
  try {
    const res = await fetch(`${URL_API}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add movie:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editMovie(movie: any, movieId: number) {
  console.log(movie);

  if (!movie.image && !movie.thumbnail) {
    throw new Error("Vui lòng thêm lại 2 ảnh");
  }
  if (!movie.image) {
    throw new Error("Vui lòng thêm lại ảnh lớn ngang");
  }
  if (!movie.thumbnail) {
    throw new Error("Vui lòng thêm lại ảnh nhỏ dọc");
  }

  try {
    const res = await fetch(`${URL_API}/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add movie:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("https://azure-blob-upload.onrender.com/image", {
    method: "POST",
    body: formData,
    headers: {
      "x-api-key": import.meta.env.VITE_X_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.url;
};
