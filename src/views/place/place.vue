<script>
import {
  BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{ name: 'description', content: 'Local' }],
  },
  components: {
    BFormGroup,
    BFormInput,
    BButton,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        contact: '',
        schedule: '',
        categories: [],
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
          id: 'img-1',
          blank: true,
          blankColor: '#000',
          src: '',
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<template>
  <div>
    <div>
      <b-button variant="secondary">Voltar</b-button>
      <h1 class="text-primary title">
        PAINEL DE GERENCIAMENTO - LOCAL
      </h1>
    </div>
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
            <b-table class="table" striped hover :items="categories"></b-table>
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
                    v-for="i in (2,7)"
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
