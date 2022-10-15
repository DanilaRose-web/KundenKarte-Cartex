import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import TrainingStatus from '../../../../KKO/Motivation/Entities/Enums/TrainingStatus';
import AnswerRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/TrainingService/AnswerRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import TrainingResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/TrainingService/TrainingResponse';

export default class TrainingService {
	webApiService: WebApiService;
	SetCashierTrainingStatusEvent = new Events<WsResponseModel<Boolean>>();
	GetCashierTrainingStatusEvent = new Events<WsResponseModel<TrainingStatus>>();
	GetTrainingEvent = new Events<WsResponseModel<TrainingResponse>>();
	CheckAnswersEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('TrainingService', 'SetCashierTrainingStatus', (res: WsResponseModel<Boolean>) => {
			self.SetCashierTrainingStatusEvent.trigger(res);
		});
		webApiService.on('TrainingService', 'GetCashierTrainingStatus', (res: WsResponseModel<TrainingStatus>) => {
			self.GetCashierTrainingStatusEvent.trigger(res);
		});
		webApiService.on('TrainingService', 'GetTraining', (res: WsResponseModel<TrainingResponse>) => {
			self.GetTrainingEvent.trigger(res);
		});
		webApiService.on('TrainingService', 'CheckAnswers', (res: WsResponseModel<Boolean>) => {
			self.CheckAnswersEvent.trigger(res);
		});
	}
	SetCashierTrainingStatus(newStatus: TrainingStatus = null) { 	
        this.webApiService.send('TrainingService', 'SetCashierTrainingStatus' , newStatus);
    }
	GetCashierTrainingStatus() { 	
        this.webApiService.send('TrainingService', 'GetCashierTrainingStatus' );
    }
	GetTraining() { 	
        this.webApiService.send('TrainingService', 'GetTraining' );
    }
	CheckAnswers(answers: Array<AnswerRequest> = null) { 	
        this.webApiService.send('TrainingService', 'CheckAnswers' , answers);
    }
	 // async methods
	async setCashierTrainingStatusAsync(newStatus: TrainingStatus = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.SetCashierTrainingStatus.bind(this), this.SetCashierTrainingStatusEvent)(newStatus);
	}
	async getCashierTrainingStatusAsync(): Promise<TrainingStatus> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCashierTrainingStatus.bind(this), this.GetCashierTrainingStatusEvent)();
	}
	async getTrainingAsync(): Promise<TrainingResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTraining.bind(this), this.GetTrainingEvent)();
	}
	async checkAnswersAsync(answers: Array<AnswerRequest> = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.CheckAnswers.bind(this), this.CheckAnswersEvent)(answers);
	}
}