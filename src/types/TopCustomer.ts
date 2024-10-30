export interface RootTop5Customer {
	status: string;
	data: DaumTop5Customer[];
}

export interface DaumTop5Customer {
	customer_id: number;
	customer_email: string;
	customer_rank: string;
	customer_name: string;
	total_spent: number;
}
