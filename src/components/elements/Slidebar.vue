<template>
  <div class="row">
    <div class="col-md-5">
      <div class="col-sm">
        <h3 class="text-left" style="margin-top: 30px">Temperature Threshold</h3>
        <h5 class="text-left" style="margin-top: 50px">Current Temperature Limit: </h5>
        <div class="input-group">
          <h5 class="text-left">Set Temperature Threshold:</h5>
          <input type="number" style="margin-left: 10px" v-model="slideData">
        </div>
      </div>
      <VueSlideBar v-model="slideData"
                   :lineHeight="10"
                   :isDisabled="false"
                   :tooltip="show"
                   :tooltipStyles="{ borderColor: '#43BCCD', backgroundColor: '#43BCCD' }"
                   :processStyle="{ backgroundColor: '#43BCCD' }"

      ></VueSlideBar>
      <div class="col-sm" style="margin-top: 20px">
        <button>Set Threshold</button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar';

  export default {
    name: "Slidebar",
    components: {
      VueSlideBar
    },
    data() {
      return {
        slideData: 50
      }
    }

  }
</script>

<style scoped>

</style>
