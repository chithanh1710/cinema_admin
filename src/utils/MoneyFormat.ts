export function formatMoney(amount: number) {
	return amount.toLocaleString("vn-vi")
	             .replace(".", ",") + ".000 đ";
}