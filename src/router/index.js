import VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page1" */ 'views/Page1.vue')
  },
  {
    path: '/2',
    component: () => import(/* webpackChunkName: "page2" */ 'views/Page2.vue')
  }
];

export default new VueRouter({
  routes
});
