

export default class EndRestorePasswordRequest  {
	Phone?: string = '';
	Code?: string = '';
	NewPassword?: string = '';
	constructor(obj?: Partial<EndRestorePasswordRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
