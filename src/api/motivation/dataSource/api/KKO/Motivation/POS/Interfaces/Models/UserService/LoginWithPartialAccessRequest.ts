

export default class LoginWithPartialAccessRequest  {
	Phone?: string = '';
	PosCode?: string = '';
	constructor(obj?: Partial<LoginWithPartialAccessRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
