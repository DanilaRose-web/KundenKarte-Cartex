declare var NODE_ENV:string
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import BaseLayout from "@layouts/base-layout.vue";
import PageHome from "@pages/home/home.vue";
import PageHello from "@pages/hello/hello.vue";
import PageActivationCode from "@pages/activation-code/activation-code.vue";

import PageBalanceView from "@pages/balance-view/balance-view.vue";
import PagePaymentList from "@pages/balance-view/payment-list.vue";
import PageActivationCodeError from "@pages/activation-code/activation-code-error.vue";
import PageChooseOfTypeGifts from "@pages/choose-of-type-gifts/choose-of-type-gifts.vue";
import PageChooseOfTypeClothesBasket from "@pages/choose-of-type-clothes-basket/choose-of-type-clothes-basket.vue";
import PageChooseOfTypeGiftsInside from "@pages/choose-of-type-clothes-inside/choose-of-type-clothes-inside.vue";
import PageChooseOfTypeClothesSingle from "@pages/choose-of-type-clothes-single/choose-of-type-clothes-single.vue";

import PageEnter from "@pages/enter/enter.vue";
import PageEnterChooseUser from "@pages/enter/enter-choose-user.vue";
import PageEnterInProfile from "@pages/enter/enter-in-profile.vue";
import PageEnterUserSelected from "@pages/enter/enter-user-selected.vue";
import PageEnterWithPhone from "@pages/enter/enter-with-phone.vue";
import PageEnterWithPatternKey from "@pages/enter/enter-with-pattern-key.vue";
import PageForgotPassword from "@pages/enter/forgot-password.vue";
import PageListOfKassir from "@pages/enter/list-of-kassir.vue";
import PagePrintACode from "@pages/enter/print-a-code.vue";
import PageUserNotFound from "@pages/enter/user-not-found.vue";

import PageGetTrained from "@pages/training/get-trained.vue";
import PageGetTrainedVideo from "@pages/training/get-trained-video.vue";
import PageGetTrainedStart from "@pages/training/get-trained-start.vue";
import PageGetTrainedQuestion from "@pages/training/get-trained-question.vue";
import PageTrainedComplete from "@pages/training/trained-complete.vue";
import PageTrainedFailed from "@pages/training/trained-failed.vue";

import PageGiftCatalog from "@pages/gift-catalog/gift-catalog.vue";
import PagePatternKey from "@pages/pattern-key/pattern-key.vue";
import PagePurchaseCompleted from "@pages/purchase-completed/purchase-completed.vue";
import PageRegister from "@pages/register/register.vue";
import PageRegisterComplete from "@pages/register/register-complete.vue";
import PageErrorMessage from "@pages/error-message/error-message.vue";

import PageChangePassword from "@pages/personal-data/change-password.vue";
import PageConfirmPassword from "@pages/personal-data/confirm-password.vue";
import PageChangePhone from "@pages/personal-data/change-phone.vue";
import PageConfirmPhone from "@pages/personal-data/confirm-phone.vue";
import PageNewEmail from "@pages/new-email/new-email.vue";
import PageChangeSuccess from "@pages/personal-data/change-success.vue";

import PageProfileAndOrders from "@pages/profile-and-orders/profile-and-orders.vue";
import PageListOrders from "@pages/profile-and-orders/list-orders.vue";
import PageOrderStatus from "@pages/order-status/order-status.vue";




