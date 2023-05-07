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
    meta: [{ name: 'description', content: 'Cadastro Evento' }],
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
      event: {
        id: null,
        name: null,
        description: null,
        startDate: null,
        endDate: null,
        openingHour: null,
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
    ...mapGetters('events', ['getEventById']),
    eventId() {
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
    this.fetchEvent();
  },
  methods: {
    ...mapActions('events', ['fetchEventById', 'createEvent', 'updateEvent', 'deleteEvent']),
    ...mapActions('places', ['fetchAllPlaces']),
    async fetchEvent() {
      if (this.eventId) {
        this.isLoading = true;
        const eventTemp = this.getEventById(this.eventId);
        if (eventTemp) {
          this.event = cloneDeep(eventTemp);
          if (this.event.place_id) {
            this.selectPlace(this.event.place_id);
          }
        } else {
          const eventTemp = await this.fetchEventById({ eventId: this.eventId });
          if (eventTemp) {
            this.event = cloneDeep(eventTemp);
          }
        }
        this.isLoading = false;
      }
    },
    selectPlace(placeId) {
      this.selectedPlace = this.places.find((r) => r.id === placeId);
      this.event.place_id = this.selectedPlace.id;
      this.forceRerenderMap();
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
    clickEdit() {
      this.$router.push({ name: 'editar-evento', params: { id: this.eventId } });
    },
    clickBack() {
      if (this.isEditMode) {
        this.$router.push({ name: 'visualizar-evento' });
        return;
      }
      this.$router.push({ name: 'listar-evento' });
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
      v-if="!isEditMode && eventId"
      variant="primary"
      class="mb-2"
      @click="clickEdit"
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
                v-if="isEditMode || isCreateMode"
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
                v-if="isEditMode || isCreateMode"
              ></b-form-textarea>
              <h5 v-else>{{ event.description}}</h5>
            </b-form-group>

            <div>
              <label class="formLabel">Horário do evento</label>
              <div class="d-flex">
                <b-form-group class="mr-3">
                  <label for="startDateTime">Data de início</label>
                  <b-form-datepicker
                    id="startDateTime"
                    v-model="event.startDate"
                    placeholder="DD/MM/YYYY"
                    locale="pt"
                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                  />
                </b-form-group>
                <b-form-group>
                  <label for="startDateTime">Data de fim</label>
                  <b-form-datepicker
                    id="endtDateTime"
                    v-model="event.endDate"
                    placeholder="DD/MM/YYYY"
                    locale="pt"
                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                  />
                </b-form-group>
              </div>
              <b-form-textarea
                id="schedule"
                class="textArea"
                v-model="event.openingHour"
                placeholder="Horários"
                rows="3"
                max-rows="6"
                v-if="isEditMode || isCreateMode"
              ></b-form-textarea>
              <h5 v-else-if="event.openingHour != ''">{{ event.openingHour }}</h5>
              <h5 v-else>Sem Horário de Funcionamento</h5>
            </div>
          </b-col>
          <b-col class="col-6">
            <!-- <b-form-group
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
            </b-form-group> -->

            <b-form-group
              id="place"
              label="Local"
              label-for="Place"
              description=""
              class="formLabel"
            >
              <b-dropdown
                id="place-input"
                v-model="event.place_id"
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
            />

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
