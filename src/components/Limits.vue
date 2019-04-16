<template>
  <div class="row" style="margin-top: 20px; margin-left: 30px;">
    <div class="span4" style="padding-right: 40px">
      <limit-card :title="title1" :database="databaseName"></limit-card>
    </div>

    <div class="span4" style="padding-right: 40px">
      <limit-card :title="title2"></limit-card>
    </div>

    <div class="span4">
      <limit-card :title="title3"></limit-card>
    </div>
  </div>
</template>

<script>
  import LimitCard from '../components/elements/LimitCard.vue';


  export default {
    components: {
      LimitCard,
    },
    data() {
      return {
        title1: 'Speed',
        title2: 'Temperature',
        title3: 'Current',

        databaseName:'command'

      }
    },


  }
</script>

<style scoped>
  .wrapper {
    margin-right: auto; /* 1 */
    margin-left: auto; /* 1 */

    max-width: 100px; /* 2 */

    padding-right: 10px; /* 3 */
    padding-left: 10px; /* 3 */
  }

</style>
