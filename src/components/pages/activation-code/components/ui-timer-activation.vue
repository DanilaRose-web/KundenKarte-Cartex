<template>
    <strong v-if="codeRequestAgainSecunds > 0">({{codeRequestAgainSecunds}} сек) </strong>
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch } from "vue-property-decorator";
    import Timer from "../../../../helpers/timer"

    import RegistrByPhoneRequest from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/RegistrByPhoneRequest";

    @Component({name: 'ui-timer-activation'})
    export default class UiTimerActivationComponent extends Vue {

        codeRequestAgainSecunds : number = 15; // указываем количество секунд во втором таймере
        timerWaiting?: NodeJS.Timeout = null;
        clicks = 0; // задаем переменную - счетчик кликов
        code: string = "";

        mounted() {
            this.onStartTimerActivationCode()
        }

        // Таймер - МАЛЕНЬКИЙ (footer)
        onStartTimerActivationCode(){
            var self = this;
            console.log("Start");
            Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
                self.codeRequestAgainSecunds = sec;
            }, () => {
                
            })
        }

        // Останавливаем таймер
        stopTimerWaiting(){
            if(this.timerWaiting)
                clearInterval(this.timerWaiting)
                console.log("stop");
        }
    }
</script>

<style scoped>
</style>