<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header :isGoBack="true" @click="ff()">Обучение не пройдено!</default-header>

            <div class="scroll-wrapper">
                <div class="activation-section get-trained-section activation-no-height">
                    <div class="activation-titles">
                        <img src="assets/img/change-success/dis.svg" alt="Код не активрован">
                        <h3 class="section--light-title get-trained-title-two"> <strong>Сожалеем, но вы не прошли обучение!</strong> <br> Вам придётся вновь пройти обучение и заново ответить на вопросы</h3>
                    </div>
                </div>
    
                <ui-button class="training-button training-button-mb " @on-click-do="$router.push({ name: 'enter-in-profile' })">
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

@Component({name: 'trained-failed'})
export default class TrainedFailedComponent extends Vue {
  
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

    goBack() {
        this.stopTimerWaitingCode()
        this.$router.push({name: 'enter-choose-user'})
        console.log("Таймер стоп");
    }

    ff(){
        this.$router.push({name:'get-trained'});
        this.stopTimerWaitingCode()
    }

    onStartTimerActivationCode(){
        var self = this;
        this.timerWaiting = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
            self.codeRequestAgainSecunds = sec;            
        }, () =>{
            this.$router.push({ name: 'get-trained' })
            this.stopTimerWaitingCode()
        })
    }

    // Останавливаем таймер
    stopTimerWaitingCode(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)     
    }

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        }
    }
}
</script>