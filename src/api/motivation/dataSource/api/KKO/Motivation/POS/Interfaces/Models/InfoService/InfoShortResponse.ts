

export default class InfoShortResponse  {
	ID: number = 0;
	Title?: string = '';
	ImageUrl?: string = '';
	Date: Date = null;
	constructor(obj?: Partial<InfoShortResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
