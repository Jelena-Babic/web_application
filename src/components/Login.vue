<template>
  <div class="login" style="margin-top: 200px">
    <h1 style="font-weight: bolder; font-size: 50px; color: darkseagreen">CHIP GLOBE</h1>
    <h1 style="font-weight: bolder; font-size: 50px; margin-top: 30px">Welcome to Demo Project</h1>



    <div class="col-lg-4 offset-lg-4" style=" margin-top: 60px;">
      <div class="input-group mb-3" style="width: 400px; font-size: 20px; ">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Email:</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          v-model="email"
        >
      </div>

        <div class="input-group mb-3" style="width: 400px;; font-size: 20px">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Password:</span>
          </div>
          <input type="password"
                 class="form-control"
                 aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-default"
                 v-model="password">
        </div>

      <div class="row">
    <button class="btn btn-primary col-lg-4 offset-lg-5"
             type="button"
             @click="login"
             style="
            margin-right: 10px;
            font-size: 25px;
            background-color: cadetblue;
            border-color: cadetblue">Log In
      </button>

      <!--<button class="btn btn-primary col-lg-4 "-->
              <!--type="button"-->
              <!--@click="signup"-->
              <!--style="-->
              <!--margin-left: 10px;-->
            <!--font-size: 25px;-->
            <!--background-color: steelblue;-->
            <!--border-color: steelblue">Sign Up-->
      <!--</button>-->
      </div>

    </div>
  </div>
</template>

<script>

  import firebase from 'firebase'

  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        console.log('login');
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          console.log('go to home route');
          this.$router.replace('/home')
        }).catch((err) => {
          alert(err.message)
        })
      },
      signup() {
        console.log('sign up');
        this.$router.replace('/signup');
      }
    }
  }
</script>

<style scoped>

</style>
