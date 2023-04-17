<script>
import { BModal, BButton } from 'bootstrap-vue';

export default {
  components: { BModal, BButton },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    onClickYes() {
      this.$emit('clickYes');
    },
    onClickNo() {
      this.$refs.modal.hide();
    },
  },
};
</script>

<template>
  <b-modal ref="modal" title="Tem certeza que deseja deletar?" hide-footer>
    <b-button variant="danger" @click="onClickYes">Sim</b-button>
    <b-button variant="info" @click="onClickNo">Não</b-button>
  </b-modal>
</template>
