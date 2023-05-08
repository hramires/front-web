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
        region_id: null,
        // photo_id: null,
      },
      selectedPlacesIds: [],
      selectedPlaces: [],
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
          blankColor: '#d5e4cf',
          src: '',
        },
      ],
    };
  },
  computed: {
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
    await this.fetchPlaces();
    this.fetchRoadmap();
  },
  methods: {
    ...mapActions('roadmaps', ['fetchRoadmapById', 'createRoadmap', 'updateRoadmap', 'deleteRoadmap']),
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchRoadmap() {
      if (this.roadmapId) {
        this.isLoading = true;
        const { roadmap, places } = await this.fetchRoadmapById({ roadmapId: this.roadmapId });
        if (roadmap) {
          this.roadmap = cloneDeep(roadmap);
        }
        if (places) {
          this.roadmap.region_id = places[0].region_id;
          places.forEach((object) => {
            this.selectPlaces(object.id);
          });
        }
        this.isLoading = false;
      }
    },
    async fetchPlaces() {
      await this.fetchAllPlaces();
    },
    selectPlaces(placeId) {
      const selectedPlace = this.places.find((p) => p.id === placeId);
      if (selectedPlace) {
        const alreadyExists = this.selectedPlacesIds.includes(selectedPlace.id);
        if (!alreadyExists) {
          this.selectedPlacesIds.push(selectedPlace.id);
          this.selectedPlaces.push({
            id: selectedPlace.id,
            name: selectedPlace.name,
          });
        }
      }
    },
    selectRegion(regionId) {
      this.roadmap.region_id = regionId;
    },
    async onSubmit() {
      this.roadmap.place_ids = this.selectedPlacesIds;
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
    showFileInput(index) {
      this.$set(this.images, index, {
        ...this.images[index],
        inputVisible: true,
      });
      this.$nextTick(() => {
        this.$refs.fileInput[index].click();
      });
    },
    handleImageUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images[index] = {
            id: this.images.length,
            blank: false,
            blankColor: null,
            src: e.target.result,
          };
          this.images.push({
            id: this.images.length + 1,
            blank: true,
            blankColor: '#d5e4cf',
            src: '',
          });
        };
        reader.readAsDataURL(file);
      }
    },
    deleteImage(index) {
      if (this.images.length > 1) {
        this.images.splice(index, 1);
      }
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
              id="places"
              text="Selecione os Locais"
              block
              split
              split-variant="outline-primary"
              :disabled="!isEditMode && !isCreateMode"
            >
              <b-dropdown-item
                v-for="place in places"
                :key="`place-${place.id}`"
                @click="selectPlaces(place.id)"
              >{{  place.name }}</b-dropdown-item>
            </b-dropdown>
            <b-table
              class="table mt-2"
              striped
              hover
              :items="selectedPlaces" />
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
              <div
                v-for="(image, index) in images"
                :key="`image-${index}`"
                :class="[$style.square, $style.image]"
                class="image rounded m1">
                <b-img
                  class="image rounded-lg"
                  :src="image.src"
                  :blank="image.blank"
                  :blankColor="image.blankColor"
                  rounded alt="images">
                </b-img>
                <span
                  v-if="image.blank"
                  :class="$style.more"
                  @click="showFileInput(index)"
                >+</span>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload($event, index)"
                  style="display: none;"
                  ref="fileInput"
                />
                <span
                  v-if="!image.blank"
                  :class="$style['delete-image']"
                  @click="deleteImage(index)"
                >&times;</span>
              </div>
            </b-row>
          </b-form-group>

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

.square {
  position: relative;
}

.more {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  color: transparent;
  cursor: pointer;
  user-select: none;
}

.square:hover .more {
  color: white;
}

.delete-image {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5em;
  color: red;
  cursor: pointer;
  user-select: none;
}

.image {
  background-color: unset;
}

</style>
