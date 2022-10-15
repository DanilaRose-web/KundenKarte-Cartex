<template>    
    <footer class="form-footer" id="footer-fixed">
        <div class="footer-wrap">
           <slot> <ui-button /></slot>
            <div class="footer-link" @click="$emit('on-click-back')">
                <a href="#">Запросить код заново</a>
                <slot name="counter"></slot>
                <img src="assets/img/activation/refresh.svg" alt="refresh">
            </div>
        </div>
    </footer>

    <!-- @click="onClickCodeRequest" -->
</template>

<script lang="ts">

import Vue from "vue";
import { Component } from 'vue-property-decorator'
@Component({name: 'footer-actvation'})
    export default  class FooterActivationComponent extends Vue{
        constructor() {
    super();
     //console.log("FooterComponent created");
  }
    }
</script>

<style lang="scss" scoped>

</style>