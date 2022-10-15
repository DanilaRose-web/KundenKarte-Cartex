

export default class RegistrByPhoneRequest  {
	Phone?: string = '';
	Code?: string = '';
	PosCode?: string = '';
	constructor(obj?: Partial<RegistrByPhoneRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
