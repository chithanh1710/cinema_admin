export interface RootDayFood {
	status: string;
	data: DaumDayFood[];
}

export interface DaumDayFood {
	day: number;
	month: number;
	year: number;
	total_food_drink_sold: number;
}
