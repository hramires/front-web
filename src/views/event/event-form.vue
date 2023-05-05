<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';
import GoogleMap from '@components/google-map';
import DeleteModal from '@components/delete-modal';
import cloneDeep from 'lodash/cloneDeep';

// "id": 1,
// "name": "Casa da Edição",
// "region_id": 1,
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
    meta: [{ name: 'description', content: 'Cadastro Evento' }],
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
      event: {
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
    ...mapGetters('events', ['getEventById']),
    eventId() {
      return this.$route.params.id;
    },
    isEditMode() {
      return this.$route.name === 'editar-evento';
    },
    regionButtonTitle() {
      if (this.event.region_id) {
        const selectedRegion = this.regions.find((r) => r.id === this.event.region_id);
        return selectedRegion.name;
      }
      return 'Selecione a Região';
    },
  },
  async created() {
    await this.fetchCategories();
    this.fetchEvent();
  },
  methods: {
    ...mapActions('events', ['fetchEventById', 'createEvent', 'updateEvent', 'deleteEvent']),
    ...mapActions('categories', ['fetchAllCategories']),
    async fetchEvent() {
      if (this.eventId) {
        this.isLoading = true;
        const eventTemp = this.getEventById(this.eventId);
        if (eventTemp) {
          this.event = cloneDeep(eventTemp);
        } else {
          const eventTemp = await this.fetchEventById({ eventId: this.eventId });
          if (eventTemp) {
            this.event = cloneDeep(eventTemp);
          }
        }
        this.isLoading = false;
      }
    },
    // async fetchCategories() {
    //   await this.fetchAllCategories();
    //   this.categories.forEach((object) => {
    //     delete object.createdAt;
    //     delete object.updatedAt;
    //   });
    // },
    // selectCategory(categoryId) {
    //   const selectedCategory = this.categories.find((c) => c.id === categoryId);
    //   if (selectedCategory) {
    //     const alreadyExists = this.selectedCategories.find((c) => c.id === categoryId);
    //     if (!alreadyExists) {
    //       this.selectedCategories.push(selectedCategory);
    //       this.event.eventCategory_id = selectedCategory.id;
    //     }
    //   }
    // },
    selectRegion(regionId) {
      const selectedRegion = this.regions.find((r) => r.id === regionId);
      this.event.region_id = selectedRegion.id;
    },
    updateLatLng(lat, lng) {
      this.event.latitude = lat.toString();
      this.event.longitude = lng.toString();
    },
    async onSubmit() {
      if (!this.eventId) {
        const newEvent = await this.createEvent({ params: this.event });
        if (newEvent) {
          this.$bvToast.toast('Evento criado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-evento' });
        } else {
          this.$bvToast.toast('Erro ao criar evento', {
            toaster: 'b-toaster-top-full',
            variant: 'danger',
            noCloseButton: true,
          });
        }
      } else {
        const newEvent = await this.updateEvent({ id: this.eventId, params: this.event });
        if (newEvent) {
          this.$bvToast.toast('Evento atualizado com sucesso', {
            toaster: 'b-toaster-top-full',
            variant: 'success',
            noCloseButton: true,
          });
          this.$router.push({ name: 'listar-evento' });
        } else {
          this.$bvToast.toast('Erro ao atualizar evento', {
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
    async deleteEventById() {
      await this.deleteEvent({ eventId: this.eventId });
      this.$router.push({ name: 'listar-evento' });
    },
    clickCancel() {
      this.$router.push({ name: 'visualizar-evento' });
    },
    clickEdit() {
      this.$router.push({ name: 'editar-evento', params: { id: this.eventId } });
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2" @click="$router.go(-1)">Voltar</b-button>
    <b-button
      v-if="!isEditMode && eventId"
      variant="primary"
      class="mb-2"
      @click="clickEdit();"
    >
      Editar
    </b-button>
    <h1 class="text-primary title">
      {{ eventId ? 'PAINEL DE GERENCIAMENTO - EVENTO' : 'PAINEL DE CADASTRO - EVENTO'}}
    </h1>
    <div class="border border-primary">
        <b-row :class="$style.row">
          <b-col class="col-6">
            <b-form-group
              id="name"
              label="Nome do Evento"
              label-for="name"
              description=""
              class="formLabel"
            >
              <b-form-input
                id="name"
                class="textInput"
                v-model="event.name"
                type="text"
                placeholder="Novo Evento"
                required
                v-if="isEditMode"
              ></b-form-input>
              <h5 v-else>{{ event.name}}</h5>
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
                v-model="event.description"
                placeholder="Descrição única do evento"
                rows="3"
                max-rows="6"
                v-if="isEditMode"
              ></b-form-textarea>
              <h5 v-else>{{ event.description}}</h5>
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
                v-model="event.contact"
                class="textInput"
                type="tel"
                v-mask="'+##(##)#####-####'"
                placeholder="+55 (51) 99999-9999"
                required
                v-if="isEditMode"
              ></b-form-input>
              <h5 v-else>{{ event.contact}}</h5>
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
                v-model="event.openingHour"
                placeholder="Horários"
                rows="3"
                max-rows="6"
                v-if="isEditMode"
              ></b-form-textarea>
              <h5 v-else-if="event.openingHour != ''">{{ event.openingHour }}</h5>
              <h5 v-else>Sem Horário de Funcionamento</h5>
            </b-form-group>

            <!-- <b-form-checkbox
              id="appointment"
              v-model="event.appointment"
              name="appointment"
              class="label mb-3 d-flex align-items-center"
              v-if="isEditMode"
            >
              Precisa marcar horário
            </b-form-checkbox>
            <h5 v-if="!isEditMode && !event.appointment">
              Precisa marcar horário: <b-icon icon="x-circle" scale="1" variant="danger"></b-icon>
            </h5>
            <h5 v-if="!isEditMode && event.appointment">
              Precisa marcar horário:
              <b-icon icon="check-square" scale="1" variant="success"></b-icon>
            </h5> -->

            <!-- <label class="formLabel">Principais Categorias</label>
            <div>
              <b-dropdown
                id="categories"
                text="Selecione as categorias"
                block
                split
                split-variant="outline-primary"
                :disabled="!isEditMode"
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
            </div> -->
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

            <b-form-group
              id="region"
              label="Região"
              label-for="Region"
              description=""
              class="formLabel"
            >
              <b-dropdown
                id="region-input"
                v-model="event.region_id"
                :text="regionButtonTitle"
                block
                split
                split-variant="outline-primary"
                :disabled="!isEditMode"
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
              :isEditMode="isEditMode"
              add-new-marker
              :marker-lat="parseFloat(event.latitude)"
              :marker-lng="parseFloat(event.longitude)"
              @updateLatLng="updateLatLng"
            />
            <b-skeleton-img v-else class="w-100"/>

            <div v-if="eventId" class="d-flex justify-content-end mt-3">
              <b-button
                v-if="isEditMode"
                variant="danger"
                @click="showDeleteModal"
              >
                Excluir Evento
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
        v-if="isEditMode"
        @click="onSubmit"
      >
        Salvar
      </b-button>
      <b-button v-if="isEditMode" variant="secondary" @click="clickCancel()">Cancelar</b-button>
    </div>

    <delete-modal ref="deleteModal" @clickYes="deleteEventById"/>
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
