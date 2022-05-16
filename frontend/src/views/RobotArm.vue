<template>
  <div>
    <div id="titulo-main">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link><Searchbar/>
    </div>
    <div class="robot-elements">
      <input type="text" class="input-code" placeholder="ENTER ROOM CODE" v-model="roomId">
      <input type="button" value="Join to a room" @click="joinRoom">
      <hr>
      <input type="button" value="Host a robotic arm" @click="createRoom">
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
export default {
  name: 'RobotArmComponent',
  components:{
    Searchbar
  },
  data() {
    return {
      roomId: ""
    }
  },
  methods:{
    createRoom() {
      this.$socket.emit('createRoom', (data) => {
        console.log("socket data", data);
        var snapData = {
          "armRoomId": data.roomId,
        }
        localStorage.setItem("snapData", JSON.stringify(snapData))
        document.location.href = './arm.html';
      })
    },
    joinRoom() {
      if (this.roomId == "") {
        this.wrongCode()
      } else {
        this.$socket.emit('roomExists', this.roomId, (data) => {
          console.log("socket data", data);
          if (data.roomExists) {
            // redirigir a donde sea
          } else {
            this.wrongCode()
          }
        })
      }
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

.robot-elements input[type=button]{
  width: 17rem;
}

.robot-elements input[type=text]{
  width: 17rem;
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
