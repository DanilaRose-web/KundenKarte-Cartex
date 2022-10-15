import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import SendNotificationRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/NotificationService/SendNotificationRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';

export default class NotificationService {
	webApiService: WebApiService;
	SendNotificationEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('NotificationService', 'SendNotification', (res: WsResponseModel<Boolean>) => {
			self.SendNotificationEvent.trigger(res);
		});
	}
	SendNotification(request: SendNotificationRequest = null) { 	
        this.webApiService.send('NotificationService', 'SendNotification' , request);
    }
	 // async methods
	async sendNotificationAsync(request: SendNotificationRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.SendNotification.bind(this), this.SendNotificationEvent)(request);
	}
}