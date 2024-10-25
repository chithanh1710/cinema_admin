export interface RootMovie {
  status: string;
  currentPage: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
  data: DaumMovie[];
}

export interface DaumMovie {
  id: number;
  name: string;
  duration: string;
  description: string;
  star: number;
  old: number;
  type: string;
  trailer: string;
  thumbnail: string;
  show_times: ShowTime[];
  genres: string[];
  actors: string[];
  director: Director;
  image: string;
  release_date: string;
}

export interface ShowTime {
  time_start: string;
  cinemaName: string;
  id: number;
}

export interface Director {
  id: number;
  name: string;
}
