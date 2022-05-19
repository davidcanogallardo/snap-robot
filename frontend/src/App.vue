<template>
  <div id="app">
    <router-view :style="routerStyle" :logged="isLogged" @changeLoggedState="changeLoggedState"></router-view>
  </div>
</template>

<script>
import axios from './axios_import';
export default {
  name: 'App',
  data: function() {
    return{
      routerStyle: "height: 100%",
      isLogged : false
    };
  },
  methods:{
    changeLoggedState(state){
      this.isLogged = state;
    }
  },
  mounted(){
    if(localStorage.getItem("isLogged") == "true"){
      axios.get("user").then((response)=>{
        console.log(response);
      })
    }
  }
}
</script>

<style>

</style>
