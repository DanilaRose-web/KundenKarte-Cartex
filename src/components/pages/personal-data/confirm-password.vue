<!--<template>
  <layout>
    <section class="register section-bg">
      <div action id="register-form">
        <default-header>Сменить пароль</default-header>

        <h2 class="section-main-title activation-title">Для смены пароля необходимо указать новый пароль, а затем ввести старый пароль для подверждения</h2>
        
        <div class="scroll-wrapper">
          <div class="form-head no-margin-top">
            <pos-input-label-pass
              ref="new-password"
              label="Новый пароль"
              v-model="name"
              htmlClass="center-item"
              name="new-password"
              placeholder="*******"
              keyboardType="text"
              keyboardTitle="New password"
              :required="true"
              :regex="newPasswordRegex"
            />

            <pos-input-label-pass
              ref="old-password"
              label="Старый пароль"
              v-model="phone"
              htmlClass="center-item"
              name="old-password"
              placeholder="*******"
              keyboardType="text"
              keyboardTitle="Old password"
              :required="true"
              :regex="oldPasswordRegex"
            />
          </div>
        </div> -->

        <!-- <footer-form>
            <template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить" /></template>
            <template slot="btn">Продолжить</template>
            <template slot="link">Отмена</template>
            <template slot="img"><img src="assets/img/registration/cancel.svg" alt="Отмена" /></template>
        </footer-form> -->
        <!--<footer class="form-footer" id="footer-fixed">
            <div class="footer-wrap">
                <button type="button" class="form-button">
                    <slot name="icon"><img src="/assets/img/change-password/password.svg" alt="пароль"></slot>
                    <span><slot name="btn">Сменить пароль</slot></span>
                </button>
                <div class="footer-link">
                    <r-link route="hello"><slot name="link">Отмена</slot></r-link>
                    <slot name="img"><img src="assets/img/registration/cancel.svg" alt="Отмена" /></slot>
                </div>
            </div>
        </footer>
      </div>
    </section>

    <div class="wrap-modal">
      <div class="modal-window">
          <section class="modal">
              <p class="modal-info">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla fugiat enim quis, quae labore ab rem. Repellat, voluptatem quisquam cumque sapiente veniam adipisci ipsa? Dignissimos mollitia molestias necessitatibus dolore quis placeat consectetur aspernatur laudantium est voluptas! Quo nesciunt facilis laborum ea, adipisci error eveniet qui eaque fugiat neque, placeat laudantium commodi accusantium rem labore quos a autem iste provident odit dolor? Quos earum eos quia tempora ullam ipsam quibusdam voluptates numquam assumenda vitae sunt minima neque quaerat, nam commodi, blanditiis repellat eveniet at voluptatum, amet dolor doloribus odit ad?
              </p>
              <div class="close-modal">
              <div class="footer-link">
                <r-link route="hello">Отмена</r-link>
                <img src="assets/img/registration/cancel.svg" alt="Отмена" />
              </div>
            </div>
          </section>
      </div>
      
      <div class="overlay-modal" @click="close()"></div>
    </div>
  </layout>
</template> -->

<template>
    <layout> 
        <section class="enter-phone section-bg">
            <div class="register-form">
                <div class="activation-form">
                    <default-header>Графический ключ</default-header>
            
                    <div class="scroll-wrapper">
                        <div class="activation-code pattern-key-block-title">
                            <h2 class="section-main-title activation-title">Для подтверждения смены пароля укажите старый пароль и нажмите "Сменить пароль"</h2>
                        </div>
    
                        <div id="patternContainer">
                            <div id="create-pattern" class="pattern-holder"></div>
                        </div>
                    </div>

                    <footer-form>
                      <ui-button class="form-button" @on-click-do="getReg()"><template slot="icon"><img src="/assets/img/change-password/password.svg" alt="пароль"></template> Сменить пароль</ui-button>
                      <ui-link @0n-click-back="$router.push({name: 'hello'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Отмена" /></template></ui-link>
                    </footer-form>
                </div>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import WsResponseModel from '../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel';
import ChangePassword from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/ChangePasswordRequest';
import { $app, $posStore } from "vue/types/umd";

@Component({name: 'confirm-password'})
export default class ConfirmPasswordComponent extends Vue {
  
  load: boolean = false
  password: string

  constructor() {
    super();
  }




  created() {
   
    // this.name = this.$app.Registration.name || "";
    // this.phone = this.$app.Registration.phone || "";
  }
  mounted() {

    var self = this;
    var lock = new PatternLock("#patternContainer",{
        onDraw:function(pattern:any){            
            self.$app.Registration.password = self.password = pattern;
            let pas = pattern
            console.log(pas);   
        }
    });
  }

  cancel() {
    this.$router.back();
  }
  getReg(){
    this.load = true
    if(!this.password)
        return;
        var self = this;
        this.$api.UserService.ChangePasswordEvent.once((response) => {
          if (response.IsSuccess) {
            this.load = false
            this.$router.push({ name: 'change-success' })
          } else {
            this.load = false
          }
        })
        this.$api.UserService.ChangePassword({
            NewPassword: this.$app.PasswordChange.password,
            OldPassword: this.password
        })
    }
}
</script>

