// 1. Обязательно импортируйте Vue перед объявлением расширенных типов
import Vue from 'vue'
import {MainStore} from './plugins/mainStore';
import DataSource from './api/motivation/dataSource/api/ApiDataSource';
import { Route, RawLocation } from 'vue-router';
import { PosStore } from './plugins/PosStore/PosStore';
import { AppStore } from './plugins/AppStore/AppStore';
//import { DomPlugin } from './plugins/DomPlugin';


// 2. Укажите файл с типами, которые вы хотите расширить
//    Vue имеет тип конструктора в types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Объявите расширение для Vue
    interface Vue {        
        $api: DataSource
        $mainStore: MainStore
        $posStore: PosStore
        $app: AppStore
        //$dom: DomPlugin
        beforeRouteEnter?(
            to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
          ): void
      
          beforeRouteLeave?(
            to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
          ): void
      
          beforeRouteUpdate?(
            to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
          ): void

          mounted?():void
          created?():void
    }
    interface VueConstructor {
        $mainStore: MainStore
        $api: DataSource
        $posStore: PosStore
        $app: AppStore
        //$dom: DomPlugin
    }
}