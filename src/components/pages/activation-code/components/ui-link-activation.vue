<template>
  <div class="footer-link" @click="$emit('on-click-back')">
    <a href="#"><slot></slot></a>
    <ui-timer-activation />
    <slot name="icon"></slot>
  </div>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

@Component({name: 'ui-link-activation'})

export default class UiLinkActivation extends Vue {

}
</script>

<style scoped>
</style>