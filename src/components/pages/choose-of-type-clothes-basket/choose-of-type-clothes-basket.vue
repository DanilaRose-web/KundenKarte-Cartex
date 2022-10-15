<template>
    <layout> 
        <section class="profile section-bg section-full">
            <header-fixed>
                <ui-basket />
            </header-fixed>
            
            <div class="fullwrap fullwrap-min-height">
                <div class="content content--basket pb-2">
                    <div class="container-fluid basket--container">
                        <h2 class="order-section-title">Ваш заказ</h2>
                        <div class="row basket-item" v-for="order in orderList" :key="order.ID">
                            <div class="col-8" @click="goToGift(order.ID)">
                                <div class="product-info">
                                    <div class="product-info_img"><div><img :src="order.PhotoUrls[0]" :alt="order.Name"></div></div>
                                    <div class="product-info_descr">
                                        <div class="product-info_excerpt"><div>{{ order.Name }}</div></div>
                                        <div class="product-info_price">{{ order.CostInBonuses}} баллов</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="amount">
                                    <div class="minus" @click="subtractOne(order.ID)">
                                        <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.158203" y="0.456787" width="25.7439" height="5.14879" rx="2" fill="#90A4AF"/>
                                        </svg>                                       
                                    </div>
                                    <input type="number"  class="amount-input" :value="order.Quantity">
                                    <div class="plus" @click="addOne(order.ID)">
                                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1866 2.15918C16.1866 1.05461 15.2912 0.15918 14.1866 0.15918L13.0378 0.15918C11.9332 0.15918 11.0378 1.05461 11.0378 2.15918V10.4568H2.74023C1.63566 10.4568 0.740234 11.3522 0.740234 12.4568V13.6055C0.740234 14.7101 1.63566 15.6055 2.74023 15.6055H11.0378V23.9031C11.0378 25.0077 11.9332 25.9031 13.0378 25.9031H14.1866C15.2912 25.9031 16.1866 25.0077 16.1866 23.9031V15.6055H24.4842C25.5887 15.6055 26.4842 14.7101 26.4842 13.6055V12.4568C26.4842 11.3522 25.5887 10.4568 24.4842 10.4568H16.1866V2.15918Z" fill="#90A4AF"/>
                                        </svg>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside class="sidebar sidebar---basket">
                    <div class="fixed-wrap sidebar---basket-fixed-wrap">
                        <div class="sidebar---basket_head">
                            <div class="head-quantity">
                                <span>Количество:</span>
                                <strong>{{ totalQuantity }}</strong>
                            </div>
                            <div class="head-sum">
                                <span>Сумма:</span>
                                <strong>{{ totalSumm }}</strong>
                            </div>
                        </div>
                        <div class="sidebar---basket_footer">
                            <ui-button class="product-order" @on-click-do="makeOrder()" >
                                <template slot="icon"><img src="/assets/img/choose-of-type-clothes-single/order.svg" alt="Order"></template>Заказать
                            </ui-button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import OrderItem from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderItem";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import GiftResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse";
import GiftRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest";
import CreateOrderRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/CreateOrderRequest";

@Component({name: 'choose-of-type-clothes-basket'})
export default class ChooseOfTypeClothesBasketComponent extends Vue {
   orderList: GiftResponse[] = [];
   load: boolean = false

    created() {
       this.orderList = this.$store.getters.returnOrder;
    }
    /**
     *  Полная стоимость заказов в бонусах
    */
    get totalSumm() {
        if (this.orderList.length == 0) {
            return '0'
        } 
        return this.orderList.reduce(function(sum, current) {
            return sum + current.CostInBonuses;
        }, 0);
    }
    /**
     * Общее количество заказов 
    */
    get totalQuantity() {
        if (this.orderList.length == 0) {
            return '0'
        } 
        return this.orderList.reduce(function(sum, current) {
            return sum + current.Quantity;
        }, 0);
    }
    goToGift(id: number) {
        this.$router.push({name: 'choose-of-type-clothes-single', params: {id: id.toString()}});
    } 
    subtractOne(id: number) {
        const item: GiftResponse = this.orderList.find(order => order.ID == id);
        if (item.Quantity > 1) {
            item.Quantity--;
        }
    }
    addOne(id: number) {
        const item: GiftResponse = this.orderList.find(order => order.ID == id);
        item.Quantity++;
    }
    async makeOrder() {
        this.load = true
        let request: CreateOrderRequest = new CreateOrderRequest();
        request.OrderItems = this.orderList.map(order => {
            let orderModel: OrderItem = new OrderItem();
            orderModel.GiftID = order.ID;
            orderModel.Quantity = order.Quantity;
            return orderModel
        })
        const res = await this.$api.OrderService.createOrderAsync(request);
        if (!!res) {
            this.load = false
            this.$router.push({name: 'purchase-completed'});
        } else {
            this.load = false
        }
    }
}
</script>
<style lang="less" scoped>
    .basket--container {
        margin-bottom: 20px;
    }
</style>