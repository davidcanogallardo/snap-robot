<template>
  <div>
    <div id="titulo-main" :class="(logged)?'titulo-main-bubble' :''">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
      <Searchbar/>
      <UserBubble  v-if="logged"></UserBubble>
    </div>
    <div class="profile-elements">
      <h1><b>{{post.name}}</b>
      <br>
      by {{post.username}}
        <!-- <input type="button" value="+ Follow"> -->
      </h1>
      <div class="projects-container">
        <div class="project">
          <h2>Description:</h2>{{post.post_desc}} <br>
          <input type="button" value="Open Project" @click="openProject">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import UserBubble from '../components/UserBubble.vue'
import axios from '../axios_import';
export default {
  name: 'PostComponent',
  components:{
    Searchbar,
    UserBubble
  },
  data: function(){
    return {
      clickBubble : false,
      username: "",
      postId: 0,
      post:{}
    };
  },
  props:{
    logged:{
      type: Boolean,
      default: false
    },
    userData:{}
  },
  methods:{
    openProject(){
      //TODO LOCATION HREF OR SOMETHING
    }
  },
  mounted(){
    this.postId = this.$route.params.postId;
    axios.get("post/"+this.postId).then((response)=>{
        this.post = response.data[0];
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#titulo-main{
  justify-content: space-between;
}

.profile-elements{
  margin: auto;
  vertical-align: center;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
}

.profile-elements h1{
  width: max-content;
  white-space:nowrap;
  margin: 1rem;
}

.projects-container{
  width: 100%;
  height: max-content;
  max-height: 70vh;
  background: rgb(182, 181, 163);
  overflow: auto;
  border-radius: 0.25rem;
}

.project{
  background:rgb(75, 75, 75);
  width: 80%;
  height: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 1rem;
}

.project input[type=button]{
  margin-top: 4rem;
}

input[type=file], input[type=file] ~ input[type=button], input[type=text]{
  max-width: 90%;
  margin: 1rem auto;
}

textarea{
  width: 90%;
  height: 5rem;
  margin: auto;
  resize: none;
}
</style>
