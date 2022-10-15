<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header :isGoBack="true" @click="ff()">Регистрация завершена</default-header>

            <div class="activation-section get-trained-section scroll-wrapper-sm">
                <div class="activation-titles">
                    <img src="assets/img/activation-complete/complete.svg" alt="Код активрован">
                    
                    <h3 class="section--light-title activation-title"><strong>Регистрация пройдена успешно.</strong> <br> Вы стали участником программы «Лояльность кассиров». Копите баллы и получайте подарки за хорошую работу!</h3>
                </div>
            </div>
            
            <footer-fixed id="footer-fixed">
                <ui-link @on-click-back="goBack()">Переход на главный экран</ui-link>
                <strong v-if="codeRequestAgainSecunds > 0">({{codeRequestAgainSecunds}} сек) </strong>
            </footer-fixed>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Route } from "vue-router";
import Timer from "../../../helpers/timer"

@Component({name: 'register-complete'})
export default class RegisterCompleteComponent extends Vue {

    load: boolean = false 
    timerWaiting?: NodeJS.Timeout = null;
    codeRequestAgainSecunds : number = 15; // указываем количество секунд во втором таймере


    constructor() {
        super();    
    }

    mounted() {
        this.onStartTimerActivationCode()
    }

    ff(){
        this.$router.push({name:'enter-with-phone'}); 
        this.stopTimerWaitingCode()
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

    created() { 
        console.log('home');   
    }

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        }
    }
}
</script>