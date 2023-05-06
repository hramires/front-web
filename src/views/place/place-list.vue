<script>
import { mapActions, mapState } from 'vuex';
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
    };
  },
  components: { BSpinner, CustomCard, AddButton },
  created() {
    this.fetchPlaces();
  },
  computed: {
    ...mapState('places', ['places']),
  },
  methods: {
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchPlaces() {
      this.isLoading = true;
      await this.fetchAllPlaces();
      if (this.places) {
        this.isLoading = false;
      } else {
        this.$bvToast.toast('Erro ao buscar locais', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          noCloseButton: true,
        });
      }
    },
    onClickCard(placeId) {
      this.$router.push({ name: 'visualizar-local', params: { id: placeId } });
    },
    onClickCreate() {
      this.$router.push({ name: 'cadastrar-local' });
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
          @click="onClickCard(place.id)"
        />
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <add-button @click="onClickCreate"/>
  </div>
</template>
