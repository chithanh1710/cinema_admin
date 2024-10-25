export interface RootDirectors {
  status: string;
  currentPage: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
  data: DaumDirectors[];
}

export interface DaumDirectors {
  id: number;
  name: string;
}
