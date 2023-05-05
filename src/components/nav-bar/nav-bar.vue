<script>
import {
  BNavbar, BNavbarBrand, BButton, BAvatar,
} from 'bootstrap-vue';

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BButton,
    BAvatar,
  },
  computed: {
    buttons() {
      return [
        {
          name: 'Locais',
          routeName: 'listar-local',
        },
        {
          name: 'Categorias',
          routeName: 'categoria',
        },
        {
          name: 'Eventos',
          routeName: 'listar-evento',
        },
        {
          name: 'Regiões',
          routeName: 'regiao',
        },
        {
          name: 'Roteiros',
          routeName: 'roteiro',
        },
      ];
    },
    shouldShowButtons() {
      // check if user is logged in
      return this.$route.name !== 'sign-in';
    },
  },
  methods: {
    onClick(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<template>
    <b-navbar variant="secondary" class="pt-4 mb-5">
      <b-navbar-brand :class="$style.logoImage">
        <b-avatar size="8rem" :src="require('../../assets/images/logo.png')"/>
      </b-navbar-brand>

      <div v-if="shouldShowButtons" :class="$style.buttonGroup" class="d-flex pt-4">
        <b-button
          v-for="button in buttons"
          :key="button.routeName"
          :variant="$route.name == button.routeName ? 'primary' : 'outline-primary'"
          class="mr-2"
          @click="onClick(button.routeName)"
        >{{button.name}}</b-button>
      </div>
      <h1 v-else class="d-flex w-100 text-uppercase justify-content-center">
        Rotas Rurais da Serra
      </h1>
    </b-navbar>
</template>

<style lang="scss" module>
.logoImage {
  position: absolute;
  top: .5rem;
}

.buttonGroup {
  margin-left: 10rem;
}

</style>
