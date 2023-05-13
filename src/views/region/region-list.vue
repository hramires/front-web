<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Regiões' }],
  },
  data() {
    return {
      isLoading: false,
    };
  },
  components: { BSpinner, CustomCard, AddButton },
  created() {
    this.fetchRegions();
  },
  computed: {
    ...mapState('regions', ['regions']),
  },
  methods: {
    ...mapActions('regions', ['fetchAllRegions']),
    async fetchRegions() {
      this.isLoading = true;
      await this.fetchAllRegions();
      if (this.regions) {
        this.isLoading = false;
      } else {
        this.$bvToast.toast('Erro ao buscar regiões', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          noCloseButton: true,
        });
      }
    },
    onClickCard(regionId) {
      this.$router.push({ name: 'visualizar-regiao', params: { id: regionId } });
    },
    onClickCreate() {
      this.$router.push({ name: 'cadastrar-regiao' });
    },
  },
};
</script>

<template>
  <div>
    <h1> REGIÕES CADASTRADOS </h1>
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="region in regions"
          :key="region.id"
          :item="region"
          @click="onClickCard(region.id)"
        />
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <add-button @click="onClickCreate"/>
  </div>
</template>
