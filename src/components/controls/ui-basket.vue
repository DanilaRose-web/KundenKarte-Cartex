<template>
    <div class="basket" @click="go()">
        <div class="basket-img"><img src="assets/img/enter-in-profile/basket.svg" alt="Корзина"></div>
        <div class="number">
            <div>{{basketItemsNumber}}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch, Emit } from "vue-property-decorator";

    @Component({name: 'ui-basket'})
    export default class UiBasketComponent extends Vue {
        @Prop({default: false}) isBackCurrentPage: boolean; 
        
        basketItemsNumber = 0;
        userName: string = '';
        async created() {
            this.basketItemsNumber = this.$store.getters.returnOrder.length; 
            if (!!this.$store.getters.returnCurrentUser) {
               this.userName = this.$store.getters.returnCurrentUser;  
            } else {
               this.userName = (await this.$api.UserService.getUserInfoAsync()).Name;
               this.$store.commit('saveCurrentUser', this.userName);            
            }
        }
        back(){
            if (!this.isBackCurrentPage) {
                this.$router.back();
            } else {
                this.$emit('back')
            }
        }
        @Watch('$store.getters.returnOrder')
        onChangeBasketItems() {
            this.basketItemsNumber = this.$store.getters.returnOrder.length;
        }
        go() {
           this.$router.push({ name: 'choose-of-type-clothes-basket' })
        }

    }
</script>

<style scoped>
</style>