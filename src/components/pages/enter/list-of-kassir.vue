<template>
    <layout> 
        <section class="activation-error section--list-kassir section-bg">
            <default-header>Список кассиров</default-header>

            <div class="scroll-wrapper">
                <div v-if="recentUser">
                    <div class="kassir-slider" >
                        <div class="kassir-slide" v-for="item of recentUserSlides" :key="item.id">
                            <div class="kassir-slide-block">
                                <div class="kassir-user" v-for="item1 of item" :key="item1.id" @click="goToOperationDetail(item1.Name, item1.Phone)">
                                    <div class="kassir-user-name">{{ item1.Name }}</div> 
                                    <div class="kassir-user-phone">{{ ShortPhone(item1.Phone) }}</div>
                                </div> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
            <footer-form >
                <ui-button class="form-button" @on-click-do="next()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="New Cashier"></template> Новый кассир</ui-button>
                <ui-link @on-click-back="$router.push({name: 'hello'})"><template slot="icon"><img src="assets/img/activation-error/back.svg" alt="Refresh"></template>Вернуться на главный экран</ui-link>
            </footer-form>
        </section>

        <preloader v-if="load" /> 
    </layout>
</template>

<script lang="ts">
import Timer from "src/helpers/timer";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import UserInfo from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/UserInfoResponse"
    import UserResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/UserResponse"
    import { AppStore } from "src/plugins/AppStore/AppStore";

    @Component({name: 'list-of-kassir'})
    export default class ListOfKassirComponent extends Vue {

        load: boolean = false
        recentUser: Array<UserResponse> = null
        short: UserResponse = null
        recentUserSlides: Array<Array<UserResponse>> = [] // задаем массив
        constructor() {
            super();    
        }

        created() { 
            console.log('home'); 
        }
        
        mounted() {

            // Получение пользователей
            this.load = true
            this.$api.UserService.GetRecentUsersEvent.once((response) => {
                if (response.IsSuccess) {
                   this.load = false
                }
                this.recentUser = response.Value

                for(var i = 0; i < this.recentUser.length; i+=4){                
                    var end = i+4;
                    if(end > this.recentUser.length) {
                        end = this.recentUser.length 
                    }
                    
                    this.recentUserSlides.push(this.recentUser.slice(i, end))
                    console.log(this.recentUserSlides);    
                }
                
        
            })
                // let pos = this.$posStore.getPosCode() 
                // console.log(pos);

                // this.$api.UserService.GetRecentUsers(this.$posStore.getPosCode()) 
                /* Проблема - при отправке запроса - приходит пустой список пользователей
                Причина - параметр, который передается (posCode) - строка. 
                Решение - на сервере этот список должен передаваться как объект - модель
                */
            this.$api.UserService.GetRecentUsers({
                PosCode: this.$posStore.getPosCode()
            })

            this.$nextTick(() => {
                // The whole view is rendered, so I can safely access or query
                // the DOM. ¯\_(ツ)_/¯
                console.log('tick')
            })
            
        }

        next(){
            this.logout()
            this.$router.push({name: 'register'})
        }

        ShortPhone(item1:string):string{
            var shortPhone = item1;
            if(shortPhone.length <= 7)
            return shortPhone;
            return `${shortPhone.substring(0,2)} ... ${shortPhone.substring(shortPhone.length-5)}`;
        }

        updated(){
            console.log("updated");
            $('.kassir-slider').slick({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                centerMode: false,
                variableWidth: true
            });
        }

        logout() {
            // Завершение сессии
            this.$api.UserService.LogoutEvent.once((response) => {

            })
            this.$api.UserService.Logout()
        }

        goToOperationDetail(Name: string, Phone: string) {
            this.$router.push({name: 'enter-user-selected', params: {Name: Name, Phone: Phone}});   
            this.logout() 
            // this.$router.push({ name: 'enter-user-selected' })
        }
    
    }
</script>