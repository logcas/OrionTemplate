import VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page1" */ 'views/page1.vue')
  },
  {
    path: '/2',
    component: () => import(/* webpackChunkName: "page2" */ 'views/page2.vue')
  }
];

export default new VueRouter({
  routes
});
