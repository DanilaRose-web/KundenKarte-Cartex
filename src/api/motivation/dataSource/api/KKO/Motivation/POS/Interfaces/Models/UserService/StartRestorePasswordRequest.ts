

export default class StartRestorePasswordRequest  {
	Phone?: string = '';
	constructor(obj?: Partial<StartRestorePasswordRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
