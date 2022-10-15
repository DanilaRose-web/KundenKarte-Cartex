<template>
    <layout> 
        <section class="training-video">
            <div class="video">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/YAWt-gktZqM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </section> 
    </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'get-trained-video'})
export default class GetTrainedVideoComponent extends Vue {
  
  
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
