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
  import {db} from "../main";
  import {events, limitEvents, baseNames, getValue, deviceValues, database_configuration} from "../constants";
  import {speedData, currentData, temperatureData} from '../deviceData';


  export default {
    name: "Default",
    components: {
      app_sidebar: Sidebar
    },
    data() {
      return {
        base_index: {
          speed_index: 0,
          current_index: 0,
          temperature_index: 0,
          command_index: 0,
        },
        limits: {
          speed_limit: deviceValues.speed,
          current_limit: deviceValues.current,
          temperature_limit: deviceValues.temperature,
        },
        mySpeedIndex:20
      }
    },
    created() {
      console.log('app created');
      this.getConfiguration();
      this.getDatabase('speed', speedData);
      this.getDatabase('current', currentData);
      this.getDatabase('temperature', temperatureData);

      // console.log(speedData);
      // console.log(currentData);
      // console.log(temperatureData);
    },
    beforeDestroy() {
      speedData.splice(0, 20);
      currentData.splice(0, 20);;
      temperatureData.splice(0, 20);
      this.updateConfiguration();
    },
    mounted() {
      console.log('app mounted');

      this.$mqtt.subscribe('#');

      eventBus.$on(events.command, (data) => {
        console.log('Command received');

        var baseData = {
          date: data.date,
          type: data.type,
          user: data.user,
          value: data.limit
        };

        this.$data.base_index.command_index = database_configuration.command_index;
        database_configuration.command_index = database_configuration.command_index + 1;

        this.writeInBase(baseNames.command_base, this.$data.base_index.command_index, baseData);
        // console.log(baseData);

        switch (baseData.type) {
          case 'Temperature': {
            this.$data.limits.temperature_limit = baseData.value;
            deviceValues.temperature = baseData.value;
            console.log('temperature is set');
            console.log(getValue(baseData.type, baseData.value));
            this.$events.emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
           // eventBus.$emit(limitEvents.temperature, getValue(baseData.type, baseData.value));
            break;
          }
          case 'Speed': {
            this.$data.limits.speed_limit = baseData.value;
            deviceValues.speed = baseData.value;
            this.$events.emit(limitEvents.speed, getValue(baseData.type, baseData.value));
           // eventBus.$emit(limitEvents.speed, getValue(baseData.type, baseData.value));
            break;
          }
          case 'Current': {
            this.$data.limits.current_limit = baseData.value;
            deviceValues.current = baseData.value;
            this.$events.emit(limitEvents.current, getValue(baseData.type, baseData.value));
            // eventBus.$emit(limitEvents.current, getValue(baseData.type, baseData.value));
            break;
          }
        }

      });
    },
    mqtt: {
      'Temperature measurement'(data) {
        var temp_obj = JSON.parse(data);
        //console.log(temp_obj);
        var baseData = {
          date: this.$moment(Date.now()).format("DD/MM/YYYY hh:mm:ss"),
          limit: this.$data.limits.temperature_limit,
          status: 'Normal',
          value: temp_obj.SensorValue
        };

        console.log('Temperature sample received', baseData.value);

        temperatureData.splice(0, 1);
        temperatureData.push({x: this.$moment(Date.now()), y: baseData.value});
        this.$data.base_index.temperature_index = database_configuration.temperature_index;
        database_configuration.temperature_index = database_configuration.temperature_index + 1;

        this.writeInBase(baseNames.temperature_base, this.$data.base_index.temperature_index, baseData);
        this.$events.emit(events.temperature, {x: this.$moment(Date.now()), y: baseData.value});
        //eventBus.$emit(events.temperature, {x: this.$moment(Date.now()), y: baseData.value});
      },
      'Current measurement'(data) {
        var temp_obj = JSON.parse(data);
        //console.log('current measurement mqtt sample', data);

        var baseData = {
          date: this.$moment(Date.now()).format("DD/MM/YYYY hh:mm:ss"),
          limit: this.$data.limits.current_limit,
          status: 'Normal',
          value: temp_obj.SensorValue
        };

        console.log('Current sample received', baseData.value);

        this.$data.base_index.current_index = database_configuration.current_index;
        database_configuration.current_index = database_configuration.current_index + 1;
        currentData.splice(0, 1);
        currentData.push({x:this.$moment(Date.now()),y:baseData.value});currentData.push({x:this.$moment(Date.now()),y:baseData.value});
        currentData.push({x: baseData.date, y: baseData.value});


        this.$events.emit(events.current, {x: this.$moment(Date.now()), y: baseData.value})
        this.writeInBase(baseNames.current_base, this.$data.base_index.current_index, baseData);
       // eventBus.$emit(events.current, {x: this.$moment(Date.now()), y: baseData.value})
      },

      'MotorSpeed'(data) {
        var temp_obj = JSON.parse(data);
        console.log('Motor speed mqtt received', temp_obj);

        var baseData = {
          date: this.$moment(Date.now()).format("DD/MM/YYYY hh:mm:ss"),
          limit: this.$data.limits.speed_limit,
          status: 'Normal',
          value: temp_obj.ParameterValue
        };

        this.$data.base_index.speed_index = database_configuration.speed_index;
        database_configuration.speed_index = database_configuration.speed_index + 1;

        this.writeInBase(baseNames.speed_base, this.$data.base_index.speed_index, baseData);
        var roundedVal = Number(baseData.value).toFixed(2);
        speedData.splice(0, 1);
        speedData.push({x: this.$moment(Date.now()), y: roundedVal});
        this.$data.mySpeedIndex = this.$data.mySpeedIndex + 1;
         this.$events.emit(events.speed, {x: this.$moment(Date.now()), y: roundedVal})
        // eventBus.$emit(events.speed, {x: this.$moment(Date.now()), y: roundedVal})
      }
    },
    methods: {
      writeInBase(basename, data_index, data) {
        db.collection(basename).doc('ID' + data_index).set({data});

      },
      getConfiguration() {
        var configuration = db.collection(baseNames.configuration_base);
        var configList = configuration.get()
          .then(snapshot => {
            snapshot.forEach(doc => {

              if (doc.id == 'config') {
                // console.log('This is configuration');
                var myConfig = doc.data();
                database_configuration.command_index = myConfig.command_index;
                database_configuration.speed_index = myConfig.speed_index;
                database_configuration.current_index = myConfig.current_index;
                database_configuration.temperature_index = myConfig.temperature_index;
              }
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
        // console.log(database_configuration);
      },
      updateConfiguration() {
        db.collection(baseNames.configuration_base).doc('config').set(database_configuration);
      },
      getDatabase(basename, database) {
        var local_database = db.collection(basename);
        var myDataArray = local_database.orderBy("data", "desc").limit(20);
        var configList = myDataArray.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              var myData = doc.data();
              // console.log({x: this.$moment(myData.data.date), y: myData.data.value});
              database.unshift({x: myData.data.date, y: myData.data.value});
              //database.unshift({x:this.$moment(myData.data.date),y:myData.data.value});
            })
          })
          .catch(err => {
            console.log('Error getting database', err);
          });
      }
    }

  }

</script>

<style scoped>

</style>
