<template>
    <aside class="sidebar sidebar--balance-view">
        <div class="fixed-wrap fixed-wrap--balance-view">
            <slot />
        </div>
    </aside>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    
    @Component({name: 'sidebar-sm'})
    export default class SidebarSmComponent extends Vue{        
        
        back(){
            this.$router.back();
        }
    }
</script>

<style scoped>

</style>