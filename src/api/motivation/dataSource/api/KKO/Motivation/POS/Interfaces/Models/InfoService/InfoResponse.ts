

export default class InfoResponse  {
	ID: number = 0;
	Title?: string = '';
	ImageUrl?: string = '';
	Text?: string = '';
	Date: Date = null;
	constructor(obj?: Partial<InfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
