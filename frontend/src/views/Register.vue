<template>
  <div>
    <div id="titulo-main">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
    </div>
    <div class="register-elements">
      <h1 class="register-title">REGISTRARSE</h1>
      <input type="text" v-model="registerForm.name" placeholder="Username">
      <input type="text" v-model="registerForm.email" placeholder="E-mail">
      <input type="password" v-model="registerForm.password" placeholder="Contraseña">
      <input type="password" v-model="registerForm.c_password" placeholder="Repetir Contraseña">
      <input type="button" @click="register" value="Registrarse">
      <p class="auth-error">{{error}}</p>
      <hr>
      <router-link to="/login"><input type="button" value="Login"></router-link>
    </div>
  </div>
</template>

<script>
import axios from '../axios_import.js'
export default {
  name: 'RegisterComponent',
  data: function(){
    return {
      registerForm:{
        name: "",
        email:"",
        password:"",
        c_password:""
      },
      error:""
    };
  },
  methods:{
    register(){
       axios.get("csrf-cookie").then((response) => {
         console.log(response)
         axios.post("register", this.registerForm)
           .then((response)=>{
              console.log(response);
              this.$router.push("/");
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
.register-elements{
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

.register-elements input[type=button]{
  width: 17rem;
}

.register-elements input[type=text], .register-elements input[type=password]{
  width: 17rem;
}

.register-title{
  font-family: 'JetBrains Mono', monospace;
}

.auth-error{
  color: rgb(128, 0, 0);
}
</style>
