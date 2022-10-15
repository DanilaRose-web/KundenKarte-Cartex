<template>
    <button @click="$emit('on-click-do')">
        <slot name="icon"></slot>
        <span><slot></slot></span>
    </button>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

@Component({name: 'ui-button'})
export default class UiButtonComponent extends Vue {

}
</script>

<style scoped>
</style>