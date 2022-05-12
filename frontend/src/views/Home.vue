<template>
  <div>
    <router-link to="/"><h1 id="titulo-main">SNAP<i>!</i>-ROBOT</h1></router-link>
    <div class="home-elements">
      <Searchbar :titleOnTop="true" class="searchbar-home"/>
      <input type="button" value="Robot Simulation">
      <a href="./snap.html">
        <input type="button" value="Control a robot">
      </a>
      <hr v-if="!logged">
      <router-link to="/login"><input v-if="!logged" type="button" value="Login"></router-link>
      <router-link to="/register"><input v-if="!logged" type="button" value="Register"></router-link>
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
export default {
  name: 'HomeComponent',
  components:{
    Searchbar
  },
  props:{
    logged:{
      type: Boolean,
      default: false
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
  margin: auto;
  align-items: center;
  gap: 20px;
  position: absolute;
  vertical-align: center;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 45%;
  width: 100%;
}

.home-elements input[type=button]{
  width: 17rem;
}

.home-elements input[type=text]{
  width: 17rem;
}

.searchbar-home{
  margin: 0rem 0rem 3rem 0rem;
}
</style>
