<template>
    <div class="simple-slider slider-single-col">
        <div class="slider-block" id="sliderBlock">
            <div v-for="(slide, id) in innerSlideImages" :key="getKey(id, slide.id)" class="wrapper">
                <div class="slide" @click="selectSlide(slide.id)">
                    <img :src="slide.image" :alt="slide.image" :class="[isSelected(slide.id) ? 'selected' : 'no-select']">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SlideModel from "../models/slide-model";


@Component({
  name: 'simple-slider',
})
export default class SimpleSliderComponent extends Vue {
    @Prop({default: () => [] as SlideModel[]}) slides: SlideModel[];

    currentSlide: SlideModel = null
    innerSlideImages: SlideModel[] = [];
    isProcessingAnimation = false;
    

    created() {
        this.innerSlideImages = this.slides;
    }
    mounted() {
        if (this.innerSlideImages.length > 0 ) {
            this.currentSlide = this.innerSlideImages[0];
        }
    }
    // selectSlide(id: number) {
    //    if (!this.isProcessingAnimation) {
    //        this.isProcessingAnimation = true;
    //        this.$emit('onSelectSlide', id); 
    //        this.currentSlide = this.innerSlideImages.find(slide => slide.id == id); 
    //        const index = this.innerSlideImages.findIndex(slide => slide.id == id);
    //        let partArray: SlideModel[] = this.innerSlideImages.slice(0, index);
    //        partArray.forEach(el => {
    //            this.innerSlideImages.push(el);
    //        })
    //        const el = document.getElementById('sliderBlock');
    //        el.style.setProperty("--topEnd", (this.innerSlideImages[index].sortID - 1) * (-149)+"px");
    //        el.classList.add('animation-slider');
    //        setTimeout(() => {
    //            el.classList.remove('animation-slider');
    //            this.innerSlideImages = this.innerSlideImages.slice(index, this.innerSlideImages.length);
    //            this.innerSlideImages = this.innerSlideImages.map((slide, id) => {
    //                 slide.sortID = id + 1;
    //                 return slide;
    //            });
    //            this.isProcessingAnimation = false;
    //        }, 2000)
    //    }
    // }
    isSelected(id: number) {
        console.log('isSelectedId');
        if (!!this.currentSlide && this.currentSlide.id == id) {
            return true;
        } 
        return false; 
    }
    getKey(id: number, slideId: number) {
        return (new Date()).getTime() + slideId.toString() + id.toString()
    }
}
</script>
<style scoped lang="less">
    .simple-slider {
        position: relative;
        height: 500px;
        width: 83px;
        overflow: hidden;
        .slider-block {
            position: absolute;
            top: 0;
        }
        .animation-slider {
            -webkit-animation-name: slidertop;
            /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: 2s;
            /* Safari 4.0 - 8.0 */
            animation-name: slidertop;
            animation-duration: 2s;
        }
        .wrapper {
            .slide {
                img {
                    height: 129px;
                    width: 83px;
                    margin-bottom: 20px;
                }
            }
        }
        .selected {
            border: 2px solid #B72025;
        }
        .no-select {
            border: 2px solid #B0BFC6;
        }
    }
    @keyframes slidertop {
        from {
            top: 0px;
        }
        to {
            top: var(--topEnd);
        }
    }
</style>