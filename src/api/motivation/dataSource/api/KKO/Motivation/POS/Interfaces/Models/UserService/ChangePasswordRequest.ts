

export default class ChangePasswordRequest  {
	OldPassword?: string = '';
	NewPassword?: string = '';
	constructor(obj?: Partial<ChangePasswordRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
