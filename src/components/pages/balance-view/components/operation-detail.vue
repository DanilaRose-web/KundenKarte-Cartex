<template>
        <div>
            <div class="row payment-list-table-row" v-for="item of transResponse" :key="item.ID">
                <div class="col-one">
                    <div class="trans-number">{{item.ID}}</div>
                </div>
                <div class="col-two">
                    <div class="trans-date">{{ item.Date | momentDate('DD.MM.YYYY  hh:mm') }}</div>
                </div>
                <div class="col-three">
                    <div class="trans-price">{{ item.SumInBonuses }}</div>
                </div>
                <div class="col-four">
                    <div class="trans-bonus">{{ Bonus(item.SumInBonuses) }}</div>
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
import FilterRequest from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/FilterRequest";

@Component({name: 'operation-detail'})
    export default class OperationDetail extends Vue {
        transResponse: Array<TransactionResponse> = null;
        mounted() {
            this.$api.TransactionService.GetTransactionsEvent.once((response) => {
                if (!response.IsSuccess) {
                    console.log(response.ErrorMessage);
                    return
                }
                this.transResponse = response.Value
            })
            let request: FilterRequest = new FilterRequest();
            request.Search = { FieldName: 'TypeID', SearchValue: this.$route.params.typeID };
            this.$api.TransactionService.GetTransactions();
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