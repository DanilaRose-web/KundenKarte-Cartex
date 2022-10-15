

export default class StartRegistrationRequest  {
	Name?: string = '';
	Password?: string = '';
	Phone?: string = '';
	PosCode?: string = '';
	constructor(obj?: Partial<StartRegistrationRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
