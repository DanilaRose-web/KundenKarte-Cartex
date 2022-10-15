

export default class GiftResponse  {
	ID: number = 0;
	Name?: string = '';
	PhotoUrls: Array<string> = null;
	Description?: string = '';
	GiftCategoryID: number = 0;
	CostInBonuses: number = 0;
	CostInEuro: number = 0;
	Quantity: number = 0;
	GiftCategoryName?: string = '';
	ShopID: string = '';
	SKU?: string = '';
	constructor(obj?: Partial<GiftResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
