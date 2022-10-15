<template>
    <layout> 
        <section class="enter-phone section-bg">
            <div class="register-form">        
                <div class="activation-form">
                    <default-header>Графический ключ</default-header>

                    <div class="scroll-wrapper">
                        <div class="activation-code">
                            <h2 class="pattern-key-title">Придумайте графический ключ для входа</h2>
                        </div>
    
                        <div id="patternContainer">
                            <div id="create-pattern" class="pattern-holder"></div>
                        </div>
                    </div>


                    
                    <!-- <footer class="form-footer" id="footer-fixed">
                        <div class="footer-wrap">
                            <ui-button @on-click-do="next()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template> Подтвердить</ui-button>
                            <ui-link @on-click-back="$router.push({name: 'register'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Refresh"></template></ui-link>
                        </div>
                    </footer> -->
                    <footer-form>
                        <ui-button class="form-button" @on-click-do="next()"><template slot="icon"><img src="assets/img/registration/btn-man.svg" alt="Продолжить"></template> Подтвердить</ui-button>
                       <ui-link @on-click-back="$router.push({name: 'register'})">Отмена <template slot="icon"><img src="assets/img/registration/cancel.svg" alt="Refresh"></template></ui-link>
                    </footer-form>
                </div>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import WsResponseModel from "src/api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { $app, $posStore } from "vue/types/umd";

@Component({name: 'pattern-key'})
export default class PatternKeyComponent extends Vue {
    load: boolean = false
    password:string;

    mounted() {
        var self = this;
        var lock = new PatternLock("#patternContainer",{
            onDraw:function(pattern:any){            
                self.$app.Registration.password = self.password = pattern;
            }
        });
        this.$app.Registration.password = this.password;
        
    }
    next() {
        this.load = true
        if(!this.password) return;   
        var self = this;
        this.$api.UserService.StartRegistrationEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
                this.$router.push({name:'activation-code'});
            } else {
                this.load = false
                this.$router.push({name:'error-message', params:{ error: result.ErrorMessage } });
            }
        })
        this.$api.UserService.StartRegistration({
            Name: this.$app.Registration.name,
            Phone: this.$app.Registration.phone,
            Password: this.$app.Registration.password,
            PosCode: this.$posStore.getPosCode()
        });

        // this.$api.UserService.StartRegistrationEvent.once(this.onStartRegistrationResponse.bind(this));
        // this.$api.UserService.StartRegistration({
        //     Name: this.$app.Registration.name,
        //     Phone: this.$app.Registration.phone,
        //     Password: this.$app.Registration.password,
        //     PosCode: this.$posStore.getPosCode()
        // });
    }

    // onStartRegistrationResponse(result: WsResponseModel<Boolean>){
    //     this.load = true
    //     if(result.IsSuccess){
            
    //         this.load = false
    //     }
    //     else{
           
    //         this.load = false
    //     }
    // }
}
</script>
<style>
/* #patternContainer{
    margin-top: -60px;
} */
</style>