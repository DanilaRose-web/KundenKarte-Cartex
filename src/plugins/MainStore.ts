import _Vue from "vue"
import { Dictionary } from "vue-router/types/router";
import { Events } from "../api/motivation/dataSource/api/plugins/events";

export default {
    install(Vue: typeof _Vue)  {
        const plugin = new MainStore();  
        Vue.prototype.$mainStore = plugin;
        (Vue as any).$mainStore = plugin;
        }
}

export class MainStore {

    constructor(){
        //_Vue.$api.SchoolService.GetSchoolInfoEvent.on(this.onGetSchoolInfo.bind(this));         
        //_Vue.$api.SchoolService.GetSchoolInfo();
    }  

    
    public openedPage: string  = 'hello'    
    public openedPageParam: Dictionary<string>  = {}
   

    public setPage(name:string, param:Dictionary<string>){
        this.openedPage = name;
        this.openedPageParam = param;
        this.onSetPage.trigger(this.openedPage);
    }

    public onSetPage = new Events<string>();
}



