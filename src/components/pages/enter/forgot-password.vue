<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header>Я не помню свой пароль</default-header>

                <div class="scroll-wrapper">
                    <h2 class="section-main-title activation-title">Вы можете получить свой пароль на почту или распечатать временный QR-код.</h2>
    
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
                    />
    
                    <r-link class="help-link" route="print-a-code">Распечатать чек на временный вход?</r-link>
                </div>
                

                <footer-form>
                    <ui-button class="form-button" @on-click-do="next()"><template slot="icon"><img src="assets/img/registration/pass.svg" alt="Продолжить" /></template>Получить пароль</ui-button>
                    <ui-link @on-click-back="$router.push({name: 'enter-with-phone'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Отмена"></template></ui-link>
                </footer-form>
            </div>
            
        </section>

        <preloader v-if="load"/>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel" 
// import ForgetPassword from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/ForgetPasswordRequest"
import StartRestorePassword from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/StartRestorePasswordRequest"

@Component({name: 'forget-password'})
export default class ForgetPasswordComponent extends Vue {
  
    load: boolean = false
    constructor() {
        super();    
    }

    phoneRegex: RegExp = /^(\s*)?(\+)?([- _():+]?\d[- _():+]?){10,14}(\s*)?$/;
    phone: string = "";

    created() { 
        console.log('home');   
    }
    mounted() {}

    cancel() {
        this.$router.back();
    }
    next() {
        this.load = true
        this.$api.UserService.StartRestorePasswordEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
                this.$router.push({ name: 'enter-with-phone' })
            } else [
                this.load = false
            ]
        })

        this.$api.UserService.StartRestorePassword({
            Phone: this.phone
        })

        //если проходит валидация
        if (
        !this.GetRef("phone").isValid()

        )
        return;
        //сохраняем данные в локальное хранилище (не обязательно)
        // this.$app.Registration.phone = this.phone;

        // this.$api.CashierService.StartRegistration({
        //     Name: this.name,
        //     Phone: this.phone
        // })

        // this.$router.push({ name: "pattern-key" });
    }
    
}
</script>