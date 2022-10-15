import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import InfoResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/InfoService/InfoResponse';
import InfoShortResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/InfoService/InfoShortResponse';

export default class InfoService {
	webApiService: WebApiService;
	GetInfoEvent = new Events<WsResponseModel<InfoResponse>>();
	GetInfosEvent = new Events<WsResponseModel<Array<InfoShortResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('InfoService', 'GetInfo', (res: WsResponseModel<InfoResponse>) => {
			self.GetInfoEvent.trigger(res);
		});
		webApiService.on('InfoService', 'GetInfos', (res: WsResponseModel<Array<InfoShortResponse>>) => {
			self.GetInfosEvent.trigger(res);
		});
	}
	GetInfo(id: number = 0) { 	
        this.webApiService.send('InfoService', 'GetInfo' , id);
    }
	GetInfos() { 	
        this.webApiService.send('InfoService', 'GetInfos' );
    }
	 // async methods
	async getInfoAsync(id: number = 0): Promise<InfoResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetInfo.bind(this), this.GetInfoEvent)(id);
	}
	async getInfosAsync(): Promise<Array<InfoShortResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetInfos.bind(this), this.GetInfosEvent)();
	}
}