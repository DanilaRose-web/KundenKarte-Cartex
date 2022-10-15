import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import CreateOrderRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/OrderService/CreateOrderRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import OrderResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/OrderService/OrderResponse';

export default class OrderService {
	webApiService: WebApiService;
	CreateOrderEvent = new Events<WsResponseModel<number>>();
	GetCashierOrdersEvent = new Events<WsResponseModel<Array<OrderResponse>>>();
	GetOrderEvent = new Events<WsResponseModel<OrderResponse>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('OrderService', 'CreateOrder', (res: WsResponseModel<number>) => {
			self.CreateOrderEvent.trigger(res);
		});
		webApiService.on('OrderService', 'GetCashierOrders', (res: WsResponseModel<Array<OrderResponse>>) => {
			self.GetCashierOrdersEvent.trigger(res);
		});
		webApiService.on('OrderService', 'GetOrder', (res: WsResponseModel<OrderResponse>) => {
			self.GetOrderEvent.trigger(res);
		});
	}
	CreateOrder(req: CreateOrderRequest = null) { 	
        this.webApiService.send('OrderService', 'CreateOrder' , req);
    }
	GetCashierOrders() { 	
        this.webApiService.send('OrderService', 'GetCashierOrders' );
    }
	GetOrder(id: number = 0) { 	
        this.webApiService.send('OrderService', 'GetOrder' , id);
    }
	 // async methods
	async createOrderAsync(req: CreateOrderRequest = null): Promise<number> {
		return EventToAsyncDecorator.getInstance().bind(this.CreateOrder.bind(this), this.CreateOrderEvent)(req);
	}
	async getCashierOrdersAsync(): Promise<Array<OrderResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCashierOrders.bind(this), this.GetCashierOrdersEvent)();
	}
	async getOrderAsync(id: number = 0): Promise<OrderResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetOrder.bind(this), this.GetOrderEvent)(id);
	}
}