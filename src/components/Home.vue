<template>
  <div id="home">
    <div class="row">
      <div class="span4" style="margin-top: 20px; margin-left: 30px;padding-right: 30px ">
        <vue_device_data :deviceID="deviceData.deviceID"
                         :chart-status="deviceData.deviceStatus"
                         :chart-value="deviceData.deviceLoad"
                         :chart-update-time="deviceData.deviceUpdateTime"
                         :load-event="deviceData.deviceLoadEvent"
                         >
        </vue_device_data>
      </div>
      <div class="span8" style="margin-top: 20px;">
        <vue_chart
          :height="380"
          :width="900"
          :chart_title="my_chart_title"
          :min_value="200"
          :max_value="800"
          :sample_event="chartSample"
          :limit_event="chartLimit"
          :sample_array="chartArray"
        ></vue_chart>
      </div>
    </div>
    <div class="row">
      <div class="span4" style="margin-top: 10px; margin-left: 30px; padding-right: 30px">
        <vue_data :chart-title="speedData.chartTitle"
                  :chart-value="speedData.chartValue"
                  :chart-status="speedData.chartStatus"
                  :chart-limit="speedData.chartLimit"
                  :chart-update-time="speedData.chartUpdateTime"
                  :limit-event="speedData.limitEvent"
                  :sample-event="speedData.sampleEvent"></vue_data>
      </div>
      <div class="span4" style="margin-top: 10px; padding-right: 30px">
        <vue_data :chart-title="temperatureData.chartTitle"
                  :chart-value="temperatureData.chartValue"
                  :chart-status="temperatureData.chartStatus"
                  :chart-limit="temperatureData.chartLimit"
                  :chart-update-time="temperatureData.chartUpdateTime"
                  :limit-event="temperatureData.limitEvent"
                  :sample-event="temperatureData.sampleEvent"></vue_data>
      </div>
      <div class="span4" style="margin-top: 10px; padding-right: 30px">
        <vue_data :chart-title="currentData.chartTitle"
                  :chart-value="currentData.chartValue"
                  :chart-status="currentData.chartStatus"
                  :chart-limit="currentData.chartLimit"
                  :chart-update-time="currentData.chartUpdateTime"
                  :limit-event="currentData.limitEvent"
                  :sample-event="currentData.sampleEvent"></vue_data>
      </div>
    </div>

  </div>
</template>

<script>
  import SpeedCard from './elements/SpeedCard.vue';
  import Line from './elements/Line.vue';
  import {eventBus} from "../main";
  import DataCard from './elements/DataCard';
  import DeviceData from './elements/DeviceData.vue';
  import {events, limitEvents, deviceValues, getValue} from "../constants";
  import {speedData} from "../deviceData";

  export default {
    name: "Home",
    components: {
      vue_speed: SpeedCard,
      vue_chart: Line,
      vue_data: DataCard,
      vue_device_data: DeviceData
    },
    data() {
      return {
        my_chart_title: 'Speed Time Chart',
        chartSample: events.speed,
        chartLimit: limitEvents.speed,
        chartArray:speedData,

        deviceData: {
          deviceID: 'MD110025',
          deviceStatus: 'Normal',
          deviceLoad: '30',
          deviceUpdateTime: '3 min ago',
          deviceLoadEvent: 'loadEvent',
        },

        speedData: {
          chartTitle: 'Speed:',
          chartValue: '80',
          chartStatus: 'Normal',
          chartLimit: getValue('Speed',deviceValues.speed),
          chartUpdateTime: '10 min ago',
          limitEvent: limitEvents.speed,
          sampleEvent: events.speed
        },

        temperatureData: {
          chartTitle: 'Temperature:',
          chartValue: '20',
          chartStatus: 'Normal',
          chartLimit: getValue('Temperature',deviceValues.temperature),
          chartUpdateTime: '10 min ago',
          limitEvent: limitEvents.temperature,
          sampleEvent: events.temperature
        },

        currentData: {
          chartTitle: 'Current:',
          chartValue: '20',
          chartStatus: 'Normal',
          chartLimit: getValue('Current',deviceValues.current),
          chartUpdateTime: '10 min ago',
          limitEvent: limitEvents.current,
          sampleEvent: events.current
        }
      }
    },
  }
</script>

<style scoped>

</style>
