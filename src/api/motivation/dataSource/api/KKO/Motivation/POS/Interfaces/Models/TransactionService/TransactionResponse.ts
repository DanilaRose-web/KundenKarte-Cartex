import TransactionTypesEnum from '../../../../../../KKO/Motivation/Entities/Enums/TransactionTypesEnum';

export default class TransactionResponse  {
	ID: number = 0;
	TypeID: TransactionTypesEnum = null;
	Date: Date = null;
	SumInBonuses: number = 0;
	SpentToGifts: number = 0;
	constructor(obj?: Partial<TransactionResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
