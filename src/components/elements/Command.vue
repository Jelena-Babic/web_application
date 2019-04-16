<template>
  <div>
    <h5>Set Temperature threshold</h5>
    <input v-model.number="temp_val" placeholder=temp_val>
  <button @click="postPost">Send Command</button>
  </div>
</template>

<script>
  import {db} from '../../main';
  import axios from 'axios';

    export default {
      name: "Command",
      data() {
        return {
          temp_val: 0,
          doc_name: 'ID',
          var_index: 0,
          my_object: {
            "ServiceParameterLimits":
              [
                {
                  "ControlUnit": "Right",
                  "ParameterUnit": "Celsius",
                  "ParameterLimit": "" + this.temp_val
                }
              ]
          }
        }
      },
      methods: {
        send_command(data) {
          this.$data.var_index++;
          db.collection('commands').doc(this.$data.doc_name + this.$data.var_index).set({data});

          var citiesRef = db.collection('commands');
          var allCities = citiesRef.get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        },

        postPost() {

          var my_object= {
            "ServiceParameterLimits":
            [
              {
                "ControlUnit": "Right",
                "ParameterUnit": "Celsius",
                "ParameterLimit": "" + this.temp_val
              }
            ]
          };

          console.log(my_object);
          axios.post('http://mosquitto.test:5000/management/parameters-control',
           this.my_object)
            .then(response => {
            })
            .catch(e => {
              console.log(e);
            })
        }
      }
    }
</script>

<style scoped>

</style>
