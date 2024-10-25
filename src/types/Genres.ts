export interface RootGenres {
  status: string;
  currentPage: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
  data: DaumGenres[];
}

export interface DaumGenres {
  id: number;
  name: string;
}
