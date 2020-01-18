import Vue from 'vue';
import App from './App.vue';
import { router } from './routes/index.js';
import { store } from './store/index.js';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router: router 앞뒤 값이 같을 때 축약가능
  router, //router: router
  store
}).$mount('#app');
