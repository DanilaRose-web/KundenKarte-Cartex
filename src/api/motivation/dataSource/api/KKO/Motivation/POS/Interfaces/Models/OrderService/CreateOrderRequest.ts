import OrderItem from '../../../../../../KKO/Motivation/POS/Interfaces/Models/OrderService/OrderItem';

export default class CreateOrderRequest  {
	OrderItems: Array<OrderItem> = null;
	constructor(obj?: Partial<CreateOrderRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
