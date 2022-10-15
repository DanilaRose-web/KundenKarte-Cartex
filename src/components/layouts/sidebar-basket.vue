<template>
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
            </div>
        </div>
    </aside>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';

    import GiftResponse from "../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse";
    import GiftRequest from "../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest";
    import CreateOrderRequest from "../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/CreateOrderRequest";
    
    @Component({name: 'sidebar-basket'})
    export default class SidebarBasketComponent extends Vue{

        orderList: GiftResponse[] = [];

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
    }
</script>

<style scoped>

</style>