<template>
  <div id="app">
    <router-view :style="routerStyle"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
    data: function() {
      return{
        routerStyle: "height: 100%"
      };
    }
}
</script>

<style>

</style>
