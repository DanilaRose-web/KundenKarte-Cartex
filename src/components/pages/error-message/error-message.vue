<template>
    <layout> 
         <section class="section-bg">
            <default-header>Активация кода</default-header>
            <!-- <header>
                <div class="header-container">
                    <div class="logo">
                        <a href="#"><img src="assets/img/registration/prev.svg" alt="Назад" class="prev"></a>
                        <img src="assets/img/registration/logo.svg" alt="Логотип" class="logo">
                    </div>
                    <h1 class="header-title">Активация кода</h1>
                </div>
            </header> -->

            <div class="activation-section">
                <div class="activation-titles">
                    <img src="assets/img/activation-error/warning.svg" alt="Код не активрован">
                    <h3 class="section--light-title activation-title">
                        К сожалению, при запросе произошла ошибка. <br> 
                        <strong>{{errorMessage}}</strong>
                    </h3>
                </div>
            </div>
            
            <footer id="footer-fixed">
                <div class="footer-wrap activation--footer-wrap">
                    <div class="footer-link">
                        <!-- <a href="#">Вернуться на главный экран</a> -->
                        <a href="#" @click="$router.back()">Вернуться</a> 
                        <strong v-if="backTimerSecunds > 0">({{backTimerSecunds}} сек) </strong> 
                        <img src="assets/img/activation-error/back.svg" alt="Refresh">
                    </div>
                </div>
            </footer>
        </section>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Timer from "../../../helpers/timer"

@Component({name: 'error-message'})
export default class PageErrorMessageComponent extends Vue {
  
  

  created(){
      this.errorMessage = this.$mainStore.openedPageParam?.error;
  }

  errorMessage: string
    /* =============================================================== */

    backTimerSecunds : number = 15; // указываем количество секунд в таймере
   

    
    mounted() {
    
        this.startTimerBack();
    }

    startTimerBack(){
        var self = this;
        Timer.initTimer(this.backTimerSecunds, function(sec: number){
            self.backTimerSecunds = sec;            
        }, function(){
            // alert('Activation timer ended');
            self.$router.back();
        })
    }   

  

   
  
}
</script>