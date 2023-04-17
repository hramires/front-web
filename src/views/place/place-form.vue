<script>
import { mapActions } from 'vuex';
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';
import GoogleMap from '@components/google-map';
import DeleteModal from '@components/delete-modal';
import cloneDeep from 'lodash/cloneDeep';


// "id": 1,
// "name": "Casa da Edição",
// "region_id": 1,
// "placeCategory_id": 1,
// "photo_id": null,
// "openingHour": null,
// "contact": "+5551998231918",
// "latitude": "55",
// "longitude": "11",
// "description": "Casa da edição nova",
// "appointment": false,
// "createdAt": "2023-04-09T23:12:44.116Z",
// "updatedAt": "2023-04-09T23:12:44.116Z"

export default {
  page: {
    meta: [{ name: 'description', content: 'Cadastro Local' }],
  },
  components: {
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
      place: {
        id: null,
        name: null,
        description: null,
        contact: null,
        openingHour: null,
        appointment: null,
        placeCategory_id: null,
        photo_id: null,
        region_id: null,
        latitude: null,
        longitude: null,
      },
      selectedCategories: [],
      categories: [],
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
    placeId() {
      return this.$route.params.id;
    },
    regionButtonTitle() {
      if (this.place.region_id) {
        const selectedRegion = this.regions.find((r) => r.id === this.place.region_id);
        return selectedRegion.name;
      }
      return 'Selecione a Região';
    },
  },
  async created() {
    await this.fetchCategories();
    this.fetchPlace();
  },
  methods: {
    ...mapActions('places', ['fetchPlaceById', 'createPlace', 'updatePlace', 'deletePlace']),
    ...mapActions('categories', ['fetchAllCategories']),
    async fetchPlace() {
      if (this.placeId) {
        this.isLoading = true;
        const place = await this.fetchPlaceById({ placeId: this.placeId });
        if (place) {
          this.place = cloneDeep(place);
          if (this.place.placeCategory_id) {
            this.selectCategory(this.place.placeCategory_id);
          }
        }
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      this.categories = await this.fetchAllCategories();
      this.categories.forEach((object) => {
        delete object.createdAt;
        delete object.updatedAt;
      });
    },
    selectCategory(categoryId) {
      const selectedCategory = this.categories.find((c) => c.id === categoryId);
      if (selectedCategory) {
        const alreadyExists = this.selectedCategories.find((c) => c.id === categoryId);
        if (!alreadyExists) {
          this.selectedCategories.push(selectedCategory);
          this.place.placeCategory_id = selectedCategory.id;
        }
      }
    },
    selectRegion(regionId) {
      const selectedRegion = this.regions.find((r) => r.id === regionId);
      this.place.region_id = selectedRegion.id;
    },
    updateLatLng(lat, lng) {
      this.place.latitude = lat.toString();
      this.place.longitude = lng.toString();
    },
    async onSubmit() {
      if (!this.placeId) {
        const newPlace = await this.createPlace({ params: this.place });
        if (newPlace) {
          this.$bvToast.toast('Local criado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-local' });
        } else {
          this.$bvToast.toast('Erro ao criar local', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            noCloseButton: true,
          });
        }
      } else {
        const newPlace = await this.updatePlace({ id: this.placeId, params: this.place });
        if (newPlace) {
          this.$bvToast.toast('Local atualizado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-local' });
        } else {
          this.$bvToast.toast('Erro ao atualizar local', {
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
    async deletePlaceById() {
      await this.deletePlace({ placeId: this.placeId });
      this.$router.push({ name: 'listar-local' });
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2" @click="$router.go(-1)">Voltar</b-button>
    <h1 class="text-primary title">
      {{ placeId ? 'PAINEL DE GERENCIAMENTO - LOCAL' : 'PAINEL DE CADASTRO - LOCAL'}}
    </h1>
    <div class="border border-primary">
        <b-row :class="$style.row">
          <b-col>
            <b-form-group
              id="name"
              label="Nome do Local"
              label-for="name"
              description=""
              class="formLabel"
            >
              <b-form-input
                id="name"
                class="textInput"
                v-model="place.name"
                type="text"
                placeholder="Novo Local"
                required
              ></b-form-input>
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
                v-model="place.description"
                placeholder="Descrição única do local"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              id="contact"
              label="Contato"
              label-for="contact"
              description=""
              class="formLabel"
            >
              <b-form-input
                id="contact"
                v-model="place.contact"
                class="textInput"
                type="tel"
                v-mask="'+##(##)#####-####'"
                placeholder="+55 (51) 99999-9999"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="schedule"
              label="Horário de Funcionamento"
              label-for="schedule"
              description=""
              class="formLabel"
            >
              <b-form-textarea
                id="schedule"
                class="textArea"
                v-model="place.openingHour"
                placeholder="Horários"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-checkbox
              id="appointment"
              v-model="place.appointment"
              name="appointment"
              class="label mb-3 d-flex align-items-center"
            >
              Precisa marcar horário
            </b-form-checkbox>

            <label class="formLabel">Principais Categorias</label>
            <div>
              <b-dropdown
                id="categories"
                text="Selecione as categorias"
                block
                split
                split-variant="outline-primary"
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
          </b-col>
          <b-col>
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

            <b-form-group
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
              >
                <b-dropdown-item
                  v-for="region in regions"
                  :key="region.id"
                  @click="selectRegion(region.id)"
                >{{  region.name }}</b-dropdown-item>
              </b-dropdown>
            </b-form-group>

            <google-map
              v-if="!isLoading"
              add-new-marker
              :marker-lat="parseFloat(place.latitude)"
              :marker-lng="parseFloat(place.longitude)"
              @updateLatLng="updateLatLng"
            />
            <b-skeleton-img v-else class="w-100"/>

            <div v-if="placeId" class="d-flex justify-content-end mt-3">
              <b-button variant="danger" @click="showDeleteModal">Excluir Local</b-button>
            </div>
          </b-col>
        </b-row>
    </div>

    <div class="d-flex w-100 justify-content-end mt-4">
      <b-button
        type="submit"
        variant="primary"
        class="mr-2"
        @click="onSubmit"
      >
        Salvar
      </b-button>
      <b-button variant="secondary" @click="$router.go(-1)">Cancelar</b-button>
    </div>

    <delete-modal ref="deleteModal" @clickYes="deletePlaceById"/>
  </div>
</template>

<style type="scss" module>

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
