<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header></default-header>

            <div class="activation-section activation-section-center scroll-wrap-choose-user">
                <div class="activation-titles user-selected-titles no-m-b">
                    <img src="assets/img/change-success/ok.svg" alt="Код не активрован">
                    <h3 class="section--light-title activation-title">
                        <strong>Номер телефона (email и т.д.) изменён.</strong>
                    </h3>
                </div>
            </div>
            
            <footer-fixed id="footer-fixed">
                <ui-link-single @on-click-back="$router.push({name: 'enter-in-profile'})">Переход на главный экран</ui-link-single>
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

@Component({name: 'changesuccess'})
export default class ChangeSuccessComponent extends Vue {
  
    constructor() {
        super();    
    }

    timerWaiting?: NodeJS.Timeout = null;
    timerIntervalСode = 15;
    codeRequestAgainSecunds : number = this.timerIntervalСode; // указываем количество секунд во втором таймере

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
  
    onStartTimerActivationCode(){
        var self = this;
        this.codeRequestAgainSecunds = this.timerIntervalСode
        this.timerWaiting = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
            self.codeRequestAgainSecunds = sec;            
        }, () =>{
            this.codeRequestAgainSecunds = this.timerIntervalСode
            this.stopTimerWaitingCode()
            this.$router.push({ name: 'enter-in-profile' }) 
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