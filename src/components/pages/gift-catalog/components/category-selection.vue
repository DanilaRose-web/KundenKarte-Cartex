<template>
    <div class="content content--gift" :class="{'content--gender' : vertical}" v-if="!!categories">
        <div class="content-item" :class="{'gender-item' : vertical}" @click="onSelectCategory(category.ID, category.Name)" v-for="category in categories" :key="category.ID">
            <div class="content-item-link">
                <div class="content-item__img" :class="[vertical ? 'vertical': 'horizontal']" :style="{backgroundImage:'url('+category.PhotoUrl+')'}">
                    <!-- <img :src="category.PhotoUrl" :alt="category.GiftCategoryName"> -->
                    <h1 class="content-item__title">{{category.Name}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import CategoryResponse from "../../../../../src/api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/CategoryResponse";

@Component({
  name: 'category-selection',
})
export default class CategorySelectionComponent extends Vue {
    @Prop({default: () => [] as CategoryResponse[]}) categories: CategoryResponse[];
    @Prop({default: false}) vertical: boolean;
 
    onSelectCategory(categoryId: number, name: string) {
        this.$emit('onSelectCategory', categoryId, name);
    }
}
</script>
<style lang="css" scoped>
.vertical {
    width: 426px;
    height: 715px;
}

.vertical img {
    height: 100%;
    width: 100%;
}

.horizontal {
    position: relative;
    /* width: 860px; */
    height: 300px;
}
.horizontal::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    /* background-color: rgba(255, 212, 1, 0.4); */
    background-color: rgba(0, 0, 0, 0.5);
}
.horizontal img {
    height: 100%;
    width: 100%;
}
    
</style>