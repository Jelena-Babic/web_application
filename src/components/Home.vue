<template>
  <div id="home">
    <div class="card" style="margin-left: 30px; margin-top: 20px; border: none; margin-right:30px ">
  <div class="card-header"
           style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
        <h1>Left Side</h1>
  </div>

      <div class="card-body" style="background-color: #F2F4F5; border: none; margin-left:-2px;">

        <div class="row">
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <vue_data :data="LeftSideData.speedData"></vue_data>
          </div>
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <vue_data :data="LeftSideData.temperatureData"></vue_data>
          </div>
          <div class="span4" style="padding-bottom:20px">
            <vue_data :data="LeftSideData.currentData"></vue_data>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-left: 30px; margin-top: 20px; border: none; margin-right:30px ">
      <div class="card-header"
           style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
        <h1>Right Side</h1>
      </div>

      <div class="card-body" style="background-color: #F2F4F5; border: none; margin-left:-2px">
        <div class="row">
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <vue_data :data="RightSideData.speedData"></vue_data>
          </div>
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <vue_data :data="RightSideData.temperatureData"></vue_data>
          </div>
          <div class="span4" style="padding-bottom:20px" >
            <vue_data :data="RightSideData.currentData"></vue_data>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import DataCard from './elements/DataCard';
  import {events, limitEvents, getValue} from "../constants";
  import {database_values} from "../deviceData";
  import axios from 'axios'

  export default {
    name: "Home",
    components: {
      vue_data: DataCard,
    },
    data() {
      return {

        LeftSideData: {
          speedData: {
            chartTitle: 'Speed:',
            chartValue: database_values.sample_value.left_side.speed.value,
            chartStatus: database_values.sample_value.left_side.speed.status,
            chartLimit: database_values.sample_value.left_side.speed.limit,
            chartUpdateTime: database_values.sample_value.left_side.speed.date,
            limitEvent: limitEvents.left_side.speed,
            sampleEvent: events.left_side.speed
          },
          temperatureData: {
            chartTitle: 'Temperature:',
            chartValue: database_values.sample_value.left_side.temperature.value,
            chartStatus: database_values.sample_value.left_side.temperature.status,
            chartLimit: database_values.sample_value.left_side.temperature.limit,
            chartUpdateTime: database_values.sample_value.left_side.temperature.date,
            limitEvent: limitEvents.left_side.temperature,
            sampleEvent: events.left_side.temperature
          },

          currentData: {
            chartTitle: 'Current:',
            chartValue: database_values.sample_value.left_side.current.value,
            chartStatus: database_values.sample_value.left_side.current.status,
            chartLimit: database_values.sample_value.left_side.current.limit,
            chartUpdateTime: database_values.sample_value.left_side.current.date,
            limitEvent: limitEvents.left_side.current,
            sampleEvent: events.left_side.current
          }
        },

        RightSideData: {
          speedData: {
            chartTitle: 'Speed:',
            chartValue: database_values.sample_value.right_side.speed.value,
            chartStatus: database_values.sample_value.right_side.speed.status,
            chartLimit: database_values.sample_value.right_side.speed.limit,
            chartUpdateTime: database_values.sample_value.right_side.speed.date,
            limitEvent: limitEvents.right_side.speed,
            sampleEvent: events.right_side.speed
          },

          temperatureData: {
            chartTitle: 'Temperature:',
            chartValue: database_values.sample_value.right_side.temperature.value,
            chartStatus: database_values.sample_value.right_side.temperature.status,
            chartLimit: database_values.sample_value.right_side.temperature.limit,
            chartUpdateTime: database_values.sample_value.right_side.temperature.date,
            limitEvent: limitEvents.right_side.temperature,
            sampleEvent: events.right_side.temperature
          },

          currentData: {
            chartTitle: 'Current:',
            chartValue: database_values.sample_value.right_side.current.value,
            chartStatus: database_values.sample_value.right_side.current.status,
            chartLimit: database_values.sample_value.right_side.current.limit,
            chartUpdateTime: database_values.sample_value.right_side.current.date,
            limitEvent: limitEvents.right_side.current,
            sampleEvent: events.right_side.current
          }
        }
      }
    },
    created() {

     console.log('created database value', database_values);
    
    }
  }
</script>

<style scoped>

</style>
