<template>
  <div>
    <div id="titulo-main" :class="(logged)?'titulo-main-bubble' :''">
      <router-link to="/"><h1>SNAP<i>!</i>-ROBOT</h1></router-link>
      <Searchbar/>
      <UserBubble  v-if="logged"></UserBubble>
    </div>
    <div class="profile-elements">
      <h1><i class="fa-solid fa-robot"></i><b id="username">{{username}}</b>
      <br>
        <!-- <input type="button" value="+ Follow"> -->
      </h1>
      <div class="projects-container">
        <div class="project" v-if="userData.name == username">
          <input type="text" v-model="uploadForm.name" placeholder="Nombre del proyecto"> by {{username}} <br>
          <textarea name="desc" v-model="uploadForm.description" id="project-desc" placeholder="Descripción del proyecto"></textarea>
          <input type="file" name="project-upload" id="file-project-upload" @change="interceptFile"> <br>
          <p class="upload-error">{{error}}</p>
          <input type="button" @click="uploadFileToServer" value="Subir proyecto">
        </div>
        <h1 v-if="userPosts.length == 0 && username != userData.name" style="color:rgb(41, 41, 36)">El usuario no tiene proyectos</h1>
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
      username: "",
      error:""
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
    uploadFileToServer(){
      this.uploadForm.username = this.username;
      axios.post("uploadProject", this.uploadForm).then((response)=>{
        console.log(response);
        if(!response.data.success){
          this.error = response.data.message
        } else{
          this.uploadForm.name = "";
          this.uploadForm.description = "";
          this.uploadForm.file = "";
          this.getPostsFromServer(this.username);
        }
      })
      .catch((err)=>{
        console.log(err);
        this.error = err;
      });
    },
    interceptFile(event){
      event.preventDefault();
      this.getStringXML(event.target.files[0]).then((resolve)=>{
        this.uploadForm.file = resolve;
      })
      .catch((err)=>{
        console.log(err);
      });
    },
    getStringXML(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                resolve(reader.result )
            };
            reader.onerror = reject;
        });
    },
    getPostsFromServer(username){
      axios.post('/profile/'+username).then((response)=>{
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
    this.username = this.$route.params.profileUsername;
    if (this.username == undefined) {
      if(this.userData.name == undefined){
        this.username = JSON.parse(localStorage.getItem("userData")).name;
        this.getPostsFromServer(JSON.parse(localStorage.getItem("userData")).name);
      }
      else{
        this.username = this.userData.name;
        this.getPostsFromServer(this.userData.name);
      }
    } else {
      this.getPostsFromServer(this.username);
    }
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

.profile-elements h1 i{
  background:rgb(75, 75, 75);
  border-radius: 50%;
  aspect-ratio: 1/1;
  padding: 1rem;
  margin-right: 1rem;;
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

@media screen and (max-width: 1225px) {
  .profile-elements{
    width: 90%;
  }
  .projects-container{
    width: 100%;
  }
}

@media screen and (max-width: 670px) {
  .profile-elements{
    width: 100%;
  }
  .projects-container{
    width: 100%;
    background: transparent;
  }
}
</style>
