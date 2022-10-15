<template>
  <div>
    <header>
      <div class="header-container">
          <div class="logo">
              <img src="/assets/img/registration/prev.svg" alt="Назад" class="prev">
              <img src="/assets/img/registration/logo.svg" alt="Логотип" class="logo">
          </div>
          <h1 class="header-title"><slot></slot></h1>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({name: 'header-activation-code'})
export default class HeaderActivationCodeComponent extends Vue {
  constructor() {
    super();
  }


  created() {
  }
  
}
</script>

<style lang="scss" scoped>
</style>