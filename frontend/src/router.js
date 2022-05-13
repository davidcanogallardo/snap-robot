import Vue from "vue";
import VueRouter from 'vue-router'
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import RobotArm from "./views/RobotArm.vue";

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/robotArm",
      name: "robotArm",
      component: RobotArm
    }
  ];
  
const router = new VueRouter({
    mode: "history",
    routes
  });
  
  export default router;
  