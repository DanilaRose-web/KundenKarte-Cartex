<template>
    <layout> 
        <section class="profile section-full section-bg-light">
            <header-fixed></header-fixed>
            
            <div class="fullwrap">
                <!-- content -->
                <div class="content content--balance-view">
                    <div class="container-fluid content-balance-view-wrap">
                        <h1 class="payment-list-title pao-main-title"><span class="title">Профиль и заказы</span></h1>
                        <div class="row pao-row">
                            <div class="pao-col pao-col-one" @click="goToOrder()">
                                <div class="orders-block">
                                    <div class="orders-img"><img src="/assets/img/profile-and-orders/orders.svg" alt="История заказов"></div>
                                    <div class="orders-title">История заказов</div>
                                    <div class="orders-info" @click="goToOrdersList()">
                                        <span>Все заказов: <strong>{{ orders.length }}</strong></span>
                                        <img src="/assets/img/profile-and-orders/arrow.svg" alt="Arrow">
                                    </div>
                                </div>
                            </div>

                            <div class="pao-col pao-col-two">
                                <div class="last-order-block" v-if="lastOrder" @click="goToOrder()">
                                    <h2 class="order-title">Последний заказ</h2>
                                    <div class="last-order">
                                        <div class="last-order-info">
                                            <div class="last-operation-number">{{ lastOrder.ID }}</div>
                                            <div class="last-oparation-date">{{ lastOrder.Date | momentDate('DD.MM.YYYY  hh:mm') }}</div>
                                        </div>

                                        <div class="last-order-sum">{{ sumOrder }}</div>
                                    </div>

                                    <ul class="last-order-descr">
                                        <li v-for="gift in lastOrder.Gifts" :key="gift.ID">{{ gift.Name }}</li>
                                    </ul>
                                    <div class="background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pao-nav">
                        <div class="container-fluid content-balance-view-wrap balance-view-row">
                            <div class="row pao-nav-row">
                                <div class="pao-nav-col">
                                    <ui-button @on-click-do="$router.push({name: 'change-password'})" class="pao-button">
                                        <template slot="icon"><img src="/assets/img/profile-and-orders/key.svg" alt="Сменить пароль"></template>Сменить пароль
                                    </ui-button>
                                </div>

                                <div class="pao-nav-col">      
                                    <ui-button @on-click-do="$router.push({name: 'change-phone'})" class="pao-button">
                                        <template slot="icon"> <img src="/assets/img/profile-and-orders/call.svg" alt="Сменить телефон"></template>Сменить телефон
                                    </ui-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <sidebar-sm>
                    <ui-sidebar-item-sm @on-click-do="$router.push({name: 'balance-view'})">
                        <img src="assets/img/enter-in-profile/heart.svg" alt="Посмотреть баланс">
                    </ui-sidebar-item-sm>

                    <ui-sidebar-item-sm @on-click-do="$router.push({name: 'gift-catalog'})">
                        <img src="/assets/img/enter-in-profile/catalog.svg" alt="Каталог подарков">
                    </ui-sidebar-item-sm>

                    <ui-sidebar-item-sm class="sidebar-item-active">
                        <img src="/assets/img/enter-in-profile/ls.svg" alt="Личные данные">
                    </ui-sidebar-item-sm>
                </sidebar-sm>
            </div>
        </section> 
    </layout>
</template>

<script lang="ts">
import OrderResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderResponse";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'profile-and-orders'})
export default class ProfileAndOrdersComponent extends Vue {
    orders: OrderResponse[] = [];
    lastOrder: OrderResponse = null;
    async created() {
        const res = await this.$api.OrderService.getCashierOrdersAsync();
        this.orders = res.filter((el, i) => i < 20);
        if (this.orders.length > 0) {
            this.lastOrder = this.orders[0];
        }
    }
    goToOrdersList() {
        this.$router.push({name: 'list-orders'});
    }
    goToOrder() {
        this.$router.push({name: 'order-status', params: {id: this.lastOrder.ID.toString()}});
    }
    get sumOrder() {
        return this.lastOrder.Gifts.reduce(function(sum, current) {
            return sum + current.CostInBonuses;
        }, 0); 
    }
}
</script>