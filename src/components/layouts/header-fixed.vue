<template>
     <header id="header-fixed">
        <div class="header-container">
            <div class="logo">
                <img src="assets/img/registration/prev.svg" @click="back" alt="Назад" class="prev">
                <img src="assets/img/registration/logo.svg" alt="Логотип" class="logo">
            </div>
            <h1 class="header-title">
                <span @click="logout()">{{ userName }}</span>
                <slot />
            </h1>
        </div>
    </header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
    
    @Component
    export default class DefaultHeaderComponent extends Vue{  
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

        async logout() {
            /* 
                Метод с пометкой async, в отличие от методов без async
                ждет сначала когда придет ответ, потом выполняет слудующий код
            */
            const res = await this.$api.UserService.logoutAsync();
            if (res) {
                this.$router.push({ name: 'enter-choose-user' })
            }
            // this.$api.UserService.LogoutEvent.once((response) => {
            //     if (response.IsSuccess) {
            //         this.$router.push({ name: 'enter-choose-user' })
            //     }
            // })
            // this.$api.UserService.Logout()
        }

        
    }
</script>

<style scoped>

</style>