<template>
    <layout> 
        <section class="section-bg section-full">
            <header-fixed>Константинова З.И.</header-fixed>

            <div class="content-wrap content--type-clothes type-clothes-overflow">
                <div class="container-fluid">
                    <h1 class="section-title">{{categoryName}}</h1>
                    <div class="content-block">
                        <div class="row">
                            <div class="col-3 type-clothes-col" v-for="category in currentGroupCategories" :key="category.ID">
                                <div class="type-clothes" @click="selectGroup(category)">
                                    <div class="type-clothes_img"><div ><img :src="category.PhotoUrl" :alt="category.Name"></div></div>
                                    <h3 class="type-clothes_title"><p>{{category.Name}}</p></h3>
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
import CategoryResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/CategoryResponse";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component({name: 'choose-of-type-gifts'})
export default class ChooseOfTypeGiftsComponent extends Vue {

    categories: CategoryResponse[] = [];
    currentGroupCategories: CategoryResponse[] = [];
    load: boolean = false

    async created() {
        this.categories = await this.$api.GiftService.getCategoriesAsync();
        this.getCurrentGroupCategories(this.categories);
    }
    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newVal: any) {
      this.getCurrentGroupCategories(this.categories);
    }
    getCurrentGroupCategories(categories: CategoryResponse[]) {
        this.load = true
        categories.forEach(category => {
            if (category.ID == parseInt(this.$route.params.categoryId)) {
                this.load = false
                this.currentGroupCategories = category.ChildCategories;
            } 
            else if (category.ChildCategories.length > 0) {
                this.load = false
                this.getCurrentGroupCategories(category.ChildCategories);
            } 
        });
    }
    get categoryName() {
        return this.$route.params.categoryName;
    }
    selectGroup(category: CategoryResponse) {
        this.load = true
        if (category.ChildCategories.length > 0) {
            this.load = false
            this.$router.push({ name: "choose-of-type-gifts", params: {categoryId: category.ID.toString(), categoryName: category.Name}});
        } else {
            this.load = false
            this.$router.push({ name: "choose-of-type-gifts-inside", params: {categoryId: category.ID.toString(), categoryName: category.Name} });
        } 
    }
}
</script>