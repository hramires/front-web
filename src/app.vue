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
  padding: 2rem 8rem;
  padding-bottom: 6rem;
}

h1 {
  font-family: 'BigShoulders' !important;
  font-weight: 800;
  color: $primary;
}

label {
  font-family: "FireSans";
  font-size: 1.75rem;
  font-weight: 600;
  color: #024053;
  line-height: 2rem;
}

.title {
  font-family: "BigShoulders";
  font-size: 3rem;
  font-weight: 900;
}

.btn-outline-primary {
  background-color: $light;
}

.buttonConfirm {
  background-color: $confirm;
  color: $light;
}

.table-striped thead, .table-striped > tbody > tr > td, .table-striped > tbody > tr > th {
  background-color: $grey;
}

.table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
  background-color: $green;
}

.table {
  color: $dark;
}

.textInput {
  background-color: $grey;
  border-radius: 0.25rem;
  border: $grey;
}

.textArea {
  background-color: #F8F9FA;
  border-radius: 0.25rem;
  border: aliceblue;
  overflow-y: hidden !important;
}

.border {
  border-radius: 0.75rem;
  border-color: #9DCC9A !important;
}

.image {
  margin: 0.3rem 0.3rem;
  width: 8rem;
  min-width: 8rem;
  height: 8rem;
  min-height: 8rem;
  background-color: $green;
}

.autocomplete-form {
  margin: {
    top: 25px;
    left: 15px;
    right: 15px;
  }

  &-input-elements {
    display: flex;
  flex-flow: column nowrap;
  justify-content:center;
  align-items: center;
  }

  &-items {
  position: absolute;
  width: inherit;
    border: {
      width:1px;
      style:solid;
      color: $light-grey;

    }
  }

  input {
    margin-bottom: 1px;
  }
  .hide {
    display: none;
  }
}

</style>
