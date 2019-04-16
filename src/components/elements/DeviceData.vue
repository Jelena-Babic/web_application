<template>
  <div class="card" style="width:500px; border: 2px; border-style: hidden">
    <div class="card-header" style="text-align: left; font-size: 30px; font-weight: bolder; background-color: darkseagreen">
      Device Generals:
    </div>
    <!--<span style="text-align: left;-->
    <!--font-size: 30px;-->
    <!--font-weight: bolder;-->
    <!--padding-left: 10px;-->
    <!--padding-top: 10px;">Device Generals:</span>-->
    <div class="row">
      <div class="col-sm-4" style="margin-top: 30px">
        <div class="container">
          <div class="row" style="padding-left: 10px">
            <span style="font-size:18px;"> Device ID: </span>
            <span style="font-size: 23px; font-weight: bolder">{{myDeviceID}}</span>
          </div>
          <div class="row" style="padding-left: 10px; padding-top: 20px">
            <span style="font-size:18px; padding-right: 50px">Status:</span>
            <span style="font-size: 23px; font-weight: bolder">{{status}}</span>
          </div>

          <div class="row" style="padding-left: 10px; padding-top: 20px">
            <span style="font-size:18px;">Updated:</span>
            <span style="font-size: 20px; font-weight: bolder">{{lastUpdate}}</span>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <DeviceLoadChart :load="loadValue" :eventName="eventName" style="object-position: top"></DeviceLoadChart>
      </div>
    </div>
  </div>
</template>

<script>
  import DeviceLoadChart from './DeviceLoadChart.vue';
  export default {
    name: "DeviceData",
    props: [
      'deviceID',
      'chartValue',
      'chartStatus',
      'chartUpdateTime',
      'loadEvent'
    ],
    data() {
      return {
        myDeviceID: this.$props.deviceID,
        status: this.$props.chartStatus,
        lastUpdate: this.$props.chartUpdateTime,
        loadValue: this.$props.chartValue,
        eventName: this.$props.loadEvent
      }
    },
    mounted() {
      console.log(this.$props);
    },
    components: {
      DeviceLoadChart
    }
  }

</script>

<style scoped>

</style>
