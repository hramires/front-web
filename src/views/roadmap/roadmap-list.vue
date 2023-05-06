<script>
import { mapActions, mapState } from 'vuex';
import { BSpinner } from 'bootstrap-vue';
import CustomCard from '@components/custom-card';
import AddButton from '@components/add-button';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Roteiro' }],
  },
  data() {
    return {
      isLoading: false,
    };
  },
  components: { BSpinner, CustomCard, AddButton },
  created() {
    this.fetchRoadmaps();
  },
  computed: {
    ...mapState('roadmaps', ['roadmaps']),
  },
  methods: {
    ...mapActions('roadmaps', ['fetchAllRoadmaps']),
    async fetchRoadmaps() {
      this.isLoading = true;
      await this.fetchAllRoadmaps();
      if (this.roadmaps) {
        this.isLoading = false;
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
  },
};
</script>

<template>
  <div>
    <h1> ROTEIROS CADASTRADOS </h1>
    <b-container class="mw-100">
      <b-row v-if="!isLoading">
        <custom-card
          v-for="roadmap in roadmaps"
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
