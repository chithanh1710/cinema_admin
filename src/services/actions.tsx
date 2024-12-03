/* eslint-disable @typescript-eslint/no-explicit-any */
const URL_API = import.meta.env.VITE_API_URL;

export async function addMovie(movie: any) {
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
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(movie),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
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
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(movie),
    });
    console.log(res);

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

export async function addShowtime(values: any) {
  try {
    const res = await fetch(`${URL_API}/showtimes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add movie:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editShowtime(values: any, showtimeId: number) {
  try {
    const res = await fetch(`${URL_API}/showtimes/${showtimeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add movie:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editCustomer(values: any, customerId: number) {
  try {
    const res = await fetch(`${URL_API}/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editEmployee(values: any, id: number) {
  try {
    const res = await fetch(`${URL_API}/staffs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editFoodAndDrink(values: any, id: number) {
  try {
    const res = await fetch(`${URL_API}/foodsdrinks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function addFoodAndDrink(values: any) {
  try {
    const res = await fetch(`${URL_API}/foodsdrinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function deleteFoodAndDrink(id: number) {
  try {
    const res = await fetch(`${URL_API}/foodsdrinks/${id}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function createBackup(fileName: string) {
  try {
    const res = await fetch(`${URL_API}/backup`, {
      method: "POST",
      body: JSON.stringify({ BackupFileName: fileName }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to edit customer:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function restoreBackup(fileName: string) {
  try {
    const res = await fetch(`${URL_API}/backup/restore`, {
      method: "POST",
      body: JSON.stringify({ RestoreFileName: fileName.replace(".bak", "") }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to restore backup:", error);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}
