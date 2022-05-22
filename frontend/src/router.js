import Vue from "vue";
import VueRouter from 'vue-router'
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import RobotArm from "./views/RobotArm.vue";

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/robotArm",
      name: "robotArm",
      component: RobotArm,
      meta: {
        guest: true
      }
    },
    {
      path: "/profile/:profileUsername",
      name: "profile",
      component: Profile,
      meta: {
        guest: true
      }
    },
    {
      path: "/myProfile",
      name: "my-profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ];
  
const router = new VueRouter({
    mode: "history",
    routes
  });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("isLogged")) {
      next({ name: 'home' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});
  
  export default router;
  