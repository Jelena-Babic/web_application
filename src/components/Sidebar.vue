<template>
  <div id="frame">
    <div class="sidebar">
      <nav class="sidebar sidebar-nav navbar-default">
        <a class="navbar-brand" href="/" >Chip Globe</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="nav navbar-nav">
          <li class="nav-item" @click="routeName='Dashboard'">

            <router-link to="/home" class="nav-link" activeClass="active" >
              <i class="material-icons" style="vertical-align: text-bottom; height: 20px; margin-right: 5px">
                av_timer
              </i>Dashboard</router-link>
          </li>
          <!--<li class="nav-item" @click="routeName='Time Charts'" >-->
            <!--<router-link to="/timeCharts" class="nav-link" activeClass="active" >-->
              <!--<i class="material-icons" style="vertical-align: text-bottom; height: 20px; margin-right: 5px ">-->
                <!--insert_chart-->
              <!--</i>Charts</router-link>-->
          <!--</li>-->

          <li class="nav-item" @click="routeName='Limits'">
            <router-link to="/setLimits" class="nav-link" activeClass="active" >
              <i class="material-icons" style="vertical-align: text-bottom; height: 20px; margin-right: 5px">
                settings
              </i>Limits</router-link>
          </li>

          <li class="nav-item" @click="routeName='Data Logs'">
            <router-link to="/messageLog" class="nav-link" activeClass="active">
              <i class="material-icons" style="vertical-align: text-bottom; height: 20px; margin-right: 5px">
                assignment
              </i>Logs</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <app_topbar :bar_title="routeName" style="margin-left: 190px"></app_topbar>
  </div>
</template>

<script>
  import Topbar from './Topbar.vue'
  export default {
    name: "Sidebar",
    data(){
      return{
          routeName:'Dashboard'
      }
    },
    components:{
      app_topbar: Topbar
    }

  }
</script>

<style scoped>

  .icon-align {
    vertical-align: text-bottom;
  }

  .sidebar {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 200px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #233242;
    border-color: #FFFFFF;
    border-width: thick;
  }

  .sidebar .navbar-default {
    background-color: #233242;
    border-color: #203040;
    border-width: thick;
  }

  .navbar-brand {
    text-align: left;
    margin-left: 20px;
    margin-top: 10px;
    color: #FFFFFF;
    height: 50px;
  }

  .sidebar .navbar-brand:hover, .sidebar .navbar-brand:focus {
    color: #e5dbdb;
  }

  .sidebar .navbar-text {
    text-align: right;
    color: #FFFFFF;
  }

  .sidebar .navbar-nav > li > a {
    border-left: 2px solid transparent;
    text-align: left;
    padding-left: 25px;
    color: #8E969E;
    padding-bottom: 10px;
  }

  .sidebar .navbar-nav > li > a:hover, .sidebar .navbar-nav > li > a:focus {
    border-left: 2px solid;
    border-left-color: dodgerblue;
    background-color: #1F2D3B;
    color: #FFFFFF;
  }

  .sidebar .navbar-nav > li > .dropdown-menu {
    background-color: #69899f;
  }

  .sidebar .navbar-nav > li > .dropdown-menu > li > a {
    color: #d7e2e9;
  }

  .sidebar .navbar-nav > li > .dropdown-menu > li > a:hover,
  .sidebar .navbar-nav > li > .dropdown-menu > li > a:focus {
    color: #e5dbdb;
    background-color: #425766;
  }

  .sidebar .navbar-nav > li > .dropdown-menu > li > .divider {
    background-color: #69899f;
  }

  .sidebar .navbar-toggle {
    text-align: right;
    border-color: #425766;
  }

  .sidebar .navbar-toggle:hover, .sidebar .navbar-toggle:focus {
    background-color: #425766;
  }

  .sidebar .navbar-toggle .icon-bar {
    background-color: #FF0000;
  }

  .sidebar .navbar-collapse,
  .sidebar .navbar-form {
    border-color: #d7e2e9;
  }

  .sidebar .navbar-link {
    color: #d7e2e9;
  }

  .sidebar .navbar-link:hover {
    color: #e5dbdb;
  }

  @media (max-width: 767px) {
    .sidebar .navbar-nav .open .dropdown-menu > li > a {
      color: #d7e2e9;
    }

    .sidebar .navbar-nav .open .dropdown-menu > li > a:hover, .sidebar .navbar-nav .open .dropdown-menu > li > a:focus {
      color: #e5dbdb;
    }

    .sidebar .navbar-nav .open .dropdown-menu > .active > a, .sidebar .navbar-nav .open .dropdown-menu > .active > a:hover, .sidebar .navbar-nav .open .dropdown-menu > .active > a:focus {
      color: #e5dbdb;
      background-color: #425766;
    }
  }
</style>
