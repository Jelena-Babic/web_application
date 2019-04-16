<template>
  <div class="card" style=" width:350px; height:800px; border: 2px">
    <div class="card-header" style="text-align: left;
    font-size: 30px;
    font-weight: bolder;
    background-color: darkseagreen">{{title}}
    </div>

    <div class="card-body">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Index:</th>
          <th>Date:</th>
          <th>Value</th>
        </tr>
        </thead>

        <tbody v-for="(element,index) in data_array">
        <tr v-if="((index >=currentRow) && (index<currentRow + rowsPerPage))">
          <th scope="row">{{index + 1}}</th>
          <td>{{element.data.date}}</td>
          <td>{{element.data.value}}</td>
        </tr>
        </tbody>
      </table>


      <!--<div class="row" id="page-navigation">-->
        <!--<button class="btn btn-primary"-->
                <!--type="button"-->
                <!--@click="movePages(-1)"-->
                <!--style="-->
                <!--margin-right: 5px;-->
                <!--color: #2c3e50;-->
                <!--font-weight: bolder;-->
            <!--font-size: 12px;-->
            <!--background-color: darkseagreen;-->
            <!--border-color: darkseagreen">-->
          <!--<i class="material-icons">navigate_before</i>-->
        <!--</button>-->
        <!--<button class="btn btn-primary"-->
                <!--type="button"-->
                <!--@click="movePages(1)"-->
                <!--style="-->
                <!--color: #2c3e50;-->
                 <!--font-weight: bolder;-->
            <!--font-size: 12px;-->
            <!--background-color: darkseagreen;-->
            <!--border-color: darkseagreen"><i class="material-icons">navigate_next</i>-->
        <!--</button>-->
        <!--<p>{{startRow / rowsPerPage + 1}} / {{Math.ceil(data_array.length / rowsPerPage)}}</p>-->
      <!--</div>-->

      <div class="child col-lg-4" >
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center"  >
          <li class="page-item" >
            <a class="page-link" @click="movePages(-1)" tabindex="-1" > < </a>
          </li>
          <li class="page-item "><a class="page-link active" style="background-color: #FAFAFA">{{firstPage +1}}</a></li>
          <!--<li class="page-item"><a class="page-link active" @click="setPage(1)">{{firstPage +2}}</a></li>-->
          <!--<li class="page-item"><a class="page-link active" @click="setPage(2)">{{firstPage +3}}</a></li>-->
          <li class="page-item">
            <a class="page-link" @click="movePages(1)" tabindex="1"> > </a>
          </li>
        </ul>
      </nav>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "MessageList",
    props: ['title', 'data_array'],
    data() {
      return {
        currentRow: 0,
        firstPage: 0,
        rowsPerPage: 14
      }
    },
    methods: {
      movePages: function (amount) {
        var newStartRow = this.currentRow + (amount * this.rowsPerPage);
        if (newStartRow >= 0 && newStartRow < this.$props.data_array.length) {
          this.currentRow = newStartRow;
        }
        // console.log(this.currentRow);
        this.firstPage = Math.ceil(this.currentRow/this.rowsPerPage);
        // console.log(this.firstPage );
        // this.firstPage= ((Math.ceil(this.currentRow/this.rowsPerPage)-3)<0)? 0 : (Math.ceil(this.currentRow/this.rowsPerPage)-2) + 1;
      },
    }
  }
</script>

<style scoped>
  .child {
    position: absolute;
    margin-left: 100px;
    margin-bottom: 20px;
    bottom: 0;
  }

  .child .page-item a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }

  .pagination .page-item.active .page-link:focus{
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
  }

  .pagination a:hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
  }

</style>
