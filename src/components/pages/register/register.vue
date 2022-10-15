<template>
  <layout>
    <section class="register section-bg">
      <div action id="register-form">
        <default-header>Регистрация</default-header>
        
        <div class="scroll-wrapper">
          <div class="form-head">
            <pos-input-label
              ref="name"
              label="Имя"
              v-model="name"
              htmlClass="center-item"
              name="name"
              placeholder="Зинаида"
              keyboardType="text"
              keyboardTitle="Enter name"
              :required="true"
              :regex="nameRegex"
            />

            <pos-input-label
              ref="phone"
              label="Телефон"
              v-model="phone"
              htmlClass="center-item"
              name="phone"
              placeholder="Укажите номер телефона"
              keyboardType="number"
              keyboardTitle="Enter phone"
              :required="true"
              :regex="phoneRegex"
              :isMask="true"
            />
            
  
            <div class="confirm form-item center-item"
              v-bind:class="{'error': isClickedContinue && !oferta}">
              <label for="one" class="confirm_label">
                <input
                  class="confirm_input"
                  type="checkbox"
                  id="one"
                  name="todo"
                  value="todo"
                  v-model="oferta"
                />
              </label>
              <div class="confirm_link">
                Регистрируясь в системе, я подверждаю своё согласие
                <strong>
                  <span class="modal-button" @click="openModal()">с офертой</span>
                  <img src="assets/img/registration/icon.svg" alt="Согласие с офертой"/>
                </strong>
              </div>
            </div>
          </div>
        </div>

        <footer-form>
            <ui-button class="form-button" @on-click-do="next()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template> Продолжить</ui-button>
            <ui-link @on-click-back="$router.push({name: 'hello'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Отмена" /></template></ui-link>
        </footer-form>
      </div>
    </section>

    <div class="wrap-modal">
      <div class="modal-window">
          <section class="modal">
              <p class="modal-info">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla fugiat enim quis, quae labore ab rem. Repellat, voluptatem quisquam cumque sapiente veniam adipisci ipsa? Dignissimos mollitia molestias necessitatibus dolore quis placeat consectetur aspernatur laudantium est voluptas! Quo nesciunt facilis laborum ea, adipisci error eveniet qui eaque fugiat neque, placeat laudantium commodi accusantium rem labore quos a autem iste provident odit dolor? Quos earum eos quia tempora ullam ipsam quibusdam voluptates numquam assumenda vitae sunt minima neque quaerat, nam commodi, blanditiis repellat eveniet at voluptatum, amet dolor doloribus odit ad? Possimus exercitationem debitis eos tenetur facere omnis. Veniam cumque rem, commodi est qui, ad sunt esse earum similique repellendus quibusdam. Libero reprehenderit, eos pariatur rerum laudantium, voluptas fugiat vel sapiente quos inventore illum saepe culpa officiis blanditiis? Modi, laborum odit ipsam quaerat expedita molestiae dolores deserunt neque ut tenetur natus quia. Autem ipsa quasi sit, quia dolore debitis necessitatibus iste consequuntur repellendus illo et quaerat hic explicabo animi rerum doloribus quas culpa? Mollitia sit nesciunt facilis dicta. Pariatur quas magni sit id voluptas. Commodi quia sit, consequuntur cum cupiditate accusantium explicabo ab rerum minima recusandae molestias corporis ea quaerat blanditiis quae excepturi quasi autem, amet asperiores officia nemo, dicta aut fugit molestiae. Repellendus magnam recusandae voluptatibus nemo laudantium pariatur neque enim architecto saepe! Recusandae fugiat ullam amet minima, debitis dolor iure vero totam accusantium alias consectetur praesentium deleniti iste voluptates quas maiores cum quibusdam earum commodi perspiciatis. Eaque doloribus obcaecati mollitia, eum dicta rem, voluptates explicabo possimus sunt tempora perferendis, incidunt blanditiis eos sit! Aliquam accusamus voluptatem vel quisquam id eaque, minima distinctio cumque corrupti corporis neque fuga laboriosam rem voluptatibus ipsum! Nihil obcaecati delectus porro? Quidem, alias eaque quos dignissimos nulla molestias quisquam fugiat, ad mollitia tempore, iure officia nihil ducimus quibusdam eum eos. Dolorem, magni rem maiores ipsum illum, beatae fuga, nisi natus tenetur obcaecati architecto quisquam. Delectus in et aut vel? Nulla repellat adipisci inventore ut, ex sequi, consequatur laborum eum autem vitae voluptates animi, similique velit possimus sapiente. Quos quibusdam totam vero voluptate temporibus corporis distinctio quas tenetur natus qui? Delectus placeat cumque facere blanditiis. Dolor molestiae laborum, modi ipsa ab dolores. Itaque id perspiciatis non delectus provident. Magni, blanditiis accusantium sint totam deleniti quos autem alias cumque pariatur rerum obcaecati voluptate, minima modi sunt atque! Debitis ipsam ex natus pariatur nemo tenetur repellendus adipisci praesentium rerum quidem sint nisi sunt ratione sed, aspernatur deserunt facilis quo reprehenderit officiis quia aperiam nihil esse dicta possimus! Laborum beatae voluptas reiciendis aspernatur delectus iusto possimus mollitia. Culpa nam omnis voluptatibus distinctio neque sint totam doloribus iure rem. Porro optio quisquam dolores temporibus velit vero aliquam error aliquid ad amet quis, delectus nostrum. Velit quo eligendi cupiditate optio perspiciatis at sed obcaecati, dolorem officiis quasi dicta? Commodi temporibus porro quasi facere quibusdam nulla sint ad sapiente nesciunt   </p>
                <button class="close-modal video-close-modal fullwidth-button">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0C8.07497 0 0 8.07497 0 18C0 27.925 8.07497 36 18 36C27.925 36 36 27.925 36 18C36 8.07497 27.925 0 18 0ZM25.2802 23.1591C25.5731 23.452 25.5731 23.9269 25.2802 24.2198L24.2198 25.2802C23.9269 25.573 23.4521 25.573 23.1591 25.2802L18 20.1211L12.8409 25.2802C12.5479 25.5731 12.0731 25.5731 11.7802 25.2802L10.7198 24.2198C10.4268 23.9269 10.4268 23.452 10.7198 23.1591L15.8789 17.9999L10.7198 12.8408C10.4268 12.548 10.4268 12.0731 10.7198 11.7802L11.7802 10.7197C12.0731 10.4269 12.5479 10.4269 12.8409 10.7197L18 15.8788L23.1591 10.7197C23.4521 10.4269 23.9269 10.4269 24.2198 10.7197L25.2802 11.7802C25.5732 12.073 25.5732 12.5479 25.2802 12.8408L20.1211 17.9999L25.2802 23.1591Z" /></svg>
                </button>
          </section>
      </div>
      
      <div class="overlay-modal" @click="close()"></div>
      <preloader v-if="load" />
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import WsResponseModel from '../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel';
import StartRegistrationRequest from '../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/UserService/StartRegistrationRequest'
import { $app, $posStore } from "vue/types/umd";
import Timer from "../../../helpers/timer"

