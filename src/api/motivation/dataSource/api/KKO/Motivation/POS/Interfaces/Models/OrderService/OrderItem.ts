

export default class OrderItem  {
	GiftID: number = 0;
	Quantity: number = 0;
	constructor(obj?: Partial<OrderItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
