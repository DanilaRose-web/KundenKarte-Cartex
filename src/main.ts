import Vue from "vue"

import './extensions/String.endsWith'
import './extensions/Array.find'
import './register-router-hooks'
import './register-components'
import './register-directives'
import app from './components/app.vue'


import api from './api/motivation/dataSource/api/apiDataSource.plugin'
declare var ApiUrl:string //вебпак заменит на нужное значение при сборке
Vue.use(api,ApiUrl);


import mainStore from './plugins/mainStore'
Vue.use(mainStore);

import posStore from './plugins/PosStore/PosStore'
Vue.use(posStore);

import domPlugin from './plugins/DomPlugin'
Vue.use(domPlugin);

import appStore from './plugins/AppStore/AppStore'
Vue.use(appStore);

import "./filters/moment";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    orders: [],
    currentCategory: null,
    currentUserName: null
  },
  mutations: {
    addOrderItem(state, order) {
      state.orders.push(order);
    },
    saveCategory(state, category) {
      state.currentCategory = category
    },
    saveCurrentUser(state, name) {
      state.currentUserName = name
    }
  },
  getters: {
    returnOrder(state) {
      return state.orders;
    },
    returnCurrentCategory(state) {
      return state.currentCategory
    },
    returnCurrentUser(state) {
      return state.currentUserName
    }
  }
});

const moment = require('moment')
moment.locale('ru');
Vue.use(require('vue-moment'),{
    moment
});

// import { Component } from "vue-property-decorator";
// Component.registerHooks([
//     "beforeRouteEnter",
//     "beforeRouteLeave",
//     "beforeRouteUpdate",
// ])



import router from './router'

const v = new Vue({
    el: "#app",
    router: router,
    store: store,
    template: `<app/>`,
    components: { app }
});


//console.dir(Vue)