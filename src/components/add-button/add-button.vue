<script>
import { BButton } from 'bootstrap-vue';

export default {
  components: { BButton },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<template>
  <b-button class="floatButton" @click="onClick">+</b-button>
</template>
