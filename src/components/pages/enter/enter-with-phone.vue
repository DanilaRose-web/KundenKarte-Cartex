<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header>Вход</default-header>
                <div class="scroll-wrapper">
                    <h2 class="section-main-title activation-title">Для входа укажите Email или номер телефона, а так же ваш графический ключ.</h2>
    
                    <pos-input-label
                        ref="phone"
                        label="Телефон"
                        v-model="phone"
                        htmlClass="one-form-item"
                        name="phone"
                        placeholder="Укажите номер телефона"
                        keyboardType="number"
                        keyboardTitle="Enter phone"
                        :required="true"
                        :regex="phoneRegex"
                        :isMask="true"
                    />
                    
                    <r-link class="help-link" route="forgot-password">Я не помню свой пароль</r-link>
                </div>
                
                
                <footer-form>
                    <ui-button class="form-button" @on-click-do="next()"><template slot="icon"> <img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template> Продолжить</ui-button>
                    <ui-link @on-click-back="$router.push({name: 'hello'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Cancel"></template></ui-link>
                </footer-form>
            </div>
            
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
import Login from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/LoginRequest'


@Component({name: 'enter-with-phone'})
export default class EnterWithPhoneComponent extends Vue {
  login: WsResponseModel<String>;
  load: boolean = false
  
  
  ff(){
    this.$router.push({name:'register'});
  }
  constructor() {
    super();    
  }

  // phoneRegex: RegExp = /^[0-9\(\)\-]+$/;c
  phoneRegex: RegExp = /^(\s*)?(\+)?([- _():+]?\d[- _():+]?){11,14}(\s*)?$/;
  phone: string = "";

  created() { 
    console.log('home');   
    
  }
  mounted() {
    
  }

  cancel() {
    this.$router.back();
  }

  

    next() {
      this.load = true
      //если проходит валидация
      if (!this.GetRef("phone").isValid() && this.load) {
        this.load = false
        return;
      } else {
        this.load = false
      }
      
      //сохраняем данные в локальное хранилище (не обязательно)
      this.$app.Login.phone = this.phone;

      // this.$api.CashierService.StartRegistration({
      //     Name: this.name,
      //     Phone: this.phone
      // })
      this.$router.push({ name: "enter-with-pattern-key" });
    }
  
  }

</script>