<template>
    <layout> 
        <section class="activation-error section-bg section-column">
            <default-header>Вход</default-header>

            <div class="acttivation-section scroll-wrap-choose-user">
                <div class="activation-buttons">
                    <ui-button class="button--change enter-button button" @on-click-do="$router.push({name: 'list-of-kassir'})">
                        <template slot="icon"> <img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template>Сменить пользователя
                    </ui-button>

                    <ui-button class="button--qr enter-button button" @on-click-do="openModal()">
                        <template slot="icon"><img src="assets/img/enter-in-profile/scan.svg" alt="Сканировать"></template>Сканировать QR-код
                    </ui-button>
                </div>
            </div>
            
            <footer-fixed>
                <ui-link-single @on-click-back="$router.push({name: 'hello'})">Вернуться на главный экран</ui-link-single>
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
    // import Cookies from 'js-cookie';

    @Component({name: 'enter'})
    export default class EnterComponent extends Vue {
        
        load: boolean = false
    
        constructor() {
            super();    
        }
        
        created() { 
            console.log('home');   
        }

        mounted() {}

        // logout() {      
        //     this.$api.UserService.LogoutEvent.once((response) => {
        //         if (response.IsSuccess) {
        //             this.$router.push({ name: 'list-of-kassir' })
        //             // Cookies.remove("Auth-Token")
        //         }
        //     })
        //     this.$api.UserService.Logout()
        // }

        // chooseUser() {
        //     this.$router.push({ name: 'list-of-kassir' })
        // }
        
    }
</script>