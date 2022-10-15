import { WebApiService } from './plugins/webApiService';
import GiftService from './KKO/Motivation/POS/Services/GiftService';
import InfoService from './KKO/Motivation/POS/Services/InfoService';
import NotificationService from './KKO/Motivation/POS/Services/NotificationService';
import OrderService from './KKO/Motivation/POS/Services/OrderService';
import TrainingService from './KKO/Motivation/POS/Services/TrainingService';
import TransactionService from './KKO/Motivation/POS/Services/TransactionService';
import UserService from './KKO/Motivation/POS/Services/UserService';
import WsCallbacks from './WebSocketControllers/Core/WsCallbacks'

export default class ApiDataSource {
	webApiService: WebApiService;
	GiftService: GiftService;
	InfoService: InfoService;
	NotificationService: NotificationService;
	OrderService: OrderService;
	TrainingService: TrainingService;
	TransactionService: TransactionService;
	UserService: UserService;
	WsCallbacks: WsCallbacks;
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.GiftService = new GiftService(this.webApiService);
		this.InfoService = new InfoService(this.webApiService);
		this.NotificationService = new NotificationService(this.webApiService);
		this.OrderService = new OrderService(this.webApiService);
		this.TrainingService = new TrainingService(this.webApiService);
		this.TransactionService = new TransactionService(this.webApiService);
		this.UserService = new UserService(this.webApiService);
		this.WsCallbacks = new WsCallbacks(this.webApiService);
	}

}
