

export default class StartChangePhoneRequest  {
	NewPhone?: string = '';
	constructor(obj?: Partial<StartChangePhoneRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
