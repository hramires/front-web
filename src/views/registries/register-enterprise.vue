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
    BForm,
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
          blank: true,
          blankColor: '#000',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          blank: true,
          blankColor: '#777',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          blank: true,
          blankColor: 'blue',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          blank: true,
          blankColor: '#777',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          blank: true,
          blankColor: '#777',
          width: 75,
          height: 75,
          class: 'm1',
        },
        {
          blank: true,
          blankColor: '#777',
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
      <b-form @submit="onSubmit">
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
            <b-table striped hover :items="items"></b-table>
          </b-col>
          <b-col>
            <b-form-group
              id="gallery"
              label="Fotos"
              label-for="Fotos"
              description=""
            >
<!--              <b-row  v-for="image in Math.ceil(images.length / 4)">-->
<!--                <b-img-->
<!--                  v-for="image in images.slice((image - 1) * 4, image * 4)"-->
<!--                  v-bind="image"-->
<!--                  rounded alt="images">-->
<!--                </b-img>-->
<!--              </b-row>-->
            </b-form-group>
          </b-col>
        </b-row>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<style type="scss" module>
.title {
  font-family: "BigShoulders";
  font-size: 3rem;
  margin-left: 8rem;
  margin-top: 4rem;
  font-weight: 900;
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
  font-family: "BigShoulders";
  font-size: 1.75rem;
  font-weight: 600;
  color: #024053
}
</style>
