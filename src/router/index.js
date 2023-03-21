import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta, {
  // The component prop name that vue-meta looks for meta info
  keyName: 'page',
});

const router = new VueRouter({
  routes,
  mode: 'history',
  // to remember position on page when going back
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
