<template>
  <div id="chartTest">
    <!--<chart></chart>-->
    <canvas id="myChart" width="1000" height="300"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js'
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import {events} from "../../constants";
  import {currentData} from "../../deviceData";

  var ticksObj = {
    suggestedMin: 0,
    beginAtZero: true,
    stepValue: 50,
  };

  var data_array=[];

  var index = 50;

  var options = {

    plugins: {
      datalabels: {
        display: false,
      },
    },
    // plugins: {
    //   // Change options for ALL labels of THIS CHART
    //   datalabels: {
    //     color: '#36A2EB'
    //   }
    // },
    responsive: true,
    animate: true,
    maintainAspectRatio: true,
    scaleBeginAtZero: true,
    // title: {
    //   display: true,
    //   text: title
    // },
    scales: {
      bounds: 'ticks',
      xAxes: [{
        type: "time",
        distribution: 'linear',
        // display: true,
        scaleLabel: {
          display: true,
        },
        ticks: {
          source: 'data',
          // minRotation: 90,
          // maxRotation: 90,
          // stepValue: 10,
          // autoSkip: true,
           maxTicksLimit: 10
        },
        time: {
          unit: 'seconds',
          unitStepSize: 10,
          displayFormats: {
            seconds: 'HH:mm:ss'
          }
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
        },
        ticks: ticksObj
      }]
    }
  };

  export default {
    name: "ChartTest",
    data() {
      return {
        data: {
          //labels:['jedan', 'dva', 'tri'],
          datasets: [{
            backgroundColor: 'green',
            borderWidth: 3,
            borderColor:'green',
            fill:false,
            label: "My First dataset",
            data: []
          }]
        },
      }
    },

    mounted() {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        // plugins: [ChartDataLabels],
        type: 'line',
        data: this.data,
        options: options

      });

      this.populateData();


      // this.$events.on(events.current, (sample) => {
      //   // this.methods.updateData(this.$data.data.datasets.data, sample.value)
      //
      //
      //   //this.updateData(this.$data.data.datasets[0].data, sample);
      //   this.updateData(test_array, sample);
      //   // console.log(this.$data.data.datasets[0].data[0]);
      //   //
      //   // this.$data.data.datasets.data.push(sample.value);
      //   // this.$data.data.datasets.data.shift();
      // });

      setInterval(() => {

        var sample = {x: Date.now(), y: index};
        console.log(sample);
        index = index + 1;
        //console.log(this.$data.data.datasets[0].data);
        // this.updateData(test_array, sample);
        //this.printData();
        // chart.data.labels.push(this.$moment(Date.now()).format("hh:mm:ss"));
        // console.log(chart.data.labels);
        //chart.data.labels.push(index);
        // if(chart.data.datasets[0].data.length()<10)
        console.log(data_array);

        // console.log(chart.data.datasets[0].data.length <= 9);
        // if(chart.data.datasets[0].data.length <= 9)
        // {
        //   chart.data.datasets[0].data.push(sample);
        // }
        // else
        // {
        //   chart.data.datasets[0].data.push(sample);
        //   chart.data.datasets[0].data.shift();
        // }
        // // this.updateData(this.$data.data.datasets[0].data, sample)
        // // console.log(this.$data.data.datasets[0].data);
        // chart.update();

        // var myLineChart = new Chart(ctx).Line(data, options);
      }, 2000);
    },
    methods: {
      updateData(array, data) {
        array.push(data.value);
        array.shift();
      },
      populateData() {
        //   for (let i=0; i<10; i++){
        //
        //     data_array.push(currentData[i]);
        //     console.log(i);
        //     console.log(currentData[i]);
        //
        //   }
        // }
      },
    }
  }
</script>

<style scoped>

</style>
