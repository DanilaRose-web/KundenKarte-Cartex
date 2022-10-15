<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header>Вход</default-header>

            <div class="acttivation-section user-selected-section scroll-wrap-user-selected" v-if="user">
                <div class="activation-titles user-selected-titles">
                    <h3 class="section--light-title">Выбран пользователь</h3>
                    <h3 class="section--light-subtitle"><span>{{ user.Name }}</span> <span>{{ ShortPhone }}</span></h3>
                </div>

                <ui-button class="button--change enter-button btn-user-enter" @on-click-do="$router.push({name: 'enter-with-pattern-key'})">
                    <template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Выбран пользователь"></template> Войти в систему
                </ui-button>
            </div>
            
            <footer-fixed id="footer-fixed">
                <ui-link @on-click-back="$router.push({name: 'hello'})">Вернуться на главный экран</ui-link>
            </footer-fixed>
        </section>  

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import UserByShopResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/UserByShopResponse";

@Component({name: 'enter-user-selected'})
export default class EnterUserSelectedComponent extends Vue {

    usersByShop: Array<UserByShopResponse> = null
    user: UserByShopResponse = null // принимаем не массив, а чиисто мождель UserByShopResponse с именем и фамилией. user - объект
    load: boolean = false

    
    constructor() {
        super();    
    }
    created() { 
        console.log('home');   
    }

    get ShortPhone():string{
        var shortPhone = this.user.Phone;
        if(shortPhone.length <= 7)
        return shortPhone;
        return `${shortPhone.substring(0,2)} ... ${shortPhone.substring(shortPhone.length-5)}`;
    }
    mounted() {
        this.load = true
        this.$api.UserService.GetUsersByShopEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
            }
            this.usersByShop = response.Value;

            this.user = this.usersByShop.find(item => item.Name == this.$mainStore.openedPageParam.Name && item.Phone == this.$mainStore.openedPageParam.Phone);
            /* метод find - https://learn.javascript.ru/array-methods
            через find находим элемент - который удовлетворяет условию (если имя и телефон элемнета совпадают с именем
            и телефоном из route - то функция возвращает true и показывает name и phone)
            все это дело добавляем в объект user, а не сохраняем в локалную переменную (обращаемся к объекту через this)
            */

        this.$app.Login.phone = this.user.Phone;
            /* Сохраняем телефон для входа - из объекта user в $app.Login - поскольку страниц входа 2 - enter-with-phone и enter-user-selected.
            воизбежание конфликтов (поскольку один и тот же параметр подтягивается из разных мест) сохраняем все в Login
            */
        })
        this.$api.UserService.GetUsersByShop({
            PosCode: this.$posStore.getPosCode()
        })
    }

  
}
</script>