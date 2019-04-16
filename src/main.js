// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMqtt from 'vue-mqtt';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import VueApexCharts from 'vue-apexcharts'
import VueMoment from 'vue-moment'
import moment from 'moment'
import VueEvents from 'vue-event-handler'

import Default from './layouts/Default.vue';
import NoSidebar from './layouts/NoSidebar.vue';

// import VueCharts from 'vue-chartsjs-es6';
// import 'chartjs-plugin-streaming';

Vue.component('default-layout', Default);
Vue.component('no-sidebar-layout', NoSidebar);



import App from './App';
import {routes} from './routes';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DeviceData from "./components/elements/DeviceData";

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});


Vue.use(Vuetify, {
  iconfont: 'fa', // 'md' || 'mdi' || 'fa' || 'fa4'
  icons:{
    'dashboard': 'far fa-tachometer-alt'
  }
});

Vue.use(VueMqtt, 'ws://mosquitto.test:1884/ws',{clientId: 'WebClient-' + parseInt(Math.random()*1000)});
Vue.use(VueFire);

Vue.use(VueRouter);
Vue.use(VueApexCharts);
Vue.use(VueMoment,);

Vue.use(VueEvents);

// Vue.use(VueCharts);

// Vue.component('chart', Chart);
//
// Vue.component('vueCharts', VueCharts);
Vue.component('apexChart', VueApexCharts);
Vue.component('moment', VueMoment);


Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes
});

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//
//   if (requiresAuth && !currentUser) next('login');
//   else if (!requiresAuth && currentUser) next('/');
//   else next()
// });


var config = {
  apiKey: "AIzaSyDW4Dy3ZzzkCmyowbmq9srztN44TusMxS0",
  authDomain: "server-data-7a7f6.firebaseapp.com",
  databaseURL: "https://server-data-7a7f6.firebaseio.com",
  projectId: "server-data-7a7f6",
  storageBucket: "server-data-7a7f6.appspot.com",
  messagingSenderId: "266989585348"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

export const eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


