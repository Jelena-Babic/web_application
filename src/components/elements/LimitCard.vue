<template>
  <div class="LimitCard">
    <div class="card" style="width:450px; border: transparent">
      <div class="card-header" style="text-align: left;
    font-size: 30px;
    font-weight: bolder;
    background-color: darkseagreen">
        {{title}} Limit:
      </div>
      <div class="card-body" style="margin-left: 20px; height: 220px; ">
        <div class="row">
          <span style="font-size:18px; width: 100px; text-align: left">Limit:</span>
          <span style="font-size: 23px; font-weight: bolder">{{command.limit}}</span>
        </div>

        <div class="row">
          <span style="font-size:18px; width: 100px; text-align: left">Updated:</span>
          <span style="font-size: 23px; font-weight: bolder">{{command.date}}</span>
        </div>

        <div class="row">
          <span style="font-size:18px; width: 100px; text-align: left">User:</span>
          <span style="font-size: 23px; font-weight: bolder">{{command.user}}</span>
        </div>
      </div>
    </div>

    <div class="span" style="padding-bottom: 50px"></div>
    <div class="card" style="border: transparent">
      <div class="card-header" style="text-align: left;
    font-size: 30px;
    font-weight: bolder;
    background-color: indianred;
    ">
        Set New {{title}} Limit:
      </div>
      <div class="card-body" style="padding-top: 50px ">

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Select Limit Value</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01" v-model="temp_limit">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="button" class="btn btn-secondary btn-lg" @click="send_command()">Set Limit</button>

      </div>
    </div>

  </div>

</template>

<script>
  import {eventBus} from "../../main";
  import {events} from "../../constants";

  export default {
    props: ['title', 'database'],
    name: "LimitCard",
    data() {
      return {

        databaseName: this.$props.database,

        command: {
          type: this.$props.title,
          limit: 'High',
          date: '5 min ago',
          user: 'Jelena',
        },

        temp_limit: 'Low'

      }
    },

    methods: {
      send_command() {

        this.$data.command.date = this.$moment(Date.now()).format("DD/MM/YYYY hh:mm:ss");
        this.$data.command.limit = this.$data.temp_limit;
        console.log(this.$data.command);
        eventBus.$emit(events.command, this.$data.command);
      }

    }
  }
</script>

<style scoped>

</style>
