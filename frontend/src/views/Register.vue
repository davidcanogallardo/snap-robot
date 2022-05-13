<template>
  <div>
    <div id="titulo-main">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
    </div>
    <div class="register-elements">
      <h1 class="register-title">REGISTER</h1>
      <input type="text" placeholder="Name">
      <input type="text" placeholder="E-mail">
      <input type="text" placeholder="Username">
      <input type="password" placeholder="Password">
      <input type="password" placeholder="Confirm Password">
      <router-link to="/login"><input type="button" value="Login"></router-link>
      <router-link to="/register"><input type="button" value="Register"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-elements{
  background: rgb(83, 83, 73);;
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  gap: 20px;
  position: absolute;
  vertical-align: center;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 20%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  left: 50%;
  width: 24rem;
  padding: 1.75rem;
}

.register-elements input[type=button]{
  width: 17rem;
}

.register-elements input[type=text], .register-elements input[type=password]{
  width: 17rem;
}

.register-title{
  font-family: 'JetBrains Mono', monospace;
}
</style>
