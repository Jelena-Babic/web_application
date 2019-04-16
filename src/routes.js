import Home from './components/Home.vue'
import Limits from './components/Limits.vue';
import TimeCharts from './components/TimeCharts.vue';
import MessageLog from './components/MessageLog.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';


// export const routes = [
//    {path: '/home', component: Home, meta: {requiresAuth: true} },
//   {path: '/', redirect: '/login',},
//   {path: '/login', component: Login,  meta: {layout: 'no-sidebar'}},
//   {path:'/signup', component: Signup,  meta: {layout: 'no-sidebar'}},
//   {path: '/setLimits', component: Limits, meta: {requiresAuth: true} },
//   {path: '/timeCharts', component: TimeCharts, meta: {requiresAuth: true} },
//   {path:'/messageLog', component: MessageLog, meta: {requiresAuth: true} }
// ];

export const routes = [
  {path: '/home', component: Home },
  {path:'/', redirect:'/home'},
  {path: '/login', component: Login,  meta: {layout: 'no-sidebar'}},
  {path:'/signup', component: Signup,  meta: {layout: 'no-sidebar'}},
  {path: '/setLimits', component: Limits},
  {path: '/timeCharts', component: TimeCharts },
  {path:'/messageLog', component: MessageLog }
];
