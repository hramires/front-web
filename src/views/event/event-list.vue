<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';
import CustomFilter from '@components/custom-filter';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Eventos' }],
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
    this.fetchEvents();
  },
  computed: {
    ...mapState('events', ['events']),
    filteredPlaces() {
      const filterKeys = Object.keys(this.selectedFilters);

      if (filterKeys.length === 0) {
        return this.events;
      }

      return this.events.filter((event) => filterKeys.every((key) => {
        const selectedValues = this.selectedFilters[key];
        if (!selectedValues || selectedValues.length === 0) {
          return true;
        }

        const filter = this.filters.find((f) => f.name === key);
        const eventValue = event[filter.objectKey];

        return selectedValues.includes(eventValue);
      }));
    },
  },
  methods: {
    ...mapActions('events', ['fetchAllEvents']),
    async fetchEvents() {
      this.isLoading = true;
      await this.fetchAllEvents();
      if (this.events) {
        this.isLoading = false;
        this.createFilters();
      } else {
        this.$bvToast.toast('Erro ao buscar eventos', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          noCloseButton: true,
        });
      }
    },
    onClickCard(eventId) {
      this.$router.push({ name: 'visualizar-evento', params: { id: eventId } });
    },
    onClickCreate() {
      this.$router.push({ name: 'cadastrar-evento' });
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
        'place_id',
        'startDate',
        'endDate',
        'openingHour',
        'createdAt',
        'updatedAt',
      ];

      const filters = this.$refs.customFilter.createFilters(this.events, propertyNames, excludeProperties);
      this.filters = filters;
    },
  },
};
</script>

<template>
  <div>
    <h1> EVENTOS CADASTRADOS </h1>
    <custom-filter
      :filters="filters"
      @update:selectedFilters="updateSelectedFilters"
      ref="customFilter"
    />
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="event in events"
          :key="event.id"
          :item="event"
          @click="onClickCard(event.id)"
        />
      </b-row>
      <b-row v-else>
        <b-spinner label="Loading"></b-spinner>
      </b-row>
    </b-container>
    <add-button @click="onClickCreate"/>
  </div>
</template>
