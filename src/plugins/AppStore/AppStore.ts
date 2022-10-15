import _Vue from "vue"

export default {
    install(Vue: typeof _Vue)  {
        const plugin = new AppStore();  
        Vue.prototype.$app = plugin;
        (Vue as any).$app = plugin;
    }
}

export class AppStore {
    private storage:any = {};
    constructor(){
    }  

    Registration: CashierRegistration = new CashierRegistration(this.storage);
    Login: CashierLogin = new CashierLogin(this.storage);
    PasswordChange: CashierChangePassword = new CashierChangePassword(this.storage)

    public showedLoader: boolean = false;

    public loadingShow(){
        this.showedLoader = true;
    }

    public loadingHide(){
        this.showedLoader = false;
    }  
}

export class CashierRegistration{
    
    private storage:any;
    private TAG:string = 'CashierRegistration'
    code: string;
    constructor(storage: any){
        this.storage = storage;
    }  

    private getValue(name:string): string{
        let value = this.storage[name];
        if(value)
            return value;
        value = localStorage.getItem(name)
            return value;
    }
    private setValue(name:string, value: string){    
        this.storage[name] = value;   
        localStorage.setItem(name,value); 
        return value;
    }


    get phone(): string {
        return this.getValue(this.TAG+'.phone');
    }
    set phone(value: string) {        
        this.setValue(this.TAG+'.phone', value);
    }

    get name(): string {
        return this.getValue(this.TAG+'.name');
    }
    set name(value: string) {        
        this.setValue(this.TAG+'.name', value);
    }

    get password(): string {
        return this.getValue(this.TAG+'.password');
    }
    set password(value: string) {        
        this.setValue(this.TAG+'.password', value);
    }
}

export class CashierLogin{
    
    private storage:any;
    private TAG:string = 'CashierLogin'
    code: string;
    constructor(storage: any){
        this.storage = storage;
    }  

    private getValue(name:string): string{
        let value = this.storage[name];
        if(value)
            return value;
        value = localStorage.getItem(name)
            return value;
    }
    private setValue(name:string, value: string){    
        this.storage[name] = value;   
        localStorage.setItem(name,value); 
        return value;
    }


    get phone(): string {
        return this.getValue(this.TAG+'.phone');
    }
    set phone(value: string) {        
        this.setValue(this.TAG+'.phone', value);
    }

    // get name(): string {
    //     return this.getValue(this.TAG+'.name');
    // }
    // set name(value: string) {        
    //     this.setValue(this.TAG+'.name', value);
    // }

    get password(): string {
        return this.getValue(this.TAG+'.password');
    }
    set password(value: string) {        
        this.setValue(this.TAG+'.password', value);
    }
}


export class CashierChangePassword {
    
    private storage:any;
    private TAG:string = 'PasswordChange'
    code: string;
    constructor(storage: any){
        this.storage = storage;
    }  

    private getValue(name:string): string{
        let value = this.storage[name];
        if(value)
            return value;
        value = localStorage.getItem(name)
            return value;
    }
    private setValue(name:string, value: string){    
        this.storage[name] = value;   
        localStorage.setItem(name,value); 
        return value;
    }

    get password(): string {
        return this.getValue(this.TAG+'.password');
    }
    set password(value: string) {        
        this.setValue(this.TAG+'.password', value);
    }
}



