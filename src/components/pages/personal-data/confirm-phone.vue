<template>
  <layout>
    <section class="register section-bg">
      <div action id="register-form">
        <default-header>Подтвердить смену телефона</default-header>
        
        <div class="scroll-wrapper">
          <div class="form-head">
            <div class="flex-block">
                <pos-input-label
                    ref="phone"
                    label="Номер телефона"
                    v-model="phone"
                    htmlClass="first-item"
                    name="phone"
                    placeholder="+9 876 234 09 67"
                    keyboardType="number"
                    keyboardTitle="Enter phone"
                    :required="true"
                    :regex="phoneRegex"
                    :isMask="true"
                    />

                <pos-input-label
                    ref="code"
                    label="Код"
                    v-model="code"
                    htmlClass="last-item"
                    name="code"
                    placeholder="3976"
                    keyboardType="number"
                    keyboardTitle="Enter code"
                    :required="true"
                    :regex="codeRegex"
                    />
            </div>
          </div>

          <div class="counter-wrap" v-if="secunds > 0">
              <h3 class="section--light-title">На активацию осталось: </h3>                
              <div id="minutes">{{stringMinutes}}</div><strong>:</strong>
              <div id="seconds">{{stringSecunds}}</div> 
          </div>

          <div v-if="changePhoneError" class="change-phone-error">Введен неверный код, попробуйте снова</div>
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
  import Timer from "../../../helpers/timer"

  import WsResponseModel from '../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel';
  import ChangePhone from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/ChangePhoneRequest"
  import { $app, $posStore } from "vue/types/umd";

  @Component({name: 'confirm-phone'})
  export default class ConfirmPhoneComponent extends Vue {
    timerWaiting?: NodeJS.Timeout = null;
    changePhoneError: boolean = false
    load: boolean = false

    constructor() {
      super();
    }

    codeRegex: RegExp = /^[0-9\(\)\-]+$/;
    phoneRegex: RegExp = /^(\s*)?(\+)?([- _():+]?\d[- _():+]?){11,14}(\s*)?$/;

    phone: string = "";
    code: string = "";

    secunds : number = 90; // указываем количество секунд в первом таймере

      

    //  создаем вычисляемое поле - минуты
    get stringSecunds():string {
        var s = this.secunds % 60;
        var str = (s < 10? '0' + s : s) + ' мин';  
        return str;
    }

    //  создаем вычисляемое поле - минуты
    get stringMinutes():string {    
        return String(Math.floor(this.secunds / 60));
    }

    created() {
    
      // this.name = this.$app.Registration.name || "";
      // this.phone = this.$app.Registration.phone || "";
    }
    mounted() {

      this.onStartTimerActivation();

    }

    onStartTimerActivation(){
        var self = this;
        this.timerWaiting = Timer.initTimer(this.secunds, function(sec: number){
            self.secunds = sec;            
        }, () =>{
            this.$router.push({ name: 'change-phone' })
        })
    }

    cancel() {
      this.$router.back();
    }

    onChangeValue(value:string){
      console.log('activation-code',value);
      this.code = value; // запоминаем value в переменную this.code  
      this.phone = value;
    }

    next() {
      this.load = true
      this.$api.UserService.ChangePhoneEvent.once((response) => {
        if (response.IsSuccess) {
          this.load = false
          this.$router.push({ name: 'change-success' })
        } else {
          this.load = false
          this.changePhoneError = true
        }
      })
      this.$api.UserService.ChangePhone({
        Phone: this.phone,
        Code: this.code
      })

      //если проходит валидация
      if (
        !this.GetRef("code").checkValidation() ||
        !this.GetRef("phone").checkValidation()      
      )
        {
          return;
        }
      //сохраняем данные в локальное хранилище (не обязательно)
      this.$app.Registration.phone = this.phone;

      // this.$api.CashierService.StartRegistration({
      //     Name: this.name,
      //     Phone: this.phone
      // })

    }

    beforeRouteLeave(to: Route, from: Route, next: any) {
        if (this.timerWaiting) {
            clearInterval(this.timerWaiting) 
            next()
        }
    }
  }
</script>

