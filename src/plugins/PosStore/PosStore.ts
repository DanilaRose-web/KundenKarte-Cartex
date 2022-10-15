import _Vue from "vue"
import KeyboardSettings from "./Models/KeyboardSettings";

export default {
    install(Vue: typeof _Vue)  {
        const plugin = new PosStore();  
        Vue.prototype.$posStore = plugin;
        (Vue as any).$posStore = plugin;
        }
}

export class PosStore {

    constructor(){
        this.AndroidDeviceManager = this.getAndroidDeviceManager();
        //console.log('PosStore AndroidDeviceManager', this.AndroidDeviceManager,window.top);
    }  
    AndroidDeviceManager : any;
    
    private getAndroidDeviceManager(): any{
        return undefined;
        // if(!window.top){
        //     console.error('Эта функция поддерживается только в iframe')
        //     return undefined;
        // }
        // const win:any = window.top;
        // if(!win.AndroidDevice){
        //     console.error('В родительском окне не найден объект AndroidDevice');
        //     return undefined;
        // }
        // return win.AndroidDevice;
    }
    private getLabel(name: string)
    {        
        if(!this.AndroidDeviceManager)
            return;

        this.AndroidDeviceManager.getLabel(name);
    }
    public showKeyboard(settings: KeyboardSettings,callback: Function)
    {        
        if(!this.AndroidDeviceManager)
            return;
        console.log('this.AndroidDeviceManager', this.AndroidDeviceManager);
        this.AndroidDeviceManager.showKeyboard(settings,callback);
    }
    public getPosCode():string
    {        
        return 'N1AP27';
    }

    
    // public onSetPage = new Events<string>();
}
