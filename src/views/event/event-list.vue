<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Eventos' }],
  },
  data() {
    return {
      isLoading: false,
    };
  },
  components: { BSpinner, CustomCard, AddButton },
  created() {
    this.fetchEvents();
  },
  computed: {
    ...mapState('events', ['events']),
  },
  methods: {
    ...mapActions('events', ['fetchAllEvents']),
    async fetchEvents() {
      this.isLoading = true;
      await this.fetchAllEvents();
      if (this.events) {
        this.isLoading = false;
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
  },
};
</script>

<template>
  <div>
    <h1> EVENTOS CADASTRADOS </h1>
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
