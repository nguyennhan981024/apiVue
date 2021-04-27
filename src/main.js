import Vue from 'vue';
import App from './App.vue';
import store from '@/store';

Vue.config.productionTip = false;

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import rules from './validate'

rules();

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
