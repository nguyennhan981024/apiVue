import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/routes';

Vue.config.productionTip = false;

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import rules from './validate';
rules();

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
