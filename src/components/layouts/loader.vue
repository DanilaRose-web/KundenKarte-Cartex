<template>    
    <div class="home">
        <div class="container-fluid home-container">
            <div class="hello">
                <div class="logo"><img src="assets/img/hello/logo.svg" alt="Логотип"> </div>
                <h1 class="hello-title"><span>Добро пожаловать!</span></h1>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'
    @Component({name: 'loader'})
    
    export default  class LoaderComponent extends Vue{

        constructor() {
            super();
        }
    }

</script>

<style lang="css" scoped>

</style>