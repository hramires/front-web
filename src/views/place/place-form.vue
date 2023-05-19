<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';
import GoogleMap from '@components/google-map';
import DeleteModal from '@components/delete-modal';
import ImageUploader from '@components/image-uploader';
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
    ImageUploader,
  },
  beforeRouteLeave(to, from, next) {
    if (this.isCreateMode || this.isEditMode) {
      if (confirm('Tem certeza que deseja sair? Os dados não salvos serão perdidos.')) {
        next();
      } else {
        next(false);
      }
    } else {
      next(); 
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isCreateMode || this.isEditMode) {
      if (confirm('Tem certeza que deseja sair? Os dados não salvos serão perdidos.')) {
        next();
      } else {
        next(false);
      }
    } else {
      next(); 
    }
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
        photo_id: null,
        region_id: null,
        latitude: null,
        longitude: null,
      },
      selectedCategoriesIds: [],
      selectedCategories: [],
      maxChars: 2040,
      charsLeft: 2040,
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
      uploadedImages: [
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
    ...mapState('categories', ['categories']),
    ...mapGetters('places', ['getPlaceById']),
    placeId() {
      return this.$route.params.id;
    },
    isEditMode() {
      return this.$route.name.includes('editar');
    },
    isCreateMode() {
      return this.$route.name.includes('cadastrar');
    },
    regionButtonTitle() {
      if (this.place.region_id) {
        const selectedRegion = this.regions.find((r) => r.id === this.place.region_id);
        return selectedRegion.name;
      }
      return 'Selecione a Região';
    },
    charactersLeft: {
      get() {
        if (this.place.description) {
          return this.charsLeft - this.place.description.length;
        }
        return this.place.description;
      },
      set(value) {
        this.charsLeft = value;
      },
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
        const { place, categories } = await this.fetchPlaceById({ placeId: this.placeId });
        if (place) {
          this.place = cloneDeep(place);
        }
        if (categories) {
          categories.forEach((object) => {
            this.selectCategory(object.id);
          });
        }
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      await this.fetchAllCategories();
      this.categories.forEach((object) => {
        delete object.createdAt;
        delete object.updatedAt;
      });
    },
    selectCategory(categoryId) {
      const selectedCategory = this.categories.find((c) => c.id === categoryId);
      if (selectedCategory) {
        const alreadyExists = this.selectedCategoriesIds.includes(categoryId);
        if (!alreadyExists) {
          this.selectedCategoriesIds.push(categoryId);
          this.selectedCategories.push(selectedCategory);
        }
      }
    },
    removeSelectedCategory(categoryId) {
      const index = this.selectedCategoriesIds.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategoriesIds.splice(index, 1);
        this.selectedCategories.splice(index, 1);
      }
    },
    selectRegion(regionId) {
      this.place.region_id = regionId;
    },
    updateLatLng(lat, lng) {
      this.place.latitude = lat.toString();
      this.place.longitude = lng.toString();
    },
    async onSubmit() {
      this.place.category_ids = this.selectedCategoriesIds;
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
    clickEdit() {
      this.$router.push({ name: 'editar-local', params: { id: this.placeId } });
    },
    clickBack() {
      if (this.isEditMode) {
        this.$router.push({ name: 'visualizar-local' });
        return;
      }
      this.$router.push({ name: 'listar-local' });
    },
    handleImagesUpdate(images) {
      this.uploadedImages = images;
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2" @click="clickBack">Voltar</b-button>
    <b-button
      v-if="!isEditMode && placeId"
      variant="primary"
      class="mb-2"
      @click="clickEdit();"
    >
      Editar
    </b-button>
    <h1 class="text-primary title">
      {{ placeId ? 'PAINEL DE GERENCIAMENTO - LOCAL' : 'PAINEL DE CADASTRO - LOCAL'}}
    </h1>
    <div class="border border-primary">
        <b-row :class="$style.row">
          <b-col class="col-6">
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
                v-if="isEditMode || isCreateMode"
              ></b-form-input>
              <h5 v-else>{{ place.name}}</h5>
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
                v-if="isEditMode || isCreateMode"
              ></b-form-textarea>
              <h5 v-else>{{ place.description}}</h5>
              <span :class="$style['char-count']">{{ charactersLeft }} / 2040 caracteres</span>
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
                v-if="isEditMode || isCreateMode"
              ></b-form-input>
              <h5 v-else>{{ place.contact}}</h5>
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
                v-if="isEditMode || isCreateMode"
              ></b-form-textarea>
              <h5 v-else-if="place.openingHour != ''">{{ place.openingHour }}</h5>
              <h5 v-else>Sem Horário de Funcionamento</h5>
            </b-form-group>

            <b-form-checkbox
              id="appointment"
              v-model="place.appointment"
              name="appointment"
              class="label mb-3 d-flex align-items-center"
              v-if="isEditMode || isCreateMode"
            >
              Precisa marcar horário
            </b-form-checkbox>
            <h5 v-if="!isEditMode && !isCreateMode">
              Precisa marcar horário:
              <b-icon v-if="place.appointment" icon="check-square" scale="1" variant="success" />
              <b-icon v-else  icon="x-circle" scale="1" variant="danger" />
            </h5>

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

              <table v-if="!isLoading && selectedCategories" class="table mt-5" striped hover>
                <thead>
                <tr>
                  <th class="text-dark-green">#</th>
                  <th class="text-dark-green">Categoria</th>
                  <th class="text-dark-green" v-if="isEditMode || isCreateMode">Ação</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(category, index) in selectedCategories"
                  :key="category.id"
                  :class="{ 'table-secondary': index % 2 == 0, 'table-light': index % 2 != 0 }"
                >
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td v-if="isEditMode || isCreateMode">
                    <b-button
                      type="button"
                      variant="danger"
                      @click="removeSelectedCategory(category.id)"
                    >
                      X
                    </b-button>
                  </td>
                </tr>
                </tbody>
              </table>
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
              <ImageUploader
                :isEditMode="isEditMode || isCreateMode"
                :inputImages="uploadedImages"
                @update-images="handleImagesUpdate"
              >
              </ImageUploader>
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
                :disabled="!isEditMode && !isCreateMode"
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
              :isEditMode="isEditMode || isCreateMode"
              add-new-marker
              :marker-lat="parseFloat(place.latitude)"
              :marker-lng="parseFloat(place.longitude)"
              @updateLatLng="updateLatLng"
            />
            <b-skeleton-img v-else class="w-100"/>

            <div v-if="placeId" class="d-flex justify-content-end mt-3">
              <b-button
                v-if="isEditMode"
                variant="danger"
                @click="showDeleteModal"
              >
                Excluir Local
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

    <delete-modal ref="deleteModal" @clickYes="deletePlaceById"/>
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

.char-count {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
}
</style>
