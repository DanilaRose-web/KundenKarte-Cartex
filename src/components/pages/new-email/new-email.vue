<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header>Сменить телефон</default-header>
                <div class="scroll-wrapper">
                  <h2 class="section-main-title activation-title phone-title">На уканный email будет выслано письмо с инструкциями</h2>
  
                  <pos-input-label
                      ref="email"
                      label="Новый email"
                      v-model="email"
                      htmlClass="one-form-item"
                      name="email"
                      placeholder="ivanova@mail.com"
                      keyboardType="number, textr"
                      keyboardTitle="New Eamil"
                      :required="true"
                      :regex="emailRegex"
                  />
                
                </div>
                
                <!-- <footer-form>
                    <template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template>
                    <template slot="btn">Продолжить</template>
                    <template slot="link">Отмена</template>
                    <template slot="img"><img src="assets/img/registration/cancel.svg" alt="Отмена"></template>
                </footer-form> -->
                <footer class="form-footer" id="footer-fixed">
                    <div class="footer-wrap">
                        <button type="button" class="form-button">
                            <img src="assets/img/new-email/email.svg" alt="Продолжить">
                            <span>Сменить email</span>
                        </button>
                        <div class="footer-link">
                            <r-link route="hello">Отмена</r-link>
                            <img src="assets/img/registration/cancel.svg" alt="Отмена">
                        </div>
                    </div>
                </footer>
            </div>
            
        </section>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Login from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/LoginRequest'
import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel";

@Component
export default class PageHomeComponent extends Vue {
  login: WsResponseModel<String>;

  
  
  constructor() {
    super();    
  }

  phoneRegex: RegExp = /^[0-9\(\)\-]+$/;
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

      this.$router.push({ name: "enter-with-pattern-key" });
    }
  
  }

</script>