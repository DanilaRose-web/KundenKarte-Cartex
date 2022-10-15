<template>    
     <footer>
        <div class="footer-wrap activation--footer-wrap">
            <div class="footer-link" @click="$emit('on-click-back')">
                <slot></slot>
                <img src="assets/img/activation-error/back.svg" alt="Refresh">
            </div>
        </div>
    </footer>
</template>
<script lang="ts">

import Vue from "vue";
import { Component } from 'vue-property-decorator'
@Component({name: 'footer-fixed'})
export default  class FooterFixedComponent extends Vue{
    
}
</script>

<style lang="scss" scoped>

</style>