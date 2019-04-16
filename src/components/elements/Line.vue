<template>
  <div>
    <apexChart
      ref="realtimeChart"
      type="area"
      :height="height"
      :width="width"
      :options="chartOptions"
      :series="series">
    </apexChart>
  </div>
</template>

<script>
  import {speedData} from "../../deviceData";

  var lastDate = 0;
  var sensors_data = speedData;

  // function getDayWiseTimeSeries(baseval, count, yrange) {
  //   var i = 0;
  //   while (i < count) {
  //     var x = baseval;
  //     var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  //     sensors_data.push({
  //       x,
  //       y
  //     });
  //     lastDate = baseval;
  //     baseval += 1;
  //     i++;
  //   }
  // }

  // getDayWiseTimeSeries(0, 20, {
  //   min: 24.5,
  //   max: 24.5,
  // })

  // function getNewSeries(baseval, temp_val) {
  //   var newDate = baseval + 1;
  //   lastDate = newDate;
  //   sensors_data.push({
  //     x: newDate,
  //     y: temp_val
  //   })
  // }

  // function resetData() {
  //   data = data.slice(data.length - 10, data.length);
  // }

  import {eventBus} from "../../main";

  export default {
    props: ['height', 'width', 'chart_title', 'max_value', 'max_value', 'sample_event', 'limit_event','sample_array'],
    data() {
      return {
        series: [{
          name:'Speed',
          data: this.$props.sample_array.slice()
        }],
        chartOptions: {
          chart: {
            toolbar: {
              show: false
            },
            background: '#fff',
          },
          colors: ['#43BCCD'],
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
            hover: {
              size: 0
            }
          },
          xaxis: {
            type: "datetime",
            labels: {
              trim: true,
              show: true,
              offsetX: 0,
              offsetY: -5,
            },
            range: 81000,
            tickAmount: 20,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: true,
              offsetX: 0
            }
          },
          yaxis: {
            min: this.$props.minValue,
            max: this.$props.maxValue,
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
          title: {
            text: this.$props.chart_title,
            margin: 5,
            style: {
              fontSize: '25px'
            }
          },
          tooltip:{
            enabled:true,
            x:{
              show:true,
              format:'MM.dd hh:mm:ss'
            },
            y:{
              show:true
            }
          }
        }
      }
    },
    mounted() {
      console.log(sensors_data);
      console.log('series data');
      console.log(series);

      eventBus.$on(this.$props.sample_event, (data) => {
        this.updateData(data);
      });
    },
    methods: {
      updateData(data) {
        console.log('This is ', this.$props.chart_title, 'chart');
        console.log('This is event', this.$props.sample_event);
        console.log(data);


        // getNewSeries(lastDate, data);
        this.$refs.realtimeChart.updateSeries([{
          data: this.$props.sample_array
        }]);


      }
    }
  }
  ;
</script>

<style>
  .apexcharts-title-text {
    font-weight: 600
  }
</style>


