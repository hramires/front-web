<script>
import {
  BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{
      name: 'description',
      content: 'Sign In',
    }],
  },
  components: {
    BFormGroup,
    BFormInput,
    BButton,
  },
  methods: {
    onSubmit() {
      console.log('submit');
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
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
      items: [
        {
          id: '1',
          categoria: 'Exemplo Categoria',
        },
        {
          id: '2',
          categoria: 'Exemplo Categoria 2',
        },
      ],
      show: true,
      images: [
        {
          id: 1,
          blank: true,
          blankColor: '#000',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          id: 2,
          blank: true,
          blankColor: '#777',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          id: 3,
          blank: true,
          blankColor: 'blue',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          id: 4,
          blank: true,
          blankColor: 'red',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          id: 5,
          blank: true,
          blankColor: 'green',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          id: 6,
          blank: true,
          blankColor: 'yellow',
          width: 75,
          height: 75,
          class: 'm1',
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <div>
      <h2 class="text-primary" :class="$style.title">
        PAINEL DE CADASTRO - LOCAL
      </h2>
    </div>
    <div class="border border-primary" :class="$style.border">
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
                :class="$style.textInput"
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
                :class="$style.textArea"
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
                :class="$style.textInput"
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
                :class="$style.textArea"
                v-model="form.schedule"
                placeholder="Horários"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <label>Principais Categorias</label>
            <b-table :class="$style.table" striped hover :items="items"></b-table>
          </b-col>
          <b-col>
            <b-form-group
              id="gallery"
              label="Fotos"
              label-for="Fotos"
              description=""
            >
              <b-row>
                <b-col md="7">
                    <b-img
                      v-for="image in images"
                      :key="image.id"
                      :class="`${image.class}  ${$style.image}`"
                      :blank-color="image.blankColor"
                      :blank="image.blank"
                      :width="image.width"
                      :height="image.height"
                      rounded alt="images">
                    </b-img>
                </b-col>
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
                :class="$style.textInput"
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
                :class="$style.textInput"
                type="text"
                placeholder="Endereço"
                required
              ></b-form-input>
            </b-form-group>

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59911088.758287504!2d-118.4678619!3d-23.5798381!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5708390fdc71%3A0xadf189f6de334c8b!2sEmbed%20Produ%C3%A7%C3%A3o%20Digital!5e0!3m2!1sen!2sbr!4v1680735578276!5m2!1sen!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </b-col>
        </b-row>
    </div>

    <b-row :class="$style.buttons">
      <b-col md="6" offset-md="10" >
        <b-button type="submit" variant="primary"  @click="onSubmit($event)">Salvar</b-button>
        <b-button type="reset" variant="danger">Excluir</b-button>
      </b-col>
    </b-row>

  </div>
</template>

<style>
.table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
  background-color: #9DCC9A;
}
</style>
<style type="scss" module>
.title {
  font-family: "BigShoulders";
  font-size: 3rem;
  margin-left: 8rem;
  margin-top: 4rem;
  font-weight: 900;
}

.buttons {
  margin-right: 1em;
  margin-bottom: 0.75em;
}

.table {
  color: #152536;
}

.image {
  margin: 0.3rem 0.3rem;
}

.textInput {
  background-color: #F8F9FA;
  border-radius: 0.25rem;
  border: aliceblue;
}

.textArea {
  background-color: #F8F9FA;
  border-radius: 0.25rem;
  border: aliceblue;
  overflow-y: hidden !important;
}

.border {
  margin: 1rem 8rem;
  border-radius: 0.75rem;
  border-color: #9DCC9A !important;
}

.row {
  padding: 1.4rem 1.75rem;
}

label {
  font-family: "FireSans";
  font-size: 1.75rem;
  font-weight: 600;
  color: #024053;
  line-height: 2rem;
}
</style>
