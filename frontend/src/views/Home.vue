<template>
  <div>
    <div id="titulo-main" class="titulo-main-bubble">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
      <UserBubble v-if="logged"></UserBubble>
    </div>
    <div class="home-elements">
      <Searchbar :titleOnTop="true" class="searchbar-home"/>
      <router-link to="/robotArm">
        <input type="button" value="Simulación de robot online">
      </router-link>
      <!-- <a href="./snap.html"> -->
      <a @click="launchSnap()">
        <input type="button" value="Controlar un robot offline">
      </a>
      <hr v-if="!logged">
      <router-link to="/login"><input v-if="!logged" type="button" value="Login"></router-link>
      <router-link to="/register"><input v-if="!logged" type="button" value="Registrarse"></router-link>
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import UserBubble from '../components/UserBubble.vue';
export default {
  name: 'HomeComponent',
  components:{
    Searchbar,
    UserBubble
  },
  props:{
    logged:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    launchSnap() {
      this.$socket.emit('owo')
      var snapData = {
        remoteArm: false,
      }
      localStorage.setItem("snapData", JSON.stringify(snapData))
      window.location.href = window.snapUrl;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-elements{
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  margin: 6rem auto;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.home-elements input[type=button]{
  min-width: 17rem;
}

.home-elements input[type=text]{
  width: 17rem;
}

.searchbar-home{
  margin: 0rem 0rem 3rem 0rem;
}

@media screen and (max-width: 1225px) {
  .userBubble{
    background:rgb(75, 75, 75);
  }
}
</style>
