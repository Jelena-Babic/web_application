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
  import {events, limitEvents, baseNames, getValue, deviceValues, limitTypes, getSpeedValue, castSpeedValue} from "../constants";
  import {database_values} from '../deviceData';
  import axios from 'axios'

var Base = false;

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

      axios.get('https://192.168.1.242/management/parameters-control')
        .then(response => {
            console.log('this is response data',response.data);
            database_values.limit_value.right_side.current.value_val = response.data.ServiceParameterLimits[0].ParameterLimit;
            database_values.limit_value.right_side.temperature.value_val = response.data.ServiceParameterLimits[1].ParameterLimit;
            database_values.limit_value.right_side.speed.value_val = getSpeedValue(response.data.ServiceParameterLimits[2].ParameterLimit);

            database_values.limit_value.left_side.current.value_val = response.data.ServiceParameterLimits[3].ParameterLimit;
            database_values.limit_value.left_side.temperature.value_val = response.data.ServiceParameterLimits[4].ParameterLimit;
            database_values.limit_value.left_side.speed.value_val = getSpeedValue(response.data.ServiceParameterLimits[5].ParameterLimit);

            database_values.sample_value.right_side.current.limit = response.data.ServiceParameterLimits[0].ParameterLimit;
            database_values.sample_value.right_side.temperature.limit = response.data.ServiceParameterLimits[1].ParameterLimit;
            database_values.sample_value.right_side.speed.limit =  getSpeedValue(response.data.ServiceParameterLimits[2].ParameterLimit);

            database_values.sample_value.left_side.current.limit = response.data.ServiceParameterLimits[3].ParameterLimit;
            database_values.sample_value.left_side.temperature.limit = response.data.ServiceParameterLimits[4].ParameterLimit;
            database_values.sample_value.left_side.speed.limit = getSpeedValue(response.data.ServiceParameterLimits[5].ParameterLimit);
            console.log('this is new database value', database.values);

            })
               .catch(e => {
                    console.log(e.response);
                       // this.errors.push(e)
                  });

    },
    beforeDestroy() {
    //  setDatabaseIndexes();
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

              this.$events.emit(events.left_side.temperature, baseData);
            }
            else {
              baseData.limit = database_values.limit_value.right_side.temperature.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              this.$events.emit(events.right_side.temperature, baseData);

            }
            break;
          }
          case 'Current': {
            baseData.value = temp_obj.SensorValue;

            if (temp_obj.ControlUnit == 'Left') {
              baseData.limit = database_values.limit_value.left_side.current.value_val;
              baseData.status = baseData.limit >= Math.abs(baseData.value) ? 'Normal' : 'Overload';

              this.$events.emit(events.left_side.current, baseData);

            }
            else {
              baseData.limit = database_values.limit_value.right_side.current.value_val;
              baseData.status = baseData.limit >= Math.abs(baseData.value)  ? 'Normal' : 'Overload';

              this.$events.emit(events.right_side.current, baseData);
            }
            break;
          }
          case 'Speed': {

            baseData.value = temp_obj.ParameterValue;

            if (temp_obj.ControlUnit == 'Left') {
              baseData.limit = database_values.limit_value.left_side.speed.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              this.$events.emit(events.left_side.speed, baseData);

            } else {
              baseData.limit = database_values.limit_value.right_side.speed.value_val;
              baseData.status = baseData.limit >= baseData.value ? 'Normal' : 'Overload';

              this.$events.emit(events.right_side.speed, baseData);
            }
            break;
          }

        }

      },

      processCommand(data) {

        console.log('this is base data from process command', data);

        var baseData = {
          date: data.date,
          user: data.user,
          value: data.limit,
          value_val: data.limit
        };

        var commandData = {
          date: data.date,
          user: data.user,
          type: data.type,
          value: data.limit,
          value_val: data.limit
        }

        switch (data.type) {
          case limitTypes.left_side.temperature: {
            console.log('left temperature is set' , baseData.value_val);

            axios.post('https://192.168.1.242/management/parameters-control',{
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
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });


              database_values.limit_value.left_side.temperature.value_val = baseData.value_val
            break;
          }
          case limitTypes.left_side.speed: {
            

            var temp_val = 0;
            
              switch(baseData.value_val)
              {
                case "0":
                temp_val = 0;
                break;
                
                case "1000":
                temp_val = 1;
                break;

                case "2500":
                temp_val = 2;
                break;

              }

             console.log('left speed is', baseData.value_val, 'left speed code is', temp_val);

            axios.post('https://192.168.1.242/management/parameters-control',{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Left",
                    "ParameterUnit": "RPM",
                    "ParameterLimit": temp_val
                  },
                ]
            })
              .then(response => {
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });

            database_values.limit_value.left_side.speed.value_val = baseData.value_val;

            break;
          }
          case limitTypes.left_side.current: {
            console.log('left current is set');

            axios.post('https://192.168.1.242/management/parameters-control',{
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
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });

            database_values.limit_value.left_side.current.value_val = baseData.value_val

            break;
          }
          case limitTypes.right_side.temperature: {
            console.log('right temperature is set');

            axios.post('https://192.168.1.242/management/parameters-control',{
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
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });

            database_values.limit_value.right_side.temperature.value_val = baseData.value_val

            break;
          }
          case limitTypes.right_side.speed: {
var temp_val = 0;
            
              switch(baseData.value_val)
              {
                case "0":
                temp_val = 0;
                break;
                
                case "1000":
                temp_val = 1;
                break;

                case "2500":
                temp_val = 2;
                break;

              }

             console.log('right speed is', baseData.value_val, 'right speed code is', temp_val);

            axios.post('https://192.168.1.242/management/parameters-control',{
              "ServiceParameterLimits":
                [
                  {
                    "ControlUnit": "Right",
                    "ParameterUnit": "RPM",
                    "ParameterLimit": temp_val
                  },
                ]
            })
              .then(response => {
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });

            database_values.limit_value.right_side.speed.value_val = baseData.value_val;
           
            break;
          }
          case limitTypes.right_side.current: {
            console.log('left current is set');

            axios.post('https://192.168.1.242/management/parameters-control',{
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
                console.log('post response', response);
              })
              .catch(e => {
                console.log(e.message);
                //this.errors.push(e)
              });

             database_values.limit_value.right_side.current.value_val = baseData.value_val

             break;
          }
          default: {
            console.log('wrong switch parameter', data.type);
            break;
          }
        }

      }
    }
  }

</script>

<style scoped>

</style>
