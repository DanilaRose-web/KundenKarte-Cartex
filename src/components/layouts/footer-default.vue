<template>    
    <footer>
        <div class="footer-wrap activation--footer-wrap">
            <div class="footer-link" @click="$emit('on-click-back')">
                <a href="#">Вернуться на главный экран</a>
                <img src="assets/img/activation-error/back.svg" alt="Refresh">
            </div>
        </div>
    </footer>
</template>
<script lang="ts">

import Vue from "vue";
import { Component } from 'vue-property-decorator'
@Component({name: 'footer-default'})
    export default  class FooterDefaultComponent extends Vue{
        constructor() {
    super();
     //console.log("FooterComponent created");
  }
    }
</script>

<style lang="scss" scoped>

</style>