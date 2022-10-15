<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header></default-header>
     
            
            <div class="scroll-wrapper">
                <div class="activation-section activation-no-height">
                    <div class="activation-titles">
                        <img src="/assets/img/purchase-complete/heart.svg" alt="Поздравляем с покупкой">
                        
                        <h3 class="section--light-title activation-title"><strong>Поздравляем с покупкой!</strong> <br> Ваш заказ принят и будет обработан в самое ближайшее время.</h3>
                    </div>
                </div>
            </div>
            <footer-fixed id="footer-fixed">
                <ui-link @on-click-back="goBack()">Переход на главный экран</ui-link>
                <strong v-if="codeRequestAgainSecunds > 0">({{codeRequestAgainSecunds}} сек) </strong>
            </footer-fixed>
        </section>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Timer from "../../../helpers/timer"

@Component({name: 'purchase-completed'})
export default class PurchaseCompletedComponent extends Vue {
    /* =============================================================== */
    codeRequestAgainSecunds : number = 10; // указываем количество секунд во втором таймере
    secunds : number = 5; // указываем количество секунд в первом таймере
    timerWaiting?: NodeJS.Timeout = null;

    //  создаем вычисляемое поле - минуты
    get stringSecunds():string {
        var s = this.secunds % 60;
        var str = (s < 10? '0' + s : s) + ' мин';  
        return str;
    }
    //  создаем вычисляемое поле - минуты
    get stringMinutes():string {    
        return String(Math.floor(this.secunds / 60));
    }
    mounted() {
        this.onStartTimerActivation();
        this.onStartTimerActivationCode();
    }
    ff(){
        this.$router.push({name:'enter-with-phone'}); 
        this.stopTimerWaitingCode()
    }
    onStartTimerActivation(){
        var self = this;
        Timer.initTimer(this.secunds, function(sec: number){
            self.secunds = sec;            
        }, function(){
            // alert('Activation timer ended');

        })
    }
    
    onClickCodeRequest() {
        this.onStartTimerActivationCode();
    }

    goBack() {
        this.stopTimerWaitingCode()
        this.$router.push({name: 'enter-with-phone'})
        console.log("Таймер стоп");
    }

    // Останавливаем таймер
    stopTimerWaitingCode(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)
            console.log("stop");
    }

    onStartTimerActivationCode(){
        var self = this;
        this.timerWaiting = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
            self.codeRequestAgainSecunds = sec;            
        }, () =>{
            this.$router.push({ name: 'enter-choose-user' })
            this.stopTimerWaitingCode()
        })
    }
}
</script>