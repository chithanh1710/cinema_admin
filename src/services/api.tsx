import { RootActors } from "../types/Actors";
import { RootDirectors } from "../types/Directors";
import { RootGenres } from "../types/Genres";
import { RootMovie } from "../types/Movie";
import { RootMovieID } from "../types/MovieID";
import { RootShowtime } from "../types/Showtime.ts";
import { RootCinemas, SreenRoom } from "../types/Cinemas.ts";
import { RootCustomer } from "../types/Customer.ts";
import { RootOneCustomer } from "../types/OneCustomer.ts";
import { RootStaff } from "../types/Staff.ts";
import { RootFoodsAndDrinks } from "../types/FoodsAndDrinks.ts";
import { RootMonthRevenueAndGrowth } from "@/types/MonthRevenueAndGrowth.ts";
import { RootDayRevenueAndGrowth } from "@/types/DayRevenueAndGrowth.ts";
import { RootTop5Customer } from "@/types/TopCustomer.ts";
import { RootDayTickets } from "@/types/DayTickets.ts";
import { RootDayFood } from "@/types/DayFood.ts";

const URL_API = import.meta.env.VITE_API_URL;

export async function getAllCinemas(): Promise<
  { cinema: string; screenRooms: SreenRoom[] }[]
> {
  try {
    const res = await fetch(`${URL_API}/cinemas`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootCinemas = await res.json();

    return data.data.flatMap((s) => ({
      cinema: s.name,
      screenRooms: s.sreenRooms,
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getMovieById(id: number): Promise<RootMovieID> {
  try {
    const res = await fetch(`${URL_API}/movies/${id}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllMovie(
  page: number,
  pageSize: number,
  search: string
): Promise<RootMovie> {
  try {
    const filterSearch = search ? `&q=${search}` : "";
    const res = await fetch(
      `${URL_API}/movies?page=${page}&pageSize=${pageSize}${filterSearch}`,
      {
        method: "GET", // Hoặc POST tùy vào API của bạn
        headers: {
          "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllGenres(): Promise<RootGenres> {
  try {
    const res = await fetch(`${URL_API}/genres?page=${1}&pageSize=${100}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllActors(): Promise<RootActors> {
  try {
    const res = await fetch(`${URL_API}/actors?page=${1}&pageSize=${100}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllDirectors(): Promise<RootDirectors> {
  try {
    const res = await fetch(`${URL_API}/actors?page=${1}&pageSize=${100}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllShowTimes(): Promise<RootShowtime> {
  try {
    const res = await fetch(`${URL_API}/showtimes`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data: RootShowtime = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllCustomer() {
  try {
    const res = await fetch(`${URL_API}/customers`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data: RootCustomer = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch customers:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getCustomerById(id: number) {
  try {
    const res = await fetch(`${URL_API}/customers/${id}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data: RootOneCustomer = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch customers:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllStaffs() {
  try {
    const res = await fetch(`${URL_API}/staffs`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data: RootStaff = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch customers:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getStaffById(id: number) {
  try {
    const res = await fetch(`${URL_API}/staffs/${id}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data: RootStaff = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch customers:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllFoodsAndDrinks() {
  try {
    const res = await fetch(`${URL_API}/foodsdrinks`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootFoodsAndDrinks = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getFoodAndDrinkById(id?: number) {
  if (!id) {
    return null;
  }
  try {
    const res = await fetch(`${URL_API}/foodsdrinks/${id}`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootFoodsAndDrinks = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetMonthlyRevenue() {
  try {
    const res = await fetch(`${URL_API}/GetMonthlyRevenue`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootFoodsAndDrinks = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetCurrentMonthRevenueAndGrowth() {
  try {
    const res = await fetch(`${URL_API}/GetCurrentMonthRevenueAndGrowth`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootMonthRevenueAndGrowth = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetCurrentAndPreviousDayRevenue() {
  try {
    const res = await fetch(`${URL_API}/GetCurrentAndPreviousDayRevenue`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootDayRevenueAndGrowth = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetCurrentAndPreviousDayTicketsSold() {
  try {
    const res = await fetch(`${URL_API}/GetCurrentAndPreviousDayTicketsSold`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootDayTickets = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetCurrentAndPreviousDayFoodDrinkSales() {
  try {
    const res = await fetch(
      `${URL_API}/GetCurrentAndPreviousDayFoodDrinkSales`,
      {
        method: "GET", // Hoặc POST tùy vào API của bạn
        headers: {
          "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
        },
      }
    );

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootDayFood = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function GetTop5CustomersBySpending() {
  try {
    const res = await fetch(`${URL_API}/GetTop5CustomersBySpending`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data: RootTop5Customer = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function Get3Month() {
  try {
    const res = await fetch(`${URL_API}/Get3Month`, {
      method: "GET", // Hoặc POST tùy vào API của bạn
      headers: {
        "ngrok-skip-browser-warning": "true", // Bất kỳ giá trị nào cũng được
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch movies:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllFileBackup() {
  try {
    const res = await fetch(`${URL_API}/backup`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
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

export async function getHistoryBackup() {
  try {
    const res = await fetch(`${URL_API}/backup/history`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
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
