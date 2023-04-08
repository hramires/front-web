<script>
import appConfig from '@config/app.config.json';
import NavBar from '@components/nav-bar';
import CustomFooter from '@components/custom-footer';

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
  components: { NavBar, CustomFooter },
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
    <nav-bar />
    <div id="container">
      <router-view :key="pathWithQueryString" />
    </div>
    <custom-footer />
  </div>
</template>

<!-- This should be the only global CSS in the app. -->
<style lang="scss">
// Import custom SASS variable overrides, or alternatively
@import './assets/css/custom.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/src/index.scss';

@font-face {
  font-family: 'BigShoulders';
  src: url('./assets/fonts/BigShouldersDisplay-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'FireSans';
  src: url('./assets/fonts/FiraSans-Regular.ttf') format('truetype');
}

body {
  font-family: 'FireSans' !important;
}

body, #app {
  position: relative;
  min-height: 100vh;
}

#container {
  padding-bottom: 4.5rem;
}

h1 {
  font-family: 'BigShoulders' !important;
  font-weight: 800;
  color: $primary;
}

.btn-outline-primary{
  background-color: $light;
}

.buttonConfirm {
  background-color: $confirm;
  color: $light;
}

</style>
