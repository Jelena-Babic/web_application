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
      <div class="col-sm-4" >
        <!-- style="margin-top: 30px" -->
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
            <span style="font-size: 19px; font-weight: bolder;">{{lastUpdate}}</span>
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

  export default {
    name: "DataCard",
    props:{data:Object},
    data() {
      return {
        title: this.$props.data.chartTitle,
        status: this.$props.data.chartStatus,
        limit: this.$props.data.chartLimit,
        lastUpdate: this.$props.data.chartUpdateTime,
        value: this.$props.data.chartValue,
        eventName: this.$props.data.sampleEvent,
        eventLimitName: this.$props.data.limitEvent
      }
    },
    mounted() {
     // console.log('data card props',this.$props.data);

      this.$events.$on(this.$data.eventLimitName, (data) => {
        // console.log('Data card event');
         console.log('limit event',this.$data.eventLimitName, data.value);

        this.$data.limit = data;
      });

      this.$events.$on(this.$data.eventName,  (data) => {
       // console.log('Sample event data card ');
       // console.log(data);
        // var date1 = this.$data.lastUpdate;
        // var date2 =this.$moment(data.x);
        // var diff = date2.diff(date1, 'seconds');
        // console.log(diff);
        this.$data.lastUpdate=data.date;
        this.$data.value = data.value;
        this.$data.status = data.status;
        this.$data.limit = data.limit;
      });

    },
    components: {
      SpeedChart
    }
  }
</script>

<style scoped>
</style>
