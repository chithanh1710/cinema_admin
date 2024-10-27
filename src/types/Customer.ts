export interface RootCustomer {
	status: string;
	currentPage: number;
	pageSize: number;
	totalItem: number;
	totalPage: number;
	data: DaumCustomer[];
}

export interface DaumCustomer {
	id: number;
	name: string;
	email: string;
	phone: any;
	rank: string;
}
