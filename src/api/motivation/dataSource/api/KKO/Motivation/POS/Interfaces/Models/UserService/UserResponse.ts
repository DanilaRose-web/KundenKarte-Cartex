

export default class UserResponse  {
	Name?: string = '';
	Phone?: string = '';
	LastActivity: Date = null;
	constructor(obj?: Partial<UserResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
