<template>
  <div id="app">
    <router-view :key="$route.path" :style="routerStyle" :logged="isLogged" :userData="userData" @changeLoggedState="changeLoggedState"></router-view>

        <!-- <input type="button" value="Robot Simulation" @click="isLogged = true"> -->
  </div>
</template>

<script>
import axios from './axios_import';
export default {
  name: 'App',
  data: function() {
    return{
      userData:{},
      routerStyle: "height: 100%",
      isLogged : false
    };
  },
  methods:{
    changeLoggedState(state){
      this.isLogged = state;

      if(state) this.setUserData();
      else this.logout();
    },
    logout() {
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userData");
      axios.get("logout").then((response)=>{
        if(response.data.succesful == true){
          this.$emit("changeLoggedState", false);
          location.reload();
        }
      });
    },
    setUserData(){
      axios.get("user").then((response)=>{
        localStorage.setItem("userData",JSON.stringify(response.data));
        this.userData = response.data;
        if(response.status == 200) this.isLogged = true;
      })
      .catch(()=>{
        this.logout();
      });
    }
  },
  mounted(){
    if(localStorage.getItem("isLogged") == "true"){
      if (localStorage.getItem("userData") != null) {
        this.userData = JSON.parse(localStorage.getItem("userData"));
        this.isLogged = true;
        this.setUserData();
      } else {
        this.setUserData();
      }
    }
  }
}
</script>

<style>

</style>
