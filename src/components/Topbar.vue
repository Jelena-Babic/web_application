<template>
  <nav class="navbar navbar-default navbar-light ">
    <div class="navbar-brand" style="font-family: sans-serif; font-size: 25px; font-weight: bolder ">{{bar_title}}</div>
    <form class="form-inline ">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:@click="logout">Logout</button>
    </form>
  </nav>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: "Topbar",
    props:['bar_title'],
    data() {
      return {

    }
    },
    methods:{
      logout(){
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        });
      }
    }
  }
</script>

<style scoped>
  .navbar-default {
    background-color: #FFFFFF;
    border-color: #203040;
    border-width: thick;
  }

  .navbar-default .navbar-brand {
    color: #000000;
  }
  .navbar-default .navbar-text {
    color: #FFFFFF;
  }
</style>
