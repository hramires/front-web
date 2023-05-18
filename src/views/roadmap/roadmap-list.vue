<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';
import CustomFilter from '@components/custom-filter';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Roteiro' }],
  },
  data() {
    return {
      isLoading: false,
      filters: [],
      selectedFilters: {},
    };
  },
  components: { BSpinner, CustomCard, AddButton, CustomFilter },
  created() {
    this.fetchRoadmaps();
  },
  computed: {
    ...mapState('roadmaps', ['roadmaps']),
    filteredRoadmaps() {
      const filterKeys = Object.keys(this.selectedFilters);

      if (filterKeys.length === 0) {
        return this.roadmaps;
      }

      return this.roadmaps.filter((roadmap) => filterKeys.every((key) => {
        const selectedValues = this.selectedFilters[key];
        if (!selectedValues || selectedValues.length === 0) {
          return true;
        }

        const filter = this.filters.find((f) => f.name === key);
        const roadmapValue = roadmap[filter.objectKey];

        return selectedValues.includes(roadmapValue);
      }));
    },
  },
  methods: {
    ...mapActions('roadmaps', ['fetchAllRoadmaps']),
    async fetchRoadmaps() {
      this.isLoading = true;
      await this.fetchAllRoadmaps();
      if (this.roadmaps) {
        this.isLoading = false;
        this.createFilters();
      } else {
        this.$bvToast.toast('Erro ao buscar roteiros', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          noCloseButton: true,
        });
      }
    },
    onClickCard(roadmapId) {
      this.$router.push({ name: 'visualizar-roteiro', params: { id: roadmapId } });
    },
    onClickCreate() {
      this.$router.push({ name: 'cadastrar-roteiro' });
    },
    updateSelectedFilters(newSelectedFilters) {
      this.selectedFilters = newSelectedFilters;
    },
    createFilters() {
      const propertyNames = [
        { key: 'name', name: 'Nomes' },
        { key: 'description', name: 'Descrição' },
      ];

      const excludeProperties = [
        'id',
        'createdAt',
        'updatedAt',
      ];

      const filters = this.$refs.customFilter.createFilters(this.roadmaps, propertyNames, excludeProperties);
      this.filters = filters;
    },
  },
};
</script>

<template>
  <div>
    <h1> ROTEIROS CADASTRADOS </h1>
    <custom-filter
      :filters="filters"
      @update:selectedFilters="updateSelectedFilters"
      ref="customFilter"
    />
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="roadmap in filteredRoadmaps"
          :key="roadmap.id"
          :item="roadmap"
          @click="onClickCard(roadmap.id)"
        />
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <add-button @click="onClickCreate"/>
  </div>
</template>