@Component({name: 'register'})
export default class RegisterComponent extends Vue {
  startReg: WsResponseModel<Boolean>; 
  load: boolean = false

  constructor() {
    super();
  }
  created() {
    this.load = true
  }

  mounted() {
    this.load = false
  }

  nameRegex: RegExp = /^[\w\s^А-я_][^0-9\s_]+$/; //'[\\w\s]+';
  phoneRegex: RegExp = /^(\s*)?(\+)?([- _():+]?\d[- _():+]?){11,14}(\s*)?$/;

  phone: string = "";
  name: string = "";
  oferta: boolean = false;
  
  isClickedContinue: boolean = false;
  cancel() {
    this.$router.back();
  }
  
  next() {
    this.isClickedContinue = true;
  
    //если проходит валидация
    if (!this.GetRef("name").checkValidation() && !this.GetRef("phone").checkValidation() && !this.oferta) {
      console.log(this.GetRef("phone").checkValidation(), 'this.GetRef("phone")');
      
      return;
    } else if (!this.GetRef("name").checkValidation() || !this.GetRef("phone").checkValidation() || !this.oferta) {
      return
    }

    // var element = <HTMLInputElement> document.querySelector('.confirm_input');
    // if (element.checked) {
    //   element.parentElement.classList.add('error')
    // } else {
    //    element.parentElement.classList.remove('error')
    // }
    
    // function checkCheckBoxes() {
    //   document.querySelector('.confirm_input') 
    // }
      
    //сохраняем данные в локальное хранилище (не обязательно)
    this.$app.Registration.phone = this.phone;
    this.$app.Registration.name = this.name;

    // this.$api.CashierService.StartRegistration({
    //     Name: this.name,
    //     Phone: this.phone
    // })

    this.$router.push({ name: "pattern-key" });
  }
  openModal() {
            var overlayModal = document.querySelector('.overlay-modal');
            var modal = document.querySelector('.modal-window');
            var wrapModal = document.querySelector('.wrap-modal');
            var openModal = document.querySelectorAll('.modal-button');
            var closeModal = document.querySelector('.close-modal');

            for (let i = 0; i < openModal.length; i++) {
                openModal[i].addEventListener('click', open);
            }

            overlayModal.addEventListener('click', close);
            closeModal.addEventListener('click', close);

            function open() {
                modal.classList.add('show');
                overlayModal.classList.add('show');
                wrapModal.classList.add('show');
            }

            function close() {
                modal.classList.remove('show');
                overlayModal.classList.remove('show');
                wrapModal.classList.remove('show');
            }

            document.body.onkeydown = function (e) {
            if (e.keyCode == 27) {
                modal.classList.remove('show');
                overlayModal.classList.remove('show');
                wrapModal.classList.remove('show');
            }
        };

      }
}
</script>

