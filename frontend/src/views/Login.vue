<template>
  <div>
    <div id="titulo-main">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
    </div>
    <div class="login-elements">
      <h1 class="login-title">LOGIN</h1>
      <input type="text" v-model="loginForm.email" placeholder="E-mail">
      <input type="password" v-model="loginForm.password" placeholder="Contraseña">
      <input type="button" @click="login" value="Login">
      <p class="auth-error">{{error}}</p>
      <hr>
      <router-link to="/register"><input type="button" value="Registrarse"></router-link>
    </div>
  </div>
</template>

<script>
import axios from '../axios_import.js'
export default {
  name: 'LoginComponent',
  data: function(){
    return {
      loginForm:{
        email:"",
        password:""
      },
      error:""
    };
  },
  methods:{
    login(){
       axios.get("csrf-cookie").then(() => {
         axios.post("login", this.loginForm)
           .then((response)=>{
             if(response.data.success){ 
               localStorage.setItem("isLogged","true");
               this.$emit("changeLoggedState", true);
               this.$router.push("/");
             }
           })
           .catch((error)=>{
             this.error = error.response.data.message; 
           });
         })
         .catch( (err)=>{
           console.log(err);
         }
         );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-elements{
  background: rgb(83, 83, 73);;
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  justify-content: space-evenly;
  margin: 6rem auto;
  align-items: center;
  gap: 20px;
  width: 24rem;
  padding: 1.75rem;
}

.login-elements input[type=button]{
  width: 17rem;
}

.login-elements input[type=text], .login-elements input[type=password]{
  width: 17rem;
}

.login-title{
  font-family: 'JetBrains Mono', monospace;
}

.auth-error{
  color: rgb(128, 0, 0);
}
</style>
