<template>
  <div id="app" style="height: 945px;" >
    <component :is="layout">
    <router-view :key="$route.fullPath"></router-view>
    </component>
    <!--<app_sidebar></app_sidebar>-->
    <!--&lt;!&ndash;<app_header style="margin-left: 170px"></app_header>&ndash;&gt;-->
    <!--<div class="row">-->
      <!--<div class="col-md-12" style="margin-left: 200px;">-->
        <!--<router-view></router-view>-->
      <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
  import VueExtendLayouts from 'vue-extend-layout'
  import Sidebar from './components/Sidebar.vue'

  const default_layout ="default";

  export default {
    name: 'app',
    computed:{
      layout(){
        return (this.$route.meta.layout || default_layout) + '-layout';
      }
    },
    data() {
      return {

      }
    },
    components: {
      app_sidebar: Sidebar,
      VueExtendLayouts
    },
  }
</script>

<style>
html{
  background-color: #F2F4F5;
}

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
  }

  #content {
    margin: auto;
    width: 1024px;
    background-color: #FFFFFF;
    padding: 20px;
  }
</style>
