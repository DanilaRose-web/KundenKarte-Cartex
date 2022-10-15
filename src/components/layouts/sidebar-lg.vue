<template>
    <aside class="sidebar">
        <div class="fixed-wrap">
            <slot />
        </div>
    </aside>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    
    @Component({name: 'sidebar-lg'})
    export default class SidebarLgComponent extends Vue{  
        
    }

</script>

<style scoped>

</style>