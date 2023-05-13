<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  BFormGroup, BFormInput, BButton, BDropdown, BFormDatepicker,
} from 'bootstrap-vue';
import GoogleMap from '@components/google-map';
import DeleteModal from '@components/delete-modal';
import cloneDeep from 'lodash/cloneDeep';

export default {
  page: {
    meta: [{ name: 'description', content: 'Cadastro Região' }],
  },
  components: {
    BFormDatepicker,
    BFormGroup,
    BFormInput,
    BButton,
    BDropdown,
    GoogleMap,
    DeleteModal,
  },
  data() {
    return {
      isLoading: false,
      region: {
        id: null,
        name: null,
        description: null,
        // startDate: null,
        // endDate: null,
        // openingHour: null,
        place_id: null,
      },
      selectedPlace: null,
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
      mapKey: 0,
    };
  },
  computed: {
    ...mapState('places', ['places']),
    ...mapGetters('regions', ['getRegionById']),
    regionId() {
      return this.$route.params.id;
    },
    isEditMode() {
      return this.$route.name.includes('editar');
    },
    isCreateMode() {
      return this.$route.name.includes('cadastrar');
    },
    placeButtonTitle() {
      if (this.selectedPlace?.id) {
        return this.selectedPlace.name;
      }
      return 'Selecione o Local';
    },
  },
  async created() {
    await this.fetchAllPlaces();
    this.fetchRegion();
  },
  methods: {
    ...mapActions('regions', ['fetchRegionById', 'createRegion', 'updateRegion', 'deleteRegion']),
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchRegion() {
      if (this.regionId) {
        this.isLoading = true;
        const regionTemp = this.getRegionById(this.regionId);
        if (regionTemp) {
          this.region = cloneDeep(regionTemp);
          if (this.region.place_id) {
            this.selectPlace(this.region.place_id);
          }
        } else {
          const regionTemp = await this.fetchRegionById({ regionId: this.regionId });
          if (regionTemp) {
            this.region = cloneDeep(regionTemp);
          }
        }
        this.isLoading = false;
      }
    },
    selectPlace(placeId) {
      this.selectedPlace = this.places.find((r) => r.id === placeId);
      this.region.place_id = this.selectedPlace.id;
      this.forceRerenderMap();
    },
    updateLatLng(lat, lng) {
      this.region.latitude = lat.toString();
      this.region.longitude = lng.toString();
    },
    async onSubmit() {
      if (!this.regionId) {
        const newRegion = await this.createRegion({ params: this.region });
        if (newRegion) {
          this.$bvToast.toast('Região criada com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-regiao' });
        } else {
          this.$bvToast.toast('Erro ao criar Região', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            noCloseButton: true,
          });
        }
      } else {
        const newRegion = await this.updateRegion({ id: this.regionId, params: this.region });
        if (newRegion) {
          this.$bvToast.toast('Região atualizada com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-regiao' });
        } else {
          this.$bvToast.toast('Erro ao atualizar região', {
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
    async deleteRegionById() {
      await this.deleteRegion({ regionId: this.regionId });
      this.$router.push({ name: 'listar-regiao' });
    },
    clickEdit() {
      this.$router.push({ name: 'editar-regiao', params: { id: this.regionId } });
    },
    clickBack() {
      if (this.isEditMode) {
        this.$router.push({ name: 'visualizar-regiao' });
        return;
      }
      this.$router.push({ name: 'listar-regiao' });
    },
    forceRerenderMap() {
      this.mapKey += 1;
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2" @click="clickBack">Voltar</b-button>
    <b-button
      v-if="!isEditMode && regionId"
      variant="primary"
      class="mb-2"
      @click="clickEdit"
    >
      Editar
    </b-button>
    <h1 class="text-primary title">
      {{ regionId ? 'PAINEL DE GERENCIAMENTO - REGIÃO' : 'PAINEL DE CADASTRO - REGIÃO'}}
    </h1>
    <div class="border border-primary">
        <b-row :class="$style.row">
          <b-col class="col-6">
            <b-form-group
              id="name"
              label="Nome da Região"
              label-for="name"
              description=""
              class="formLabel"
            >
              <b-form-input
                id="name"
                class="textInput"
                v-model="region.name"
                type="text"
                placeholder="Nova Região"
                required
                v-if="isEditMode || isCreateMode"
              ></b-form-input>
              <h5 v-else>{{ region.name}}</h5>
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
                v-model="region.description"
                placeholder="Descrição única da região"
                rows="3"
                max-rows="6"
                v-if="isEditMode || isCreateMode"
              ></b-form-textarea>
              <h5 v-else>{{ region.description}}</h5>
            </b-form-group>

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

            <!-- <b-form-group
              id="place"
              label="Local"
              label-for="Place"
              description=""
              class="formLabel"
            >
              <b-dropdown
                id="place-input"
                v-model="region.place_id"
                :text="placeButtonTitle"
                block
                split
                split-variant="outline-primary"
                :disabled="!isEditMode && !isCreateMode"
              >
                <b-dropdown-item
                  v-for="place in places"
                  :key="place.id"
                  @click="selectPlace(place.id)"
                >{{  place.name }}</b-dropdown-item>
              </b-dropdown>
            </b-form-group>

            <google-map
              v-if="!isLoading && selectedPlace"
              :key="mapKey"
              :isEditMode="false"
              add-new-marker
              :marker-lat="parseFloat(selectedPlace.latitude)"
              :marker-lng="parseFloat(selectedPlace.longitude)"
              @updateLatLng="updateLatLng"
            /> -->

            <!-- <b-form-group
              id="region"
              label="Região"
              label-for="Region"
              description=""
              class="formLabel"
            >
              <b-dropdown
                id="region-input"
                v-model="place.region_id"
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
            </b-form-group> -->

            <google-map
              v-if="!isLoading"
              :isEditMode="isEditMode || isCreateMode"
              add-new-marker
              :marker-lat="parseFloat(place.latitude)"
              :marker-lng="parseFloat(place.longitude)"
              @updateLatLng="updateLatLng"
            />
            <b-skeleton-img v-else class="w-100"/>

            <div v-if="regionId" class="d-flex justify-content-end mt-3">
              <b-button
                v-if="isEditMode"
                variant="danger"
                @click="showDeleteModal"
              >
                Excluir Região
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

    <delete-modal ref="deleteModal" @clickYes="deleteRegionById"/>
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
