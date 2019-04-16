<template>
  <div class="row" id="messageLog" style="margin-top: 20px; margin-left:20px; padding-right: 30px ">
    <div class="span3" style="margin-top: 20px; margin-right: 30px">
      <message-list :title="title1" :data_array="speed_data"></message-list>
    </div>
    <div class="span3" style="margin-top: 20px; margin-right: 30px">
      <message-list :title="title2" :data_array="temperature_data"></message-list>
    </div>
    <div class="span3" style="margin-top: 20px; margin-right: 30px">
      <message-list :title="title3" :data_array="current_data"></message-list>
    </div>
    <div class="span3" style="margin-top: 20px">
      <message-list :title="title4" :data_array="command_data"></message-list>
    </div>
  </div>
</template>

<script>
  import MessageList from './elements/MessageList.vue'
  import {message_log} from "../deviceData";
  import {baseNames} from "../constants";
  import {db} from "../main";

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

        speed_data:message_log.speed_log,
        temperature_data:message_log.temperature_log,
        current_data:message_log.current_log,
        command_data:message_log.command_log,

      }
    },
    mounted(){
      this.getDatabase(baseNames.speed_base,message_log.speed_log);
      this.getDatabase(baseNames.temperature_base,message_log.temperature_log);
      this.getDatabase(baseNames.current_base,message_log.current_log);
      this.getDatabase(baseNames.command_base,message_log.command_log);

      console.log(message_log.speed_log);
    },
    created(){
      console.log('message list created');
    },
    beforeDestroy() {
      console.log('message list destroy');
    },
    methods:{

      getDatabase(basename, database) {
        var local_database = db.collection(basename);
        var myDataArray = local_database.orderBy("data", "desc").limit(20);
        var configList = myDataArray.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              var myData = doc.data();
              // console.log({x: this.$moment(myData.data.date), y: myData.data.value});
              database.push(myData);
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
