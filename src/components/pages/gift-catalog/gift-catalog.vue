<template>
    <layout> 
        <section class="section-bg">
            <header-fixed @back="onBack" :isBackCurrentPage="true">
              <ui-basket />
            </header-fixed>
            
            <div class="fullwrap">
                <category-selection :categories="categories" :vertical="orientation" @onSelectCategory="onSelectCategory"></category-selection>
                <sidebar-lg>
                    <ui-sidebar-item-lg class="balance" @on-click-do="$router.push({name: 'balance-view'})">
                        <template slot="img"><img src="assets/img/enter-in-profile/heart.svg" alt="Посмотреть баланс"></template>
                        <h2>{{bonuses}}</h2>
                        <strong>баллов</strong>
                        <template slot="link">Посмотреть баланс</template>
                    </ui-sidebar-item-lg>

                    <ui-sidebar-item-lg class="sidebar-item-active catalog" @on-click-do="$router.push({name: 'gift-catalog'})">
                        <template slot="img"><img src="/assets/img/enter-in-profile/catalog.svg" alt="Каталог подарков"></template>
                        <h3>Каталог подарков</h3>
                        <template slot="link">Выбрать себе подарок</template>
                    </ui-sidebar-item-lg>

                    <ui-sidebar-item-lg class="catalog" @on-click-do="$router.push({name: 'profile-and-orders'})">
                        <template slot="img"><img src="/assets/img/enter-in-profile/ls.svg" alt="Личные данные"></template>
                        <h3>Личные данные</h3>
                        <template slot="link">Изменить телефон или пароль</template>
                    </ui-sidebar-item-lg>
                </sidebar-lg>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>
<script lang="ts">
import GiftRequest from "../../../../src/api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import GiftResponse from "../../../../src/api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse";
import CategoryResponse from "../../../../src/api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/CategoryResponse";

@Component({name: 'gift-catalog'})
export default class GitCatalogComponent extends Vue {

  categories: CategoryResponse[] = null;
  firstLevel: CategoryResponse[] = [];
  orientation = false;
  load: boolean = false

  bonuses = 0;
  
  async created() { 
    this.categories = await this.$api.GiftService.getCategoriesAsync();
    this.firstLevel = this.categories;
    this.bonuses = await this.$api.TransactionService.getTotalBonusesAsync();
  }
  @Watch('firstLevel')
  changeFirstLevel() {
    if (!!this.$store.getters.returnCurrentCategory) {
      this.getCurrentCategories(this.firstLevel);
    }
  }
  getCurrentCategories(categories: CategoryResponse[]) {
    this.load = true
    categories.forEach(category => {
        if (category.ID == this.$store.getters.returnCurrentCategory.ID) {
            this.load = false
            this.categories = categories;
            if (this.categories != this.firstLevel) {
              this.load = false
              this.orientation = true;
            } else {
              this.load = false
            }
        } 
        else if (category.ChildCategories.length > 0) {
          this.load = false
            this.getCurrentCategories(category.ChildCategories);
        } else {
          this.load = false
        }
    });
  }
  /**
   * Выбор основной категории и открытие категорий вложенных второй уровень 
  */
  onSelectCategory(categoryId: number, name: string) {
    this.load = true
    this.orientation = true;
    let selectedCategory = this.categories.find(el => el.ID == categoryId);
    this.$store.commit('saveCategory', selectedCategory);
    if (selectedCategory.ChildCategories.length > 0 && this.categories == this.firstLevel) {
      this.load = false
      this.categories = this.categories.find(el => el.ID == categoryId).ChildCategories;
    } else if (selectedCategory.ChildCategories.length == 0) {
      this.load = false
      this.$router.push({ name: "choose-of-type-gifts-inside", params: {categoryId: categoryId.toString(), categoryName: name} });
    } else {
      this.load = false
      this.$router.push({ name: "choose-of-type-gifts", params: {categoryId: categoryId.toString(), categoryName: name}});
    }
  }
  onBack() {
    this.load = true
    if (this.categories == this.firstLevel) {
      this.load = false
      this.$router.back();
    } else {
      this.load = false
      this.categories = this.firstLevel;
      this.orientation = false;
    }
  }
}
</script>