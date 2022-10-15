import TransactionTypesEnum from '../../../../../../KKO/Motivation/Entities/Enums/TransactionTypesEnum';

export default class TranDetailInfoRequest  {
	Date: Date = null;
	TranType?: TransactionTypesEnum = null;
	constructor(obj?: Partial<TranDetailInfoRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
