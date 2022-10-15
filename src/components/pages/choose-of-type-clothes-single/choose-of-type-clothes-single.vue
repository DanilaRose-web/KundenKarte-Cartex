<template>
    <layout> 
        <section class="section-bg section-full">
            <header-fixed>
                <ui-basket />
            </header-fixed>
            <div class="content-wrap">
                <div class="container-fluid type-clothes--container content--type-clothes">
                    <h2 class="section-single-title">{{gift.Name}}</h2>
                    <div class="content-block">
                        <div class="row content-row">
                            <div class="type-clothes-single-col slider-product">
                                <!-- <div class="main-image-block"  v-if="currentImage">
                                   <img :src="currentImage.image" id="mainImage" :alt="gift.GiftCategoryName"> 
                                </div> -->
                                <!-- <simple-slider :slides="images" @onSelectSlide="onSelectSlide"></simple-slider> -->

                                <div class="slider-for">
                                    <div class="slide-for" v-for="item of gift.PhotoUrls" :key="item.ID"><img :src="item" alt="Платье"></div>
                                    <!-- <div class="slide-for"><img :src="images" alt="Платье"></div>
                                    <div class="slide-for"><img :src="images" alt="Платье"></div>
                                    <div class="slide-for"><img :src="images" alt="Платье"></div>
                                    <div class="slide-for"><img :src="images" alt="Платье"></div>
                                    <div class="slide-for"><img :src="images" alt="Платье"></div> -->
                                </div>

                                <div class="slider-nav">
                                    <div class="slide-nav" v-for="item of gift.PhotoUrls" :key="item.ID"><img :src="item" alt="Платье"></div>
                                    <!-- <div class="slide-nav"><img :src="images" alt="Платье"></div>
                                    <div class="slide-nav"><img :src="images" alt="Платье"></div>
                                    <div class="slide-nav"><img :src="images" alt="Платье"></div>
                                    <div class="slide-nav"><img :src="images" alt="Платье"></div>
                                    <div class="slide-nav"><img :src="images" alt="Платье"></div> -->
                                </div>
                            </div>
                            <div class="type-clothes-single-col product-content">
                                <div class="product-content_head" v-if="!giftInBasket">
                                    <div class="product-prise">{{gift.CostInBonuses}}</div>

                                    <ui-button @on-click-do="makeOrder()" class="product-order">
                                        <template slot="icon"><img src="/assets/img/choose-of-type-clothes-single/order.svg" alt="Order"></template>Заказать
                                    </ui-button>
                                </div>
                                <div class="product-content_head" v-else>
                                    <div class="product-prise-two" :class="{ 'littleBonuses': isLitleBonuses }">{{bonuses}}</div>

                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55228 13.3333H25V10.6666H5.55228L13.9428 2.27612L12.0572 0.390503L0.447716 12L12.0572 23.6095L13.9428 21.7238L5.55228 13.3333Z" fill="#152338"/>
                                    </svg>
                                        
                                    <div class="product-size active">{{ gift.CostInBonuses }}</div>

                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4477 13.3333H0V10.6666H19.4477L11.0572 2.27612L12.9428 0.390503L24.5523 12L12.9428 23.6095L11.0572 21.7238L19.4477 13.3333Z" fill="#152338"/>
                                    </svg>  

                                    <div class="product-prise-two">{{bonuses - gift.CostInBonuses}}</div>
                                </div>

                                <div class="product-content_body">
                                    <div class="product-article">Артикул: # {{gift.SKU}}</div>
                                    <div class="product-descr">
                                        {{gift.Description}}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
import GiftRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftRequest";
import GiftResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/GiftService/GiftResponse";
import { Vue, Component, Watch } from "vue-property-decorator";
import SlideModel from "./models/slide-model";
import OrderItem from "../../../../../kko-pos-vue/src/api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/OrderService/OrderItem";
import { set } from "vue/types/umd";

