import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";


Vue.use(Vuetify)
import "vuetify/dist/vuetify.min.css";
import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify : new Vuetify(),
  render: h => h(App),
}).$mount('#app')
