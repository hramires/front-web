<script>
import { BCard, BButton } from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BButton,
  },
  methods: {
    onClick() {
      this.$router.push({ name: 'sign-in' });
    },
  },
};
</script>

<template>
    <div class="d-flex justify-content-center">
      <b-card title="Home!!" class="m-2 p-2">
        <b-button variant="primary" class="mt-4" @click="onClick">Sign In</b-button>
      </b-card>
    </div>
</template>

<style lang="scss" module>

body {
  padding: 10em;
}

</style>
