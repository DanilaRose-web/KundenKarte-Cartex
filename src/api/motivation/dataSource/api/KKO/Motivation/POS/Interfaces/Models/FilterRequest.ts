import SearchRequest from '../../../../../KKO/Motivation/POS/Interfaces/Models/SearchRequest';
import SortRequest from '../../../../../KKO/Motivation/POS/Interfaces/Models/SortRequest';

export default class FilterRequest  {
	Search: SearchRequest = null;
	Sort: SortRequest = null;
	constructor(obj?: Partial<FilterRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
