<template>
    <layout> 
        <section class="profile section-bg section-full">
            <header-fixed-without-basket>Константинова З.И.</header-fixed-without-basket>
            <div class="fullwrap fullwrap-min-height" v-if="!!order">
                <div class="content content--basket">
                    <div class="container-fluid basket--container">
                        <h2 class="order-section-title">Заказ {{order.ID}}</h2>
                        <h3 class="section-title title-mb"><span>Статус:</span> {{order.StatusName}}</h3>

                        <div class="row basket-item" v-for="gift in order.Gifts" :key="gift.ID" @click="goToGift(gift.ID)">
                            <div class="col-8">
                                <div class="product-info">
                                    <div class="product-info_img"><div><img :src="gift.PhotoUrl" :alt="gift.Name"></div></div>
                                    <div class="product-info_descr">
                                        <div class="product-info_excerpt"><div>{{gift.Name}}</div></div>
                                        <div class="product-info_price">{{gift.CostInBonuses}} баллов</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 flex-col">
                                <div class="order-quantity">{{gift.Quantity}} шт.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside class="sidebar sidebar---basket">
                    <div class="fixed-wrap sidebar---basket-fixed-wrap">
                        <div class="sidebar---basket_head">
                            <div class="head-quantity">
                                <span>Количество:</span>
                                <strong>{{totalQuantity}}</strong>
                            </div>
                            <div class="head-sum">
                                <span>Сумма:</span>
                                <strong>{{totalSumm}}</strong>
                            </div>
                        </div>
                        <div class="sidebar---basket_footer">
                            <button class="product-order" @click="backToOrderList">
                                <img src="/assets/img/choose-of-type-clothes-basket/arrow-back.svg" alt="Назад">       
                                <span>Назад</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    </layout>
</template>

<script lang="ts">
import OrderResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderResponse";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({name: 'order-status'})
export default class OrderStatusComponent extends Vue {
  order: OrderResponse = null;
  async created() {
    const res = await this.$api.OrderService.getOrderAsync(parseInt(this.$route.params.id));
    this.order = res;
  }  
  backToOrderList() {
    this.$router.push({name: 'list-orders'});
  }
  /**
    *  Полная стоимость заказов в бонусах
  */
  get totalSumm() {
    if (this.order.Gifts.length == 0) {
       return '0'
    } 
    return this.order.Gifts.reduce(function(sum, current) {
       return sum + current.CostInBonuses;
    }, 0);
  }
  /**
   * Общее количество заказов 
  */
  get totalQuantity() {
    if (this.order.Gifts.length == 0) {
       return '0'
    } 
    return this.order.Gifts.reduce(function(sum, current) {
        return sum + current.Quantity;
      }, 0);
  }
  goToGift(id: number) {
    this.$router.push({name: 'choose-of-type-clothes-single', params: {id: id.toString()}});
  } 
}
</script>
<style lang="less" scoped>
    .product-info_img {
        height: 121px;
        width: 81px;
        img {
            height: 100%;
        }
    }
</style>