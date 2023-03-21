import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import router from './router';
import App from './app.vue';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// eslint-disable-next-line no-new
const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

export default app;