const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "layout", // название страницы 
      path: "", // путь, который будет указан в URL
      component: BaseLayout, // название переменной, в которой лежит шаблон страницы (в переменной указываем путь до страницы)
      children: [                
        {
            name: "", // название роутера
            path: "", // название в url
            component: PageEnterChooseUser
        },
        {
          name: "hello", // название роутера
          path: "hello", // название в url
          component: PageHello
      },
        {
            name: "activation-code", // название роутера
            path: "activation-code", // название в url
            component: PageActivationCode
        },
        {
            name:"activation-code-error", // название роутера
            path: "activation-code-error", // название в url
            component: PageActivationCodeError
        },
        {
            name:"error-message", // название роутера
            path: "error-message", // название в url
            component: PageErrorMessage
        },
        {
            name: "balance-view", // название роутера
            path: "balance-view", // название в url
            component: PageBalanceView
        },
        {
            name: "choose-of-type-gifts", // название роутера
            path: "choose-of-type-gifts/:categoryId/:categoryName", // название в url
            component: PageChooseOfTypeGifts
        },
        {
            name: "choose-of-type-clothes-basket", // название роутера
            path: "choose-of-type-clothes-basket", // название в url
            component: PageChooseOfTypeClothesBasket
        },
        {
            name: "choose-of-type-gifts-inside", // название роутера
            path: "choose-of-type-gifts-inside/:categoryId/:categoryName", // название в url
            component: PageChooseOfTypeGiftsInside
        },
        {
            name: "choose-of-type-clothes-single", // название роутера
            path: "choose-of-type-clothes-single/:id", // название в url

            component: PageChooseOfTypeClothesSingle
        },
        {
            name: "enter-choose-user", // название страницы
            path: "enter-choose-user", // название страницы, которое будет отображаться в url
            component: PageEnterChooseUser
        },
        {
            name: "enter-in-profile", // название страницы
            path: "enter-in-profile", // название страницы, которое будет отображаться в url
            component: PageEnterInProfile
        },
        {
            name: "enter-user-selected", // название страницы
            path: "enter-user-selected/:Name/:Phone", // название страницы, которое будет отображаться в url
            component: PageEnterUserSelected
        },
        {
            name: "enter-with-phone", // название роутера
            path: "enter-with-phone", // название в url
            component: PageEnterWithPhone
        },
        {
            name: "enter-with-pattern-key", // название роутера
            path: "enter-with-pattern-key", // название в url
            component: PageEnterWithPatternKey
        },
        {
            name: "forgot-password", // название роутера
            path: "forgot-password", // название в url
            component: PageForgotPassword
        },
        {
            name: "get-trained", // название роутера
            path: "get-trained", // название в url
            component: PageGetTrained
        },
        {
            name: "get-trained-video", // название роутера
            path: "get-trained-video", // название в url
            component: PageGetTrainedVideo
        },
        {
            name: "get-trained-start", // название роутера
            path: "get-trained-start", // название в url
            component: PageGetTrainedStart,
        },
        {
            name:"get-trained-question", // название роутера
            path: "get-trained-question", // название в url
            component: PageGetTrainedQuestion,
        },
        {
            name: "gift-catalog", // название роутера
            path: "gift-catalog", // название в url
            component: PageGiftCatalog
        },
        {
            name: "list-of-kassir", // название роутера
            path: "list-of-kassir", // название в url
            component: PageListOfKassir
        },
        {
            name: "enter", // название роутера
            path: "enter", // название в url
            component: PageEnter
        },
        {
            name: "pattern-key", // название роутера
            path: "pattern-key", // название в url
            component: PagePatternKey
        },
        {
            name: "payment-list", // название роутера
            path: "payment-list/:typeID/:typeName", // название в url
            component: PagePaymentList
        },
        {
            name: "print-a-code", // название роутера
            path: "print-a-code", // название в url
            component: PagePrintACode
        },
        {
            name: "purchase-completed", // название роутера
            path: "purchase-completed", // название в url
            component: PagePurchaseCompleted
        },
        {
            name: "register", // название роутера
            path: "register", // название в url
            component: PageRegister
        },
        {
            name:"register-complete", // название роутера
            path: "register-complete", // название в url
            component: PageRegisterComplete
        },
        {
            name:"user-not-found", // название роутера
            path: "user-not-found", // название в url
            component: PageUserNotFound
        },
        {
            name:"change-password", // название роутера
            path: "change-password", // название в url
            component: PageChangePassword
        },
        {
            name:"confirm-password", // название роутера
            path: "confirm-password", // название в url
            component: PageConfirmPassword
        },
        {
            name:"change-phone", // название роутера
            path: "change-phone", // название в url
            component: PageChangePhone
        },
        {
            name:"confirm-phone", // название роутера
            path: "confirm-phone", // название в url
            component: PageConfirmPhone
        },
        {
            name:"new-email", // название роутера
            path: "new-email", // название в url
            component: PageNewEmail
        },
        {
            name:"change-success", // название роутера
            path: "change-success", // название в url
            component: PageChangeSuccess
        },
        {
            name:"trained-complete", // название роутера
            path: "trained-complete", // название в url
            component: PageTrainedComplete
        },
        {
            name:"trained-failed", // название роутера
            path: "trained-failed", // название в url
            component: PageTrainedFailed
        },
        {
            name:"profile-and-orders", // название роутера
            path: "profile-and-orders", // название в url
            component: PageProfileAndOrders
        },
        {
            name:"list-orders", // название роутера
            path: "list-orders", // название в url
            component: PageListOrders
        },
        {
            name:"order-status", // название роутера
            path: "order-status/:id", // название в url
            component: PageOrderStatus
        },

      
      
      


      
        // {
        //   path: "Новости",
        //   component: EmptyLayout,
        //   children:[
        //     {
        //       name: "news",
        //       path: "",
        //       component: PageNews,
        //       meta: {
        //         title: "Новости"
        //       }
        //     },
        //     {
        //       name: "news-detail",
        //       path: ":code",
        //       component: PageNewsDetail
        //     }
        //   ]
        // },
        
      ]
    }
    // {
    //     name: loginRoute.name,
    //     path: "/" + routeLangPrefix + "/login",
    //     component: LoginComponent,
    //     meta: {
    //         allowAnonymous: true,
    //         title: "Авторизация"
    //     }
    // },
    // {
    //     name: '404',
    //     path: "*",
    //     component: LoginComponent,
    //     meta: {
    //         allowAnonymous: true,
    //         title: "Авторизация"
    //     }
    // },
  ]
});

router.beforeEach((to, from, next) => {
 // console.log(to, from, next);
  //var title = Vue.$mainStore.PageTitle;
  // if (to.meta.title) {
  //   if (title) title = `${to.meta.title} | ${title}`;
  //   else title = to.meta.title;
  // }
  // document.title = title;
  // console.log("document.head.title", document.head.title);


  // if(!Vue.$mainStore.SchoolInfo){
  //   Vue.$api.SchoolService.GetSchoolInfoEvent.once(()=>{
  //     next();
  //   });
  //   Vue.$api.SchoolService.GetSchoolInfo();
  // }
  // else
  Vue.$mainStore.setPage(to.name, to.params);
  if(NODE_ENV !=='production') {
    next();
  }
    
  
});

export default router;
