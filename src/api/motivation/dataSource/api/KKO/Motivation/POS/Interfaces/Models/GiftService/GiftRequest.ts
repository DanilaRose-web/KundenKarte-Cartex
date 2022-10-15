import SortRequest from '../../../../../../KKO/Motivation/POS/Interfaces/Models/SortRequest';

export default class GiftRequest  {
	Sort: SortRequest = null;
	IsAvailableOnly: boolean = false;
	GiftCategories: Array<number> = null;
	constructor(obj?: Partial<GiftRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
