<template>
    <layout> 
        <section class="section-bg">
            <default-header>Пользователь не найден</default-header>

            <div class="activation-section get-trained-section scroll-wrapper-sm">
                <div class="activation-titles">
                    <img src="assets/img/user-not-found/question.svg" alt="Пользователь не найден">
                    
                    <h3 class="section--light-title activation-title"><strong>Пользователь не найден.</strong> <br> Пользователя с такими данными не существует. Проверьте указанные номер телефона/email или пройдите регистрацию.</h3>
                </div>
            </div>


            <!-- <footer-form >
                <ui-button><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить" /></template>Повторить вход</ui-button>
                <ui-link>Зарегистрироваться <template slot="icon"><img src="assets/img/user-not-found/reg.svg" alt="Зарегистрироваться"></template></ui-link>
            </footer-form> -->

            <footer id="footer-fixed">
                <div class="footer-wrap">
                    
                </div>
            </footer>

            <footer-form >
                <ui-button class="form-button" @on-click-do="$router.go(-2)"><template slot="icon"><img src="assets/img/user-not-found/enter.svg" alt="Продолжить" /></template>Повторить вход</ui-button>
                <ui-link @on-click-back="$router.push({name: 'register'})">Зарегистрироваться <template slot="icon"><img src="assets/img/user-not-found/reg.svg" alt="Зарегистрироваться"></template></ui-link>
            </footer-form>

            <!-- <footer-form >
                <ui-button class="form-button" @on-click-do="$router.push({name: 'enter-with-phone'})"><template slot="icon"><img src="assets/img/user-not-found/enter.svg" alt="Продолжить" /></template>Повторить вход</ui-button>
                <ui-link @on-click-back="$router.push({name: 'register'})">Зарегистрироваться <template slot="icon"><img src="assets/img/user-not-found/reg.svg" alt="Зарегистрироваться"></template></ui-link>
            </footer-form> -->
        </section>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'user-not-found'})
export default class UserNotFoundComponent extends Vue {
  
  
  constructor() {
    super();    
  }
  created() { 
    console.log('home');   
  }
  mounted() {
  

    
  }
  
}
</script>