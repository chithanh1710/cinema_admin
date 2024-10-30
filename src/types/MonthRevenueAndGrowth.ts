export interface RootMonthRevenueAndGrowth {
	status: string;
	data: DaumMonthRevenueAndGrowth[];
}

export interface DaumMonthRevenueAndGrowth {
	month: number;
	year: number;
	total_revenue: number;
}
