<script>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from "bootstrap-vue";

export default {
  page: {
    meta: [{ name: "description", content: "Sign In" }]
  },
  components: {
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BButton
  },
  methods: {
    onSubmit() {
      console.log("submit");
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: "home" });
    }
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        contact: "",
        schedule: "",
        categories: []
      },
      items: [
        { id: "1", categoria: "Exemplo Categoria" },
        { id: "2", categoria: "Exemplo Categoria 2" }
      ],
      show: true
    };
  }
};
</script>

<template>
  <div>
    <b
      ><h2 class="text-primary" :class="$style.title">
        PAINEL DE CADASTRO - LOCAL
      </h2></b
    >
    <div class="border border-primary" :class="$style.border">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col>
            <b-form-group
              id="name"
              label="Nome do Local"
              label-for="name"
              description=""
            >
              <b-form-input
                id="name"
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
            Segunda coluna
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
  margin-left: 2rem;
}
.border {
  margin: 2rem;
}

label {
  font-family: "BigShoulders";
  font-size: 2rem;
}
</style>
