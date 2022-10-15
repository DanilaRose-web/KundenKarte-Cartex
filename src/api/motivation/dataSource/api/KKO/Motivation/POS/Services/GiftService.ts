import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import GiftRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import CategoryResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/GiftService/CategoryResponse';
import GiftResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse';

export default class GiftService {
	webApiService: WebApiService;
	GetCategoriesEvent = new Events<WsResponseModel<Array<CategoryResponse>>>();
	GetGiftEvent = new Events<WsResponseModel<GiftResponse>>();
	GetGiftsEvent = new Events<WsResponseModel<Array<GiftResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('GiftService', 'GetCategories', (res: WsResponseModel<Array<CategoryResponse>>) => {
			self.GetCategoriesEvent.trigger(res);
		});
		webApiService.on('GiftService', 'GetGift', (res: WsResponseModel<GiftResponse>) => {
			self.GetGiftEvent.trigger(res);
		});
		webApiService.on('GiftService', 'GetGifts', (res: WsResponseModel<Array<GiftResponse>>) => {
			self.GetGiftsEvent.trigger(res);
		});
	}
	GetCategories() { 	
        this.webApiService.send('GiftService', 'GetCategories' );
    }
	GetGift(giftID: number = 0) { 	
        this.webApiService.send('GiftService', 'GetGift' , giftID);
    }
	GetGifts(req: GiftRequest = null) { 	
        this.webApiService.send('GiftService', 'GetGifts' , req);
    }
	 // async methods
	async getCategoriesAsync(): Promise<Array<CategoryResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCategories.bind(this), this.GetCategoriesEvent)();
	}
	async getGiftAsync(giftID: number = 0): Promise<GiftResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetGift.bind(this), this.GetGiftEvent)(giftID);
	}
	async getGiftsAsync(req: GiftRequest = null): Promise<Array<GiftResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetGifts.bind(this), this.GetGiftsEvent)(req);
	}
}