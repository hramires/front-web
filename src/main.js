import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { sync } from 'vuex-router-sync';
import store from '@state/store';
import * as VueGoogleMaps from 'vue2-google-maps';
import router from './router';
import App from './app.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// AIzaSyDPMSn3lspQqrfT-LyMj1sGprarZZCezUQ - maps api key
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDPMSn3lspQqrfT-LyMj1sGprarZZCezUQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // If you want to set the version, you can do so:
    // v: '3.26',
  },

  // If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  // autobindAllEvents: false,

  // If you want to manually install components, e.g.
  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then disable the following:
  // installComponents: true,
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

sync(store, router);

// eslint-disable-next-line no-new
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default app;
