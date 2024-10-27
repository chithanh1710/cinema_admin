export interface RootCinemas {
	status: string
	currentPage: number
	pageSize: number
	totalItem: number
	totalPage: number
	data: DaumCinemas[]
}

export interface DaumCinemas {
	id: number
	name: string
	address: string
	city: string
	amount_rooms: number
	sreenRooms: SreenRoom[]
}

export interface SreenRoom {
	id: number
	name: string
	amount_seats: number
}
