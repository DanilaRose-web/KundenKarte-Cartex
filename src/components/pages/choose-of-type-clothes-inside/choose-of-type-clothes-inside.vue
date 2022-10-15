<template>
    <layout> 
        <section class="profile section-bg section-full">
            <header-fixed>
                <ui-basket />
            </header-fixed>
            <div class="content-wrap content--type-clothes">
                <div class="container-fluid">
                    <h2 class="section-title">{{categoryName}}</h2>
                    <div class="content-block">
                        <div class="row">
                            <div class="col-3 type-clothes-col" v-for="gift in gifts" :key="gift.ID">
                                <div class="type-clothes" @click="onSelectClothes(gift.ID)">
                                    <div class="type-clothes_img"><img :src="gift.PhotoUrls[0]" :alt="gift.Name"></div>
                                    <p class="type-clothes_descr">{{gift.Name}}</p>
                                    <div class="type-clothes_price">{{gift.CostInBonuses}}</div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import GiftRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest";
import GiftResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'choose-of-type-gifts-inside'})

export default class ChooseOfTypeGiftsInsideComponent extends Vue {
    // gifts: GiftResponse[] = []; 
    gifts: GiftResponse = null; 
    load: boolean = false
    
    async created() { 
        let request: GiftRequest = new GiftRequest();
        request.GiftCategories = [parseInt(this.$route.params.categoryId)];
        const res = await this.$api.GiftService.getGiftsAsync(request);
        this.gifts = res;
    }
    mounted() {
        
    }
    onSelectClothes(id: number) {
        this.$router.push({name: 'choose-of-type-clothes-single', params: {id: id.toString()}});
    }
    get categoryName() {
        return this.$route.params.categoryName;
    }
}
</script>
<style lang="less" scoped>
  .content--type-clothes {
     .container-fluid {
        min-height: 83.7vh;
     } 
     .type-clothes_img {
         height: 430px;
         width: 100%;
         
     }
  }
</style>