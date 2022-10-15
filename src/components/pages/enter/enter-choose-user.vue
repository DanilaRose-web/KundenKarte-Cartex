<template>
    <layout> 
        <section class="activation-error section-bg section-column">
            <default-header @on-click-do="$router.push({name: 'enter-with-phone'})">Вход</default-header>

            <div class="activation-section activation-section-center scroll-wrap-choose-user">
                <div class="activation-buttons">

                    <ui-button class="button--change enter-button" @on-click-do="changeUser()">
                        <template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="User"></template>Сменить пользователя
                    </ui-button>
                  
                    <ui-button class="button--qr enter-button">
                        <template slot="icon"><img src="assets/img/enter-in-profile/scan.svg" alt="User"></template>Сканировать QR-код
                    </ui-button>
    
                    <ui-button class="button--change enter-button" @on-click-do="onClickRegister()">
                        <template slot="icon"><img src="assets/img/registration/ok.svg" alt="User"></template>Регистрация
                    </ui-button>

                </div>
            </div>

            <footer-fixed>
                <ui-link @on-click-back="$router.push({ name: 'hello' })">Вернуться на главный экран</ui-link>
            </footer-fixed>
        </section> 

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import UserInfo from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/UserInfoResponse"
    import Cookies from 'js-cookie';

    @Component({name: 'enter-choose-user'})
    export default class EnterChooseUserComponent extends Vue {
        load: boolean = false
    
        constructor() {
            super();    
        }

        created() {
            console.log("created");
             
        }

        mounted() {
            console.log('mounted');
            
        }

        logout() {
        this.load = true
        // Завершение сессии
        this.$api.UserService.LogoutEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
                this.$router.push({ name: 'list-of-kassir' })
            }
        })
        this.$api.UserService.Logout()
    }

        onClickRegister(){
            this.$router.push({name:'register'})
        }

        changeUser() {
            this.$router.push({ name: 'list-of-kassir' })
        }
    }
</script>