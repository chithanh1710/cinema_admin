import { RootActors } from "../types/Actors";
import { RootDirectors } from "../types/Directors";
import { RootGenres } from "../types/Genres";
import { RootMovie } from "../types/Movie";
import { RootMovieID } from "../types/MovieID";
import { RootShowtime } from "../types/Showtime.ts";

const URL_API = import.meta.env.VITE_API_URL;

export async function getMovieById(id: number): Promise<RootMovieID> {
	try {
		await new Promise((res) => setTimeout(() => res(""), 500));
		const res = await fetch(`${URL_API}/movies/${id}`);

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
		await new Promise((res) => setTimeout(() => res(""), 500));
		const filterSearch = search ? `&q=${search}` : "";
		const res = await fetch(
			`${URL_API}/movies?page=${page}&pageSize=${pageSize}${filterSearch}`
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
		const res = await fetch(`${URL_API}/genres?page=${1}&pageSize=${100}`);

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
		const res = await fetch(`${URL_API}/actors?page=${1}&pageSize=${100}`);

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
		const res = await fetch(`${URL_API}/actors?page=${1}&pageSize=${100}`);

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
		const res = await fetch(`${URL_API}/showtimes`);
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
