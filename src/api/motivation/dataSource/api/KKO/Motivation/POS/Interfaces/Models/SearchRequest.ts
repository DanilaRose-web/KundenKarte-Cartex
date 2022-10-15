

export default class SearchRequest  {
	FieldName?: string = '';
	SearchValue?: string = '';
	constructor(obj?: Partial<SearchRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
