<template>
    <div class="table-cell">
        <slot name="icon"></slot>
        <span><slot></slot></span>
    </div>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

@Component({name: 'ui-button'})
export default class UiButtonComponent extends Vue {

}
</script>

<style lang="css" scoped>

.table-cell {
    display: table-cell;
    vertical-align: middle;
}

</style>