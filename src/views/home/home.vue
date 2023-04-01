<script>
import { BCard, BButton } from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BButton,
  },
  methods: {
    onClick(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center pt-5">
    <b-card class="p-2 bg-primary">
      <b-card-body class="d-flex flex-column">
        <b-button variant="primary" class="buttonConfirm" @click="onClick('sign-in')">
          Login
        </b-button>
        <b-button variant="primary" class="mt-4 buttonConfirm" @click="onClick('sign-up')">
          Cadastro
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>
