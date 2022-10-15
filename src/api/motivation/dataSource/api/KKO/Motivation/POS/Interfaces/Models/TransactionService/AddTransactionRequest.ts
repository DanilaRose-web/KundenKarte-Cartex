import TransactionTypesEnum from '../../../../../../KKO/Motivation/Entities/Enums/TransactionTypesEnum';

export default class AddTransactionRequest  {
	PosCode?: string = '';
	TransactionTypeID: TransactionTypesEnum = null;
	SumInBonuses: number = 0;
	constructor(obj?: Partial<AddTransactionRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
