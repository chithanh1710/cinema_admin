export interface RootDayTickets {
	status: string;
	data: DaumDayTickets[];
}

export interface DaumDayTickets {
	day: number;
	month: number;
	year: number;
	total_tickets_sold: number;
}
