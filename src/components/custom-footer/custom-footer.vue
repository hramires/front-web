<script>
import { BContainer } from 'bootstrap-vue';

export default {
  components: { BContainer },
};
</script>

<template>
  <footer :class="$style.customFooter" class="d-flex align-items-center bg-primary">
    <b-container class="d-flex justify-content-between mw-100">
      <span>Telefone: (51) 999999999</span>
      <span>Email: rotas.rurais@gmail.com</span>
    </b-container>
  </footer>
</template>

<style lang="scss" module>
.customFooter {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
  color: white;
}

</style>
