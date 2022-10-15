<template>
    <layout> 
        <section class="enter-phone section-bg">
            <div class="register-form">
                <div class="activation-form">
                    <default-header>Графический ключ</default-header>
            
                    <div class="scroll-wrapper">
                        <div class="activation-code pattern-key-block-title">
                            <h2 class="pattern-key-title">Используйте ваш графический ключ для входа</h2>
                        </div>
    
                        <div id="patternContainer">
                            <div id="create-pattern" class="pattern-holder"></div>
                        </div>
                    </div>

                    <footer-form>
                        <ui-button class="form-button" @on-click-do="getReg()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template>Войти</ui-button>
                        <ui-link @on-click-back="$router.push({name: 'enter-with-phone'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Refresh"></template></ui-link>
                    </footer-form>
                </div>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import WsResponseModel from '../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel'
import Login from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/LoginRequest'
import GetStatusCashier from "../../../api/motivation/dataSource/api/KKO/Motivation/Entities/Enums/TrainingStatus"

@Component({name: 'enter-with-pattern-key'})
export default class EnterWithPatternKeyComponent extends Vue {
    // @Prop({default:GetStatusCashier.NotPassed})
    // kassirStatus: GetStatusCashier;

    load: boolean = false
    password: string
    StatusCashier: string;
  
    constructor() {
        super();    
    }
    created() { 
        console.log('home');   
    }
    mounted() {
        var self = this;
        var lock = new PatternLock("#patternContainer",{
            onDraw:function(pattern:any){            
                self.$app.Registration.password = self.password = pattern;
            }
        });
    }

    getReg(){
     
        if(!this.password)
            return;
            var self = this;
            this.$api.UserService.LoginEvent.once((response) => {
                if (response.IsSuccess) {
                    this.load = false
                    // this.$router.push({name:'enter-in-profile'});
                    this.getStatus()
                } else if (!response.IsSuccess) {
                    this.load = false
                    this.$router.push({ name: 'user-not-found'})
                }
            })
            this.$api.UserService.Login({
                Phone: this.$app.Login.phone,
                Password: this.password,
                PosCode: this.$posStore.getPosCode()
            })
    };

    getStatus() {
        this.load = true
        this.$api.TrainingService.GetCashierTrainingStatusEvent.once((response) => {
            if(GetStatusCashier.Passed == response.Value){
                this.load = false
                this.$router.push({name:'enter-in-profile'});
            } else {
                this.load = false
                this.$router.push({ name: 'get-trained' })
            } 
        })
        this.$api.TrainingService.GetCashierTrainingStatus()
    }

    updated() {
        console.log("updated");
        
    }
        

    // onLogin(result: WsResponseModel<String>){
    //     console.log('onLogin', result);
    // }


    
}
</script>