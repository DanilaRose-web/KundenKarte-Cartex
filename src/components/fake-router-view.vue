<template>
    <component :is="name"></component>
</template>
<script lang="ts">
import { MainStore } from "src/plugins/mainStore";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FakeRouterViewComponent extends Vue {  

//MainStore:MainStore 
  name: string = 'hello'

  constructor() {
    super();

  }
  

  // get name(): string{
  //   console.log('this1',this);
  //   if(this.$mainStore && this.$mainStore.openedPage)
  //     return this.$mainStore.openedPage;
  //   return 'register';
  // }
  created(){       
    //this.MainStore = this.$mainStore;
    this.$mainStore.onSetPage.on(this.onSetPage);
    console.log('this.$mainStore created', this.$mainStore);
  }
  destroyed(){
    this.$mainStore.onSetPage.removeListener(this.onSetPage);
  }
  
  onSetPage(name:string){
    this.name = name;
    console.log('onSetPage',this.name);
  }
}
</script>