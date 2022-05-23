<template>
  <div>
    <div id="titulo-main" :class="(logged)?'titulo-main-bubble' :''">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
      <Searchbar/>
      <UserBubble  v-if="logged"></UserBubble>
    </div>
    <div class="profile-elements">
      <h1>Results de la búsqueda: "{{searchParam}}"
      <br>
      </h1>
      <div class="projects-container">
        <h1 v-if="userPosts.length == 0" style="color:rgb(41, 41, 36)">No projects found</h1>
        <div v-for="project in userPosts" :key="project.post_id" class="project">
          <h2>{{project.name}}</h2> by {{project.username}} <br>
          <input type="button" value="Detalles del proyecto" @click="projectDetails" :postId="project.post_id">
          <input type="button" value="Abrir proyecto" @click="openProject" :postId="project.post_id">
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
  name: 'ProfileComponent',
  components:{
    Searchbar,
    UserBubble
  },
  data: function(){
    return {
      uploadForm:{
        name:"",
        description:"",
        file:"",
        username: ""
      },
      clickBubble : false,
      userPosts: [],
      searchParam:""
    };
  },
  props:{
    logged:{
      type: Boolean,
      default: false
    },
    userData:{}
  },
  methods: {
    projectDetails(event){
      this.$router.push("/post/"+event.target.attributes.postid.value);
    },
    getPostsFromServer(searchParam){
      axios.get('/search/'+searchParam).then((response)=>{
        this.userPosts = response.data;
      })
      .catch((err)=>{
        console.error(err);
      });
    },
    openProject(event){
      console.log(event.target.attributes.postid.value);
      var projectId = event.target.attributes.postid.value
      window.location.href = window.snapUrl+"?projectId="+projectId
    }
  },
  mounted(){
    this.searchParam = this.$route.params.searchParam;
    if(this.$route.params.searchParam != undefined) this.getPostsFromServer(this.searchParam);
    else this.getPostsFromServer("");
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
  height: 70vh;
  background: rgb(182, 181, 163);
  overflow: auto;
  border-radius: 0.25rem;
}

.project{
  background:rgb(75, 75, 75);
  width: 80%;
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

.upload-error{
  color: rgb(70, 0, 0);
}
</style>
