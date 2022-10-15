

export default class GiftShortResponse  {
	ID: number = 0;
	Name?: string = '';
	PhotoUrls: Array<string> = null;
	CostInBonuses: number = 0;
	CostInEuro: number = 0;
	Quantity: number = 0;
	constructor(obj?: Partial<GiftShortResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
