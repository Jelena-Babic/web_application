<template>
  <apexChart ref="radialChart" type="radialBar" :options="chartOptions" :series="series"></apexChart>
</template>

<script>
  import {eventBus} from "../../main";

  export default {
    props:['load','eventName'],
    data: function () {
      return {
        series: [this.$props.load],
        chartOptions: {
          chart: {
            type: "radialBar"
          },
          colors: ["#20E647"],
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
              track:{
                background: '#333',
              },
              hollow: {
                size: "70%"
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -25,
                  show: true,
                  color: "#555",
                  fontSize: "20px"
                },
                value: {
                  color: "#111",
                  offsetY: 1,
                  fontSize: "50px",
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
          grid:{
            padding:{
              left:0,
              right:0
            }
          },

          stroke: {
            lineCap: "round",
          },
          labels: ['Average Load:']
        }
      }
    },
    mounted(){
      eventBus.$on(this.$props.eventName, (data)=>{
        console.log('event catch');
        console.log(data);
        this.$refs.radialChart.updateSeries([data.load]);
      });
    }
  }
</script>

<style scoped>
</style>
