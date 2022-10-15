

export default class LoginRequest  {
	Phone?: string = '';
	Password?: string = '';
	PosCode?: string = '';
	constructor(obj?: Partial<LoginRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
