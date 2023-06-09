<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';
import CustomFilter from '@components/custom-filter';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Locais' }],
  },
  data() {
    return {
      isLoading: false,
      filters: [],
      selectedFilters: {},
    };
  },
  components: {
    BSpinner, CustomCard, AddButton, CustomFilter,
  },
  created() {
    this.fetchPlaces();
  },
  computed: {
    ...mapState('places', ['places']),
    filteredPlaces() {
      const filterKeys = Object.keys(this.selectedFilters);

      if (filterKeys.length === 0) {
        return this.places;
      }

      return this.places.filter((place) => filterKeys.every((key) => {
        const selectedValues = this.selectedFilters[key];
        if (!selectedValues || selectedValues.length === 0) {
          return true;
        }

        const filter = this.filters.find((f) => f.name === key);
        const placeValue = place[filter.objectKey];

        return selectedValues.includes(placeValue);
      }));
    },
  },
  methods: {
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchPlaces() {
      this.isLoading = true;
      await this.fetchAllPlaces();
      if (this.places) {
        this.createFilters();
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
    updateSelectedFilters(newSelectedFilters) {
      this.selectedFilters = newSelectedFilters;
    },
    createFilters() {
      const propertyNames = [
        { key: 'region_id', name: 'Região' },
      ];

      const excludeProperties = [
        'id',
        'name',
        'description',
        'photos',
        'openingHour',
        'contact',
        'latitude',
        'longitude',
        'createdAt',
        'updatedAt',
        'appointment',
        'address',
      ];

      const filters = [];
      this.places.forEach((place) => {
        Object.keys(place).forEach((key) => {
          if (excludeProperties.includes(key)) {
            return;
          }

          const propertyName = propertyNames.find((property) => property.key === key);
          const displayName = propertyName ? propertyName.name : key;

          const filter = filters.find((filter) => filter.objectKey === key);
          if (filter) {
            if (!filter.values.includes(place[key])) {
              filter.values.push(place[key]);
            }
          } else {
            filters.push({ name: displayName, values: [place[key]], objectKey: key });
          }
        });
      });
      this.filters = filters;
    },
  },
};
</script>

<template>
  <div>
    <h1> LOCAIS CADASTRADOS </h1>
    <custom-filter
      :filters="filters"
      @update:selectedFilters="updateSelectedFilters"
    />
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="place in filteredPlaces"
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
