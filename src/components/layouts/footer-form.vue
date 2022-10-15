<template>    
    <footer class="form-footer" id="footer-fixed">
        <div class="footer-wrap">
            <slot>
                <ui-button />
                <ui-link />
            </slot>
        </div>
    </footer>
</template>
<script lang="ts">

import Vue from "vue";
import { Component } from 'vue-property-decorator'
@Component
    export default  class FooterComponent extends Vue{
    constructor() {
    super();
     //console.log("FooterComponent created");
     
  }
  next() { 
        //если проходит валидация
        if (
        !this.GetRef("name").checkValidation() ||
        !this.GetRef("phone").checkValidation() ||      
        !this.oferta
        )
        return;
        //сохраняем данные в локальное хранилище (не обязательно)
        // this.$app.Registration.phone = this.phone;
        // this.$app.Registration.name = this.name;

        // this.$api.CashierService.StartRegistration({
        //     Name: this.name,
        //     Phone: this.phone
        // })

        this.$router.push({ name: "pattern-key" });
    }
    }

    
</script>

<style lang="scss" scoped>

</style>