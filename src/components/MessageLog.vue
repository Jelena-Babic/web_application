<template>
  <div id="message_log" >
  <div class="card" style="margin-left: 30px; width: 1460px; border: none; margin-top: 20px">
    <div class="card-header"
         style="border: none;
             background-color: darkseagreen;
              font-size: 30px">
      <h1>Left Side</h1></div>
    <div class="card-body" style="background-color: #F2F4F5; border: none">
      <div class="row">
        <div class="span3" style="margin-top: 5px; margin-right: 30px">
          <message-list :title="title1" :data_array="left_side.speed_data"></message-list>
        </div>
        <div class="span3" style="margin-top: 5px; margin-right: 30px">
          <message-list :title="title2" :data_array="left_side.temperature_data"></message-list>
        </div>
        <div class="span3" style="margin-top: 5px">
          <message-list :title="title3" :data_array="left_side.current_data"></message-list>
        </div>
      </div>
    </div>
  </div>

  <div class="card" style="margin-left: 30px; width: 1460px; border: none; margin-top: 10px">
    <div class="card-header"
         style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
      <h1>Right Side</h1></div>
    <div class="card-body" style="background-color: #F2F4F5; border: none">
      <div class="row">
        <div class="span3" style="margin-top: 5px; margin-right: 30px">
          <message-list :title="title1" :data_array="right_side.speed_data"></message-list>
        </div>
        <div class="span3" style="margin-top: 5px; margin-right: 30px">
          <message-list :title="title2" :data_array="right_side.temperature_data"></message-list>
        </div>
        <div class="span3" style="margin-top: 5px">
          <message-list :title="title3" :data_array="right_side.current_data"></message-list>
        </div>
      </div>

    <div class="card" style="margin-left: 30px; width: 1460px; border: none; margin-top: 10px">
      <div class="card-header"
           style="border: none;
             background-color: darkseagreen;
             font-weight: bolder;
              font-size: 30px">
        <h1>Commands </h1></div>
      <div class="card-body" style="background-color: #F2F4F5; border: none">
        <div class="row">
          <div class="span3" style="margin-top: 5px; margin-right: 30px">
            <message-list :title="title1" :data_array="right_side.speed_data"></message-list>
          </div>
          <div class="span3" style="margin-top: 5px; margin-right: 30px">
            <message-list :title="title2" :data_array="right_side.temperature_data"></message-list>
          </div>
          <div class="span3" style="margin-top: 5px">
            <message-list :title="title3" :data_array="right_side.current_data"></message-list>
          </div>
        </div>
      </div>

  </div>
  </div>
  </div>
  </div>
</template>

<script>
  import MessageList from './elements/MessageList.vue'
  import {message_log} from "../deviceData";
  import {getMessageLog} from "../databaseFunctions";

  export default {
    name: "MessageLog",
    components: {
      MessageList
    },
    data() {
      return {
        title1: 'Speed Log',
        title2: 'Temperature Log',
        title3: 'Current Log',
        title4: 'Limits Log',

        left_side: {
          speed_data: message_log.left_side.speed_log,
          temperature_data: message_log.left_side.temperature_log,
          current_data: message_log.left_side.current_log,
          command_data: message_log.command_log,
        },

        right_side: {
          speed_data: message_log.right_side.speed_log,
          temperature_data: message_log.right_side.temperature_log,
          current_data: message_log.right_side.current_log,
          command_data: message_log.command_log,
        }
      }
    },
    created(){

      getMessageLog();
     // console.log('message log is',message_log);
    },
    mounted(){
      console.log('this is message log speed data',this.$data.speed_data);
    },
    beforeDestroy() {
      console.log('message list destroy');
    },

  }

</script>

<style scoped>

</style>
