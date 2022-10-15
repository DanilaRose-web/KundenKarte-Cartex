<template>
    <layout> 
        <section class="section-padd section-bg section-full">
            <header-fixed>
                <ui-basket />
            </header-fixed>

            <div class="fullwrap">
                <div class="content content-profile-scroll">
                    <div class="container-fluid">
                        <div class="row grid">
                            <div class="col-6 grid-item" v-for="item of newsItem" :key="item.ID">
                                <div class="cart">
                                    <div class="cart-img"><a href="#"><img :src="item.ImageUrl" alt="Мишки"></a></div>
                                    <div class="cart-info">
                                        <p class="cart-info_excerpt">{{ item.Title }}</p>
                                        <span class="cart-info_date">{{item.Date | momentDate('DD.MM.YYYY  hh:mm')}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <sidebar-lg>
                    <ui-sidebar-item-lg class="sidebar-item-active balance" @on-click-do="$router.push({name: 'balance-view'})">
                        <template slot="img"><img src="assets/img/enter-in-profile/heart.svg" alt="Посмотреть баланс"></template>
                        <h2>{{bonuses}}</h2>
                        <strong>баллов</strong>
                        <template slot="link">Посмотреть баланс</template>
                    </ui-sidebar-item-lg>

                    <ui-sidebar-item-lg class="catalog" @on-click-do="$router.push({name: 'gift-catalog'})">
                        <template slot="img"><img src="assets/img/enter-in-profile/catalog.svg" alt="Каталог подарков"></template>
                        <h3>Каталог подарков</h3>
                        <template slot="link">Выбрать себе подарок</template>
                    </ui-sidebar-item-lg>

                    <ui-sidebar-item-lg class="catalog" @on-click-do="$router.push({name: 'profile-and-orders'})">
                        <template slot="img"><img src="assets/img/enter-in-profile/ls.svg" alt="Личные данные"></template>
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
import Vue from "vue";
import { Component } from "vue-property-decorator";

import InfoShortResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/InfoService/InfoShortResponse";

@Component({name: 'enter-with-phone'})
export default class EnterWithPhoneComponent extends Vue {
    newsItem: Array<InfoShortResponse> = null;
  
    msnry:any;
    load: boolean = false

    bonuses = 0;
    async created() {
        this.bonuses = await this.$api.TransactionService.getTotalBonusesAsync();
    }
    back(){
        this.$router.back();
    }
    
    mounted() {
        this.load = true
        this.$api.InfoService.GetInfosEvent.once((response) => {
            if (response.IsSuccess) {
                this.load = false
            } else {
                this.load = false
            }
            this.newsItem = response.Value
        })
        this.$api.InfoService.GetInfos()

        console.log("mounted");
    }

    updated() {
        console.log("updated");
        var elem = document.querySelector('.grid');
        var msnry = new Masonry(elem, {
            // options
            itemSelector: '.grid-item'
        });
    }
  
}
</script>