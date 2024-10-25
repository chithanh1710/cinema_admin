export interface RootMovieID {
  status: string;
  data: DaumMovieID[];
}

export interface DaumMovieID {
  id: number;
  name: string;
  duration: string;
  star: number;
  old: number;
  type: string;
  trailer: string;
  thumbnail: string;
  genres: Genre[];
  description: string;
  director: Director;
  actors: Actors[];
  image: string;
  show_times: ShowTime[];
  release_date: string;
}

export interface Actors {
  id: number;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}

export interface Director {
  id: number;
  name: string;
}

export interface ShowTime {
  id: number;
  id_screen_room: number;
  time_start: string;
  time_end: string;
}
