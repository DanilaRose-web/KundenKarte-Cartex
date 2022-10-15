

export default class SendNotificationRequest  {
	Type: number = 0;
	Text?: string = '';
	constructor(obj?: Partial<SendNotificationRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
