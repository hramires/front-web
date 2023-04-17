<script>
import { mapActions } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';

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
  components: { BSpinner, CustomCard, AddButton },
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
    onClickEdit(placeId) {
      this.$router.push({ name: 'editar-local', params: { id: placeId } });
    },
    onClickCreate() {
      this.$router.push({ name: 'cadastro-local' });
    },
  },
};
</script>

<template>
  <div>
    <h1> LOCAIS CADASTRADOS </h1>
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="place in places"
          :key="place.id"
          :item="place"
          @click="onClickEdit(place.id)"
        />
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <add-button @click="onClickCreate"/>
  </div>
</template>
