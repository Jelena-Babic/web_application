<template>
  <div class="card" style="width:500px; border: 2px">
    <div class="card-header" style="text-align: left;
    font-size: 30px;
    font-weight: bolder;
    background-color: darkseagreen">{{title}}
    <!--<span style="text-align: left;-->
    <!--font-size: 30px;-->
    <!--font-weight: bolder;-->
    <!--padding-left: 10px;-->
    <!--padding-top: 10px;">{{title}}</span>-->
    </div>
    <div class="card-body">
    <div class="row">
      <div class="col-sm-4" style="margin-top: 30px">
        <div class="container">
          <div class="row" style="padding-left: 10px">
            <span style="font-size:18px;">Status: </span>
            <span style="font-size: 23px; font-weight: bolder">{{status}}</span>
          </div>
          <div class="row" style="padding-left: 10px; padding-top: 20px">
            <span style="font-size:18px; padding-right: 100px">Limit:</span>
            <span style="font-size: 23px; font-weight: bolder">{{limit}}</span>
          </div>

          <div class="row" style="padding-left: 10px; padding-top: 20px">
            <span style="font-size:18px;">Updated:</span>
            <span style="font-size: 20px; font-weight: bolder">{{lastUpdate}}</span>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <speed-chart
          :new-value="value"
          :new-limit="limit"
          :sample-event="eventName"
          :limit-event="eventLimitName"
          style="object-position: top"></speed-chart>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import SpeedChart from './SpeedChart.vue'
  import {eventBus} from "../../main";

  export default {
    name: "DataCard",
    props: [
      'chartTitle',
      'chartValue',
      'chartStatus',
      'chartLimit',
      'chartUpdateTime',
      'limitEvent',
      'sampleEvent'
    ],
    data() {
      return {
        title: this.$props.chartTitle,
        status: this.$props.chartStatus,
        limit: this.$props.chartLimit,
        lastUpdate: this.$props.chartUpdateTime,
        value: this.$props.chartValue,
        eventName: this.$props.sampleEvent,
        eventLimitName: this.$props.limitEvent
      }
    },
    mounted() {
      console.log(this.$props);

      eventBus.$on(this.$data.eventLimitName, (data) => {
        // console.log('Data card event');
        // console.log('limit event',this.$data.eventLimitName, data.value);

        this.$data.limit = data;
      });

      // eventBus.$on(this.$data.eventName,  (data) => {
      //   console.log('Sample eventdata card ');
      //   console.log(data);
      // });

    },
    components: {
      SpeedChart
    }
  }
</script>

<style scoped>
</style>
