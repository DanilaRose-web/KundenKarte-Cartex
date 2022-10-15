<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header>Распечатать QR-код</default-header>

            <div class="scroll-wrapper">
                <div class="activation-section get-trained-section activation-no-height">
                    <div class="activation-titles">
                        <img src="assets/img/activation-error/warning.svg" alt="Код не активрован">
                        <h3 class="section--light-title get-trained-title-two"> <strong>Вам будет распечатан временный QR-код.</strong> <br> Вы сможете работать с терминалом, но баллы в программе начисляться не будут.</h3>
                    </div>
                </div>

                <ui-button class="training-button" @on-click-do="next()">
                    <template slot="icon"><img src="assets/img/enter-in-profile/print.svg" alt="печать"></template> Распечатать код
                </ui-button>
            </div>
            
            <footer-fixed id="footer-fixed">
                <ui-link @on-click-back="$router.push({ name: 'hello' })">Вернуться на главный экран</ui-link>
            </footer-fixed>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'print-a-code'})
export default class PrintACodeComponent extends Vue {
  
  load: boolean = false
  constructor() {
    super();    
  }
  created() { 
    console.log('home');   
  }
  mounted() {

  }

    next() {
        this.load = true
        this.$api.UserService.LoginWithPartialAccessEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
                this.$router.push({ name: 'enter-with-pattern-key' })
            } else {
                this.load = false
            }
        })

        this.$api.UserService.LoginWithPartialAccess({
            Phone: this.$app.Login.phone,
            PosCode: this.$posStore.getPosCode()
        })
    }
  
}
</script>