import GiftShortResponse from '../../../../../../KKO/Motivation/POS/Interfaces/Models/GiftService/GiftShortResponse';

export default class OrderResponse  {
	ID: number = 0;
	Date: Date = null;
	StatusName?: string = '';
	Gifts: Array<GiftShortResponse> = null;
	constructor(obj?: Partial<OrderResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
