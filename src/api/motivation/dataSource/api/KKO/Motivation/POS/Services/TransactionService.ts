import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import AddTransactionRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/TransactionService/AddTransactionRequest';
import TranDetailInfoRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/TransactionService/TranDetailInfoRequest';
import FilterRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/FilterRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import TranTotalInfoResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/TransactionService/TranTotalInfoResponse';
import TranDetailInfoResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/TransactionService/TranDetailInfoResponse';
import TransactionResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/TransactionService/TransactionResponse';

export default class TransactionService {
	webApiService: WebApiService;
	AddTransactionEvent = new Events<WsResponseModel<Boolean>>();
	GetTotalBonusesEvent = new Events<WsResponseModel<number>>();
	GetTotalInfoEvent = new Events<WsResponseModel<Array<TranTotalInfoResponse>>>();
	GetTransactionDetailsEvent = new Events<WsResponseModel<Array<TranDetailInfoResponse>>>();
	GetTransactionsEvent = new Events<WsResponseModel<Array<TransactionResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('TransactionService', 'AddTransaction', (res: WsResponseModel<Boolean>) => {
			self.AddTransactionEvent.trigger(res);
		});
		webApiService.on('TransactionService', 'GetTotalBonuses', (res: WsResponseModel<number>) => {
			self.GetTotalBonusesEvent.trigger(res);
		});
		webApiService.on('TransactionService', 'GetTotalInfo', (res: WsResponseModel<Array<TranTotalInfoResponse>>) => {
			self.GetTotalInfoEvent.trigger(res);
		});
		webApiService.on('TransactionService', 'GetTransactionDetails', (res: WsResponseModel<Array<TranDetailInfoResponse>>) => {
			self.GetTransactionDetailsEvent.trigger(res);
		});
		webApiService.on('TransactionService', 'GetTransactions', (res: WsResponseModel<Array<TransactionResponse>>) => {
			self.GetTransactionsEvent.trigger(res);
		});
	}
	AddTransaction(req: AddTransactionRequest = null) { 	
        this.webApiService.send('TransactionService', 'AddTransaction' , req);
    }
	GetTotalBonuses() { 	
        this.webApiService.send('TransactionService', 'GetTotalBonuses' );
    }
	GetTotalInfo() { 	
        this.webApiService.send('TransactionService', 'GetTotalInfo' );
    }
	GetTransactionDetails(req: TranDetailInfoRequest = null) { 	
        this.webApiService.send('TransactionService', 'GetTransactionDetails' , req);
    }
	GetTransactions(req: FilterRequest = null) { 	
        this.webApiService.send('TransactionService', 'GetTransactions' , req);
    }
	 // async methods
	async addTransactionAsync(req: AddTransactionRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.AddTransaction.bind(this), this.AddTransactionEvent)(req);
	}
	async getTotalBonusesAsync(): Promise<number> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTotalBonuses.bind(this), this.GetTotalBonusesEvent)();
	}
	async getTotalInfoAsync(): Promise<Array<TranTotalInfoResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTotalInfo.bind(this), this.GetTotalInfoEvent)();
	}
	async getTransactionDetailsAsync(req: TranDetailInfoRequest = null): Promise<Array<TranDetailInfoResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTransactionDetails.bind(this), this.GetTransactionDetailsEvent)(req);
	}
	async getTransactionsAsync(req: FilterRequest = null): Promise<Array<TransactionResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTransactions.bind(this), this.GetTransactionsEvent)(req);
	}
}