<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';
import DeleteModal from '@components/delete-modal';
import cloneDeep from 'lodash/cloneDeep';

export default {
  page: {
    meta: [{ name: 'description', content: 'Cadastro Roteiro' }],
  },
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BDropdown,
    DeleteModal,
  },
  data() {
    return {
      isLoading: false,
      roadmap: {
        id: null,
        name: null,
        description: null,
        photo_id: null,
        region_id: null,
      },
      selectedPlaces: [],
      selectedCategories: [],
      regions: [
        {
          id: 1,
          name: 'Região 1',
        },
        {
          id: 2,
          name: 'Região 2',
        },
      ],
      images: [
        {
          id: 1,
          blank: true,
          blankColor: '#000',
          src: '',
        },
      ],
    };
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('places', ['places']),
    ...mapGetters('roadmaps', ['getRoadmapsById']),
    roadmapId() {
      return this.$route.params.id;
    },
    isEditMode() {
      return this.$route.name.includes('editar');
    },
    isCreateMode() {
      return this.$route.name.includes('cadastrar');
    },
    regionButtonTitle() {
      if (this.roadmap.region_id) {
        const selectedRegion = this.regions.find((r) => r.id === this.roadmap.region_id);
        return selectedRegion.name;
      }
      return 'Selecione a Região';
    },
  },
  async created() {
    this.fetchCategories();
    this.fetchRoadmap();
    this.fetchPlaces();
  },
  methods: {
    ...mapActions('roadmap', ['fetchRoadmapById', 'createRoadmap', 'updateRoadmap', 'deleteRoadmap']),
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchRoadmap() {
      if (this.roadmapId) {
        this.isLoading = true;
        const roadmapTemp = this.getRoadmapById(this.roadmapId);
        if (roadmapTemp) {
          this.roadmap = cloneDeep(roadmapTemp);
        } else {
          const roadmapTemp = await this.fetchRoadmapById({ roadmapId: this.roadmapId });
          if (roadmapTemp) {
            this.roadmap = cloneDeep(roadmapTemp);
          }
        }
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      await this.fetchAllCategories();
      this.categories.forEach((object) => {
        object.Categoria = object.name;
        delete object.createdAt;
        delete object.updatedAt;
        delete object.name;
      });
    },
    async fetchPlaces() {
      await this.fetchAllPlaces();
      this.places.forEach((object) => {
        object.Local = object.name;
        delete object.createdAt;
        delete object.updatedAt;
        delete object.name;
      });
    },
    selectCategory(categoryId) {
      const selectedCategory = this.categories.find((c) => c.id === categoryId);
      if (selectedCategory) {
        const alreadyExists = this.selectedCategories.find((c) => c.id === categoryId);
        if (!alreadyExists) {
          this.selectedCategories.push(selectedCategory);
          this.roadmap.roadmapCategory_id = selectedCategory.id;
        }
      }
    },
    selectPlaces(placeId) {
      const selectedPlace = this.places.find((p) => p.id === placeId);
      if (selectedPlace) {
        const alreadyExists = this.selectedPlaces.find((p) => p.id === placeId);
        if (!alreadyExists) {
          this.selectedPlaces.push(selectedPlace);
          this.roadmap.roadmapPlace_id = selectedPlace.id;
        }
      }
    },
    selectRegion(regionId) {
      const selectedRegion = this.regions.find((r) => r.id === regionId);
      this.roadmap.region_id = selectedRegion.id;
    },
    async onSubmit() {
      if (!this.roadmapId) {
        const newRoadmap = await this.createRoadmap({ params: this.roadmap });
        if (newRoadmap) {
          this.$bvToast.toast('Roteiro criado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-roteiro' });
        } else {
          this.$bvToast.toast('Erro ao criar roteiro', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            noCloseButton: true,
          });
        }
      } else {
        const newRoadmap = await this.updateRoadmap({ id: this.roadmapId, params: this.roadmap });
        if (newRoadmap) {
          this.$bvToast.toast('Roteiro atualizado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-roteiro' });
        } else {
          this.$bvToast.toast('Erro ao atualizar roteiro', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            noCloseButton: true,
          });
        }
      }
    },
    showDeleteModal() {
      this.$refs.deleteModal.show();
    },
    async deleteRoadmapById() {
      await this.deleteRoadmap({ roadmapId: this.roadmapId });
      this.$router.push({ name: 'listar-roteiro' });
    },
    clickEdit() {
      this.$router.push({ name: 'editar-roteiro', params: { id: this.roadmapId } });
    },
    clickBack() {
      if (this.isEditMode) {
        this.$router.push({ name: 'visualizar-roteiro' });
        return;
      }
      this.$router.push({ name: 'listar-roteiro' });
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2" @click="clickBack">Voltar</b-button>
    <b-button
      v-if="!isEditMode && roadmapId"
      variant="primary"
      class="mb-2"
      @click="clickEdit"
    >
      Editar
    </b-button>
    <h1 class="text-primary title">
      {{ roadmapId ? 'PAINEL DE GERENCIAMENTO - ROTEIRO' : 'PAINEL DE CADASTRO - ROTEIRO'}}
    </h1>
    <div class="border border-primary">
      <b-row :class="$style.row">
        <b-col class="col-6">
          <b-form-group
            id="name"
            label="Nome do Roteiro"
            label-for="name"
            description=""
            class="formLabel"
          >
            <b-form-input
              id="name"
              class="textInput"
              v-model="roadmap.name"
              type="text"
              roadmapholder="Novo Roteiro"
              required
              v-if="isEditMode || isCreateMode"
            ></b-form-input>
            <h5 v-else>{{ roadmap.name}}</h5>
          </b-form-group>

          <b-form-group
            id="description"
            label="Descrição"
            label-for="description"
            description=""
            class="formLabel"
          >
            <b-form-textarea
              id="description"
              class="textArea"
              v-model="roadmap.description"
              roadmapholder="Descrição única do local"
              rows="3"
              max-rows="6"
              v-if="isEditMode || isCreateMode"
            ></b-form-textarea>
            <h5 v-else>{{ roadmap.description}}</h5>
          </b-form-group>

          <b-form-group
            id="region"
            label="Região"
            label-for="Region"
            description=""
            class="formLabel"
          >
            <b-dropdown
              id="region-input"
              v-model="roadmap.region_id"
              :text="regionButtonTitle"
              block
              split
              split-variant="outline-primary"
              :disabled="!isEditMode && !isCreateMode"
            >
              <b-dropdown-item
                v-for="region in regions"
                :key="region.id"
                @click="selectRegion(region.id)"
              >{{  region.name }}</b-dropdown-item>
            </b-dropdown>
          </b-form-group>

          <label class="formLabel">Locais</label>
          <div>
            <b-dropdown
              id="categories"
              text="Selecione as categorias"
              block
              split
              split-variant="outline-primary"
              :disabled="!isEditMode && !isCreateMode"
            >
              <b-dropdown-item
                v-for="place in places"
                :key="`category-${place.id}`"
                @click="selectCategory(place.id)"
              >{{  place.name }}</b-dropdown-item>
            </b-dropdown>
            <b-table
              class="table mt-2"
              striped
              hover
              :items="selectPlaces" />
          </div>
        </b-col>
        <b-col class="col-6">
          <b-form-group
            id="gallery"
            label="Fotos"
            label-for="Fotos"
            description=""
            class="formLabel"
          >
            <b-row :class="$style.images">
              <b-img
                v-for="image in images"
                :key="`image-${image.id}`"
                class="image rounded-lg m1"
                :blank="image.blank"
                :blankColor="image.blanckColor"
                rounded alt="images">
              </b-img>
              <div
                v-for="i in [2,3,4,5,6,7]"
                :key="`image-${i}`"
                class="image rounded m1">
              </div>
            </b-row>
          </b-form-group>

          <label class="formLabel">Principais Categorias</label>
          <div>
            <b-dropdown
              id="categories"
              text="Selecione as categorias"
              block
              split
              split-variant="outline-primary"
              :disabled="!isEditMode && !isCreateMode"
            >
              <b-dropdown-item
                v-for="category in categories"
                :key="`category-${category.id}`"
                @click="selectCategory(category.id)"
              >{{  category.name }}</b-dropdown-item>
            </b-dropdown>
            <b-table
              class="table mt-2"
              striped
              hover
              :items="selectedCategories" />
          </div>

          <div v-if="roadmapId" class="d-flex justify-content-end mt-3">
            <b-button
              v-if="isEditMode"
              variant="danger"
              @click="showDeleteModal"
            >
              Excluir Roteiro
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="d-flex w-100 justify-content-end mt-4">
      <b-button
        type="submit"
        variant="primary"
        class="mr-2"
        v-if="isEditMode || isCreateMode"
        @click="onSubmit"
      >
        Salvar
      </b-button>
      <b-button
        v-if="isEditMode || isCreateMode"
        variant="secondary"
        @click="clickBack"
      >
        Cancelar
      </b-button>
    </div>

    <delete-modal ref="deleteModal" @clickYes="deleteRoadmapById"/>
  </div>
</template>

<style lang="scss" module>

iframe {
  min-width: 600px;
}
.row {
  padding: 1.4rem 1.75rem;
  margin: 0;
}

.images {
  padding: 0 1rem;
}
</style>
