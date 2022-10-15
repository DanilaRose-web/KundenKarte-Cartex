<template>
    <div>
        <div class="row last-operation-table-item" v-for="item of transResponse" :key="item.ID">
            <div class="col-6">
                <div class="last-operation-number">{{item.ID}}</div>
                <div class="last-oparation-date">{{item.Date | momentDate('DD.MM.YYYY  hh:mm')}}</div>
            </div>
            <div class="col-3">
                <div class="last-operation-price">{{item.SumInBonuses}}&euro;</div>
                </div>
            <div class="col-3">
                <div class="last-operation-totalprice">{{Bonus(item.SumInBonuses)}}&euro;</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

import WsResponseModel from "../../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
import TransactionResponse from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TransactionService/TransactionResponse"

@Component({name: 'last-operation'})
export default class LastOperation extends Vue {
    transResponse: Array<TransactionResponse> = null;

    mounted() {
        this.$api.TransactionService.GetTransactionsEvent.once((response) => {
            if (response.IsSuccess) {}
            this.transResponse = response.Value
        })
        this.$api.TransactionService.GetTransactions({
            Search: null,
            Sort: null
        })
    }

    Bonus(item:number) {
        if (!item) {
            return 0
        }
        return (item / 100).toFixed(4)
    }
}
</script>

<style scoped>
</style>