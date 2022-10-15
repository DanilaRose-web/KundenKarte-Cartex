<template>
    <layout> 
        <section class="profile section-bg section-full">
            <header-fixed>
                <ui-basket />
            </header-fixed>

            <div class="fullwrap fullwrap-min-height">
                <!-- content -->
                <div class="content content--balance-view">
                    <div class="container-fluid content-balance-view-wrap">
                        <h1 class="payment-list-title">
                            <span class="title">{{$route.params.typeName}}</span>
                            <span class="date">{{new Date() | moment('DD MMMM YYYY')}}</span>
                            <strong>POS{{$posStore.getPosCode()}}</strong>
                        </h1>
                        <div class="payment-list-table" v-if="!!transResponse">
                            <div class="row payment-list-table-row row-static">
                                <div class="col-one">
                                    <div class="trans-number-title">№ транзакции</div>
                                </div>
                                <div class="col-two">
                                    <div class="trans-date-title">Дата и время</div>
                                </div>
                                <div class="col-three">
                                    <div class="trans-price-title">Сумма, &euro;</div>
                                </div>
                                <div class="col-four">
                                    <div class="trans-bonus-title">Бонус, &euro;</div>
                                </div>
                            </div>
                                <operation-detail />
                            </div>
                        </div>
                    </div>
                </div>
                
                <sidebar-sm>
                    <ui-sidebar-item-sm class="sidebar-item-active" @on-click-do="$router.push({name: 'balance-view'})">
                        <img src="assets/img/enter-in-profile/heart.svg" alt="Посмотреть баланс">
                    </ui-sidebar-item-sm>

                    <ui-sidebar-item-sm @on-click-do="$router.push({name: 'gift-catalog'})">
                        <img src="/assets/img/enter-in-profile/catalog.svg" alt="Каталог подарков">
                    </ui-sidebar-item-sm>

                    <ui-sidebar-item-sm>
                        <img src="/assets/img/enter-in-profile/ls.svg" alt="Личные данные">
                    </ui-sidebar-item-sm>
                </sidebar-sm>
        </section> 

        <preloader v-if="load" />
    </layout>
</template>
<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import TransactionResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TransactionService/TransactionResponse"
    import FilterRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/FilterRequest";

    @Component({name: 'payment-list'})
    export default class PaymentListComponent extends Vue {

        load: boolean = false
        transResponse: WsResponseModel<Array<TransactionResponse>> = null;

        mounted() {
            this.load = true
            this.$api.TransactionService.GetTransactionsEvent.once((response) => {
                if (!response.IsSuccess) {
                    this.load = false
                    console.log(response.ErrorMessage);
                    return
                } else {
                    this.load = false
                }
                this.transResponse = response
            })
            let request: FilterRequest = new FilterRequest();
            request.Search = { FieldName: 'TypeID', SearchValue: this.$route.params.typeID };
            this.$api.TransactionService.GetTransactions(request);
        }
    }
</script>