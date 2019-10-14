// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMqtt from 'vue-mqtt';
import VueApexCharts from 'vue-apexcharts'
import VueMoment from 'vue-moment'
import moment from 'moment'
import VueEvents from 'vue-event-handler'
import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import './custom.scss'


Vue.use(BootstrapVue);

import Default from './layouts/Default.vue';
import NoSidebar from './layouts/NoSidebar.vue';

Vue.component('default-layout', Default);
Vue.component('no-sidebar-layout', NoSidebar);


import App from './App';
import {routes} from './routes';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

Vue.use(VueAxios,axios);


Vue.use(Vuetify, {
  iconfont: 'fa', // 'md' || 'mdi' || 'fa' || 'fa4'
  icons:{
    'dashboard': 'far fa-tachometer-alt'
  }
});

Vue.use(VueMqtt, 'ws://192.168.0.103:1884/ws',{clientId: 'WebClient-' + parseInt(Math.random()*1000)});

Vue.use(VueRouter);
Vue.use(VueApexCharts);
Vue.use(VueMoment,);

Vue.use(VueEvents);

Vue.component('apexChart', VueApexCharts);
Vue.component('moment', VueMoment);


Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'hash',
  routes
});

export const eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


