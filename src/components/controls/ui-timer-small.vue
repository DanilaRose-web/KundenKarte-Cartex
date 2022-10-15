<template>
    <strong v-if="codeRequestAgainSecunds > 0">({{codeRequestAgainSecunds}} сек) </strong>
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch } from "vue-property-decorator";
    import Timer from "../../helpers/timer"

    @Component({name: 'ui-timer-small'})
    export default class UiTimerSmallComponent extends Vue {
        // timerWaiting?: NodeJS.Timeout = null;
        // // timerIntervalСode = 15;
        // codeRequestAgainSecunds : number = 5; // указываем количество секунд во втором таймере

        // mounted() {
        //     this.onStartTimerActivationCode()
        // }

        // goBack() {
        //     this.stopTimerWaitingCode()
        //     this.$router.push({name: 'hello'})
        //     console.log("Таймер стоп");
        // }

        // onStartTimerActivationCode(){
        //     var self = this;
        //     // this.codeRequestAgainSecunds = this.timerIntervalСode
        //     this.timerWaiting = Timer.initTimer(this.codeRequestAgainSecunds, function(sec: number){
        //         self.codeRequestAgainSecunds = sec;            
        //     }, () =>{
        //         // this.codeRequestAgainSecunds = this.timerIntervalСode
        //         this.$router.push({ name: 'hello' })
        //         this.stopTimerWaitingCode()
        //     })
        // }

        // // Останавливаем таймер
        // stopTimerWaitingCode(){
        //     if(this.timerWaiting)
        //         clearInterval(this.timerWaiting)
        //         console.log("stop");
        // }
    }
</script>

<style scoped>
</style>