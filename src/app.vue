<script>
import appConfig from './config/app.config.json';

export default {
  name: 'app',
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      // eslint-disable-next-line no-param-reassign
      title = typeof title === 'function' ? title({ store: this.$store, route: this.$route }) : title;

      if (!title) {
        // eslint-disable-next-line no-param-reassign
        title = this.$route.meta.titleKey ? this.$route.meta.titleKey : null;
      }

      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  computed: {
    pathWithQueryString() {
      const queryString = new URLSearchParams(this.$route.query);
      return `${this.$route.path}?${queryString}`;
    },
  },
};
</script>

<template>
  <div id="app">
    <router-view :key="pathWithQueryString" />
  </div>
</template>

<!-- This should be the only global CSS in the app. -->
<style lang="scss">
// Import Bootstrap and BootstrapVue CSS files (order is important)
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

</style>
