<template>
    <layout> 
        <div class="home">
            <div class="container-fluid home-container">
                <div class="hello" @click="testKeyboard">
                    <div class="logo"><img src="assets/img/hello/logo.svg" alt="Логотип"> </div>
                    <h1 class="hello-title"><span>Добро пожаловать!</span></h1>
                </div>
            </div>
        </div>
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Route } from "vue-router";
import EnumKeyboardType from "../../../plugins/PosStore/Models/EnumKeyboardType";
import Timer from "../../../helpers/timer"


@Component({name: 'hello'})
  
export default class HelloComponent extends Vue {
  timerWaiting?: NodeJS.Timeout = null;
  
  constructor() {
    super();    
  }
  created() { 
    console.log('home');   
  }
  mounted() {
    var self = this;
    setTimeout(function(){
      self.$router.push({name:'list-of-kassir'}) 
    }, 1500);    
  }


  testKeyboard(){
    this.$posStore.showKeyboard({
        title:'test title', 
        type: EnumKeyboardType[EnumKeyboardType.text]// 'text'
      },
      function(res:any){
        console.log('testKeyboard end', JSON.stringify(res))
        alert('successs');
      });
  }
  onContinue(){
      console.log('this', this);
      this.$router.push({name:'list-of-kassir'});
      return false;
  }
  // Останавливаем таймер
    stopTimerWaitingCode(){
        if(this.timerWaiting)
            clearInterval(this.timerWaiting)     
        }
  
}
</script>