import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';
import router from '@/router';
import store from '@/store';

Vue.use(VueRouter);

if(!PRODUCTION) {
  console.log(
     'Orion - Vue.js unofficial CLI\n'
   + '-----------------------------------\n'
   + 'cli-version: v0.0.1\n'
   + 'Vue.js version: v2.6.10\n'
   + 'mode: development\n'
   + '-----------------------------------\n'
   + 'This message will not be printed when you are in production mode.'
  )
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
