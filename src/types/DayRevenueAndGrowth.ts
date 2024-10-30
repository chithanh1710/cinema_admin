export interface RootDayRevenueAndGrowth {
	status: string;
	data: DaumDayRevenueAndGrowth[];
}

export interface DaumDayRevenueAndGrowth {
	day: number;
	month: number;
	year: number;
	total_revenue: number;
}
