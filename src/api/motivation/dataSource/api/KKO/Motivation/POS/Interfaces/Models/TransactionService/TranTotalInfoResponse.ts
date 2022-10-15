import TransactionTypesEnum from '../../../../../../KKO/Motivation/Entities/Enums/TransactionTypesEnum';

export default class TranTotalInfoResponse  {
	TypeID: TransactionTypesEnum = null;
	TypeName?: string = '';
	Quantity: number = 0;
	Bonuses: number = 0;
	constructor(obj?: Partial<TranTotalInfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
