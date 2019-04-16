<template>
  <div style="margin-top: 20px; margin-left: 30px;padding-right: 30px ">

    <div class="row">
      <div class="span4">
        <MultipleCharts></MultipleCharts>
        <!--<chart-test ></chart-test>-->
      </div>
        <!--<MultiAxisChart-->
          <!--:height="800"-->
          <!--:width="1400"-->
          <!--:chart_title="speedChart.title"-->
          <!--:min_value="speedChart.minValue"-->
          <!--:max_value="speedChart.maxValue"-->
          <!--:sample_event="speedChart.sampleEvent"-->
          <!--:limit_event="speedChart.limitEvent">-->
        <!--</MultiAxisChart>-->

      <!--<vue-chart-->
        <!--:height="220"-->
        <!--:width="900"-->
        <!--:chart_title="chart1.title"-->
        <!--:min_value="chart1.minValue"-->
        <!--:max_value="chart1.maxValue"-->
        <!--:sample_event="chart1.sampleEvent"-->
        <!--:limit_event="chart1.limitEvent"-->
      <!--&gt;</vue-chart>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="row">-->
      <!--<vue-chart-->
        <!--:height="300"-->
        <!--:width="900"-->
        <!--:chart_title="chart2.title"-->
        <!--:min_value="chart2.minValue"-->
        <!--:max_value="chart2.maxValue"-->
        <!--:sample_event="chart2.sampleEvent"-->
        <!--:limit_event="chart2.limitEvent"></vue-chart>-->
    <!--</div>-->

    <!--<div class="row">-->
      <!--<vue-chart-->
        <!--:height="300"-->
        <!--:width="900"-->
        <!--:chart_title="chart3.title"-->
        <!--:min_value="chart3.minValue"-->
        <!--:max_value="chart3.maxValue"-->
        <!--:sample_event="chart3.sampleEvent"-->
        <!--:limit_event="chart3.limitEvent"></vue-chart>-->
    <!--</div>-->
  </div>
  </div>
</template>

<script>
  import Line from './elements/Line.vue'
  import {events, TimechartConfiguration} from "../constants";
  import MultipleCharts from './elements/MultipleCharts.vue'
  import ChartTest from './elements/ChartTest.vue'
  import {currentData} from "../deviceData";

  export default {
    name: "TimeCharts",
    data(){
      return {
        chart1: TimechartConfiguration.speedChart,
        chart2: TimechartConfiguration.temperatureChart,
        chart3: TimechartConfiguration.currentChart,

      }
    },
    components: {
      VueChart: Line,
      MultipleCharts,
      ChartTest
    },
    created(){
      console.log('Time charts create');
    },
    beforeDestroy() {
      console.log('Time charts before destroy')
    }
  }
</script>

<style scoped>

</style>
