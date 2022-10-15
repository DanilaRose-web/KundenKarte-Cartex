<template>
    <div class="sidebar-item" @click="$emit('on-click-do')">  
        <div class="sidebar-item_head">
            <div class="img"><slot name="img"></slot></div>
            <div class="sidebar-item-img"><slot name="small-sb-img"></slot></div>
            <div class="info">
                <slot>

                </slot>
            </div>
        </div>

        <div class="sidebar-item_footer">
            <div class="sidebar-item_link"><slot name="link"></slot></div>
        </div>
    </div> 
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch } from "vue-property-decorator";

    @Component({name: 'ui-sidebar-item-lg'})
    export default class UiSidebarItemLgComponent extends Vue {

    }
</script>

<style scoped>
</style>