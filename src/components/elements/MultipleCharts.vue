<template>
  <div id="MultipleCharts">
    <div class="row">
      <div class="span4">
        <apexChart
          ref="speedChart"
          type="area"
          :height="220"
          :width="900"
          :options="chartOptions1"
          :series="series1">
        </apexChart>
      </div>
    </div>

    <div class="row">
      <apexChart
        ref="temperatureChart"
        type="area"
        :height="300"
        :width="1000"
        :options="chartOptions2"
        :series="series2">
      </apexChart>

      <div class="row">
        <apexChart
          ref="currentChart"
          type="area"
          :height="300"
          :width="1000"
          :options="chartOptions3"
          :series="series3">
        </apexChart>
      </div>
    </div>
  </div>
</template>

<script>
  import {TimechartConfiguration, events} from '../../constants';
  import {eventBus} from '../../main';
  import {speedData, currentData, temperatureData} from "../../deviceData";

  var lastDate = 0;
  var speed_data = speedData;
  var current_data = currentData;
  var temperature_data = temperatureData;

  function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
      var x = baseval;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      speed_data.push({x, y});
      current_data.push({x, y});
      temperature_data.push({x, y});

      lastDate = baseval;
      baseval += 1;
      i++;
    }
  }

  // getDayWiseTimeSeries(0, 20, {
  //   min: 24.5,
  //   max: 24.5,
  // });

  function pushSpeedSample(sample_value) {
  //  speed_data.splice(0, 1);
    speed_data.push(sample_value);
  }

  function pushCurrentSample(sample_value) {
   // current_data.splice(0, 1);
    current_data.push(sample_value);
  }

  function pushTemperatureSample(sample_value) {
  //  temperature_data.splice(0, 1);
    temperature_data.push(sample_value);
  }

  var chartOptions = {
    chart: {
      toolbar: {
        show: false
      },
      background: '#fff',
    },
    colors: ['#43BCCD'],
    xaxis: {
      type: 'category',
      labels: {
        trim: true,
        show: true,
        offsetX: 0,
        offsetY: -5,
      },
      range: 27000,
      tickAmount: 20,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        offsetX: 15
      }
    },
    yaxis: {
      decimalsInFloat: 2,
      tickAmount: 10,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        offsetX: -2
      }
    },
    grid: {
      padding: {
        left: 0,
        right: 20
      },
      position: 'front',
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip:{
      enabled:true,
      y:{
        show:true
      }
    }
  }


  export default {
    name: "MultipleCharts",

    data() {
      return {
        series1: [{
          name: 'Speed',
          data: speed_data.slice()
        }],
        series2: [{
          name: 'Temperature',
          data: temperature_data.slice()
        }],
        series3: [{
          name: 'Current',
          data: current_data.slice()
        }],

        chartOptions1: chartOptions,
        chartOptions2: chartOptions,
        chartOptions3: chartOptions,
      }
    },
    mounted() {

      this.$refs.speedChart.updateOptions({
        title: {
          text: 'Speed Chart [rpm]',
          margin: 5,
          style: {
            fontSize: '25px'
          }
        }
      });

      this.$refs.currentChart.updateOptions({
        title: {
          text: 'Current Chart [mA]',
          margin: 5,
          style: {
            fontSize: '25px'
          }
        }
      });

      this.$refs.temperatureChart.updateOptions({
        title: {
          text: 'Temperature Chart [Celsius]',
          margin: 5,
          style: {
            fontSize: '25px'
          }
        }
      });


      this.$events.on(events.speed, (data) => {
        pushSpeedSample(data);
        this.$refs.speedChart.updateSeries([{
          data: speed_data
        }]);
       // console.log(speed_data);
      });
      this.$events.on(events.current, (data) => {
        pushCurrentSample(data);
        this.$refs.currentChart.updateSeries([{
          data: currentData
        }]);
        //console.log(current_data);
      });
      this.$events.on(events.temperature, (data) => {
        pushTemperatureSample(data);
        this.$refs.temperatureChart.updateSeries([{
          data: temperatureData
        }]);
        //console.log(temperature_data);
      });

    },
    beforeDestroy() {
      console.log('Multiple charts before destroy');

      this.$events.off(events.speed);
      this.$events.off(events.current);
      this.$events.off(events.temperature);

      //   eventBus.$off(events.speed, (data) => {
      //     pushSpeedSample(data);
      //     this.$refs.speedChart.updateSeries([{
      //       data: speed_data}]);
      //   });
      //   eventBus.$off(events.current, (data) => {
      //     pushCurrentSample(data);
      //     this.$refs.currentChart.updateSeries([{
      //       data: current_data}]);
      //   });
      //   eventBus.$off(events.temperature, (data) => {
      //     pushTemperatureSample(data);
      //     this.$refs.temperatureChart.updateSeries([{
      //       data: temperature_data}]);
      //   });
      // }
      // methods: {
      //   updateData(data_array, data) {
      //     console.log(data);
      //
      //     getNewSeries(lastDate, data.value);
      //     this.$refs.realtimeChart.updateSeries([{
      //       data: sensors_data
      //
      //
      //     }
      //   }
    }

  }
</script>

<style>
  .apexcharts-title-text {
    font-weight: 600
  }
</style>
