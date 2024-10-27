export interface RootOneCustomer {
	status: string;
	data: DaumOneCustomer[];
}

export interface DaumOneCustomer {
	id: number;
	name: string;
	email: string;
	phone: any;
	rank: string;
	transaction: Transaction[];
	voucher_uses: any[];
}

export interface Transaction {
	id: number;
	id_ticket: number;
	id_staff: any;
	total_amount: number;
	time_transaction: string;
	type_transaction: any;
}
