<template>
    <layout> 
        <section class="profile section-bg section-full">
            <header-fixed-without-basket>Константинова З.И.</header-fixed-without-basket>
            <div class="fullwrap fullwrap-min-height">
                <!-- content -->
                <div class="content content--balance-view">
                    <div class="container-fluid content-balance-view-wrap">
                        <h1 class="payment-list-title">
                            <span class="title">История заказов</span>
                        </h1>

                        <div class="payment-list-table">
                            <div class="row payment-list-table-row p-row row-min-margin">
                                <div class="history-orders-col history-orders-col-one">
                                    <div class="trans-number-title">№ заказа</div>
                                </div>
                                <div class="history-orders-col history-orders-col-two">
                                    <div class="trans-date-title">Дата и время</div>
                                </div>
                                <div class="history-orders-col history-orders-col-three">
                                    <div class="trans-price-title">Сумма</div>
                                </div>
                                <div class="history-orders-col history-orders-col-four">
                                    <div class="trans-bonus-title">Статус</div>
                                </div>
                            </div>
                            
                            <div class="payment-list-table-scroll">
                                <div class="border-r" v-for="order in orders" :key="order.ID" @click="goToOrder(order.ID)">
                                    <list-order-item />
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
import Vue from "vue";
import GiftShortResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftShortResponse";
import { Component } from "vue-property-decorator";
import OrderResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderResponse";

@Component({name: 'list-orders'})
export default class ListOrdersComponent extends Vue {
    orders: OrderResponse[] = [];
    // async created() {
    //     this.orders = await this.$api.OrderService.getCashierOrdersAsync();
    // }
    // getSummOrder(gifts: GiftShortResponse[]) {
    //     return gifts.reduce((sum, gift) => sum + gift.CostInBonuses, 0);
    // }
    // goToOrder(orderID: number) {
    //     this.$router.push({name: 'order-status', params: {id: orderID.toString()}});
    // }
}
</script>