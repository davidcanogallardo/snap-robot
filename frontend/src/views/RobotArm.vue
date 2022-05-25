<template>
  <div>
    <div id="titulo-main" :class="(logged)?'titulo-main-bubble' :''">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
      <Searchbar/>
      <UserBubble  v-if="logged"></UserBubble>
    </div>
    <div class="robot-elements">
      <input type="text" class="input-code" placeholder="INTRODUCE CÓDIGO DE SALA" v-model="roomId">
      <input type="button" value="Unirme a una sala" @click="joinRoom">
      <hr>
      <input type="button" value="Crear una sala" @click="createRoom(false)">
      <input type="button" value="Crear una sala para snap" @click="createRoom(true)">
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import UserBubble from '../components/UserBubble.vue'
export default {
  name: 'RobotArmComponent',
  components:{
    Searchbar,
    UserBubble
  },
  data() {
    return {
      roomId: ""
    }
  },
  props:{
    logged:{
      type: Boolean,
      default: false
    },
    userData:{}
  },
  methods:{
    createRoom(snap) {
      var url
      if (snap) {
        url = window.snapUrl
      } else {
        url = window.armUrl
      }
      console.log(url);
      console.log(window.armUrl);
      console.log(window.snapUrl);
      this.$socket.emit('createRoom', (data) => {
        console.log("socket data", data);
        this.redirect(data.roomId, url)
      })
    },
    joinRoom() {
      if (this.roomId == "") {
        this.wrongCode()
      } else {
        this.$socket.emit('roomExists', this.roomId, (data) => {
          console.log("socket data", data);
          if (data.roomExists) {
            this.redirect(this.roomId, window.armUrl)
          } else {
            this.wrongCode()
          }
        })
      }
    },
    redirect(roomId, url) {
      console.log(roomId,1111)
      var socketData = {
        "armRoomId": roomId,
      }
      localStorage.setItem("socketData", JSON.stringify(socketData))
      document.location.href = url+"?roomId="+roomId;
    },
    wrongCode(){
      let inputCode = document.querySelector('.input-code');
      inputCode.classList.add("wrongCode");
      setTimeout(function(){
        inputCode.classList.remove("wrongCode");
      },750)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.robot-elements{
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  margin: 6rem auto;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.robot-elements input[type=button]{
  min-width: 17rem;
}

.robot-elements input[type=text]{
  min-width: 17rem;
}

.wrongCode {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  box-shadow: none;
  background-color: rgb(85, 64, 64);
  box-shadow:  inset 0px 0px 5px 1px rgb(199, 0, 0);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
