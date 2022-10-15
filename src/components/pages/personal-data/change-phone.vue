<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header>Сменить телефон</default-header>
                <div class="scroll-wrapper">
                  <!-- <h2 class="section-main-title activation-title phone-title">На уканный номер телефона вам будет выслан код, а так же необходимо ввести пароль для подтверждения</h2> -->
                  <h2 class="section-main-title activation-title phone-title">Укажите новый номер телефона, на который Вам будет выслан код</h2>
                  
                  <pos-input-label
                      ref="phone"
                      label="Номер телефона"
                      v-model="phone"
                      htmlClass="one-form-item"
                      name="phone"
                      placeholder="+9 876 234 09 67"
                      keyboardType="number"
                      keyboardTitle="Enter phone"
                      :required="true"
                      :regex="phoneRegex"
                      :isMask="true"
                  />
                
                </div>

                <footer-form>
                  <ui-button class="form-button" @on-click-do="next()"><template slot="icon"><img src="assets/img/change-phone/ok.svg" alt="Продолжить"></template> Сменить телефон</ui-button>
                  <ui-link @0n-click-back="$router.push({name: 'hello'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Отмена" /></template></ui-link>
                </footer-form>
            </div>
            
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Route } from "vue-router";

import Login from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/LoginRequest'
import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
import { $app, $posStore } from "vue/types/umd";

@Component({name: 'change-phone'})
export default class ChangePhoneComponent extends Vue {
  login: WsResponseModel<String>;
  load: boolean = false
  
  
  constructor() {
    super();    
  }

  // phoneRegex: RegExp = /^[0-9\(\)\-]+$/;
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

  onChangeValue(value:string){
    console.log('activation-code',value);
    this.phone= value; // запоминаем value в переменную this.code  
  }

    next() {
      this.load = true
      this.$api.UserService.StartChangePhoneEvent.once((response) => {
        if (response.IsSuccess) {
          this.load = false
          console.log('method start chnage phone');
          this.$router.push({ name: "confirm-phone" });
        } else {
          this.load = false
        }
      })
      this.$api.UserService.StartChangePhone({
        NewPhone: this.phone
      })


      //если проходит валидация
      if (
        !this.GetRef("phone").isValid()
      )
        return;
      //сохраняем данные в локальное хранилище (не обязательно)
      this.$app.Login.phone = this.phone;

      // this.$api.CashierService.StartRegistration({
      //     Name: this.name,
      //     Phone: this.phone
      // })
    }
  
  }

</script>