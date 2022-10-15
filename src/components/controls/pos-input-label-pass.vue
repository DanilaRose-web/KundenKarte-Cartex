<template>    
    <div class="form-item" v-bind:class="[{ 'error': showValidation}, htmlClass]">        
        <label :for="name" v-if="label">{{label}}</label>
        <pos-input-pass
            :ref="'input'+name" 
            :value="value" 
            @input="onInput" 
            @changeValue="onChangeValue"
            :name="name"
            :placeholder="placeholder" 
            :keyboardType="keyboardType" 
            :keyboardTitle="keyboardTitle" 
            :required="required"
            :regex="regex" 
            :mask="mask"
            :password="password"
        />

    </div>
</template>

<script lang="ts">
/* Получение значения из input ======================

:value="value" - запоминаем значение в value

@Watch('value') - отслеживае изменения в input
onChangeValue(){
  console.log("value",this.value); - выводим значение input в консоль
  this.$emit('changeValue',this.value) - $emit работает как всплытие событий, его могут увидеть родительские элементы. Например: 
  
  pos-input - мой input - генерирует $emit, его родитель pos-input-label (form-item) теперь может уидеть значение value, 
  pos-input-label - на странице activation-code - теперь тоже увидит value
}

================================================ */



import KeyboardSettings from 'src/plugins/PosStore/Models/KeyboardSettings';
    import Vue from 'vue'
    import { Component, Prop, Watch } from 'vue-property-decorator';

    import EnumKeyboardType from "../../plugins/PosStore/Models/EnumKeyboardType";
    
    

    @Component({name: 'pos-input-label-pass'})
    export default class PosInputLabel extends Vue{
        
        
        @Prop({type: String, required:true})
        value: string

        @Prop({type: String, required:false, default: undefined })
        name?: string

        @Prop({type: String, required:false, default: undefined})
        placeholder?: string

        @Prop({ type: String, required:false, default: EnumKeyboardType.text })
        keyboardType?: EnumKeyboardType

        @Prop({type: String, required:false, default: ''})
        keyboardTitle?: string

        @Prop({type: String, required:false, default: undefined})
        mask?: string

        @Prop({type: RegExp, required:false, default: undefined})
        regex?: RegExp

        @Prop({type: Boolean, default: false})
        password: boolean

        @Prop({type: Boolean, default: false })
        required: boolean

        @Prop({type: String, default: undefined })
        htmlClass?: string

        @Prop({type: String, default: undefined })
        label?: string


        innerValue: string;

        created(){
            this.innerValue = this.value;
        }

        
        onChangeValue(value:string){
            console.log('pos-input-label',value);
            this.$emit('changeValue',this.value)
        }

        
        /**
         * Проверка валидности поля + отображение невалидности
         */
        checkValidation():boolean {
            if (this.GetRef('input'+this.name).checkValidation()) this.showValidation = false;
            else this.showValidation = true;
            return !this.showValidation;
        }
        /**
         * Проверка валидности поля
         */
        isValid():boolean{
            // console.log('isValid', this.innerValue,this.regex,new RegExp(this.regex).test(this.innerValue+''))
            // if(this.required && (this.innerValue === undefined || this.innerValue===''))
            //     return false;
            // if(this.regex)
            //     return new RegExp(this.regex).test(this.innerValue+'')
            var res = this.GetRef('input'+this.name).isValid();
            return res;
        }
        showValidation: boolean = false;

        onInput(newValue:string){
            this.innerValue = newValue;
            this.$emit('input', this.innerValue);
            this.checkValidation()
            // if(this.isValid())
            //     this.showValidation=false;
            // else 
            //     this.showValidation=true;
        }

    }
</script>

<style scoped>

</style>