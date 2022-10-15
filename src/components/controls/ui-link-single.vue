<template>
    <a href="#" @click="$emit('on-click-back')"><slot></slot></a>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

@Component({name: 'ui-link-single'})
export default class UiLinkSingleComponent extends Vue {

}
</script>

<style scoped>
</style>