<template>
    <layout> 
        <section class="section-bg">
            <header-fixed>
                <ui-basket />
            </header-fixed>

            <div class="fullwrap fullwrap-min-height">
                <div class="content content--balance-view">
                    <div class="container-fluid content-balance-view-wrap balance-view-row">
                        <div class="row">
                            <div class="col-6 overflow-col">
                                <h2 class="balance-view-title">Просмотр баланса</h2>
                                <h3 class="balance-view-subtitle">
                                    <div class="balance-view-date">{{new Date() | moment('DD MMMM YYYY')}}</div>
                                    <strong class="balance-view-number">POS{{$posStore.getPosCode()}}</strong>
                                </h3>
                                
                                <div v-if="transTotalInfo">
                                    <div class="balance-operation">
                                        <div class="balance-operation-item" v-for="item of transTotalInfo" :key="item.TypeID" @click="goToOperationDetail(item.TypeID, item.TypeName)">
                                            <h4 class="balance-operation-title">{{ item.TypeName }}</h4>
                                            <div class="balance-operation-price">{{ item.Bonuses }}&euro;</div>
                                        </div>
                                    </div> 
                                    
    
                                    <div class="total-oparation">
                                        <div class="h4 total-oparation-title">Итого:</div>
                                        <div class="total-oparation-price">{{ total }}&euro;</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="last-operation">
                                    <h5 class="last-operation-title">Последние операции</h5>
                                       <template v-if="transResponse">
                                        <div class="last-operation-table">
                                            <last-operation />
                                        </div>
                                    </template>
                                </div>
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
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import TransTotalInfoResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TransactionService/TranTotalInfoResponse"
    import TransactionResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TransactionService/TransactionResponse"
    // import { AppStore } from "src/plugins/AppStore/AppStore";


    @Component({name: 'balance-view'})
    export default class BalanceViewComponent extends Vue {
        transTotalInfo: Array<TransTotalInfoResponse> = null;
        transResponse: Array<TransactionResponse> = null;
        load: boolean = false

        mounted() {   
            this.load = true
            this.$api.TransactionService.GetTotalInfoEvent.once((response) => {
                if (!response.IsSuccess) {
                    this.load = false
                    console.log(response.ErrorMessage);
                    return
                } else {
                    this.load = false
                }
                this.transTotalInfo = response.Value
            })
            this.$api.TransactionService.GetTotalInfo()
            this.$api.TransactionService.GetTransactionsEvent.once((response) => {
                if (!response.IsSuccess) {
                     this.load = false
                    console.log(response.ErrorMessage);
                    return
                } else {
                     this.load = false
                }
                this.transResponse = response.Value
            })
            this.$api.TransactionService.GetTransactions(
                
            )
        } 
        get total() {
            if (!!this.transTotalInfo) {
                return this.transTotalInfo.reduce(function(sum, current) {
                    return sum + current.Bonuses;
                }, 0); 
            } else {
                return '0'
            }
        }

        goToOperationDetail(typeId: number, typeName: string) {
            console.log(typeId);
            this.$router.push({name: 'payment-list', params: {typeID: typeId.toString(), typeName: typeName}});    
        }
    }
</script>