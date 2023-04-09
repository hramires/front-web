<script>
import {
  BFormGroup, BFormInput, BButton, BDropdown,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{ name: 'description', content: 'Cadastro Local' }],
  },
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BDropdown,
  },
  data() {
    return {
      name: '',
      description: '',
      contact: '',
      schedule: '',
      region: '',
      location: '',
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
          id: 'img-1',
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
            <label>Principais Categorias</label>
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
              <b-table class="table" striped hover :items="selectedCategories"></b-table>
            </div>
          </b-col>
          <b-col>
            <b-form-group
              id="gallery"
              label="Fotos"
              label-for="Fotos"
              description=""
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
                    v-for="i in (2,7)"
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

            <b-form-group
              id="location"
              label="Localização"
              label-for="location"
              description=""
            >
              <b-form-input
                id="location-input"
                v-model="location"
                class="textInput"
                type="text"
                placeholder="Endereço"
                required
              ></b-form-input>
            </b-form-group>

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59911088.758287504!2d-118.4678619!3d-23.5798381!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5708390fdc71%3A0xadf189f6de334c8b!2sEmbed%20Produ%C3%A7%C3%A3o%20Digital!5e0!3m2!1sen!2sbr!4v1680735578276!5m2!1sen!2sbr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

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
