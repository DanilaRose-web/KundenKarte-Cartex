import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import StartRegistrationRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/StartRegistrationRequest';
import RegistrByPhoneRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/RegistrByPhoneRequest';
import LoginRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/LoginRequest';
import LoginWithPartialAccessRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/LoginWithPartialAccessRequest';
import StartRestorePasswordRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/StartRestorePasswordRequest';
import EndRestorePasswordRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/EndRestorePasswordRequest';
import StartChangePhoneRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/StartChangePhoneRequest';
import ChangePhoneRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/ChangePhoneRequest';
import ChangePasswordRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/ChangePasswordRequest';
import RecentUsersRequest from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/RecentUsersRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import UserInfoResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/UserInfoResponse';
import UserResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/UserResponse';
import UserByShopResponse from '../../../../KKO/Motivation/POS/Interfaces/Models/UserService/UserByShopResponse';

export default class UserService {
	webApiService: WebApiService;
	StartRegistrationEvent = new Events<WsResponseModel<Boolean>>();
	EndRegistrationByPhoneEvent = new Events<WsResponseModel<Boolean>>();
	GetUserInfoEvent = new Events<WsResponseModel<UserInfoResponse>>();
	LoginEvent = new Events<WsResponseModel<String>>();
	LogoutEvent = new Events<WsResponseModel<Boolean>>();
	LoginWithPartialAccessEvent = new Events<WsResponseModel<String>>();
	StartRestorePasswordEvent = new Events<WsResponseModel<Boolean>>();
	RestorePasswordEvent = new Events<WsResponseModel<Boolean>>();
	StartChangePhoneEvent = new Events<WsResponseModel<Boolean>>();
	ChangePhoneEvent = new Events<WsResponseModel<Boolean>>();
	ChangePasswordEvent = new Events<WsResponseModel<Boolean>>();
	GetRecentUsersEvent = new Events<WsResponseModel<Array<UserResponse>>>();
	GetUsersByShopEvent = new Events<WsResponseModel<Array<UserByShopResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('UserService', 'StartRegistration', (res: WsResponseModel<Boolean>) => {
			self.StartRegistrationEvent.trigger(res);
		});
		webApiService.on('UserService', 'EndRegistrationByPhone', (res: WsResponseModel<Boolean>) => {
			self.EndRegistrationByPhoneEvent.trigger(res);
		});
		webApiService.on('UserService', 'GetUserInfo', (res: WsResponseModel<UserInfoResponse>) => {
			self.GetUserInfoEvent.trigger(res);
		});
		webApiService.on('UserService', 'Login', (res: WsResponseModel<String>) => {
			self.LoginEvent.trigger(res);
		});
		webApiService.on('UserService', 'Logout', (res: WsResponseModel<Boolean>) => {
			self.LogoutEvent.trigger(res);
		});
		webApiService.on('UserService', 'LoginWithPartialAccess', (res: WsResponseModel<String>) => {
			self.LoginWithPartialAccessEvent.trigger(res);
		});
		webApiService.on('UserService', 'StartRestorePassword', (res: WsResponseModel<Boolean>) => {
			self.StartRestorePasswordEvent.trigger(res);
		});
		webApiService.on('UserService', 'RestorePassword', (res: WsResponseModel<Boolean>) => {
			self.RestorePasswordEvent.trigger(res);
		});
		webApiService.on('UserService', 'StartChangePhone', (res: WsResponseModel<Boolean>) => {
			self.StartChangePhoneEvent.trigger(res);
		});
		webApiService.on('UserService', 'ChangePhone', (res: WsResponseModel<Boolean>) => {
			self.ChangePhoneEvent.trigger(res);
		});
		webApiService.on('UserService', 'ChangePassword', (res: WsResponseModel<Boolean>) => {
			self.ChangePasswordEvent.trigger(res);
		});
		webApiService.on('UserService', 'GetRecentUsers', (res: WsResponseModel<Array<UserResponse>>) => {
			self.GetRecentUsersEvent.trigger(res);
		});
		webApiService.on('UserService', 'GetUsersByShop', (res: WsResponseModel<Array<UserByShopResponse>>) => {
			self.GetUsersByShopEvent.trigger(res);
		});
	}
	StartRegistration(request: StartRegistrationRequest = null) { 	
        this.webApiService.send('UserService', 'StartRegistration' , request);
    }
	EndRegistrationByPhone(request: RegistrByPhoneRequest = null) { 	
        this.webApiService.send('UserService', 'EndRegistrationByPhone' , request);
    }
	GetUserInfo() { 	
        this.webApiService.send('UserService', 'GetUserInfo' );
    }
	Login(request: LoginRequest = null) { 	
        this.webApiService.send('UserService', 'Login' , request);
    }
	Logout() { 	
        this.webApiService.send('UserService', 'Logout' );
    }
	LoginWithPartialAccess(request: LoginWithPartialAccessRequest = null) { 	
        this.webApiService.send('UserService', 'LoginWithPartialAccess' , request);
    }
	StartRestorePassword(request: StartRestorePasswordRequest = null) { 	
        this.webApiService.send('UserService', 'StartRestorePassword' , request);
    }
	RestorePassword(request: EndRestorePasswordRequest = null) { 	
        this.webApiService.send('UserService', 'RestorePassword' , request);
    }
	StartChangePhone(request: StartChangePhoneRequest = null) { 	
        this.webApiService.send('UserService', 'StartChangePhone' , request);
    }
	ChangePhone(request: ChangePhoneRequest = null) { 	
        this.webApiService.send('UserService', 'ChangePhone' , request);
    }
	ChangePassword(request: ChangePasswordRequest = null) { 	
        this.webApiService.send('UserService', 'ChangePassword' , request);
    }
	GetRecentUsers(request: RecentUsersRequest = null) { 	
        this.webApiService.send('UserService', 'GetRecentUsers' , request);
    }
	GetUsersByShop(request: RecentUsersRequest = null) { 	
        this.webApiService.send('UserService', 'GetUsersByShop' , request);
    }
	 // async methods
	async startRegistrationAsync(request: StartRegistrationRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.StartRegistration.bind(this), this.StartRegistrationEvent)(request);
	}
	async endRegistrationByPhoneAsync(request: RegistrByPhoneRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.EndRegistrationByPhone.bind(this), this.EndRegistrationByPhoneEvent)(request);
	}
	async getUserInfoAsync(): Promise<UserInfoResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetUserInfo.bind(this), this.GetUserInfoEvent)();
	}
	async loginAsync(request: LoginRequest = null): Promise<String> {
		return EventToAsyncDecorator.getInstance().bind(this.Login.bind(this), this.LoginEvent)(request);
	}
	async logoutAsync(): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Logout.bind(this), this.LogoutEvent)();
	}
	async loginWithPartialAccessAsync(request: LoginWithPartialAccessRequest = null): Promise<String> {
		return EventToAsyncDecorator.getInstance().bind(this.LoginWithPartialAccess.bind(this), this.LoginWithPartialAccessEvent)(request);
	}
	async startRestorePasswordAsync(request: StartRestorePasswordRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.StartRestorePassword.bind(this), this.StartRestorePasswordEvent)(request);
	}
	async restorePasswordAsync(request: EndRestorePasswordRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.RestorePassword.bind(this), this.RestorePasswordEvent)(request);
	}
	async startChangePhoneAsync(request: StartChangePhoneRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.StartChangePhone.bind(this), this.StartChangePhoneEvent)(request);
	}
	async changePhoneAsync(request: ChangePhoneRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.ChangePhone.bind(this), this.ChangePhoneEvent)(request);
	}
	async changePasswordAsync(request: ChangePasswordRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.ChangePassword.bind(this), this.ChangePasswordEvent)(request);
	}
	async getRecentUsersAsync(request: RecentUsersRequest = null): Promise<Array<UserResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetRecentUsers.bind(this), this.GetRecentUsersEvent)(request);
	}
	async getUsersByShopAsync(request: RecentUsersRequest = null): Promise<Array<UserByShopResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetUsersByShop.bind(this), this.GetUsersByShopEvent)(request);
	}
}