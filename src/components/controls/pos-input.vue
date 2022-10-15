<template>
  <input v-if="isMask"
    type="text"
    :value="value"
    @click="onClick"
    @input="onInput($event.target.value)"
    :name="name"
    :id="name"
    :placeholder="placeholder"
    :class="showValidation?'error':''"
    v-phone
  />
   <input v-else
    type="text"
    :value="value"
    @click="onClick"
    @input="onInput($event.target.value)"
    :name="name"
    :id="name"
    :placeholder="placeholder"
    :class="showValidation?'error':''"
  />
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

import EnumKeyboardType from "../../plugins/PosStore/Models/EnumKeyboardType";

@Component({name: 'pos-input'})
export default class PosInput extends Vue {
  @Prop({ type: String, required: true })
  value: string;

  @Prop({ type: String, required: false, default: undefined })
  name?: string;

  @Prop({ type: String, required: false, default: undefined })
  placeholder?: string;

  @Prop({ type: String, required: false, default: EnumKeyboardType.text })
  keyboardType?: EnumKeyboardType;

  @Prop({ type: String, required: false, default: "" })
  keyboardTitle?: string;

  @Prop({ type: String, required: false, default: undefined })
  mask?: string;

  @Prop({ type: RegExp, required: false, default: undefined })
  regex?: RegExp;

  @Prop({ type: Boolean, default: false })
  password: boolean;

  @Prop({ type: Boolean, default: false })
  required: boolean;

  @Prop({ type: Boolean, default: false })
  isMask: boolean;



  innerValue: string;

  showValidation: boolean = false;

/**
 * Проверка валидности поля
 */
@Watch('value')
onChangeValue(){
  // console.log("value",this.value);
  this.$emit('changeValue',this.value)
}
  isValid(): boolean {
    if (
      this.required &&
      (this.innerValue === undefined || this.innerValue === "" || this.isChecked)
    )
      return false;
    if (this.regex) return new RegExp(this.regex).test(this.innerValue + "");
      console.log(new RegExp(this.regex));
    
    return true;
  }
/**
 * Проверка валидности поля + отображение невалидности      
 */
  checkValidation():boolean {
    if (this.isValid()) this.showValidation = false;
    else this.showValidation = true;
    return !this.showValidation;
  }

  onInput(newValue: string) {
    this.innerValue = newValue;
    
    this.$emit("input", this.innerValue);
    this.checkValidation();
  }

  onClick() {
    this.showValidation = false;
    //console.log('onClick', this.keyboardType, this.keyboardTitle);
    var self = this;
    let settings: KeyboardSettings = {
      title: this.keyboardTitle,
      type: this.keyboardType, // 'text'
      mask: this.mask,
      regex: this.regex?.source,
      password: this.password,
    };
    this.$posStore.showKeyboard(settings, function (res?: string) {
      if (res) {
        self.innerValue = res;
        self.$emit("input", res);
      }
      self.checkValidation();
    //   if (self.isValid()) self.showValidation = false;
    //   else self.showValidation = true;
    //   //self.value = res
    });
  }

  // testKeyboard(){
  //     this.$posStore.showKeyboard({
  //         title:'test title',
  //         type: EnumKeyboardType[EnumKeyboardType.text]// 'text'
  //     },
  //     function(res:any){
  //         console.log('testKeyboard end', JSON.stringify(res))
  //         alert('successs');
  //     });
  // }
}
</script>

<style scoped>
</style>