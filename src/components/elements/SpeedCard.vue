<template>
  <div class="card" style="width: 390px; height: 380px; border: 2px;">
    <span>
      <div class="container" style="padding-left: 30px; padding-right: 15px; margin-bottom: 0px" >
        <div class="row">
          <div class="col-sm-4 " style="line-height: 10px">
        <span>
          <p style="font-weight: bolder; font-size:23px">{{speedStats.status}}</p>
          <p style="font-size: 18px">Status:</p>
        </span>
          </div>
          <div class="col-sm-3" style="line-height: 10px">
         <span>
          <p style="font-weight: bolder; font-size:23px">{{speedStats.limit}}</p>
          <p style="font-size: 18px">Limit:</p>
        </span>
          </div>
          <div class="col-sm-4" style="line-height: 10px">
         <span>
          <p style="font-weight: bolder; font-size:20px">{{speedStats.lastUpdate}}</p>
          <p style="font-size: 18px">Updated:</p>
        </span>
          </div>
        </div>
        <div class="col-sm-12" style="padding-left: 0px; padding-bottom: 15px">
          <speed-chart :motor_speed="speedStats.speed_val" style="object-position: top"></speed-chart>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
  import SpeedChart from './SpeedChart.vue'

  export default {
    name: "SpeedCard",
    data() {
      return {
        speedStats: {
          status: 'Normal',
          limit: '360',
          lastUpdate: '5 min ago',
          speed_val: 50,
        }
      }
    },
    components: {
      SpeedChart
    }
  }
</script>

<style scoped>

</style>
