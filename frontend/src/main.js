import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/css/main.css'

import io from 'socket.io-client'
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io('http://localhost:3000'),
  })
);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')