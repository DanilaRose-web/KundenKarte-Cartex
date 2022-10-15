

export default class TranDetailInfoResponse  {
	Date: Date = null;
	TypeName?: string = '';
	SumInBonuses: number = 0;
	SpentToGifts: number = 0;
	constructor(obj?: Partial<TranDetailInfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
