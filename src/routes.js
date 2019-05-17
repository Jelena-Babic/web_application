import Home from './components/Home.vue'
import Limits from './components/Limits.vue';

export const routes = [
  {path: '/home', component: Home },
  {path:'/', redirect:'/home'},
  {path: '/setLimits', component: Limits},
];
