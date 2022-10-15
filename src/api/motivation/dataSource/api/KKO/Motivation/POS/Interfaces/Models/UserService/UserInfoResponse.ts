

export default class UserInfoResponse  {
	Phone?: string = '';
	Name?: string = '';
	constructor(obj?: Partial<UserInfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
