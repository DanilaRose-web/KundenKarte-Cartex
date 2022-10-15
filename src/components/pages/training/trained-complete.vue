<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header :isGoBack="true" @click="ff">Обучение пройдено!</default-header>

            <div class="scroll-wrapper">
                <div class="activation-section get-trained-section activation-no-height">
                    <div class="activation-titles">
                        <img src="assets/img/change-success/ok.svg" alt="Код не активрован">
                        <h3 class="section--light-title get-trained-title-two get-trained-lg-mb"> <strong>Поздравляем, вы успешно прошли обучение!</strong> <br> Вы заработали свои первые баллы...</h3>
                    </div>
                </div>
    
                <ui-button class="training-button training-button-mb " @on-click-do="nextpage()">
                    <template slot="icon"><img src="assets/img/training2/answer.svg" alt="Ответы"></template> Приступить к работе
                </ui-button>
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
import { Route } from "vue-router";
import Timer from "../../../helpers/timer"


@Component({name: 'trained-complete'})
export default class TrainedCompleteComponent extends Vue {
  
  timerWaiting?: NodeJS.Timeout = null;
  
    constructor() {
        super();    
    }

    codeRequestAgainSecunds : number = 15; // указываем количество секунд во втором таймере

    created() { 
        console.log('home');   
    }
    mounted() {
        this.onStartTimerActivationCode();
    }

    nextpage() {
        this.$router.push({name: 'enter-in-profile'})
        // this.stopTimerWaitingCode()
    }

    ff(){
        this.$router.push({name:'get-trained'});
        this.stopTimerWaitingCode()
    }

    goBack() {
        this.stopTimerWaitingCode()
        this.$router.push({name: 'enter-choose-user'})
        console.log("Таймер стоп");
    }

    onStartTimerActivationCode(){
        var self = this;
        this.timerWaiting = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
            self.codeRequestAgainSecunds = sec;            
        }, () =>{
            this.stopTimerWaitingCode()
            console.log("stop");
            this.$router.push({ name: 'get-trained' })
        })
    }

    // Останавливаем таймер
    stopTimerWaitingCode(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)     
    }

    next() {}

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        }
    }
  
}
</script>