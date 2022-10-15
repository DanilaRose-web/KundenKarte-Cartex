

export default class RecentUsersRequest  {
	PosCode?: string = '';
	constructor(obj?: Partial<RecentUsersRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
