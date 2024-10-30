export interface RootFoodsAndDrinks {
	status: string;
	totalItem: number;
	data: DaumFoodsAndDrinks [];
}

export interface DaumFoodsAndDrinks {
	id: number;
	name: string;
	price: number;
	stock_quantity: number;
	image_url: string;
	category: string;
}
