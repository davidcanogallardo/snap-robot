<template>
  <label id="searchbar"  for="searchbar"><div v-if="titleOnTop">SEARCH FOR A PROJECT</div><input type="text" :placeholder="(titleOnTop)?'':'SEARCH FOR A PROJECT'"></label>
</template>

<script>
export default {
  name: 'SearchbarComponent',
  props:{
    titleOnTop:{
      type: Boolean, 
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#searchbar{
  width: 50%; 
  font-size: 1.35rem;
}

#searchbar input{
  width: 100%;
  background-color: rgb(83, 83, 73);
  color: rgb(248, 248, 233);
  font-size: 1rem;
  padding: 0.25rem;
  border: none;
  height: 2.5rem;
  box-shadow: inset 0px 0px 7px 1px black;
  border-radius: 5px;
  transition: box-shadow ease-in-out 0.09s;
}

#searchbar input:focus-visible{
  outline:none;
  box-shadow: inset 0px 0px 3px 1px rgba(199, 179, 0, 0.7);
  transition: box-shadow ease-in-out 0.09s;
  background-color: rgb(85, 85, 64);
}
</style>
