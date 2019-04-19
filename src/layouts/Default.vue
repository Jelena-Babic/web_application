<template>
  <div id="sidebar" v-bind:style="{ 'background-color': '#F2F4F5' }" style="height: 945px;">
    <app_sidebar></app_sidebar>
    <div class="content" style="margin-left: 200px">
      <slot/>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../components/Sidebar.vue'
  import {eventBus} from "../main";
  import {events, limitEvents, baseNames, getValue, deviceValues, limitTypes} from "../constants";
  import {database_index, database_values} from '../deviceData';
  import {getDatabaseIndexes, getLatestEntries, writeInBase, setDatabaseIndexes} from "../databaseFunctions";
  import axios from 'axios'


  export default {
    name: "Default",
    components: {
      app_sidebar: Sidebar
    },
    data() {
      return {}
    },
    created() {
      console.log('app created');
      getDatabaseIndexes();
      getLatestEntries();
      console.log('this is home database values',database_values);
      console.log('created.local.index', database_index);

      this.sendHttpCommand();

    },
    beforeDestroy() {
      setDatabaseIndexes();
    },
    mounted() {

      this.$mqtt.subscribe('#');
      this.$events.on(events.command, (data) => {
        console.log('Command Received', data);
        this.processCommand(data);
      });

    },
    mqtt: {

      'Temperature measurement'(data) {
        //console.log('Temperature Sample');
        this.processSample(data, 'Temperature');
      },
      'Current measurement'(data) {
     //   console.log('Current sample')
         this.processSample(data, 'Current');
      },
      'MotorSpeed'(data) {
     //   console.log('Speed sample');
      //  console.log(JSON.parse(data));
         this.processSample(data, 'Speed');
      }

    },
    methods: {

      processSample(data, data_type) {
        var temp_obj = JSON.parse(data);

        var baseData = {
          date: this.$moment(Date.now()).format("DD/MM/YYYY hh:mm:ss"),
          limit: '0',
          status: 'Normal',
          value: '0'
        };

        switch (data_type) {
          case 'Temperature': {

            baseData.value = temp_obj.SensorValue;

            if (temp_obj.ControlUnit == 'Left')
            {
              baseData.limit = database_values.limit_value.left_side.temperature.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              console.log('temperature log left base data', baseData);

              writeInBase(baseNames.sample_base.left_side.temperature_base,
                ++database_index.sample_index.left_side.temperature_index,
                baseData);

              this.$events.emit(events.left_side.temperature, baseData);
            }
            else {
              baseData.limit = database_values.limit_value.right_side.temperature.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              writeInBase(baseNames.sample_base.right_side.temperature_base,
                ++database_index.sample_index.right_side.temperature_index,
                baseData);

              this.$events.emit(events.right_side.temperature, baseData);

            }
            break;
          }
          case 'Current': {
            baseData.value = temp_obj.SensorValue;

            if (temp_obj.ControlUnit == 'Left') {
              baseData.limit = database_values.limit_value.left_side.current.value_val;
              baseData.status = baseData.limit >= Math.abs(baseData.value) ? 'Normal' : 'Overload';

              writeInBase(baseNames.sample_base.left_side.current_base,
                ++database_index.sample_index.left_side.current_index,
                baseData);

              this.$events.emit(events.left_side.current, baseData);

            }
            else {
              baseData.limit = database_values.limit_value.right_side.current.value_val;
              baseData.status = baseData.limit >= Math.abs(baseData.value)  ? 'Normal' : 'Overload';

              writeInBase(baseNames.sample_base.right_side.current_base,
                ++database_index.sample_index.right_side.current_index,
                baseData);

              this.$events.emit(events.right_side.current, baseData);
            }
            break;
          }
          case 'Speed': {

            baseData.value = temp_obj.ParameterValue;

            if (temp_obj.ControlUnit == 'Left') {
              baseData.limit = database_values.limit_value.left_side.speed.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              writeInBase(baseNames.sample_base.left_side.speed_base,
                ++database_index.sample_index.left_side.speed_index,
                baseData);

              this.$events.emit(events.left_side.speed, baseData);

            } else {
              baseData.limit = database_values.limit_value.right_side.speed.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              writeInBase(baseNames.sample_base.right_side.speed_base,
                ++database_index.sample_index.right_side.speed_index,
                baseData);

              this.$events.emit(events.right_side.speed, baseData);
            }
            break;
          }

        }

       // console.log('sample data', baseData);

      },

      processCommand(data) {

        console.log('this is base data from process command', data);

        var baseData = {
          date: data.date,
          user: data.user,
          value: data.limit,
          value_val: getValue(data.type, data.limit)
        };

        var commandData = {
          date: data.date,
          user: data.user,
          type: data.type,
          value: data.limit,
          value_val: getValue(data.type, data.limit)
        }

        writeInBase(baseNames.command_base, ++database_index.command_index, commandData);
        // console.log(baseData);

        switch (data.type) {
          case limitTypes.left_side.temperature: {
            console.log('left temperature is set');

            writeInBase(baseNames.limit_base.left_side.temperature_base,
              ++database_index.limit_index.left_side.temperature_index, baseData);
            console.log('New temperature index is ', database_index.limit_index.left_side.temperature_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
                  "ServiceParameterLimits":
                    [
                      {
                        "ControlUnit": "Left",
                        "ParameterUnit": "Celsius",
                        "ParameterLimit": baseData.value_val
                      },
                    ]
                  })
                  .then(response => {
                  })
                  .catch(e => {
                    this.errors.push(e)
                  });
            break;
          }
          case limitTypes.left_side.speed: {
            console.log('left speed is set');

            writeInBase(baseNames.limit_base.left_side.speed_base,
              ++database_index.limit_index.left_side.speed_index, baseData);

            console.log('New speed index is ', database_index.limit_index.left_side.speed_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Left",
                    "ParameterUnit": "RPM",
                    "ParameterLimit": baseData.value_val
                  },
                ]
            })
              .then(response => {
              })
              .catch(e => {
                this.errors.push(e)
              });


            break;
          }
          case limitTypes.left_side.current: {
            console.log('left current is set');

            writeInBase(baseNames.limit_base.left_side.current_base,
              ++database_index.limit_index.left_side.current_index, baseData);

            console.log('New current index is ', database_index.limit_index.left_side.current_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Left",
                    "ParameterUnit": "mA",
                    "ParameterLimit": baseData.value_val
                  },
                ]
            })
              .then(response => {
              })
              .catch(e => {
                this.errors.push(e)
              });


            break;
          }
          case limitTypes.right_side.temperature: {
            console.log('left temperature is set');

            writeInBase(baseNames.limit_base.right_side.temperature_base,
              ++database_index.limit_index.right_side.temperature_index, baseData);

            console.log('New temperature index is ', database_index.limit_index.right_side.temperature_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Right",
                    "ParameterUnit": "Celsius",
                    "ParameterLimit": baseData.value_val
                  },
                ]
            })
              .then(response => {
              })
              .catch(e => {
                this.errors.push(e)
              });


            break;
          }
          case limitTypes.right_side.speed: {
            console.log('left speed is set');

            writeInBase(baseNames.limit_base.right_side.speed_base,
              ++database_index.limit_index.right_side.speed_index, baseData);

            console.log('New speed index is ', database_index.limit_index.right_side.speed_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Right",
                    "ParameterUnit": "RPM",
                    "ParameterLimit": baseData.value_val
                  },
                ]
            })
              .then(response => {
              })
              .catch(e => {
                this.errors.push(e)
              });


            break;
          }
          case limitTypes.right_side.current: {
            console.log('left current is set');

            writeInBase(baseNames.limit_base.right_side.current_base,
              ++database_index.limit_index.right_side.current_index, baseData);

            console.log('New current index is ', database_index.limit_index.right_side.current_index);
            // this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));

            axios.post(`http://mosquitto.test:5000/management/parameters-control`,{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Right",
                    "ParameterUnit": "mA",
                    "ParameterLimit": baseData.value_val
                  },
                ]
            })
              .then(response => {
              })
              .catch(e => {
                this.errors.push(e)
              });

            break;
          }
          default: {
            console.log('wrong switch parameter');
            break;
          }
        }

      }
    }
  }

</script>

<style scoped>

</style>
