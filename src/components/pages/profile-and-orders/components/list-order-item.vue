<template>
    <div class="row history-orders-table-row p-row">
        <div class="history-orders-col history-orders-col-one">
            <div class="trans-number history-number">{{ order.ID }}</div>
        </div>
        <div class="history-orders-col history-orders-col-two">
            <div class="trans-date history-date">{{ order.Date | momentDate('DD.MM.YYYY  hh:mm') }}</div>
        </div>
        <div class="history-orders-col history-orders-col-three">
            <div class="trans-price history-price">{{ getSummOrder(order.Gifts) }}</div>
        </div>
        <div class="history-orders-col history-orders-col-four">
            <div class="trans-bonus history-bonus">{{ order.StatusName }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import GiftShortResponse from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftShortResponse";
import OrderResponse from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderResponse";

@Component({name: 'list-order-item'})
export default class ListOrderItemComponent extends Vue {
    orders: OrderResponse[] = [];
    async created() {
        this.orders = await this.$api.OrderService.getCashierOrdersAsync();
    }

    getSummOrder(gifts: GiftShortResponse[]) {
        return gifts.reduce((sum, gift) => sum + gift.CostInBonuses, 0);
    }
    
    goToOrder(orderID: number) {
        this.$router.push({name: 'order-status', params: {id: orderID.toString()}});
    }
}
</script>

<style scoped>
</style>