<template>
  <layout> 
    home! 
    <br>
    <r-link route="other" :params="{id:23}">Нажми чтобы перейти на страницу с переопределенными шапкой и футером</r-link>    
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class PageHomeComponent extends Vue {
  
  
  constructor() {
    super();    
  }
  created() { 
    console.log('home');   
  }
  mounted() {
  

    
  }
  
}
</script>