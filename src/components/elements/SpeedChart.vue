<template>
  <div>
    <apexChart ref="radialChart" type="radialBar" :options="chartOptions" :series="series"></apexChart>
  </div>
</template>

<script>
  import {eventBus} from "../../main";

  export default {
    props: ['newValue', 'newLimit', 'sampleEvent', 'limitEvent'],
    data: function () {
      return {

        deviceData: {
          devValue: this.$props.newValue,
          devLimit: this.$props.newLimit,
          eventLimit: this.$props.limitEvent,
          eventSample: this.$props.sampleEvent,
        },

        series: ['0'],
        chartOptions: {
          chart: {
            type: "radialBar"
          },
          colors: ["#F2EE6F"],
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
              track: {
                background: '#333',
              },
              hollow: {
                size: "70%"
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#555",
                  fontSize: "55px"
                },
                value: {
                  color: "#111",
                  fontSize: "25px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              gradientToColors: ["#87D4F9"],
              stops: [0, 100]
            }
          },
          grid: {
            padding: {
              left: 0,
              right: 0
            }
          },
          stroke: {
            lineCap: "round",
          },
          labels: [this.$props.newValue.toFixed(2)]
        }
      }
    }
    ,
    mounted() {

      console.log('speed_chart mounted');
      this.$data.deviceData.devValue = this.$data.deviceData.devValue;

      var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
      this.$refs.radialChart.updateSeries([load]);
      console.log(load);
      console.log(this.$data.deviceData);
      console.log(this.$props);

      this.$events.on(this.$data.deviceData.eventSample, data => {

        console.log('speed chart sample data');

        // var temp_obj = JSON.parse(data);
     //   console.log(data);

        this.$data.deviceData.devValue = data.value.toFixed(2);
        this.$data.deviceData.devLimit = data.limit;

        console.log(this.$data.deviceData.devValue, this.$data.deviceData.devLimit);
        this.$refs.radialChart.updateOptions({
          labels: [this.$data.deviceData.devValue],
        });
        var load = Math.abs(Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100));

      //  console.log(load);
        this.$refs.radialChart.updateSeries([load]);
      });



      // eventBus.$on(this.$data.deviceData.eventSample, (data) => {
      //
      //   // console.log('speed chart sample data');
      //   // var temp_obj = JSON.parse(data);
      //   //   console.log(data);
      //
      //   this.$data.deviceData.devValue = data.y;
      //
      //   console.log(this.$data.deviceData.devValue);
      //   this.$refs.radialChart.updateOptions({
      //     labels: [this.$data.deviceData.devValue],
      //   });
      //   var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
      //   //  console.log(load);
      //   this.$refs.radialChart.updateSeries([load]);
      // });

      this.$events.on(this.$data.deviceData.eventLimit, data => {
        this.$data.deviceData.devLimit = data;
        console.log('limit event catch:', data);
        var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
        console.log(load);
        this.$refs.radialChart.updateSeries([load]);
      });

      // eventBus.$on(this.$data.deviceData.eventLimit, (data) => {
      //   this.$data.deviceData.devLimit = data;
      //   console.log('limit event catch:', data);
      //   var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
      //   console.log(load);
      //   this.$refs.radialChart.updateSeries([load]);
      // });
    },
    beforeDestroy() {

      this.$events.off(this.$data.deviceData.eventSample);

 //      eventBus.$off(this.$data.deviceData.eventSample, (data) => {
 //        this.$data.deviceData.devValue = data.y;
 // //       console.log(this.$data.deviceData.devValue);
 //        this.$refs.radialChart.updateOptions({
 //          labels: [this.$data.deviceData.devValue],
 //        });
 //        var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
 //        //  console.log(load);
 //        this.$refs.radialChart.updateSeries([load]);
 //      });

      this.$events.off(this.$data.deviceData.eventLimit);

      // eventBus.$off(this.$data.deviceData.eventLimit, (data) => {
      //   this.$data.deviceData.devLimit = data;
      //   console.log('limit event catch:', data);
      //   var load = Math.ceil((this.$data.deviceData.devValue / this.$data.deviceData.devLimit) * 100);
      //   console.log(load);
      //   this.$refs.radialChart.updateSeries([load]);
      // });

    }
  }
</script>

<style scoped>
</style>
