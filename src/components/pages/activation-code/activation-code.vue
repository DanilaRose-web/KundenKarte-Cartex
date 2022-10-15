<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header>Активация кода</default-header>

                <div class="scroll-wrapper">
                    <h2 class="section-main-title activation-title">Вам на телефон пришёл 6-значный код для активации вашего аккаунта, введите его в поле ниже</h2>

                    <pos-input-label
                        ref="phone"
                        label="Код активации"
                        v-model="code"
                        htmlClass="one-form-item"
                        name="code"
                        placeholder="Введите код из сообщения"
                        keyboardType="number"
                        keyboardTitle="Activation Code"
                        :required="true"
                        :regex="codeRegex"
                        @changeValue='onChangeValue'
                    />
                    
        
                    <div class="counter-wrap" v-if="secunds > 0">
                        <h3 class="section--light-title">На активацию осталось: </h3>                
                        <div id="minutes">{{stringMinutes}}</div><strong>:</strong>
                        <div id="seconds">{{stringSecunds}}</div> 
                    </div>

                    <h3></h3>
                    <div class="counter-wrap" v-if="clicks >= 5">
                        <h3 class="section--light-title info-title">К сожалению, в настоящий момент были исчерпаны все попытки получения кода. Просьба возобновить регистрацию через 1 час.</h3>                
                    </div>
                </div>
                
                <footer-activation @on-click-back="getActivationCode()">
                    <ui-button class="form-button" @on-click-do="getCode()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Активировать"></template> Активировать</ui-button>
                    <template slot="counter"><strong v-if="codeRequestAgainSecunds > 0">({{codeRequestAgainSecunds}} сек) </strong></template>
                </footer-activation>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import Timer from "../../../helpers/timer"

import WsResponseModel from '../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel'
import RegistrByPhoneRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/RegistrByPhoneRequest";



@Component({name: 'activation-code'})

export default class ActivationCodeComponent extends Vue {
  codeRegex: RegExp = /^[0-9\(\)\-]+$/;
  load: boolean = true

  code: string = "";
  codeVal: string;
  timerWaiting?: NodeJS.Timeout = null;
  timerWaitingCode?: NodeJS.Timeout = null;
  timerInterval = 90;
//   timerIntervalCode = 5;
  clicks = 0; // задаем переменную - счетчик кликов
  
 

  
  constructor() {
    super();    
  }
    /* =============================================================== */

    codeRequestAgainSecunds : number = 15; // указываем количество секунд во втором таймере
    secunds : number = this.timerInterval; // указываем количество секунд в первом таймере

    

    //  создаем вычисляемое поле - минуты
    get stringSecunds():string {
        var s = this.secunds % 60;
        var str = (s < 10? '0' + s : s ) + ' мин';  
        return str;
    }

    //  создаем вычисляемое поле - минуты
    get stringMinutes():string {    
        return String(Math.floor(this.secunds / 60));
    }
    created() { 
        console.log('home');   
        this.load = false
    }

    mounted() {
        this.onStartTimerActivation();
        this.onStartTimerActivationCode();
    }
    
    // получаем код из инпута
    onChangeValue(value:string){
        console.log('activation-code',value);
        this.code= value; // запоминаем value в переменную this.code  
    }

    // вызываем метод EndRegistrationByPhoneEvent при клике на кнопку Активировать
    getCode() {
        this.load = true
        this.$api.UserService.EndRegistrationByPhoneEvent.once((response) => {
           
            if(response.IsSuccess) {
                this.load = false
                // this.addBonuses()
                this.$router.push({name:'register-complete'});
            } else {
                this.load = false
                this.$router.push({name:'activation-code-error', params:{ error: response.ErrorMessage } });
            }
        })

        this.$api.UserService.EndRegistrationByPhone({
            Phone: this.$app.Registration.phone,
            Code: this.code,
            PosCode: this.$posStore.getPosCode()
        })
    }

    // addBonuses() {
    //     this.$api.TransactionService.AddTransactionEvent.once((response) => {
    //         if (response.IsSuccess) {
                
    //         }
    //     })
    //     this.$api.TransactionService.AddTransaction({
    //         PosCode: this.$posStore.getPosCode(),
    //         SumInBonuses: 1000,
    //         TransactionTypeID: null 
    //     })
    // }

    // Запрашиваем код повторно при клике на "Запросить код заново"
    getActivationCode() {
        
        if (this.codeRequestAgainSecunds < 1) {
            this.clicks++
            this.load = true
            // this.stopTimerWaitingCode()
            this.onStartTimerActivationCode()

            this.$api.UserService.EndRegistrationByPhoneEvent.once((response) => {
                if (response.IsSuccess) {
                    this.load = false
                } else {
                    this.load = false
                }
            })
            this.$api.UserService.EndRegistrationByPhone({
                Phone: this.$app.Registration.phone,
                Code: this.code,
                PosCode: this.$posStore.getPosCode()
            })
            
            this.stopTimerWaiting()
            this.onStartTimerActivation()
            
            if (this.clicks >= 5) {
                this.$router.push({ name: 'activation-code-error' })
                // this.onStartTimerActivation() 
                this.stopTimerWaiting()
            }
        }
    }

    // Таймер - МАЛЕНЬКИЙ (footer)
    onStartTimerActivationCode(){
        this.codeRequestAgainSecunds = 15; // еще раз задаем секунды, чтобы таймер начал отсчет
        var self = this;
        console.log("start");
        this.timerWaitingCode = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
            self.codeRequestAgainSecunds = sec;            
        }, () => {
            // this.codeRequestAgainSecunds = this.timerIntervalCode;
            this.stopTimerWaitingCode()
        })
    }

    // Таймер - БОЛЬШОЙ 
    onStartTimerActivation() {
        this.secunds = this.timerInterval
        var self = this;
        console.log("Start");
        this.timerWaiting = Timer.initTimer(this.secunds, function(sec: number){
            self.secunds = sec;            
        }, () =>{
            this.secunds = this.timerInterval
            this.$router.push({ name: 'register' })
            this.stopTimerWaiting()
        })
    }

    // Останавливаем таймер Большой таймер
    stopTimerWaiting(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)
            console.log("Stop");
    }

    // Очищение маленького таймера
    stopTimerWaitingCode(){
        if(this.timerWaitingCode)
            clearInterval(this.timerWaitingCode)
            console.log("stop");
    }

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        } else if (this.timerWaitingCode) {
            clearInterval(this.timerWaitingCode) 
            next()
        }
    }
}
</script>
<style lang="css" scoped>

</style>

