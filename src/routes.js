import Vue from 'vue';
import VueRouter from 'vue-router';

import Form from '@/components/Form';
import Table from '@/components/Table';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/form', component: Form },
    { path: '/', component: Table }
  ]
});
export default router;
