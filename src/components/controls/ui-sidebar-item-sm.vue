<template>
    <div class="sidebar-item sidebar--balance-view_item" @click="$emit('on-click-do')">  
        <div class="sidebar-item-img"><slot></slot></div>
    </div> 
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch } from "vue-property-decorator";

    @Component({name: 'ui-sidebar-item-sm'})
    export default class UiSidebarItemSmComponent extends Vue {
        // bonuses = 0;
        // async created() {
        //     this.bonuses = await this.$api.TransactionService.getTotalBonusesAsync();
        // }
    }
</script>

<style scoped>
</style>