export interface RootStaff {
	status: string;
	currentPage: number;
	pageSize: number;
	totalItem: number;
	totalPage: number;
	data: DaumStaff[];
}

export interface DaumStaff {
	id: number;
	name: string;
	email: string;
	phone: any;
	office: string;
}
