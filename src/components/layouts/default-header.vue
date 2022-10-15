<template>
     <header>
        <div class="header-container">
            <div class="logo">
                <img src="assets/img/registration/prev.svg" @click="back()" alt="Назад" class="prev">
                <img src="assets/img/registration/logo.svg" alt="Логотип" class="logo">
            </div>
            <h1 class="header-title" @click="$emit('on-click-do')"><slot></slot></h1>
        </div>
    </header>
</template>

<script lang="ts">
import { type } from 'jquery';
    import Vue from 'vue'
    import { Component, Prop } from 'vue-property-decorator';
    
    
    @Component
    export default class DefaultHeaderComponent extends Vue{ 
        timerWaiting?: NodeJS.Timeout = null;

        @Prop({default:null, type:Function}) defFun:Function;
        @Prop({default:false, type:Boolean}) isGoBack:Boolean;
        back(){
            if(this.isGoBack){
                this.$emit("click");
                return
            };
            this.$router.back() 
            console.log("Назад");
        }
        innerDefFun:Function 
        created(){}

        // Останавливаем таймер
        stopTimerWaitingCode(){
            if(this.timerWaiting)
                clearInterval(this.timerWaiting)
                console.log("stop");
        }

    }

        
    
</script>

<style scoped>

</style>