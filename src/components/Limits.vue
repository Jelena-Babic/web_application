<template>

  <div id="limit">

    <div class="card" style="margin-left: 30px; margin-top: 20px; border: none; margin-right:30px ">
      <div class="card-header"
           style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
        <h1>Unsecured communication</h1>
      </div>

      <div class="card-body" style="background-color: #F2F4F5; border: none; margin-left:-2px;">

        <div class="row" style="align:center">
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <select-limit-card :data="{data:LeftSide.speed}"></select-limit-card>
          </div>

          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <limit-card :data="{data:LeftSide.temperature}"></limit-card>
          </div>

          <div class="span4" style="padding-bottom:20px">
            <limit-card :data="{data:LeftSide.current}"></limit-card>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-left: 30px; border: none; margin-right:30px ">
      <div class="card-header"
           style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
        <h1>Secured communication</h1>
      </div>
      <div class="card-body" style="background-color: #F2F4F5; border: none; margin-left:-2px;">
        <div class="row">
          <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <select-limit-card :data="{data:RightSide.speed}"></select-limit-card>
          </div>

         <div class="span4" style="padding-right: 30px; padding-bottom:20px">
            <limit-card :data="{data:RightSide.temperature}"></limit-card>
          </div>

          <div class="span4" style="padding-bottom:20px">
            <limit-card :data="{data:RightSide.current}"></limit-card>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import LimitCard from '../components/elements/LimitCard.vue';
  import SelectLimitCard from '../components/elements/SelectLimitCard.vue';
  import {limitTypes} from "../constants";
  import {events} from "../constants";
  import {database_values} from "../deviceData";

  export default {
    components: {
      LimitCard,
      SelectLimitCard
    },
    data() {
      return {

        LeftSide: {
          speed: {
            title: 'Speed',
            type: limitTypes.left_side.speed,
            limit: database_values.limit_value.left_side.speed.value_val,
            date: database_values.limit_value.left_side.speed.date,
            user: database_values.limit_value.left_side.speed.user,
            event:events.command
          },
          temperature: {
            title: 'Temperature',
            type: limitTypes.left_side.temperature,
            limit: database_values.limit_value.left_side.temperature.value_val,
            date: database_values.limit_value.left_side.temperature.date,
            user: database_values.limit_value.left_side.temperature.user,
            event:events.command
          },
          current: {
            title: 'Current',
            type: limitTypes.left_side.current,
            limit: database_values.limit_value.left_side.current.value_val,
            date: database_values.limit_value.left_side.current.date,
            user: database_values.limit_value.left_side.current.user,
            event:events.command
          },
        },

        RightSide: {
          speed: {
            title: 'Speed',
            type: limitTypes.right_side.speed,
            limit: database_values.limit_value.right_side.speed.value_val,
            date: database_values.limit_value.right_side.speed.date,
            user: database_values.limit_value.right_side.speed.user,
            event:events.command
          },
          temperature: {
            title: 'Temperature',
            type: limitTypes.right_side.temperature,
            limit: database_values.limit_value.right_side.temperature.value_val,
            date: database_values.limit_value.right_side.temperature.date,
            user: database_values.limit_value.right_side.temperature.user,
            event:events.command
          },
          current: {
            title: 'Current',
            type: limitTypes.right_side.current,
            limit: database_values.limit_value.right_side.current.value_val,
            date: database_values.limit_value.right_side.current.date,
            user: database_values.limit_value.right_side.current.user,
            event:events.command
          },
        },
      }
    },

  }
</script>

<style scoped>
  .wrapper {
    /* margin-right: auto; 
    margin-left: auto;  */

    max-width: 100px; /* 2 */

     /* padding-right: 10px; 
    padding-left: 10px */
  }

</style>