@Component({name: 'choose-of-type-clothes-single'})
    export default class ChooseOfTypeClothesSingleComponent extends Vue {

        load: boolean = false

        @Watch('$route', { immediate: true, deep: true })
        onUrlChange(newVal: any) {
            
        }

    // getGift: GiftResponse = null

    /**
     * Модель товара 
     */
    gift: GiftResponse = new GiftResponse();

    /**
     *  Текущий выбранны слайд
     */
    currentImage: SlideModel = null;
    /**
     * Подготовка слайдов 
     */
    images: SlideModel[] = [];

    giftInBasket = false;
    bonuses = 0;
    get isLitleBonuses() {
        this.load = true
        if (!!this.gift.CostInBonuses && (this.bonuses - this.gift.CostInBonuses < 0)) {
            this.load = false
            return true;
        } else {
            this.load = false
            return false;
        }
    }
    async mounted() {
        let request: GiftRequest = new GiftRequest();
        const res = await this.$api.GiftService.getGiftAsync(Number(this.$route.params.id));
        this.gift = res;
        
        /**
         * Эта часть будет переделана когда доработает добавление изображений 
        */
        // this.images.push({id: this.gift.ID, image: this.gift.PhotoUrl, sortID: 1});
        // this.images.push({id: this.gift.ID, image: this.gift.PhotoUrl, sortID: 2});
        // this.images.push({id: this.gift.ID, image: this.gift.PhotoUrl, sortID: 3});
        // this.images.push({id: this.gift.ID, image: this.gift.PhotoUrl, sortID: 4});
        // this.images.push({id: this.gift.ID, image: this.gift.PhotoUrl, sortID: 5});
        // this.images[1].image = this.gift.PhotoUrl;
        /**
         *  end
        */
        // this.currentImage = this.images[0];
    
        // let orders: GiftResponse[] = this.$store.getters.returnOrder;
        // this.bonuses = await this.$api.TransactionService.getTotalBonusesAsync();
        // orders.forEach(order => {
        //     if (order.ID != this.gift.ID) {
        //         this.bonuses = this.bonuses - order.CostInBonuses;
        //     }
        // })
        // if (!!orders.find(el => el.ID == this.gift.ID)) {
        //     this.giftInBasket = true;
        // }

        
    }

    updated() {
        console.log("updated");
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3.98,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            vertical: true,
            verticalSwiping: true
        });  
    }

    
    // onSelectSlide(id: number) {
    //     let el = document.getElementById('mainImage');
    //     el.classList.add('delete-img')
    //     setTimeout(() => {
    //         el.classList.remove('delete-img');
    //     }, 2000)
    //     this.currentImage = this.images.find(el => el.id == id);   
    //     el.classList.add('add-img');
    //     setTimeout(() => {
    //         el.classList.remove('add-img');
    //     }, 2000);
    // }
    makeOrder() {
        const giftForOrder = this.gift;
        giftForOrder.Quantity = 1;  
        this.$store.commit("addOrderItem", this.gift);
        this.giftInBasket = true;
    }
    }
</script>
<style lang="less" scoped>
.content-wrap {
    .main-image-block {
        width: 384px;
        height: 576px;
        margin-right: 26px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .product-prise-two.littleBonuses {
        color: #b06767;
    }
    .slider-product {
        justify-content: space-between;
    }
    .content-row {
        height: 564px;
        overflow: hidden;
        overflow-y: auto;
    }
    .delete-img {
        -webkit-animation-name: heightMinus;
        /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 2s;
        /* Safari 4.0 - 8.0 */
        animation-name: heightMinus;
        animation-duration: 2s;
    }
    .add-img {
        -webkit-animation-name:  heightPlus;
        /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 2s;
        /* Safari 4.0 - 8.0 */
        animation-name: heightPlus;
        animation-duration: 2s;
    }
     @keyframes heightMinus {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
     @keyframes heightPlus {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>