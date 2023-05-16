<script>
import { BCard } from 'bootstrap-vue';

export default {
  components: { BCard },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    truncatedDescription() {
      if (this.item.description.length > 150) {
        return this.item.description.substring(0, 150) + '...';
      }
      return this.item.description;
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<template>
  <b-card
    :class="$style.card"
    :title="item.name"
    img-src="https://uploaddeimagens.com.br/images/004/421/358/full/Captura_de_tela_2023-04-07_133049.png?1680885102"
    img-alt="Image"
    img-top
    tag="article"
    @click="onClick"
  >
    <b-card-text>{{ truncatedDescription }}</b-card-text>
    <div class="d-flex justify-content-between align-items-center" :class="$style.footer">
      <b-card-text :class="$style.updated">{{ item.lastUpdated }}</b-card-text>
    </div>
  </b-card>
</template>

<style lang="scss" module>
.card{
  position: 'relative';
  margin: 0;
  border-radius: 20px;
  margin-bottom: 2rem;
  margin-right: 2rem;
  width: 20rem;
  max-width: 20rem;
  height: 24rem;
  cursor: pointer;
}

.card:hover{
  box-shadow: 0 10px 20px 0 rgba(0,0,0,0.2);
}

.updated{
  margin: 0;
  font-size: 0.7em;
}

.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem;
}
</style>
