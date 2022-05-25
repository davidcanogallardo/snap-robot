<template>
  <div class="userBubble fa-solid fa-robot" @click="(clickBubble)?clickBubble=false :clickBubble=true">
    <ul v-show="clickBubble">
      <router-link to="/myProfile"><li><i class="fa-solid fa-robot"></i>Profile</li></router-link>
      <li @click="$parent.$emit('changeLoggedState', false);"><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserBubbleComponent',
  data: function(){
    return {
      clickBubble : false
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .userBubble{
    width:60px;
    height:60px;
    background:rgb(75, 75, 75);
    border-radius: 50%;
    margin-right: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content:baseline;
    align-items: flex-end;
    cursor: pointer;
  }
  
  .userBubble::before{
    bottom: -15px;
    left: -12px;
    font-size: 1.75rem;
    position: relative;
  }
  
  
  .userBubble ul{
    margin-top: 40px;
    list-style: none;
    width: 100%;
    background: rgb(32, 32, 32);
    width: max-content;
    height: fit-content;
    padding: 0.2rem;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .userBubble ul li{
    padding: 0.5rem;
    text-align: left;
  }
  
  .userBubble ul li i{
    margin-right: 0.75rem;
    width: 1rem;
    height: auto;
  }

@media screen and (max-width: 1225px) {
  .userBubble{
    background: transparent;
  }
}
</style>
