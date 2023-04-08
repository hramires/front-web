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
      form: {
        name: '',
        description: '',
        contact: '',
        schedule: '',
        categories: [],
        selectedCategories: [],
      },
      categories: [
        {
          id: '1',
          name: 'Exemplo Categoria',
        },
        {
          id: '2',
          name: 'Exemplo Categoria 2',
        },
      ],
      show: true,
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
  methods: {
    onSubmit() {
      console.log('submit');
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
    selectCategory(value) {
      console.log(value);
    },
  },
};
</script>

<template>
  <div>
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
                v-model="form.name"
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
                v-model="form.description"
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
                v-model="form.contact"
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
                v-model="form.schedule"
                placeholder="Horários"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <label>Principais Categorias</label>
            <div>
              <b-dropdown
                id="categories"
                text="Selecione a categoria"
                block
                split
                split-variant="outline-primary"
                @click="selectCategory(value)"
              >
                <b-dropdown-item v-for="category in categories" :key="category.id">{{
                  category.name
                }}</b-dropdown-item>
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
                    :key="image.id"
                    class="image rounded-lg m1"
                    :blank="image.blank"
                    :blankColor="image.blanckColor"
                    rounded alt="images">
                </b-img>
                <div
                    v-for="i in 7"
                    :key="i"
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
              <b-form-input
                id="region-input"
                v-model="form.region"
                class="textInput"
                type="text"
                placeholder="Região A"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="location"
              label="Localização"
              label-for="location"
              description=""
            >
              <b-form-input
                id="location-input"
                v-model="form.location"
                class="textInput"
                type="text"
                placeholder="Endereço"
                required
              ></b-form-input>
            </b-form-group>

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59911088.758287504!2d-118.4678619!3d-23.5798381!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5708390fdc71%3A0xadf189f6de334c8b!2sEmbed%20Produ%C3%A7%C3%A3o%20Digital!5e0!3m2!1sen!2sbr!4v1680735578276!5m2!1sen!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </b-col>
        </b-row>
    </div>

    <b-row class="buttons">
      <b-col md="6" offset-md="10" >
        <b-button type="submit" variant="primary"  @click="onSubmit($event)">Salvar</b-button>
        <b-button type="reset" variant="danger">Excluir</b-button>
      </b-col>
    </b-row>

  </div>
</template>

<style type="scss" module>
.row {
  padding: 1.4rem 1.75rem;
}

.images {
  padding: 0 1rem;
}
</style>
