<script>
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';
import GoogleMap from '@components/google-map';

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
  },
  data() {
    return {
      name: '',
      description: '',
      contact: '',
      schedule: '',
      appointment: false,
      region: '',
      lat: null,
      lng: null,
      selectedCategories: [],
      categories: [
        {
          id: '1',
          name: 'Categoria 1',
        },
        {
          id: '2',
          name: 'Categoria 2',
        },
      ],
      regions: [
        {
          id: '1',
          name: 'Região 1',
        },
        {
          id: '2',
          name: 'Região 2',
        },
      ],
      show: true,
      images: [
        {
          id: '1',
          blank: true,
          blankColor: '#000',
          src: '',
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log('submit');
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
    selectCategory(value) {
      const selectedCategory = this.categories.find((c) => c.id === value);
      const alreadyExists = this.selectedCategories.find((c) => c.id === value);
      if (!alreadyExists) {
        this.selectedCategories.push(selectedCategory);
      }
    },
    selectRegion(value) {
      const selectedRegion = this.regions.find((r) => r.id === value);
      this.region = selectedRegion;
    },
    updateLatLng(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    },
  },
};
</script>

<template>
  <div>
    <b-button variant="secondary" class="mb-2">Voltar</b-button>
    <h1 class="text-primary title">
      PAINEL DE CADASTRO - LOCAL
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
                v-model="name"
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
                v-model="description"
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
                v-model="contact"
                class="textInput"
                type="text"
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
                v-model="schedule"
                placeholder="Horários"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-checkbox
              id="appointment"
              v-model="appointment"
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
              <b-table class="table mt-2" striped hover :items="selectedCategories"></b-table>
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
                v-model="region"
                :text="region ? region.name : 'Selecione a Região'"
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
              add-new-marker
              :marker-lat="lat"
              :marker-lng="lng"
              @updateLatLng="updateLatLng"
            />

            <div class="d-flex justify-content-end mt-3">
              <b-button variant="danger">Excluir Local</b-button>
            </div>
          </b-col>
        </b-row>
    </div>

    <div class="d-flex w-100 justify-content-end mt-4">
      <b-button
        type="submit"
        variant="primary"
        class="mr-2"
        @click="onSubmit($event)"
      >
        Salvar
      </b-button>
      <b-button variant="secondary">Cancelar</b-button>
    </div>
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
