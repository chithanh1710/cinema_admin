export interface RootShowtime {
	status: string;
	totalItems: number;
	data: DaumShowtime[];
}

export interface DaumShowtime {
	id: number;
	time_start: string;
	time_end: string;
	movie: Movie;
	screen_room: ScreenRoom;
	cinema: Cinema;
}

export interface Movie {
	id: number;
	name: string;
}

export interface ScreenRoom {
	id: number;
	name: string;
}

export interface Cinema {
	id: number;
	name: string;
}

