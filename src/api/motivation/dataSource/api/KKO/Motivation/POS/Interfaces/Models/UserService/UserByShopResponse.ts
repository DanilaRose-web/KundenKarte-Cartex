

export default class UserByShopResponse  {
	Name?: string = '';
	Phone?: string = '';
	constructor(obj?: Partial<UserByShopResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
