<template>
    <layout> 
         <section class="section-bg">
            <default-header :isGoBack="true" @click="ff">Активация кода</default-header>

            <div class="activation-section">
                <div class="activation-titles">
                    <img src="/assets/img/activation-error/warning.svg" alt="Код не активрован">
                    <h3 class="section--light-title activation-title">
                        К сожалению, в настоящий момент были исчерпаны все попытки получения кода. <br> 
                        <strong>Возобновите регистрацию через 1 час.</strong>
                    </h3>
                </div>
            </div>
            

            <footer-fixed id="footer-fixed">
                <ui-link-single @on-click-back="goBack()">Вернуться на главный экран</ui-link-single>
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

@Component({ name: 'activation-code-error' })

export default class ActivationCodeErrorComponent extends Vue {

    ff(){
        this.$router.push({name:'register'});
        this.stopTimerWaitingCode()
    }

    timerWaiting?: NodeJS.Timeout = null;
    codeRequestAgainSecunds : number = 15; // указываем количество секунд во втором таймере

    mounted() {
        this.onStartTimerActivationCode()
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
            this.$router.push({ name: 'hello' })
            this.stopTimerWaitingCode()
        })
    }

    // Останавливаем таймер
    stopTimerWaitingCode(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)
            console.log("stop");
    }

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        }
    }

}
</script>