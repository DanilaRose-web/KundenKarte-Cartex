import CategoryResponse from '../../../../../../KKO/Motivation/POS/Interfaces/Models/GiftService/CategoryResponse';

export default class CategoryResponse  {
	ID: number = 0;
	Name?: string = '';
	PhotoUrl?: string = '';
	ChildCategories: Array<CategoryResponse> = null;
	constructor(obj?: Partial<CategoryResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
