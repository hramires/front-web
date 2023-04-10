<script>
import { mapActions } from 'vuex';
import {
  BCard, BButton, BSpinner,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Locais' }],
  },
  data() {
    return {
      isLoading: false,
      places: [],
    };
  },
  components: { BCard, BButton, BSpinner },
  created() {
    this.fetchPlaces();
  },
  methods: {
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchPlaces() {
      this.isLoading = true;
      this.places = await this.fetchAllPlaces();
      if (this.places) {
        this.isLoading = false;
      }
    },
  },
};

</script>

<template>
  <div>
    <h1> LOCAIS CADASTRADOS </h1>
    <b-container :class="$style.container">
      <b-row v-if="!isLoading">
        <b-card
          v-for="place in places"
          :key="place.id"
          :class="$style.card"
          :title="place.name"
          img-src="https://uploaddeimagens.com.br/images/004/421/358/full/Captura_de_tela_2023-04-07_133049.png?1680885102"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>{{ place.description }}</b-card-text>
          <div class="d-flex justify-content-between align-items-center" :class="$style.footer">
            <b-card-text :class="$style.updated">Last updated 3 minutes ago</b-card-text>
            <b-button
              variant="primary"
              @click="$router.push({ name: 'editar-local', params: {id: place.id}})"
            >
              Editar
            </b-button>
          </div>
        </b-card>
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <button class="floatButton" @click="$router.push({name: 'cadastro-local'})">+</button>
  </div>
</template>

<style type="scss" module>

.container {
  max-width: 100%;
}
.card{
  position: 'relative';
  margin: 0;
  border-radius: 20px;
  margin-bottom: 2rem;
  margin-right: 2rem;
  width: 20rem;
  max-width: 20rem;
  height: 24rem;
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
