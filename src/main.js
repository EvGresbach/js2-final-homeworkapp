import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false

new Vue({
  firebase,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
