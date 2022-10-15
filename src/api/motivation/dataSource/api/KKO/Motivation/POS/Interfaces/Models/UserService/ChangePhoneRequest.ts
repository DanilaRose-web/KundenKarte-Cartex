

export default class ChangePhoneRequest  {
	Phone?: string = '';
	Code?: string = '';
	constructor(obj?: Partial<ChangePhoneRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
